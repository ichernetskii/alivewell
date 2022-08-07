import React from "react";

// Components
import { NavHashLink } from 'react-router-hash-link';
import Logo from "components/logo";
import Form from "components/form";
import Branding from "components/branding";

// data
import data from "js/assets/data.js";

// CSS
import CSSModules from "react-css-modules";
import styles from "./footer.module.scss";

// Redux
import {useDispatch} from "react-redux";
import {setMenuExpanded} from "@/store/store.js";

const Footer = ({className}) => {
    const links = [
        data.menuItems[0],
        { label: "О бизнесе", href: "/#about" },
        data.menuItems[1],
        { label: "Типовая схема работы с клиентами", href: "/#scheme" },
        { label: "Наши преимущества", href: "/#advantages" },
        { label: "Вопросы - ответы", href: "/#faq" },
    ]

    const dispatch = useDispatch();
    const closeMenu = () => dispatch(setMenuExpanded(false));

    return (
        <>
            <footer
                styleName="footer"
                className={className}
                itemScope
                itemType="http://schema.org/LocalBusiness"
            >
                <div styleName="logotype">
                    <Logo styles={styles} />
                </div>
                <div styleName="links">
                    {
                        links.map(item => (
                            <NavHashLink
                                className="link"
                                styleName="link"
                                activeClassName={styles["link_active"]}
                                to={item.href}
                                smooth
                                key={item.href}
                                onClick={closeMenu}
                            >
                                { item.label }
                            </NavHashLink>
                        ))
                    }
                </div>
                <div styleName="contacts">
                    <div styleName="contacts__content">
                        <div
                            styleName="contacts__address"
                            dangerouslySetInnerHTML={{__html: data.contact.address}}
                            itemProp="address"
                        />
                        <a
                            styleName="contacts__phone"
                            className="link"
                            href={`tel:${data.contact.tel}`}
                            itemProp="telephone"
                        >
                            {data.contact.phone}
                        </a>
                        <a
                            styleName="contacts__email"
                            className="link"
                            href={`mailto:${data.contact.email}`}
                            itemProp="email"
                        >
                            {data.contact.email}
                        </a>
                    </div>
                    <div styleName="contacts__schedule">
                        <time
                            dateTime="Mo-Fr 09:00-18:00"
                            itemProp="openingHours"
                        >
                            <b>Понедельник - Пятница</b>: 9:00 - 18:00
                        </time>
                        <div>
                            <b>Суббота, Воскресенье</b>: выходной
                        </div>
                    </div>
                </div>
                <Form styles={styles} />
            </footer>
            <Branding UTMSource={process.env.DOMAIN} styleName="branding" />
        </>
    );
};

export default CSSModules(Footer, styles, {
    allowMultiple: true
});
