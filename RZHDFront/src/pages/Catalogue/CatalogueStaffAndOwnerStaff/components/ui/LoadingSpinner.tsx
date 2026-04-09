import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = ({ message = 'Загрузка...' }: { message?: string }) => (
    <div className={styles.container}>
        <div className={styles.spinner} />
        <p className={styles.message}>{message}</p>
    </div>
);