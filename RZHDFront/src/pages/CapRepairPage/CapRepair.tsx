import React, {useEffect, useState} from "react";
import "./caprepair.css";
import CapRepairModal from "./components/modal-caprepair/ModalCaprep.tsx"
import {useNavigate} from "react-router-dom";
// import ImageSlider from "./components/ImgSlide.tsx"
// import fstPhoto from "../../../public/CapFixTK30C02/Was/photo_1_2025-08-15_08-18-54.jpg"
// import scndPhoto from "../../../public/CapFixTK30C02/Became/photo_1_2025-08-15_08-18-19.jpg"

interface Details {
    id: string
    title: string;
    desc: string;
    photos: string[];
    prev_photo: string;
}

const CapRepairPage: React.FC = () => {
    const navigate = useNavigate();
    const [detailList, setDetails] = useState<Details[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState<Details | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // TODO: fetch from API srv
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/production/major-repair');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDetails(data.details || []);
                setLoading(false)
            } catch (error) {
                console.error('Error loading parts:', error);
                setError('Error loading parts')
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;
            setVisible(prevScrollPosition > currentScrollPosition || currentScrollPosition < 10);
            setPrevScrollPosition(currentScrollPosition)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPosition, visible]);

    const handleGoToHomeClick = () => {
        navigate("/");
    }

    const handleItemClick = (item: Details) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleMouseEnter = (id: string) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    if (loading) {
        return (
            <div className={"cap-rep-bg"}>
                <div className={"cap-rep-content-div"}>
                    <h1>Загрузка...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={"cap-rep-bg"}>
                <div className={"cap-rep-content-div"}>
                    <p className={"error-message"}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={"cap-rep-bg"}>
            <header className={`cap-rep-header ${!visible ? 'hidden-header' : ''}`}>
                <div className={"header-content"}>
                    <h1 onClick={handleGoToHomeClick} className={"clickable-logo"} style={{ cursor: 'pointer' }}>
                        ИП Котов О.В.
                    </h1>
                    <div className="navbar">
                        <ul>
                            <li><h4>kotovoleg1979@yandex.ru</h4></li>
                            <li><h4>+7(927)365-60-21</h4></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className={"cap-rep-content-div"}>
                <h2 className="repair-title">Что мы умеем ремонтировать?</h2>

                {detailList.length > 0 ? (
                    <div className="repair-list">
                        {detailList.map((item, index) => (
                            <div
                                key={item.id}
                                className={`repair-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            >
                                <div
                                    className="repair-text"
                                    onClick={() => handleItemClick(item)}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            transform: `translateY(${hoveredItem === item.id ? '0' : '10px'})`,
                                            transition: 'all 0.3s ease',
                                            color: 'var(--activity-color)',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Узнать подробнее →
                                    </div>
                                </div>

                                <div className="repair-image">
                                    {item.prev_photo ? (
                                        <img
                                            src={item.prev_photo}
                                            alt={item.title}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleItemClick(item)}
                                        />
                                    ) : (
                                        <div
                                            className="image-placeholder"
                                            onClick={() => handleItemClick(item)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Фото {item.title}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Нет данных о ремонтируемых деталях</p>
                )}
            </div>

            {selectedItem && (
                <CapRepairModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    title={selectedItem.title}
                    description={selectedItem.desc}
                    slides={selectedItem.photos.map((photo, index) => ({
                        src: photo,
                        alt: `${selectedItem.title} - фото ${index + 1}`
                    }))}
                />
            )}
        </div>
    );
};

export default CapRepairPage;