import { ImCancelCircle} from "react-icons/im";
import styles from "./Button.module.css";
export default function CancelButton({ action, backgroundColor, title }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            <ImCancelCircle  size={30} color="white"/>
            { title && (<p>{title}</p>)}
        </button>
    )
};
