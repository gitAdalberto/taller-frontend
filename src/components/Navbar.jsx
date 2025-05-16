'use client';
import Link from "next/link";
import { useState } from "react";
import styles from "@/components/Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}><Link href="/">Taller</Link></h2>

      <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={`${styles.ul} ${menuOpen ? styles.show : ""}`}>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/client">Clientes</Link></li>
        <li><Link href="/mechanic">Mecánicos</Link></li>
        <li><Link href="/order">Órdenes</Link></li>
      </ul>
    </nav>
  );
}
