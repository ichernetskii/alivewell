import React from "react";
import CSSModules from "react-css-modules";

// Components
import Form from "components/form";

// CSS
import cn from "classnames";
import s from "./modal.module.scss";

const Modal = ({className, params, isVisible, setVisible, styles}) => {
    const close = () => setVisible(false);
    document.body.style.overflow = isVisible ? "hidden" : "auto";
    return (
        <div
            styleName={cn("overlay", { "overlay_visible": isVisible })}
            className={className}
            onClick={close}
        >
            <div styleName="modal" onClick={e => e.stopPropagation()}>
                <div styleName="modal__close" onClick={close}>&times;</div>
                { isVisible && <Form className={styles["modal__form"]} styles={styles} {...params} /> }
            </div>
        </div>
    );
};

export default CSSModules(Modal, s, {
    allowMultiple: true
});
