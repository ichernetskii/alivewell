import React, {useEffect, useRef} from "react";

// Components
import SVGUse from "components/svg-use";
import Breadcrumbs from "components/breadcrumbs/breadcrumbs.jsx";
import Form from "components/form";

// Utils
import {script} from "js/assets/utils.js";

// data
import data from "js/assets/data.js";

// CSS
import cn from "classnames";
import styles from "./contact-page.module.scss";
import CSSModules from "react-css-modules";

const ContactPage = () => {
    const mapRef = useRef(null);
    const yandexApiKey = `${process.env.YANDEX_API_KEY}`;

    useEffect(() => {
        script(`https://api-maps.yandex.ru/2.1/?apikey=${yandexApiKey}&lang=ru_RU`)
            .then(() => {
                const ymaps = window["ymaps"];
                ymaps.ready(() => {
                    const map = new ymaps.Map(mapRef.current, {
                        center: data.contact.position,
                        zoom: 15,
                        controls: []
                    }, {
                        suppressMapOpenBlock: true,
                        maxZoom: 18
                    });

                    // controls
                    map.controls.add(new ymaps.control.ZoomControl({
                        options: {
                            position: {
                                right: 20,
                                bottom: 125
                            }
                        }
                    }));

                    map.controls.add(new ymaps.control.GeolocationControl({
                        options: {
                            position: {
                                right: 20,
                                top: 15
                            }
                        }
                    }));

                    //map.controls.add("geolocationControl", { float: "right" });

                    // Создаём макет содержимого.
                    const iconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    )

                    const officePlacemark = new ymaps.Placemark(map.getCenter(), {
                        hintContent: data.contact.name,
                        balloonContent: data.contact.address
                    }, {
                        // Опции.
                        // Необходимо указать данный тип макета.
                        iconLayout: "default#image",
                        // Своё изображение иконки метки.
                        iconImageHref: require("img/geo-marker.svg"),
                        // Размеры метки.
                        iconImageSize: [52, 80],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-26, -80],
                        // Смещение слоя с содержимым относительно слоя с картинкой.
                        iconContentOffset: [15, 15],
                        // Макет содержимого.
                        iconContentLayout: iconContentLayout
                    })

                    map.geoObjects.add(officePlacemark);
                });
            });
    }, []);

    return (
        <main styleName="contact-page">
            <Breadcrumbs className="breadcrumbs" styles={styles} currentPageTitle="Контакты" />
            <div styleName="contact-page__content">
                <h1 styleName="contact-page__header" className="header">Контакты</h1>
                <Form isTextArea={true} styles={styles} />
                <div styleName="contacts">
                    <div styleName="contacts__data">
                        <div styleName="contacts__address" dangerouslySetInnerHTML={{__html: data.contact.address}} />
                        <a styleName="contacts__phone" className="link" href={`tel:${data.contact.tel}`}>{data.contact.phone}</a>
                        <a styleName="contacts__email" className="link" href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
                    </div>
                    <div styleName="contacts__schedule">
                        <div><b>Понедельник - Пятница</b>: 9:00 - 18:00</div>
                        <div><b>Суббота, Воскресенье</b>: выходной</div>
                    </div>
                </div>
                <div styleName="map" ref={mapRef} />
            </div>
        </main>
    );
};

export default CSSModules(ContactPage, styles, {
    allowMultiple: true
});
