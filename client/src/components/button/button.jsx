import React from "react";
import {Link} from "react-router-dom";
import CSSModules from "react-css-modules";

// CSS
import cn from "classnames";
import styles from "./button.module.scss";

const Button = ({className, children, onClick, alternate = false, disabled = false}) => {
    const onClickHandler = e => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    }

    return (
        <button
            className={className}
            styleName={cn(
                "button",
                {
                    "button_alternate": alternate,
                    "button_disabled": disabled
                }
            )}
            onClick={onClickHandler}
            disabled={disabled}
        >
            { children }
        </button>
    );
};

export default CSSModules(Button, styles, {
    allowMultiple: true
});
