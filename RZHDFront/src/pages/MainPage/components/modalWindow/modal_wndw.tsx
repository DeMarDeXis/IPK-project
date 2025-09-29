import './modal_wndw.css';

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


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, text, additionalInfo = []}) => {
    if (!isOpen) return null;

    return (
        <div className={"modal-overlay"} onClick={onClose}>
            <div className={"modal-content"} onClick={(e) => e.stopPropagation()}>
                <button className={"modal-close"} onClick={onClose}>
                    x
                </button>

                <h2 className={"modal-title"}>{title}</h2>

                <div className={"modal-text"}>
                    <p>{text}</p>
                </div>

                {additionalInfo.length > 0 && (
                    <div className={"modal-social"}>
                        <h3>Дополнительная информация:</h3>
                        <div className={"social-icons"}>
                            {additionalInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link || undefined}
                                    target={item.link ? "_blank" : undefined}
                                    rel={item.link ? "noopener noreferrer" : undefined}
                                    className={"social-link"}
                                    onClick={(e) => {
                                        if (!item.link) {
                                            e.preventDefault();
                                            navigator.clipboard.writeText("89273656021")
                                                .then(() => alert("Номер для связи скопирован в буфер обмена!"))
                                                .catch(() => alert("Ошибка при копировании номера"));
                                        }
                                    }}
                                >
                                    <img src={item.logo_src} alt={item.name} className={"social-icon"} />
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