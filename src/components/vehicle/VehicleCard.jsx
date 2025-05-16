import styles from './VehicleCard.module.css';
import Link from 'next/link';
import { FiAlertCircle }from "react-icons/fi";

export default function VehicleCard({
    id,
    plate,
    brand,
    model,
    color,
    client_id
}) {
    return (
        <div className={styles.card}>
      <div >
        <h1>{plate}</h1>
        <p><strong>Marca:</strong>{brand}</p>
        <p><strong>Modelo:</strong>{model}</p>
        <p><strong>Color:</strong>{color}</p>
      </div>
      <Link href={`/vehicle/info/${id}`}>
        <span>
          <FiAlertCircle size={50} color="gray" />
        </span>
      </Link>
    </div>
    )
};
