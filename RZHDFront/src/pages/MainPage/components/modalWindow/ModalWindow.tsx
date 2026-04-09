import styles from './ModalWindow.module.css';

interface SocialMedia {
    name: string;
    link: string;
    logo_src: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    text: string;
    additionalInfo: SocialMedia[];
}

const TEXTS = {
    ADDITIONAL_INFO_TITLE_STR: "Дополнительная информация",
};


const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   text,
                   additionalInfo = []
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBTN} onClick={onClose}>
                    x
                </button>

                <h2 className={styles.titleSTR}>{title}</h2>

                <div className={styles.textSTR}>
                    <p>{text}</p>
                </div>

                {additionalInfo.length > 0 && (
                    <div className={styles.socialBlock}>
                        <h3>{TEXTS.ADDITIONAL_INFO_TITLE_STR}:</h3>
                        <div className={styles.socialIconsBlock}>
                            {additionalInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link || undefined}
                                    target={item.link ? "_blank" : undefined}
                                    rel={item.link ? "noopener noreferrer" : undefined}
                                    className={styles.socialLink}
                                    onClick={(e) => {
                                        if (!item.link) {
                                            e.preventDefault();
                                            navigator.clipboard.writeText("89273656021")
                                                .then(() => alert("Номер для связи скопирован в буфер обмена!"))
                                                .catch(() => alert("Ошибка при копировании номера"));
                                        }
                                    }}
                                >
                                    <img src={item.logo_src} alt={item.name} className={styles.socialIconIMG} />
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;