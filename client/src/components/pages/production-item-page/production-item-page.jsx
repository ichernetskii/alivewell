import React from "react";
import {useParams} from "react-router-dom";

// Components
import Breadcrumbs from "components/breadcrumbs";
import Button from "components/button";

// data
import data from "js/assets/data.js";

// Redux
import {useDispatch} from "react-redux";
import {defaultModalConfig, setModal} from "@/store/store.js";

// CSS
import styles from "./production-item-page.module.scss";
import CSSModules from "react-css-modules";

const ProductionItemPage = () => {
    let { art } = useParams();
    const item = data.production.find(i => i.art === art);
    if (!item) return <main styleName="production-item">
        <div styleName="production-item__not-found">
            Товар не найден
        </div>
    </main>

    const dispatch = useDispatch();
    const openModal = () => dispatch(setModal({
        isVisible: true,
        params: {
            ...defaultModalConfig,
            header: `Вы выбрали <b>${item.label}</b>`,
            subHeader: "Оставьте свой телефон и<br/>мы с вами свяжемся",
            name: true,
            phone: true,
            button: "Купить",
            textArea: false
        }
    }));

    return (
        <main styleName="production-item">
            <Breadcrumbs
                className="breadcrumbs"
                styles={styles}
                path={[{ label: "Оборудование", href: "/production" }]}
                currentPageTitle={item.label}
            />
            <div
                styleName="production-item__content"
                itemScope
                itemType="http://schema.org/Product"
            >
                <div styleName="production-item__bub production-item__bub_0 bub-wrapper">
                    <div styleName="bub">
                        <div styleName="bub__padding-hack">
                            <img
                                styleName="bub__image"
                                src={item.images[0]}
                                alt={item.label}
                                itemProp="image"
                                loading="lazy"
                                title={item.label}
                            />
                        </div>
                    </div>
                </div>
                <div styleName="production-item__main-info production-item__text">
                    <div styleName="production-item__label" itemProp="model">{ item.label }</div>
                    <div styleName="production-item__art" itemProp="productID">Артикул: { item.art }</div>
                    <div styleName="production-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
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
                    <div styleName="production-item__colors colors">
                        <div styleName="colors__label">Цвета:</div>
                        {
                            item.colors.map(c => <div
                                styleName="colors__item"
                                style={{ backgroundColor: c }}
                                key={c}
                                itemProp="color"
                            />)
                        }
                    </div>
                </div>
                <div
                    styleName="production-item__about production-item__text"
                    dangerouslySetInnerHTML={{ __html: item.about }}
                    itemProp="description"
                />
                <div styleName="production-item__tech production-item__text">
                    <div styleName="production-item__tech-title">Технические характеристики</div>
                    <div styleName="production-item__tech-content" dangerouslySetInnerHTML={{ __html: item.tech }} />
                </div>
                <div styleName="production-item__bub production-item__bub_1 bub-wrapper">
                    <div styleName="bub">
                        <div styleName="bub__padding-hack">
                            <img styleName="bub__image" src={item.images[1]} alt={item.label} loading="lazy" title={item.label} />
                        </div>
                    </div>
                </div>
                <div styleName="production-item__bub production-item__bub_2 bub-wrapper">
                    <div styleName="bub">
                        <div styleName="bub__padding-hack">
                            <img styleName="bub__image" src={item.images[2]} alt={item.label} loading="lazy" title={item.label} />
                        </div>
                    </div>
                </div>
                <div styleName="production-item__options production-item__text">
                    <div styleName="production-item__options-title">Опции</div>
                    <div styleName="production-item__options-content" dangerouslySetInnerHTML={{ __html: item.options }} />
                </div>
                <Button styleName="production-item__button" onClick={openModal}>Купить</Button>
            </div>
        </main>
    );
};

export default CSSModules(ProductionItemPage, styles, {
    allowMultiple: true
});
