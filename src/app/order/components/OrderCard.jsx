import Link from "next/link";
import styles from "./OrderCard.module.css";
import { FiAlertCircle } from "react-icons/fi";

export default function OrderCard({
    id,
    created_at,
    client,
    vehicle,
    mechanic
}) {
    return (
        <div className={styles.card}>
            <div>
                <h1>Número de orden:{id}</h1>
                <p><strong>Cliente:</strong>{client?.name}</p>
                <p><strong>Vehiculo:</strong>{vehicle?.plate}</p>
                <p><strong>Mecánico:</strong>{mechanic?.name}</p>
                <p><strong>Fecha:</strong>{new Date(created_at).toUTCString()}</p>
            </div>
            <Link href={`/order/info/${id}`}>
                <span>
                    <FiAlertCircle size={50} color="gray" />
                </span>
            </Link>
        </div>
    )
};
