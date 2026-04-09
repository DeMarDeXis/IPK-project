import React, {useState} from "react";
import styles from "./RepairHAPage.module.css";
import CapRepairModal from "../MajorRepairListPage/components/modal-caprepair/ModalCaprep.tsx"
import type {Aggregator} from "./types/aggregators.ts";
import {useAggregatorsData} from "./hooks/useAggregatorsData.ts";
import CompanyHeader from "../components/header/Header.tsx";

const RepairHHPage: React.FC = () => {
    const { aggregators, loading, error} = useAggregatorsData();
    const [selectedItem, setSelectedItem] = useState<Aggregator | null>(null);

    const handleItemClick = (item: Aggregator) => setSelectedItem(item);

    const handleModalClose = () => setSelectedItem(null);

    if (loading) {
        return <div className={styles.pageContainer}><h2>Загрузка...</h2></div>
    }

    if (error) {
        return <div className={styles.pageContainer}><p className={styles.errorMessage}>{error}</p></div>;
    }

    return (
        <div className={styles.pageContainer}>
            <CompanyHeader/>
            <div className={styles.content}>
                {aggregators.length > 0 ? (
                    <div className={styles.list}>
                        {aggregators.map((item, index) => (
                            <div
                                key={index}
                                className={styles.item}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className={styles.text}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <div className={styles.image}>
                                    {item.prev_photo ? (
                                        <img src={item.prev_photo} alt={item.title} />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>Фото отсутствует</div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Нет данных</p>
                )}
            </div>

            {selectedItem && (
                <CapRepairModal
                    isOpen={!!selectedItem}
                    onClose={handleModalClose}
                    title={selectedItem.title}
                    description={selectedItem.desc}
                    slides={
                        selectedItem.photos && selectedItem.photos.length > 0 ? selectedItem.photos.map((photo, idx) => ({
                        src: photo,
                        alt: `${selectedItem.title} - фото ${idx + 1}`
                    })) : [] //TODO: handler for empty photos
                }
                />
            )}
        </div>
    );
};

export default RepairHHPage;