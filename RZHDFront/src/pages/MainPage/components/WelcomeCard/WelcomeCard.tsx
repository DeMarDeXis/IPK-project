import {useState} from "react";
import styles from "./WelcomeCard.module.css";

interface WelcomeCardProps {
    title: string;
    description: string;
    path?: string;
    onCardClick?: () => void;
}

const WelcomeCard = ({
                         title,
                         description,
                         path,
                         onCardClick
}: WelcomeCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isInteractive = !!(path || onCardClick);

    const handleClick = (): void => {
        onCardClick?.()
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (!isInteractive) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };

    const cardClassName = isHovered
        ? styles.cardHovered
        : styles.card;



    return (
        <div
            className={styles.container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : -1}
            aria-label={isInteractive ? `${title} — нажмите для перехода` : undefined}
        >
            <div className={cardClassName}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                </div>

                {isHovered && isInteractive && (
                    <div className={styles.decoration}>
                        <div className={styles.decorationLine} />
                        <span className={styles.clickHint}>
                            Нажмите для перехода
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomeCard;