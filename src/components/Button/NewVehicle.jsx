import styles from "./Button.module.css";
import { FaCarAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function NewVehicle({ action, backgroundColor, title }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            
            <FaCarAlt size={30} color="white"/>
            <FaPlus size={30} color="white"/>
            { title && (<p>{title}</p>)}
        </button>
    )
};
