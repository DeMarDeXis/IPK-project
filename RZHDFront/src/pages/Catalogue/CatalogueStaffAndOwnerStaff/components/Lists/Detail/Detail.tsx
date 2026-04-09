import type {Part} from "../../../types/partitions.ts";
import style from "./Detail.module.css";


interface PartDetailsProps {
    part: Part | null;
}

export const Detailcard = ({part}: PartDetailsProps) => {
    const formatPrice = (price: string): string => {
        return price ? `${price} руб.` : "Цена не указана";
    };

    if (!part) {
        return (
            <div className={style.placeHolder}>
                <p>Выберите деталь из списка для просмотра информации</p>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.photoPlace}>
                {part.photo ? (
                    <img
                        src={part.photo}
                        alt={part.name}
                        className={style.photo}
                        loading={"lazy"}
                    />
                ) : (
                    <div className={style.placeHolder}>
                        <span>Нет фото</span>
                    </div>
                )}
            </div>

            <div className={style.description}>
                <h2 className={style.title}>{part.name}</h2>
                <p className={style.designation}>Маркировка: {part.ui_name}</p>
                <p className={style.price}>{formatPrice(part.price)}</p>

                {part.description ? (
                    <p className={style.descriptionText}>{part.description}</p>
                ) : (
                    <p className={style.descriptionText}>
                        <span>Нет описания</span>
                    </p>
                )}
            </div>
        </div>
    );
};