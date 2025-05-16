import styles from "./Button.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function GoBack({ action, backgroundColor, title}) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            
            <FaArrowLeftLong  size={30} color="white"/>
            <p>{title}</p>
        </button>
    )
};
