import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span>Controle Financeiro</span>
      </div>

      {/* Menu principal. */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/transacoes"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Transações
      </NavLink>

      <NavLink
        to="/categorias"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Categories
      </NavLink>
    </aside>
  );
}
