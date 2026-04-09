import {useNavigate} from "react-router-dom";
import styles from "./Header.module.css"

const STR_DATA = {
    TITLE_HEADER: "И.П Котов О.В.",
    Email: "kotovoleg1979@yandex.ru",
    OwnerPhoneNumber: "+7(927)365-60-21",
    DublePhoneNumber: "+7(927)287-10-48",
};

export const CompanyHeader = () => {
    const navigate = useNavigate();

    const handleGoToHomeClick = () => {
        navigate("/");
    };


    return (
        <header className={styles.headerLine}>
            <div className={styles.content}>
                <h1 onClick={handleGoToHomeClick} className={styles.clickableLogo}>{STR_DATA.TITLE_HEADER}</h1>
                <div className="navbar">
                    <ul>
                        <li><h4 style={{color: "white", margin: "0"}}>{STR_DATA.Email}</h4></li>
                        <li><h4 style={{color: "white", margin: "0"}}>{STR_DATA.OwnerPhoneNumber}</h4></li>
                        <li><h4 style={{color: "white", margin: "0"}}>{STR_DATA.DublePhoneNumber}</h4></li>
                    </ul>
                </div>
            </div>
        </header>
    )
};

export default CompanyHeader;