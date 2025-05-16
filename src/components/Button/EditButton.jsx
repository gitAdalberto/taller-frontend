import { MdEdit} from "react-icons/md";
import styles from "./Button.module.css"
export default function EditButton({ action, backgroundColor }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor:backgroundColor}}
            onClick={action}
        >
            <MdEdit size={30} color="white"/>
        </button>
    )
};
