import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

// Components
import Button from "components/button";
import Accordion from "components/accordion";

// Intersection Observer
import {InView} from "react-intersection-observer";

// Redux
import {useDispatch} from "react-redux";
import {defaultModalConfig, setModal} from "@/store/store.js";

// data
import data from "js/assets/data.js";

// CSS
import cn from "classnames";
import s from "./home-page.module.scss";

const HomePage = () => {
    const [isAboutShown, setAboutShown] = useState(false);
    const [isAdvantagesShown, setAdvantagesShown] = useState(false);
    const [isSchemeShown, setSchemeShown] = useState(false);

    // region Slider
    const [activeSlide, setActiveSlide] = useState(0);
    const [timerReset, setTimerReset] = useState(0);
    const gallery = useRef(null);

    const drawSlide = n => {
        const step = gallery.current.offsetWidth;
        gallery.current.scrollTo({ left: step * n, behavior: "smooth" });
    }
    /**
     * Sets active slide in slider
     * @param {number} n Number of active slide
     */
    const changeSlide = n => {
        drawSlide(n);
        setActiveSlide(n);
    }
    /**
     * Skips some slides in slider
     * @param {number} delta Number of slides to skip. Can be negative.
     */
    const skipSlides = (delta = 1) => {
        setActiveSlide(slide => {
            const n = (slide + delta + data.homePage.sliderImages.length) % data.homePage.sliderImages.length;
            drawSlide(n);
            return n;
        });
    }
    useEffect(() => {
        const timerId = setInterval(skipSlides, 5000);
        return () => clearInterval(timerId);
    }, [timerReset]);
    // endregion

    const dispatch = useDispatch();
    const openDefaultModal = () => dispatch(setModal({
        isVisible: true,
        params: {
            ...defaultModalConfig,
            header: "Оставьте свой телефон и<br/>мы с вами свяжемся",
            subHeader: null,
            name: true,
            phone: true,
            button: "Бесплатная консультация",
            textArea: false
        }
    }));

    return (
        <main className={s["home-page"]}>
            <section className={s["first-screen"]}>
                <img className={s["bubble-s"]} src={require("img/home-page/slider-s.jpg")} loading="eager" alt="&#9711;" />
                <div className={s["bubble-l"]}>
                    <div ref={gallery} className={s["gallery"]}>
                        {
                            data.homePage.sliderImages.map((image, idx) => (
                                <img
                                    className={s["gallery__item"]}
                                    src={image} alt="&#9711;"
                                    key={image}
                                    loading={idx === 0 ? "eager" : "lazy"}
                                />
                            ))
                        }
                    </div>
                    <div className={s["slider"]}>
                        <div
                            className={cn(s["slider__button"], s["slider__button_left"])}
                            onClick={() => {
                                setTimerReset(t => t + 1);
                                skipSlides(-1);
                            }}
                        />
                        <div className={s["slider__dot-wrapper"]}>
                            {
                                data.homePage.sliderImages.map((image, idx) => (
                                    <div
                                        className={cn(s["slider__dot"], {[s["slider__dot_selected"]]: activeSlide === idx})}
                                        onClick={() => {
                                            setTimerReset(t => t + 1);
                                            changeSlide(idx);
                                        }}
                                        key={image}
                                    />
                                ))
                            }
                        </div>
                        <div
                            className={cn(s["slider__button"], s["slider__button_right"])}
                            onClick={() => {
                                setTimerReset(t => t + 1);
                                skipSlides(1);
                            }}
                        />
                    </div>
                </div>
                <div className={s["infobox"]}>
                    <h1 className={cn("header", s["infobox__header"])}>Аппараты по&nbsp;продаже чистой воды</h1>
                    <div className={s["infobox__subheader"]}>Производим оборудование для 7-ступенчатой очистки и автоматизированной продажи воды.</div>
                    <Button className={s["infobox__button"]} onClick={openDefaultModal}>Бесплатная консультация</Button>
                </div>
            </section>
            <InView
                as="section"
                className={ cn(
                    s["about"],
                    { [s["about_visible"]]: isAboutShown }
                ) }
                threshold={0.2}
                onChange={inView => {
                    if (inView) setAboutShown(true);
                }}
            >
                <a className="anchor" id="about" />
                <div className={s["about__info"]}>
                    <h1 className={cn("header", s["about__header"])}>О бизнесе</h1>
                    <div className={s["about__text"]}>
                        Продажа питьевой воды через автоматы – идея интересная и относительно новая. По оценкам экспертов, эта ниша свободна в 80% российских городов.
                        <div className={s["about__more"]}>
                            <Link className={cn("link", s["about__link"])} to="/about">Подробнее ...</Link>
                        </div>
                    </div>
                    <Button className={s["about__button"]} onClick={openDefaultModal}>Бесплатная консультация</Button>
                </div>
                <div className={s["about__icons"]}>
                    {
                        data.aboutData.map(item => (
                            <div className={s["about__item"]} key={item.text}>
                                <div className={s["about__svg-wrapper"]}>
                                    <object className={s["about__svg"]} data={item.src} type="image/svg+xml" />
                                </div>
                                <div className={s["about__description"]} dangerouslySetInnerHTML={{ __html: item.text }} />
                            </div>
                        ))
                    }
                </div>
                <div className={s["about__button-wrapper"]}>
                    <Button className={s["about__button"]} onClick={openDefaultModal}>Бесплатная консультация</Button>
                </div>
            </InView>
            <InView
                as="section"
                className={ cn(
                    s["scheme"],
                    { [s["scheme_visible"]]: isSchemeShown }
                ) }
                threshold={0.3}
                onChange={inView => {
                    if (inView) setSchemeShown(true);
                }}
            >
                <a className="anchor" id="scheme" />
                <h1 className={cn("header", s["scheme__header"])}>Типовая схема работы с&nbsp;клиентом</h1>
                <div className={s["scheme__items-wrapper"]}>
                    {
                        data.homePage.schemeData.map((item, idx) => (
                            <div className={cn(s["scheme__item"], s["border-gradient"])} key={item.caption}>
                                <h4 className={s["scheme__caption"]}>{ item.caption }:</h4>
                                <div className={s["scheme__text"]} dangerouslySetInnerHTML={{__html: item.text}} />
                                <div className={s["scheme__stage"]}>{ idx + 1 }</div>
                            </div>
                        ))
                    }
                </div>
            </InView>
            <InView
                as="section"
                className={ cn(
                    s["advantages"],
                    { [s["advantages_visible"]]: isAdvantagesShown }
                ) }
                threshold={0.2}
                onChange={inView => {
                    if (inView) setAdvantagesShown(true);
                }}
            >
                <a className="anchor" id="advantages" />
                <h1 className={cn("header", s["advantages__header"])}>Наши преимущества</h1>
                <div className={s["advantages__content"]}>
                    <div className={s["advantages__icons"]}>
                        {
                            data.homePage.advantagesData.map(item => (
                                <div className={s["advantages__item-wrapper"]} key={item.text}>
                                    <div className={s["advantages__item"]} key={item.text}>
                                        <div className={s["advantages__svg-wrapper"]}>
                                            <div className={cn(s["advantages__height100"], s["advantages__padding-hack"])}>
                                                <object className={s["advantages__svg"]} data={item.src} type="image/svg+xml" />
                                            </div>
                                        </div>
                                        <div className={s["advantages__description"]} dangerouslySetInnerHTML={{ __html: item.text }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={s["advantages__cta-wrapper"]}>
                        <div className={s["advantages__padding-hack"]}>
                            <div className={s["advantages__phone-svg-wrapper"]} onClick={openDefaultModal}>
                                <div className={s["advantages__phone-border"]} />
                                <object className={s["advantages__phone-svg"]} data={require("img/phone.svg")} type="image/svg+xml" />
                            </div>
                            <Button
                                className={s["advantages__button-consult"]}
                                alternate={true}
                                onClick={openDefaultModal}
                            >
                                Бесплатная консультация
                            </Button>
                        </div>
                    </div>
                </div>
            </InView>
            <section className={s["faq"]}>
                <a className="anchor" id="faq" />
                <div className={s["faq__column-text"]}>
                    <h1 className={cn("header", s["faq__header"])}>
                        Вопросы и&nbsp;ответы
                    </h1>
                    <Accordion className={s["faq__accordion"]} data={data.homePage.faq} arrowText="Ответ" />
                </div>
                <div className={s["faq__column-img"]}>
                    <img className={s["faq__img"]} src={require("img/home-page/faq.jpg")} loading="lazy" alt="Живой родник" />
                </div>
            </section>
        </main>
    );
};

export default HomePage;
