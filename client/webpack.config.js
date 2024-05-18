/* --------------- modules & plugins --------------------------- */

const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

/* --------------- config -------------------------------------- */

const paths = {
    src: {
        abs: path.resolve(__dirname, "src"),
        rel: "src"
    },
    dist: {
        debug: {
            abs: path.resolve(__dirname, "dist/debug"),
            rel: "dist/debug"
        },
        release: {
            abs: path.resolve(__dirname, "dist/release"),
            rel: "dist/release"
        }
    },
    folders: {
        js: "js",
        style: "style",
        translation: "translation",
        img: "images",
        favicon: path.join("images", "favicon"),
        svg: "svg",
        html: "ejs",
        fonts: "fonts",
        components: "components"
    }
};

/* ---------------- module.exports ----------------------------- */

module.exports = (env = {}) => {

/* --------------- const --------------------------------------- */

    const {mode = "development"} = env;
    const isDev = mode === "development";
    const isProd = mode === "production";
    const dotenvConfig = dotenv.config({ path: `./config/.env.${mode}.local` }).parsed;

/* --------------- functions ----------------------------------- */

    const getFilenameTemplate = (fileName, hash, ext) => isProd ? `${fileName}-[${hash}:8].${ext}` : `${fileName}-[${hash}:4].${ext}`;
    const fixSlashes = path => path.replace("\\","/");

    const getPlugins = () => {
        // load env-variables
        const envVariables = Object.fromEntries(
            Object
                .entries(dotenvConfig)
                .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
        );

        const ogImageName = dotenvConfig.BASE_PATH && dotenvConfig.BASE_PATH[dotenvConfig.BASE_PATH.length - 1] === "/" ? "images/main.jpg" : "/images/main.jpg";

        let plugins = [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                ...envVariables,
                "process.env.isProd": isProd
            }),
            new FaviconsWebpackPlugin({
                logo: "./images/logo_square.png",
                prefix: "./images/favicons_[contenthash:4]/",
                cache: true,
                favicons: {
                    background: "#FFF",
                    theme_color: "#00AAFF",
                    icons: {
                        android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background }`
                        appleIcon: true,             // Create Apple touch icons. `boolean` or `{ offset, background }`
                        appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
                        coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background }`
                        favicons: true,              // Create regular favicons. `boolean`
                        firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
                        windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }`
                        yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
                    }
                }
            }),
            new htmlWebpackPlugin({
                inject: false,
                chunks: ["main"],
                template: fixSlashes(path.join(paths.folders.html, "index.ejs")),
                filename: "index.html",
                lang: "ru",
                baseHref: dotenvConfig.SERVER_NAME ? `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` : "",
                title: "Живой родник - аппараты по продаже чистой воды на улице",
                meta: [
                    { charset: "utf-8" },
                    { content: "ie=edge", "http-equiv": "x-ua-compatible" },
                    { name: "description", content: "Производство оборудования для 7-ступенчатой очистки и автоматизированной продажи воды. Продажа питьевой воды через автоматы. В продаже автоматы по лучшим ценам.", lang: "ru" },
                    { name: "author", content: "Smarto" },
                    { name: "robots", content: isProd ? "index, follow" : "none" },
                    { name: "theme-color", content: "#00AAFF" },
                    { property: "og:title", content: "Живой родник - аппараты по продаже чистой воды на улице" },
                    { property: "og:description", content: "Производство оборудования для 7-ступенчатой очистки и автоматизированной продажи воды." },
                    { property: "og:image", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}${ogImageName}` },
                    { property: "og:image:type", content: "image/jpeg" },
                    { property: "og:image:width", content: "700" },
                    { property: "og:image:height", content: "700" },
                    { property: "og:type", content: "website" },
                    { property: "og:url", content: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` },
                    { property: "og:locale", content: "ru_RU" },
                    { property: "og:site_name", content: "Сайт «Живой родник»" }
                ],
                headHtmlSnippet: `
                    <!--[if lt IE 9]>
                        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/r29/html5.min.js"></script>
                    <![endif]-->
                `,
                mobile: true,
                links: [{ rel: "canonical", href: `${dotenvConfig.SERVER_NAME}${dotenvConfig.BASE_PATH}` }],
                buildDate: new Date().toString(),
                mode: mode,
                yandexMetrika: undefined,
                minify: isProd
            })
        ];

        if (isProd) {
            plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        { from: "./ejs/.htaccess", to: "./.htaccess", toType: "file"},
                        { from: "./images/home-page/slider-s.jpg", to: "./images/main.jpg", toType: "file"},
                    ]
                })
            );

            plugins.push(
                new RobotstxtPlugin({ configFile: "./src/robots-txt.config.js" })
            );

            plugins.push(
                new MiniCSSExtractPlugin({
                    filename: fixSlashes(path.join(paths.folders.style, getFilenameTemplate("main", "fullhash", "css")))
                })
            );

            // Compress images
            plugins.push(
                new ImageminPlugin({
                    test: /\.(jpe?g|png|gif|svg|webp)$/i,
                    optipng: {
                        optimizationLevel: 6,
                    },
                    svgo: {
                        plugins: [ {
                            removeViewBox: false
                        }, {
                            convertStyleToAttrs: false
                        }]
                    },
                    plugins: [
                        imageminMozjpeg({
                            quality: 65,
                            progressive: true
                        })
                    ]
                })
            );
        }

        return plugins;
    }

    const cssLoaders = (extra, module = false) => {
        let loaders = [
            isProd ?
            {
                loader: MiniCSSExtractPlugin.loader,
                options: {
                    publicPath: "../"
                },
            } : "style-loader",
            {
                loader: require.resolve("css-loader"),
                options: {
                    sourceMap: isDev,
                    importLoaders: 2,
                    modules: module ? {
                        compileType: "module",
                        localIdentName: "[local]___[name]___[hash:base64:5]"
                    } : false
                }
            }
        ];

        // post css
        if (isProd) {
            loaders.push({
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [[
                            "postcss-preset-env",
                            { autoprefixer: {grid: "autoplace"} },
                            "postcss-object-fit-images"
                        ]],
                    },
                },
            });
        }

        // extra css
        if (extra) {
            if (typeof extra === "string") {
                loaders.push(extra);
            } else if (extra instanceof Array) {
                loaders = loaders.concat(extra);
            }
        }

        return loaders;
    }

    /* --------------- return  ------------------------------------- */

    return {
        context: paths.src.abs,
        target: isProd ? "browserslist" : "web", // disable browserslist for development
        devtool: isProd ? undefined : "source-map",
        resolve: {
            extensions: [".js", ".jsx", ".json"],
            alias: {
                "@": paths.src.abs,
                "js": path.resolve(paths.src.abs, paths.folders.js),
                "style": path.resolve(paths.src.abs, paths.folders.style),
                "img": path.resolve(paths.src.abs, paths.folders.img),
                "components": path.resolve(paths.src.abs, paths.folders.components),
                "html": path.resolve(paths.src.abs, paths.folders.html),
                "config": path.resolve(__dirname, "config")
            }
        },
        optimization: {
            splitChunks: {
                chunks: isProd ? "all" : "async"
            },
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                `...`,
                new CssMinimizerPlugin()
            ]
        },
        performance: {
            maxEntrypointSize: isProd ? 250000 : 1024*1024,
            maxAssetSize: isProd ? 250000 : 1024*1024
        },
        mode: isProd ? "production" : "development",
        devServer: {
            open: true,
            proxy: {
                "/api": {
                    target: "http://ALIVEWELL_SERVER_CONTAINER:5001"
                }
            },
            historyApiFallback: true,
            port: 4200,
            hot: true,
            host: "0.0.0.0",
            watchOptions: {
                poll: 1000,
            },
        },
        entry: {
            main: fixSlashes("./" + path.join(paths.folders.js, "index.js"))
        },
        output: {
            path: isProd ? paths.dist.release.abs : paths.dist.debug.abs,
            filename: fixSlashes(path.join(paths.folders.js, getFilenameTemplate("[name]", "fullhash", "js"))),
            hashFunction: "xxhash64",
        },
        module: {
            rules: [
                // HTML
                {
                    test: /\.ejs$/i,
                    exclude: /node_modules/,
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    }
                },

                // Loading images
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    exclude: path.resolve(__dirname, paths.src.rel, paths.folders.fonts),
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: paths.folders.img,
                                name: getFilenameTemplate("[name]", "hash", "[ext]"),
                                esModule: false
                            }
                        }
                    ]
                },

                // SVG
                {
                    test: /\.(svg)$/,
                    exclude: path.resolve(__dirname, paths.src.rel, paths.folders.fonts),
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: paths.folders.svg,
                                name: getFilenameTemplate("[name]", "hash", "svg"),
                                esModule: false
                            }
                        }
                    ]
                },

                // Loading fonts
                {
                    test: /fonts?.*\.(ttf|otf|eot|woff2?|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: paths.folders.fonts,
                                name: "[name]/[name].[ext]",
                                esModule: false
                            }
                        }
                    ]
                },

                // Babel loader
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },

                // CSS loaders
                {
                    test: /\.(css)$/,
                    use: cssLoaders()
                },

                // SCSS loaders
                // SCSS except modules
                {
                    test: /\.(s[ca]ss)$/,
                    exclude: /\.module\.s[ca]ss$/,
                    use: cssLoaders("sass-loader", false)
                },
                // SCSS modules
                {
                    test: /\.module\.scss$/,
                    use: cssLoaders("sass-loader", true)
                }
            ]
        },
        plugins: getPlugins()
    };
}
