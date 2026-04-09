import {usePartsData} from "./hooks/usePartsData.ts";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "./components/ui/LoadingSpinner.tsx";
import type {Part} from "./types/partitions.ts";
import styles from "./PrivateAndDieselProds.module.css";
import {CompanyHeader} from "../components/header/Header.tsx";
import {PartList} from "./components/Lists/Parts/PartsList.tsx";
import {Detailcard} from "./components/Lists/Detail/Detail.tsx";

export const ListDieselAndPrivateProductionPage = () => {
    const { parts, loading, error, mode, setMode } = usePartsData();
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);


    useEffect(() => {
        setSelectedPart(parts.length > 0 ? parts[0] : null);
    }, [parts]);

    if (loading) return <LoadingSpinner message={"Загрузка каталога..."} />;
    if (error) return <p>{error}</p>;
    // if (error) return <p className={styles.error}>{error}</p>;
    // TODO: add styles for <p> error

    return (
        <div className={styles.pageContainer}>
            <CompanyHeader/>
            <main className={styles.mainContainer}>
                <section className={styles.listSection}>
                    <div className={styles.modeToggle}>
                        <h2 className={styles.sectionTitle}>
                            {mode === "catalogue" ? "Каталог запчастей Д50" : "Собственное производства"}
                        </h2>
                        <button
                            className={styles.toggleButton}
                            onClick={() => setMode(mode === "catalogue" ? "private" : "catalogue")}
                            aria-pressed={mode === "private"}
                        >
                            {mode === "catalogue" ? "Своё производство" : "-> Каталог запчастей"}
                        </button>
                    </div>
                    <PartList parts={parts} selectedPart={selectedPart} onSelectPart={setSelectedPart}/>
                </section>
                <section className={styles.detailsSection}>
                    <Detailcard part={selectedPart} />
                </section>
            </main>
        </div>
    );
};

export default ListDieselAndPrivateProductionPage;