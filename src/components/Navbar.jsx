import Link from "next/link";
import styles from "@/components/Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <h2 className={styles.title}><Link href="/">Taller</Link></h2>
            <ul className={styles.ul}>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/client">Clientes</Link></li>
                <li><Link href="/mechanic">Mecánicos</Link></li>
                <li><Link href="/order">Ordenes</Link></li>
            </ul>
        </nav>
    )
};
