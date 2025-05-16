import { FiPlus } from "react-icons/fi";
import styles from "./Button.module.css";

export default function EmptyButton({ action, backgroundColor, children }) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: backgroundColor }}
      onClick={action}
    >
      {children || <FiPlus size={30} color="white" />}      
    </button>
  );
}
