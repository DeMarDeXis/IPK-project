import React, {useEffect, useState} from "react";
import styles from "./MajorRepairPage.module.css";
import type {Details} from "./types/details.ts";
import CapRepairModal from "./components/modal-caprepair/ModalCaprep.tsx"
import {useDetailsData} from "./hooks/useDetailsData.ts";
import CompanyHeader from "../components/header/Header.tsx";

const MajorRepairPage: React.FC = () => {
    const [detailList, setDetails] = useState<Details[]>([]);
    const [selectedItem, setSelectedItem] = useState<Details | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const { details, loading, error } = useDetailsData();

    useEffect(() => {
        setDetails(details);
    }, [details]);

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
            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <h1>Загрузка...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <CompanyHeader/>
            <div className={styles.mainContent}>
                <h2 className={styles.title}>Что мы умеем ремонтировать?</h2>

                {detailList.length > 0 ? (
                    <div className={styles.list}>
                        {detailList.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}
                            >
                                <div
                                    className={styles.text}
                                    onClick={() => handleItemClick(item)}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <div
                                        className={styles.detailInfoBTN}
                                        style={{
                                            opacity: hoveredItem === item.id ? 1 : 0,
                                            transform: `translateY(${hoveredItem === item.id ? '0' : '10px'})`,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Узнать подробнее →
                                    </div>
                                </div>

                                <div className={styles.images}>
                                    {item.prev_photo ? (
                                        <img
                                            src={item.prev_photo}
                                            alt={item.title}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleItemClick(item)}
                                        />
                                    ) : (
                                        <div
                                            className={styles.imagePlaceholder}
                                            onClick={() => handleItemClick(item)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Фотография отсутствует
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
                    slides={(selectedItem.photos ?? []).map((photo, index) => ({
                        src: photo,
                        alt: `${selectedItem.title} - фото ${index + 1}`
                    }))}
                />
            )}
        </div>
    );
};

export default MajorRepairPage;