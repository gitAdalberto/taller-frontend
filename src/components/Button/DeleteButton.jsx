import { MdDelete } from "react-icons/md"
import styles from "./Button.module.css";
export default function DeleteButton({ action, backgroundColor }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            <MdDelete size={30} color="white"/>
        </button>
    )
};
