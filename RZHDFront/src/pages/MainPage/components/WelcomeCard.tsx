import React, { useState } from "react";
import "./welcome_card.css";

interface WelcomeCardProps {
    title: string;
    description: string;
    path?: string;
    onCardClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, description, path, onCardClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [elevation, setElevation] = useState(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
        let currentElevation = 0;
        const interval = setInterval(() => {
            currentElevation += 1;
            setElevation(currentElevation);
            if (currentElevation >= 10) {
                clearInterval(interval);
            }
        }, 30);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        let currentElevation = 10;
        const interval = setInterval(() => {
            currentElevation -= 1;
            setElevation(currentElevation);
            if (currentElevation <= 0) {
                clearInterval(interval);
            }
        }, 30);
    };

    const handleClick = () => {
        if (onCardClick) {
            onCardClick();
        } else if (path) {
            // navigate(path);
        }
    };

    return (
        <div
            className="welcome-card-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: (path || onCardClick) ? "pointer" : "default" }}
        >
            <div
                className={`welcome-card ${isHovered ? "hovered" : ""}`}
                style={{
                    boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.2)`,
                    transform: isHovered ? `translateY(-${elevation}px)` : "translateY(0)",
                    background: isHovered
                        ? "linear-gradient(135deg, var(--default-bg-color) 0%, var(--second-bg-color) 100%)"
                        : "rgba(255, 255, 255, 0.95)",
                }}
            >
                <div className="welcome-card-content">
                    <h1 className="welcome-title">{title}</h1>
                    <p className="welcome-description">{description}</p>
                </div>

                {isHovered && (path || onCardClick) && (
                    <div className="welcome-decoration">
                        <div className="decoration-line"></div>
                        <div className="click-hint">
                            {onCardClick ? "Нажмите для перехода" : "Нажмите для перехода"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomeCard;
