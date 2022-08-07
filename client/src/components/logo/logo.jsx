import React from "react";
import {Link} from "react-router-dom";
import CSSModules from "react-css-modules";

// CSS
import styles from "./logo.module.scss";

const Logo = ({onClick, className}) => {
    return (
        <div className={className} styleName="logo-wrapper" >
            <meta itemProp="url" content={ process.env.SERVER_NAME + process.env.BASE_PATH } />
            <Link to="/" onClick={onClick}>
                <div styleName="logo">
                    <img
                        styleName="logo__svg logo__image"
                        src={require("img/logo/logo.svg")} alt="logo"
                        itemProp="image"
                        loading="eager"
                    />
                    <meta itemProp="name" content="Живой родник" />
                    <img
                        styleName="logo__svg logo__text"
                        src={require("img/logo/logo-text.svg")}
                        alt="Живой Родник"
                        loading="eager"
                    />
                </div>
            </Link>
            <div styleName="logo-slogan">
                Делаем воду чище уже 10 лет!
            </div>
        </div>
    );
};

export default CSSModules(Logo, styles, {
    allowMultiple: true
});
