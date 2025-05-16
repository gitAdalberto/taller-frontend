import Link from "next/link";
import styles from "./ClientCard.module.css";
import { FiAlertCircle }from "react-icons/fi";

export default function ClientCard({ id,name,nit,telephone,direction }) {
  return (
    <div className={styles.card}>
      <div >
        <h1>{name}</h1>
        <p><strong>NIT:</strong>{nit}</p>
        <p><strong>Teléfono:</strong>{telephone}</p>
        <p><strong>Direccion:</strong>{direction}</p>
      </div>
      <Link href={`/client/${id}`}>
        <span>
          <FiAlertCircle size={50} color="gray" />
        </span>
      </Link>
    </div>
  );
}
