import {useState} from "react";
import styles from './MainPage.module.css';
import AnimatedCard from "../../shared/AnimatedCard/AnimatedCard.tsx"
import WelcomeCard from "./components/WelcomeCard/WelcomeCard.tsx"
import Modal from "./components/modalWindow/ModalWindow.tsx"
import tgLogo from "../../assets/socialMediaLogos/tg.svg"
import wupLogo from "../../assets/socialMediaLogos/whatsapp.svg"
import CatalogAnimatePhoto from "../../assets/CardPhoto/AnimatedCardCATALOG.jpg";
import CapRepAnimatePhoto from "../../assets/CardPhoto/AnimatedCardCAPREP.jpg";
import repairHHPhoto from "../../assets/CardPhoto/AnimateCardRepairHH.jpg";

const LOCALRoutes = {
    about: "/about",
    catalog: "/catalog",
    caprep: "/caprep",
    repairhh: "/repairhh",

}

const TEXTAboutData = {
    title: "О нас",
    text:   "Более 50 партнеров и довольных клиентов.\n" +
        "Более 400 сделок на поставку товаров, запчастей и комплектующих.\n" +
        "О наличии товара на складе уточняйте по номеру телефона или по электронной почте, а также Telegram/WhatsApp.\n" +
        "Номер телефона можно скопировать при нажатии логотипа мессенджера снизу.\n\n+7(927)365-60-21\n+7(927)287-10-48",
    additionalInfo: [
        {
            name: "WhatsUp",
            link: "",
            logo_src: wupLogo
        },
        {
            name: "Telegram",
            link: "",
            logo_src: tgLogo
        },
    ]
};

const TEXTS = {
    TITLE: "ИП Котов О.В.",
    WELCOME_TEXTS: {
        TITLE: "Добро пожаловать!",
        DESCRIPTION: "Мы рады приветствовать вас на нашем сайте! Здесь вы найдете всю необходимую информацию " +
            "о нашей компании, услугах и продуктах, а также сможете связаться с нами в случае необходимости. " +
            "При нажатии на текст можно узнать подробнее о нас!",
    },
    CONTACT_DATA: {
        Email: "kotovoleg1979@yandex.ru",
        OwnerPhoneNumber: "+7(927)365-60-21",
        DublePhoneNumber: "+7(927)287-10-48",
    },
    CARDS_TEXTS: {
        CATALOG: {
            TITLE: "Запчасти для дизелей и турбокомпрессоров",
            OnClick: "Перейти в каталог",
            pathToPhoto: CatalogAnimatePhoto,
        },
        CAP_REPAIR: {
            TITLE: "Капитальный ремонт турбокомпрессоров",
            OnClick: "Узнать цены",
            // pathToPhoto: "https://avatars.mds.yandex.net/get-altay/1924793/2a0000016c8605ad0e62501b548fb9e7acc2/XXL_height",
            pathToPhoto: CapRepAnimatePhoto,
        },
        REPAIR_HH: {
            TITLE: "Ремонт агрегатов и узлов",
            OnClick: "Подробнее",
            pathToPhoto: repairHHPhoto,
        },
    },
}


const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleWelcomeCardClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false)
    };
    /*TODO: fix "navbar"*/
    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <h1>{TEXTS.TITLE}</h1>
                    <div className={"navbar"}>
                        <ul>
                            <li><h4 style={{color: "white", margin: "0"}}>{TEXTS.CONTACT_DATA.Email}</h4></li>
                            <li><h4 style={{color: "white", margin: "0"}}>{TEXTS.CONTACT_DATA.OwnerPhoneNumber}</h4></li>
                            <li><h4 style={{color: "white", margin: "0"}}>{TEXTS.CONTACT_DATA.DublePhoneNumber}</h4></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className={styles.content}>
                <WelcomeCard
                    title={TEXTS.WELCOME_TEXTS.TITLE}
                    description={TEXTS.WELCOME_TEXTS.DESCRIPTION}
                    path={LOCALRoutes.about}
                    onCardClick={handleWelcomeCardClick}
                />
                <div className={styles.navigationContainer}>
                    <AnimatedCard
                        title={TEXTS.CARDS_TEXTS.CATALOG.TITLE}
                        animateText={TEXTS.CARDS_TEXTS.CATALOG.OnClick}
                        imageSource={TEXTS.CARDS_TEXTS.CATALOG.pathToPhoto}
                        path={LOCALRoutes.catalog}
                    />
                    <AnimatedCard
                        title={TEXTS.CARDS_TEXTS.CAP_REPAIR.TITLE}
                        animateText={TEXTS.CARDS_TEXTS.CAP_REPAIR.OnClick}
                        imageSource={TEXTS.CARDS_TEXTS.CAP_REPAIR.pathToPhoto}
                        path={LOCALRoutes.caprep}
                    />
                    <AnimatedCard
                        title={TEXTS.CARDS_TEXTS.REPAIR_HH.TITLE}
                        animateText={TEXTS.CARDS_TEXTS.REPAIR_HH.OnClick}
                        imageSource={TEXTS.CARDS_TEXTS.REPAIR_HH.pathToPhoto}
                        path={LOCALRoutes.repairhh}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={TEXTAboutData.title} text={TEXTAboutData.text}
                   additionalInfo={TEXTAboutData.additionalInfo} />
        </div>
    );
};

export default MainPage;