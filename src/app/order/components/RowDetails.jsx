import styles from './RowDetails.module.css';
export default function RowDetails({ title1, text1, title2, text2 }) {
    return (
        <div className={styles.details}>
            <div className={styles.detail}>
                <p>
                    <strong>{title1}</strong>
                    {text1 ? text1 : "indefinido"}
                </p>
            </div>
            <div className={styles.detail}>
                <p>
                    <strong>{title2}</strong>
                    {text2 ? text2 : 'indefinido'}
                </p>
            </div>
        </div>
    )
};
