import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./animated_card.css";

interface AnimatedCardProps {
    title: string;
    animateText: string;
    imageSource: string;
    path: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
                                                       title,
                                                       animateText,
                                                       imageSource,
                                                       path,
                                                   }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [elevation, setElevation] = useState(0);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Simulate elevation increase
        let currentElevation = 0;
        const interval = setInterval(() => {
            currentElevation += 1;
            setElevation(currentElevation);
            if (currentElevation >= 20) {
                clearInterval(interval);
            }
        }, 30);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Simulate elevation decrease
        let currentElevation = 20;
        const interval = setInterval(() => {
            currentElevation -= 1;
            setElevation(currentElevation);
            if (currentElevation <= 0) {
                clearInterval(interval);
            }
        }, 30);
    };

    const goPage = () => {
        navigate(path);
    };

    return (
        <div className="animated-card-container">
            <div
                className={`card ${isHovered ? "hovered" : ""}`}
                style={{
                    boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.2)`,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={goPage}
            >
                <div
                    className="card-content"
                    style={{
                        backgroundImage: `url(${imageSource})`,
                        borderColor: isHovered ? "#1e40af" : "rgba(255, 255, 255, 0.14)",
                    }}
                >
                    <div className="card-title">{title}</div>
                </div>
            </div>
            <div
                className={`icon-container ${isHovered ? "visible" : ""}`}
                style={{
                    transform: isHovered ? "translateY(-0.75rem)" : "translateY(0.25rem)",
                    opacity: isHovered ? 1 : 0,
                }}
            >
                <div className="icon-text">{animateText}</div>
            </div>
        </div>
    );
};

export default AnimatedCard;