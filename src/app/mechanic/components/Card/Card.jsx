import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";
import styles from "./Card.module.css"
export default function Card({ id, name, telephone}) {
    return (
      <div className={styles.card}>
      <div >
        <h1>{name}</h1>
        <p><strong>Teléfono:</strong>{telephone}</p>
      </div>
      <Link href={`/mechanic/${id}`}>
        <span>
          <FiAlertCircle size={50} color="gray" />
        </span>
      </Link>
    </div>
    )
};
