import React, {useEffect, useRef, useState} from "react";

// CSS
import cn from "classnames";
import s from "./accordion.module.scss";

import {throttle} from "js/assets/utils.js";

const Accordion = ({className, data = [], arrowText = "Ответ"}) => {
    const [expanded, setExpanded] = useState(null);
    const [height, setHeight] = useState(0);
    const [windowSize, setWindowSize] = useState({});
    const refRoot = useRef(null);

    const onClickHandler = idx => {
        if (idx === expanded) {
            setExpanded(null);
            setHeight(0);
        } else {
            setExpanded(idx);
            setHeight(refRoot.current.querySelectorAll("[class*=accordion__answer]")[idx].scrollHeight);
        }
    }

    useEffect(() => {
        const throttledSetWindowSize = throttle(() => {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }, 500, {
            leading: true,
            trailing: true
        });

        window.addEventListener("resize", throttledSetWindowSize)

        return () => {
            window.removeEventListener("resize", throttledSetWindowSize)
        }
    }, []);

    useEffect(() => {
        setHeight(refRoot.current.querySelectorAll("[class*=accordion__answer]")[expanded]?.scrollHeight);
    }, [windowSize]);

    return (
        <div className={cn(s["accordion"], className)} ref={refRoot}>
            {
                data.map((item, idx) => (
                    <div className={cn(s["accordion__item"], {[s["accordion__item_expanded"]]: expanded === idx})} key={item?.question}>
                        <div className={s["accordion__question"]} onClick={ () => onClickHandler(idx)}>
                            <div dangerouslySetInnerHTML={{ __html: item?.question }} />
                            <div className={s["accordion__arrow-wrapper"]}>
                                <div className={s["accordion__arrow-text"]}>{arrowText}</div>
                                <div className={s["accordion__arrow"]}>
                                    <object className={s["accordion__arrow-svg"]} data={require("./svg/arrow.svg")} type="image/svg+xml" onClick={ () => onClickHandler(idx)} />
                                </div>
                            </div>
                        </div>
                        <div
                            className={s["accordion__answer"]}
                            style={{maxHeight: expanded === idx ? height : 0}}
                            dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default Accordion;
