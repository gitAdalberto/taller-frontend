import styles from "./YesNo.module.css";
import { ConfirmButton, CancelButton } from "../Button";
export default function YesNo({ title, message, yesAction, cancelAction }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <p className={styles.message}>{message}</p>
            </div>
            <div className={styles.buttons}>
                <ConfirmButton
                backgroundColor={"#00dc00"}
                title={"Eliminar"}
                action={yesAction}
                />
                <CancelButton
                backgroundColor={"#ff0000"}
                title={"Cancelar"}
                action={cancelAction}
                />
            </div>
        </div>
    )
};
