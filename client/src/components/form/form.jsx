import React, {useState} from "react";
import CSSModules from "react-css-modules";

// Components
import InputField from "components/input-field/input-field.jsx";
import Button from "components/button";

// Utils
import {request} from "../../js/assets/utils.js";

// CSS
import styles from "./form.module.scss";
import cn from "classnames";

const Form = ({
                  className,
                  header = "",
                  subHeader = "",
                  isName = true,
                  isPhone = true,
                  button = "Бесплатная консультация",
                  isTextArea = false
}) => {
    const [name, setName] = useState(null);
    const [isNameError, setNameError] = useState(false);
    const [phone, setPhone] = useState(null);
    const [isPhoneError, setPhoneError] = useState(false);
    const [textArea, setTextArea] = useState(null);
    const [isTextAreaError, setTextAreaError] = useState(false);
    const [fetch, setFetch] = useState(null);

    const onClickHandler = async () => {
        let hasErrors = false;
        if (isPhone    && !phone) {
            setPhoneError(true);
            hasErrors = true;
        }
        if (isName     && !name) {
            setNameError(true);
            hasErrors = true;
        }
        if (isTextArea && !textArea) {
            setTextAreaError(true);
            hasErrors = true;
        }

        if (!hasErrors) {
            try {
                setFetch({
                    error: false,
                    message: "Отправка …"
                });
                const result = await request("/api/mail/send", "POST", {
                    name, phone, message: textArea
                })
                setFetch({
                    error: false,
                    message: result.message
                });
            } catch (e) {
                setFetch({
                    error: true,
                    message: (Array.isArray(e.errors) ? e.errors[0]?.msg : e.message) || "Ошибка"
                });
            }
        }
    }

    return (
        <div styleName="form" className={className}>
            { header && <div styleName="form__header" dangerouslySetInnerHTML={{__html: header}} /> }
            { subHeader && <div styleName="form__subheader" dangerouslySetInnerHTML={{ __html: subHeader }} /> }
            { isName && <InputField
                styleName={ cn("form__input", { "form__input_error": isNameError }) }
                styles={styles}
                placeholder="Имя"
                onChange={n => {
                    setName(n);
                    setNameError(false);
                }}
            />}
            { isPhone && <InputField
                styleName={ cn("form__input", { "form__input_error": isPhoneError }) }
                styles={styles}
                isPhone={true}
                onChange={ p => {
                    setPhone(p);
                    setPhoneError(false);
                }}
            /> }
            { isTextArea && <textarea
                styleName={ cn("form__text-area", { "form__text-area_error": isTextAreaError }) }
                placeholder="Сообщение"
                onChange={ e => {
                    setTextArea(e.target.value);
                    setTextAreaError(false);
                }}
            /> }
            { button &&
            <Button
                styleName="form__button"
                styles={styles}
                onClick={onClickHandler}
                disabled={ isNameError || isPhoneError || isTextAreaError || (fetch && !fetch.error) }
            >
                { fetch ? fetch.message : button }
            </Button> }
        </div>
    );
};

export default CSSModules(Form, styles, {
    allowMultiple: true
});
