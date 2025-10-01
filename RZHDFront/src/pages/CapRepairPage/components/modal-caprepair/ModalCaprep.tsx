import React, { useState } from "react";
import './modal-caprep.css';

interface Slide {
    src: string;
    alt: string;
}

interface CapRepairModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    slides: Slide[];
}

const CapRepairModal: React.FC<CapRepairModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    slides
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!isOpen) return null;

    const goToPrevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className={"caprepair-modal-overlay"} onClick={onClose}>
            <div className={"caprepair-modal-content"} onClick={(e) => e.stopPropagation()}>
                <button className={"caprepair-modal-close"} onClick={onClose}>
                    x
                </button>

                <h2 className={"caprepair-modal-title"}>{title}</h2>

                <div className={"caprepair-modal-desc"}>
                    <p>{description}</p>
                </div>

                {slides.length > 0 ? (
                    <div className={"caprepair-slider-container"}>
                        <div className={"caprepair-slider"}>
                            <img src={slides[currentSlide].src} alt={slides[currentSlide].alt || title}/>


                            {slides.length > 1 && (
                                <>
                                    <button
                                        className="caprepair-slider-btn prev"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToPrevSlide();
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="caprepair-slider-btn next"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToNextSlide();
                                        }}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>

                        {slides.length > 1 && (
                            <div className={"caprepair-slider-dots"}>
                                {slides.length > 1 && (
                                    <div className="caprepair-slider-dots">
                                        {slides.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`caprepair-slider-dot ${index === currentSlide ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    goToSlide(index);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: "black" }}> Нет фотографии </p>
                )}
            </div>
        </div>
    );
};

export default CapRepairModal;