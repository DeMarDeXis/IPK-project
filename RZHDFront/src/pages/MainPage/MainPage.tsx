import React, {useState} from "react";
import './main_page.css';
import AnimatedCard from "../../customControllers/AnimatedCard"
import WelcomeCard from "./components/WelcomeCard.tsx"
import Modal from "./components/modalWindow/modal_wndw.tsx"
import tgLogo from "../../assets/socialMediaLogos/tg.svg"
import wupLogo from "../../assets/socialMediaLogos/whatsapp.svg"

const MainPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // TODO: remake it
    const aboutData = {
        title: "О нас",
        text:   "Более 50 партнеров и довольных клиентов.\n" +
                "Более 400 сделок на поставку товаров, запчастей и комплектующих.\n" +
                "О наличии товара на складе уточняйте по номеру телефона или по электронной почте, а также Telegram/WhatsApp.\n" +
                "Номер телефона можно скопировать при нажатии логотипа мессенджера снизу.\n\n+7(927)365-60-21",
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

    const handleWelcomeCardClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false)
    };

    return (
        <div className={`welcome-page-container`}>
            <header className="welcome-header">
                <div className="header-content">
                    <h1>ИП Котов О.В.</h1>
                    <div className="navbar">
                        <ul>
                            {/*TODO: To learn types of button*/}
                            <li><h4>kotovoleg1979@yandex.ru</h4></li>
                            <li><h4>+7(927)365-60-21</h4></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="background-container">
                <WelcomeCard
                    title="Добро пожаловать!"
                    description="Мы рады приветствовать вас на нашем сайте! Здесь вы найдете всю необходимую информацию о нашей компании,
                    услугах и продуктах, а также сможете связаться с нами в случае необходимости. При нажатии на текст можно узнать подробнее о нас!"
                    path="/about"
                    onCardClick={handleWelcomeCardClick}
                />
                <div className={"navigation-container"}>
                    <AnimatedCard
                        title="Запчасти для дизелей и турбокомпрессоров"
                        animateText="Перейти в каталог"
                        imageSource="https://myrailway.ru/images/uploads/40243/2015-07-11_19.38.59__800.jpg"
                        path="/catalog"
                    />
                    <AnimatedCard
                        title="Капитальный ремонт турбокомпрессоров"
                        animateText="Узнать цены"
                        imageSource="https://avatars.mds.yandex.net/get-altay/1924793/2a0000016c8605ad0e62501b548fb9e7acc2/XXL_height"
                        path="/caprep"
                    />
                    <AnimatedCard
                        title="Ремонт агрегатов и узлов"
                        animateText="Подробнее"
                        imageSource="https://avatars.dzeninfra.ru/get-zen_doc/3432422/pub_6241757d6e599c56a37e1f5a_624178646e1e082f4302f125/scale_1200"
                        path="/repairhh"
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={aboutData.title} text={aboutData.text}
                   additionalInfo={aboutData.additionalInfo} />
        </div>
    );
};

export default MainPage;