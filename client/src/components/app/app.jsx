// React
import React, {useEffect, useRef, useState} from "react";

// Router
import Router from "components/router";

// Components
import RouterScrollToTop from "components/router-scroll-to-top";
import ScrollToTop from "components/scroll-to-top";
import Modal from "components/modal";
import SVGSymbols from "components/svg-symbols";
import Header from "components/header";
import Footer from "components/footer";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {
    getMenuExpanded,
    setMenuExpanded,
    getScrollPosition,
    setScrollPosition,
    getModal,
    setModalVisible
} from "@/store/store.js";

// Utils
import {throttle} from "js/assets/utils.js";

// CSS
import "normalize.css";
import styles from  "./app.module.scss";
import CSSModules from "react-css-modules";

const App = () => {
    const scrollPosition = useSelector(getScrollPosition);
    const isMenuExpanded = useSelector(getMenuExpanded);
    const dispatch = useDispatch();

    // region Hide header on mobile forward scroll
    const [isMobileHeaderHidden, setMobileHeaderHidden] = useState(false);
    let scrollDelta = useRef(0);
    let prevScrollPos = useRef(0);
    let countOfScrolls = useRef(0);
    const onScrollHandler = throttle(() => {
        countOfScrolls.current++;
        dispatch(setScrollPosition(window.pageYOffset));

        if (countOfScrolls.current <= 2) {
            prevScrollPos.current = pageYOffset;
            return;
        }

        if (pageYOffset > prevScrollPos.current)
            scrollDelta.current += pageYOffset - prevScrollPos.current
        else
            scrollDelta.current = 0;

        prevScrollPos.current = pageYOffset;
        if (scrollDelta.current >= 300) {
            setMobileHeaderHidden(true);
            dispatch(setMenuExpanded(false));
        } else
            setMobileHeaderHidden(false);
    }, 500, { leading: true, trailing: true });

    useEffect(() => {
        window.addEventListener("scroll", onScrollHandler);
        return () => {
            window.removeEventListener("scroll", onScrollHandler);
        };
    }, []);
    // endregion

    // region Modal window
    const modal = useSelector(getModal);
    const setModalVisibility = visibility => dispatch(setModalVisible(visibility));
    // endregion

    return (
        <div className={styles.app}>
            <RouterScrollToTop />
            <ScrollToTop scrollPosition={scrollPosition} isVisible={!isMenuExpanded} />
            <Modal
                styles={styles}
                isVisible={modal.isVisible}
                setVisible={setModalVisibility}
                params={modal.params}
            />
            <SVGSymbols />
            <Header isMobileHidden={isMobileHeaderHidden} />
            <Router />
            <Footer />
        </div>
    );
};

export default CSSModules(App, styles);
