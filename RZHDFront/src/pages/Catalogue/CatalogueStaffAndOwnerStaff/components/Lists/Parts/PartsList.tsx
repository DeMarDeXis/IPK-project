import type {Part} from "../../../types/partitions.ts";
import {useState} from "react";
import styles from "./PartsList.module.css";

interface PartsListProps {
    parts: Part[];
    selectedPart: Part | null;
    onSelectPart: (part: Part) => void;
}

const ITEMS_PER_PAGE = 10;

export const PartList = ({
                             parts,
                             selectedPart,
                             onSelectPart }: PartsListProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(parts.length / ITEMS_PER_PAGE);
    const currentItems = parts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const formatPrice = (price: string): string => {
        return price ? `${price} руб.` : "Цена не указана";
    };

    if (parts.length === 0) {
        return <p className={styles.emptyP}>Нет доступных деталей</p>
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {currentItems.map((part) => (
                    <li
                        key={part.ui_name}
                        className={`${styles.item} ${
                            selectedPart?.ui_name === part.ui_name ? styles.selected : ""
                        }`}
                        onClick={() => onSelectPart(part)}
                        role={"button"}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onSelectPart(part);
                            }
                        }}
                        aria-pressed={selectedPart?.ui_name === part.ui_name}
                    >
                        <span className={styles.title}>{part.name}</span>
                        <span className={styles.designation}>{part.ui_name}</span>
                        <span className={styles.price}>{formatPrice(part.price)}</span>
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                        className={styles.button}
                    >
                        Назад
                    </button>
                    <span className={styles.info}>
                        Страница {currentPage} из {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.button}
                    >
                        Вперёд
                    </button>
                </div>
            )}
        </div>
    );
};