import React from "react";
import {NavLink} from "react-router-dom";

// data
import data from "js/assets/data.js";

// components
import Logo from "components/logo";

// CSS
import cn from "classnames";
import s from "./header.module.scss";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {getMenuExpanded, setMenuExpanded} from "@/store/store.js";

const Header = ({isMobileHidden}) => {
    const dispatch = useDispatch();
    const closeMenu = () => dispatch(setMenuExpanded(false));
    const toggleMenu = () => dispatch(setMenuExpanded(!isMenuExpanded));
    const isMenuExpanded = useSelector(getMenuExpanded);

    return (
        <header
            className={cn(s.header, {[s["header_mobile-hidden"]]: isMobileHidden})}
            itemScope
            itemType="http://schema.org/Organization"
        >
            <div className={cn(s["hamburger"], {[s["hamburger__cross"]]: isMenuExpanded})} onClick={toggleMenu}>
                <div className={s["hamburger__line"]} />
                <div className={s["hamburger__line"]} />
                <div className={s["hamburger__line"]} />
            </div>
            <Logo className={s["header__logo"]} styles={s} onClick={closeMenu} />
            <nav className={cn(s["menu"], {[s["menu_expanded"]]: isMenuExpanded})}>
                { data.menuItems.map(item => (
                    <NavLink
                        className={cn("link", s["menu__item"])}
                        to={item.href}
                        key={item.label}
                        onClick={closeMenu}
                        activeClassName={s["menu__item_active"]}
                    >
                        {item.label}
                    </NavLink>
                )) }
            </nav>
            <div className={s["contacts"]}>
                <a
                    className={cn("link", s["contacts__phone"])}
                    href={`tel:${data.contact.tel}`}
                    itemProp="telephone"
                >
                    {data.contact.phone}
                </a>
                <a
                    className={cn("link", s["contacts__email"])}
                    href={`mailto:${data.contact.email}`}
                    itemProp="email"
                >
                    {data.contact.email}
                </a>
            </div>
        </header>
    );
};

export default Header;
