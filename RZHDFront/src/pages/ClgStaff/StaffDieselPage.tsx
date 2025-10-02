import React, { useState, useEffect } from "react";
import './staffdiesel.css';
import {useNavigate} from "react-router-dom";

interface Part {
    id: number;
    name: string;
    ui_name: string;
    price: string;
    photo?: string;
    description?: string;
}

interface DieselData {
    diesel_D50_Series: Part[];
}

// interface PrivateData {
//     private_prod: Part[];
// }

const CtlgStaffDieselPage: React.FC = () => {
    const navigate = useNavigate();
    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [mode, setMode] = useState<"catalogue" | "private">("catalogue");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 10;

    const handleGoToHomeClick = () => {
        navigate("/");
    };

    const fetchData = async (filePath: string, isCatalogue: boolean) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(filePath, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            let partsData: Part[] = [];

            if (isCatalogue) {
                const dieselData = data as DieselData;
                partsData = dieselData.diesel_D50_Series || [];
            } else {
                // const privateData = data as PrivateData;
                partsData = data.private_prod || [];
            }

            setParts(partsData);

            if (partsData.length > 0) {
                setSelectedPart(partsData[0]);
            } else {
                setSelectedPart(null);
            }

            setCurrentPage(1);

        } catch (error) {
            console.error("Error loading parts:", error);
            setError("Не удалось загрузить данные. Проверьте путь к файлу.");
        } finally {
            setLoading(false);
        }
    };

    //TODO: fetch from API
    useEffect(() => {
        if (mode === "catalogue") {
            fetchData("/api/production/d50", true);

        } else {
            fetchData("/api/production/private-prod", false);
        }
    }, [mode]);

    const totalPages = Math.ceil(parts.length / itemsPerPage);
    const currentItems = parts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Функция для форматирования цены
    const formatPrice = (price: string) => {
        if (!price) return "Цена не указана";
        return `${price} руб.`;
    };

    if (loading) {
        return (
            <div className="ctlg-staff-diesel-container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '1.2rem'
                }}>
                    Загрузка данных...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ctlg-staff-diesel-container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'red',
                    fontSize: '1.2rem'
                }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="ctlg-staff-diesel-container">
            <header className="welcome-header">
                <div className="header-content">
                    <h1 onClick={handleGoToHomeClick} className={"clickable-logo"}>
                        И.П Котов О.В.
                    </h1>
                    <div className="navbar">
                        <ul>
                            <li><h4 style={{color: "white"}}>kotovoleg1979@yandex.ru</h4></li>
                            <li><h4 style={{color: "white"}}>+7(927)365-60-21</h4></li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className={"bgmain-container"}>
                <div className={"list-container"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 className="catalog-title">
                            {mode === "catalogue" ? "Каталог запчастей Д50" : "Собственное производство"}
                        </h2>
                        <button
                            className="pagination-button"
                            onClick={() => setMode(mode === "catalogue" ? "private" : "catalogue")}
                        >
                            {mode === "catalogue" ? "Собственное производство" : "Каталог запчастей Д50"}
                        </button>
                    </div>

                    {parts.length === 0 ? (
                        <p>Нет доступных деталей</p>
                    ) : (
                        <>
                            <ul className="parts-list">
                                {currentItems.map((part) => (
                                    <li
                                        key={part.ui_name}
                                        className={`part-item ${selectedPart?.ui_name === part.ui_name ? 'active' : ''}`}
                                        onClick={() => setSelectedPart(part)}
                                    >
                                        <span className="part-title">{part.name}</span>
                                        <span className="part-designation">{part.ui_name}</span>
                                        <span className="part-price">
                                        {formatPrice(part.price)}
                                    </span>
                                    </li>
                                ))}
                            </ul>


                            <div className="pagination-controls">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="pagination-button"
                                >
                                    Назад
                                </button>
                                <span className="page-info">
                                    Страница {currentPage} из {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="pagination-button"
                                >
                                    Вперед
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className={"desc-div-container"}>
                    {selectedPart ? (
                        <>
                            <div className={"photo-container"}>
                                {selectedPart.photo ? (
                                    <img
                                        src={selectedPart.photo}
                                        alt={selectedPart.name}
                                        className="part-photo"
                                    />
                                ) : (
                                    <div className="photo-placeholder">
                                        <span>Изображение отсутствует</span>
                                    </div>
                                )}
                            </div>
                            <div className={"full-desc-container"}>
                                <h3 className="selected-part-title">{selectedPart.name}</h3>
                                <p className="selected-part-designation">
                                    Маркировка: {selectedPart.ui_name}
                                </p>
                                <p className="part-price" style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: '#2c5aa0',
                                    margin: '15px 0'
                                }}>
                                    {formatPrice(selectedPart.price)}
                                </p>
                                {selectedPart.description ? (
                                    <p className="part-description">{selectedPart.description}</p>
                                ) : (
                                    <p className="no-description">
                                        {selectedPart.price ?
                                            "Дополнительное описание отсутствует" :
                                            "Цена и описание отсутствуют"
                                        }
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="no-selection">
                            <p>Выберите деталь из списка для просмотра информации</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CtlgStaffDieselPage;