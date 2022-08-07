import React from "react";

// Components
import Breadcrumbs from "components/breadcrumbs/breadcrumbs.jsx";
import Form from "components/form";

// data
import data from "js/assets/data.js";

// CSS
import styles from "./about-page.module.scss";
import CSSModules from "react-css-modules";

const AboutPage = () => {
    return (
        <main styleName="about-page">
            <Breadcrumbs
                className="breadcrumbs"
                styleName="about-page__breadcrumbs"
                styles={styles}
                currentPageTitle="О нас"
            />
            <section styleName="us">
                <div styleName="us__image-wrapper">
                    <img styleName="us__image" src={require("img/about-us/about-us-1.jpg")} loading="lazy" alt="О нас" />
                </div>
                <h1 styleName="us__header">О нас</h1>
                <p styleName="us__text us__text_1">
                    Мы ведем свою деятельность с 2010 года и постоянно совершенствуемся для того, чтобы Вы получали только самое качественное оборудование.
                    Мы работаем с поставщиками современного дополнительного оборудования, что позволяет предлагать Вам самые конкурентные цены на нашу продукцию.
                </p>
                <p styleName="us__text us__text_2">
                    Поставки продукции из высококачественных материалов и по разумным ценам позволят Вам быстро начать и успешно развивать свой бизнес. Наши клиенты из более чем 49 городов России (Санкт-Петербург, Нижний Новгород, Смоленск, Калуга, Воронеж, Брянск, Пенза, Чебоксары, Сыктывкар и др.) уже оценили преимущества нашей компании.
                </p>
                <p styleName="us__text us__text_3">
                    Позвоните нам и мы проконсультируем Вас по всем интересующим вопросам, подберем оптимальный вариант оборудования и изготовим его в кратчайшие сроки.
                </p>
                <Form styleName="us__form" styles={styles} />
            </section>
            <section styleName="business">
                <div styleName="business__image-wrapper">
                    <img styleName="business__image" src={require("img/about-us/about-us-2.jpg")} loading="lazy" alt="О бизнесе" />
                </div>
                <h1 styleName="business__header">О&nbsp;бизнесе</h1>
                <p styleName="business__text business__text_1">
                    Во многих регионах состав питьевой воды, ввиду особенностей климата, состава грунта и техногенных факторов оставляет желать лучшего, часто перенасыщен солями и микроэлементами.
                    Избыточное потребление фтора, железа, частиц известняковых отложений, хлора, нитритов, кадмия и других негативно сказывается на состоянии организма. Население, проявляя заботу о своем здоровье, все больше обращает внимание на качество потребляемой воды.
                </p>
                <p styleName="business__text business__text_2">
                    Ежегодно  потребность в чистой питьевой воде возрастает, а число ее потребителей увеличивается. Эксперты финансового сектора утверждают, что в России, каждый год, наблюдается прирост рынка безалкогольных напитков, а именно воды, - до 16%. Прогнозируется, что данный сегмент продолжит расти, поэтому бизнес по продаже питьевой воды становится все более актуален и востребован.
                </p>
                <div styleName="business__text business__text_3">
                    Продажа питьевой воды через автоматы – идея интересная и относительно новая. По оценкам экспертов, эта ниша свободна в 80% российских городов.
                </div>
            </section>
            <h1 styleName="header-advantages">Преимущества бизнеса</h1>
            <section styleName="advantages">
                {
                    data.aboutData.map(item => (
                        <div styleName="advantages__item" key={item.text}>
                            <div styleName="advantages__padding-hack">
                                <div styleName="advantages__content">
                                    <div styleName="advantages__svg-wrapper">
                                        <object styleName="advantages__svg" data={item.src} type="image/svg+xml" />
                                    </div>
                                    <div styleName="advantages__text" dangerouslySetInnerHTML={{ __html: item.text }} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        </main>
    );
};

export default CSSModules(AboutPage, styles, {
    allowMultiple: true
});
