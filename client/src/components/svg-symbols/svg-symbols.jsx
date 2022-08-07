import React from "react";

// CSS
import s from "./svg-symbols.module.scss";
import cn from "classnames";

const SVGSymbols = ({className}) => {
    return (
        <svg className={cn(className, s.hide)}>
            <symbol id="why_6" viewBox="0 0 94 86" fill="none">
                <path stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M44.7134 53.3407C45.6243 52.0815 47.502 49.3201 47.9832 46.5376M44.7134 53.3407C44.213 54.0324 43.4291 54.9156 42.3354 55.8031M44.7134 53.3407H77.0915M18.8293 53.3407H2V2L37.6707 2M18.8293 53.3407C17.5401 51.7216 15.9947 49.147 15.4575 46.5376M18.8293 53.3407C19.3541 53.9999 20.0717 54.7305 20.9329 55.4548M15.4575 46.5376C15.3326 45.9309 15.3063 45.3207 15.2622 44.7235C14.7134 37.2854 19.6524 27.6704 31.7256 27.6704C44.3476 27.6704 48.5549 38.1018 48.0976 45.2677C48.0708 45.6871 48.0567 46.113 47.9832 46.5376M15.4575 46.5376H9.68293V10.2544H84.8659V46.5376H47.9832M59.1646 35.8341H78.4634M59.1646 27.6704H78.4634M71.3293 16.6947H78.4634M21.7561 16.6947H16.3598V24.1327M20.9329 55.4548C23.6272 57.7209 27.7269 59.9259 31.7256 59.6903C36.6656 59.3992 40.1302 57.5924 42.3354 55.8031M20.9329 55.4548V84L31.7256 73.6593M31.7256 73.6593L42.3354 84V55.8031M31.7256 73.6593V68.3982M47.9832 2L92 2V38.2832M92 46.5376V53.3407H84.8659M22.6707 43.1814C22.6707 47.9889 27.061 52.2522 31.7256 52.2522C36.3902 52.2522 40.5274 48.4425 40.689 43.635C40.8506 38.8274 36.7561 34.8363 31.7256 34.8363C26.0549 34.8363 22.6707 39.3717 22.6707 43.1814Z" />
            </symbol>
        </svg>
    );
};

export default SVGSymbols;
