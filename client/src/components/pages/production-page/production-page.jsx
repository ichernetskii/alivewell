import React, {useState} from "react";
import {Link} from "react-router-dom";

// Components
import Breadcrumbs from "components/breadcrumbs";
import Button from "components/button";

// data
import data, {productionType} from "js/assets/data.js";

// Redux
import {useDispatch} from "react-redux";
import {defaultModalConfig, setModal} from "@/store/store.js";

// CSS
import cn from "classnames";
import styles from "./production-page.module.scss";
import CSSModules from "react-css-modules";

const ProductionPage = () => {
    const [filter, setFilter] = useState(Object.keys(productionType)[0]);

    const dispatch = useDispatch();
    const openModal = (label) => dispatch(setModal({
        isVisible: true,
        params: {
            ...defaultModalConfig,
            header: `Вы выбрали <b>${label}</b>`,
            subHeader: "Оставьте свой телефон и<br/>мы с вами свяжемся",
            name: true,
            phone: true,
            button: "Купить",
            textArea: false
        }
    }));

    return (
        <main styleName="production-page">
            <Breadcrumbs className="breadcrumbs" styles={styles} currentPageTitle="Оборудование" />
            <div styleName="production-page__header-wrapper">
                <h1 styleName="production-page__header" className="header">Оборудование</h1>
                <div styleName="switcher">
                    <span styleName="switcher__label">Показать:</span>
                    {
                        Object.values(productionType).map(value => (
                            <span
                                key={value.label}
                                styleName={ cn("switcher__item", { "switcher__item_active": filter === value.code } )}
                                onClick={ () => setFilter(value.code) }>
                                { value.label }
                            </span>
                        ))
                    }
                </div>
            </div>
            <div styleName="production-page__content production">
                {
                    data.production
                        .filter(item => item.type === filter)
                        .map(item => (
                            <div
                                styleName="production__item"
                                key={item.label}
                                itemScope
                                itemType="http://schema.org/Product"
                            >
                                <Link styleName="production__link" to={`/production/${item.art}`} itemProp="url">
                                    <div styleName="production__bub">
                                        <div styleName="production__padding-hack">
                                            <div styleName="production__bub-content">
                                                <img
                                                    styleName="production__image"
                                                    src={item.images[0]}
                                                    alt={item.label}
                                                    itemProp="image"
                                                    loading="lazy"
                                                    title={item.label}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div styleName="production__header" itemProp="model" >{ item.label }</div>
                                    <div
                                        styleName="production__price"
                                        itemProp="offers"
                                        itemScope
                                        itemType="http://schema.org/Offer"
                                    >
                                        <span itemProp="price">
                                            {
                                                item.price.toLocaleString(
                                                    "ru",
                                                    {
                                                        style: "currency",
                                                        currency: "RUB",
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0
                                                    }
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div styleName="production__short-descr" itemProp="description">{ item.shortDescr }</div>
                                </Link>
                                <Button
                                    styleName="production__button"
                                    alternate={false}
                                    onClick={() => openModal(item.label)}
                                >
                                    Купить
                                </Button>
                            </div>
                        ))
                }
            </div>
        </main>
    );
};

export default CSSModules(ProductionPage, styles, {
    allowMultiple: true
});
