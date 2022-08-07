const nodemailer = require('nodemailer')
const {validationResult} = require("express-validator");
const cfg = require("config");
const config = {
    host: cfg.get("host"),
    port: cfg.has("port") ? cfg.get("port") : 465,
    secure: cfg.has("secure") ? !!cfg.get("secure") : true,
    login: cfg.get("login"),
    password: cfg.get("password"),
    fromTitle: cfg.get("fromTitle")
}

const send = async (req, res) => {
    try {
        // Server validation
        const errors = validationResult(req);
        // check data errors
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                    message: "Проверьте данные"
                });
        }

        const {name, phone, message} = req.body;
        let transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.login,
                pass: config.password,
            },
        })

        let msg = `
            <p><b>Имя:</b> ${name}</p>
            <p><b>Телефон:</b> ${phone}</p>
        `;
        if (message) msg += `<p><b>Сообщение:</b> ${message}</p>`;

        await transporter.sendMail({
            from: `"${config.fromTitle}" <${config.login}>`,
            to: config.login,
            subject: "Заявка с сайта",
            html: msg,
        })

        res
            .status(200)
            .json({ message: "Сообщение отправлено" });
    } catch (e) {
        res
            .status(500)
            .json({ message: "Попробуйте позже" });
    }
}

module.exports = { send }
