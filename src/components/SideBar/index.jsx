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
        to="/transactions"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Transações
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Categories
      </NavLink>

      <NavLink
        to="/vault"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Metas
      </NavLink>

      <NavLink
        to="/investments"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Investimentos
      </NavLink>

      <NavLink
        to="/user-settings"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Configurações
      </NavLink>
    </aside>
  );
}
