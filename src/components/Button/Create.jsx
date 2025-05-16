import { FiPlus } from "react-icons/fi";
import styles from "./Button.module.css";
export default function Create({ action, backgroundColor, title }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            
            <FiPlus size={30} color="white"/>
            { title && (<p>{title}</p>)}
        </button>
    )
};