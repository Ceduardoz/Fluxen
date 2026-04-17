import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import styles from "./styles.module.css";

export default function SideBar({ isOpen, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <Logo />
        <span>Fluxen</span>
      </div>

      <nav className={styles.menu}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Transações
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Categorias
        </NavLink>

        <NavLink
          to="/vault"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Metas
        </NavLink>

        <NavLink
          to="/investments"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Investimentos
        </NavLink>

        <NavLink
          to="/user-settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={onClose}
        >
          Configurações
        </NavLink>
      </nav>
    </aside>
  );
}
