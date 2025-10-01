import React, {useEffect, useState} from "react";
import "./repairhh.css";
import {useNavigate} from "react-router-dom";
import CapRepairModal from "../CapRepairPage/components/modal-caprepair/ModalCaprep.tsx"

interface Aggregators {
    title: string;
    desc: string;
    photos?: string[];
    prev_photo?: string;
}

const RepairHHPage: React.FC = () => {
    const navigate = useNavigate();
    const [aggregatorsList, setAggregators] = useState<Aggregators[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Aggregators | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/production/rep-hh')
                if (!response.ok) throw new Error('Network response was not ok')

                const data = await response.json();
                const list = data.aggregators ?? data.aggregatorsList ?? [];
                setAggregators(list);
            } catch (error) {
                console.error('Error loading aggregators:', error);
                setError('Error loading aggregators');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleGoToHomeClick = () => {
        navigate("/");
    }

    const handleItemClick = (item: Aggregators) => setSelectedItem(item);

    const handleModalClose = () => setSelectedItem(null);

    if (loading) {
        return <div className={"repair-hh-bgcontnr"}><h2>Загрузка...</h2></div>
    }

    if (error) {
        return <div className="repair-hh-bgcontnr"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className={"repair-hh-bgcontnr"}>
            <header className="repair-hh-header">
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
            <div className="repair-hh-content-container">
                {aggregatorsList.length > 0 ? (
                    <div className="repairhh-list">
                        {aggregatorsList.map((item, index) => (
                            <div
                                key={index}
                                className="repairhh-item"
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="repairhh-text">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <div className="repairhh-image">
                                    {item.prev_photo ? (
                                        <img src={item.prev_photo} alt={item.title} />
                                    ) : (
                                        <div className="image-placeholder">Фото отсутствует</div>
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