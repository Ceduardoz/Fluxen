import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span>Controle Financeiro</span>
      </div>

      {/* Menu principal. */}
      <nav className={styles.menu}>
        <Link to="/">Dashboard</Link>
        <Link to="/transations">Transações</Link>
      </nav>
    </aside>
  );
}
