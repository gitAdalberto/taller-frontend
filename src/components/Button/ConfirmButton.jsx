import { FaCheck } from "react-icons/fa";
import styles from "./Button.module.css";
export default function ConfirmButton({ action, backgroundColor, title }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            
            <FaCheck size={30} color="white"/>
            { title && (<p>{title}</p>)}
        </button>
    )
};
