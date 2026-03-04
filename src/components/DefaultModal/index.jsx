import { Children } from "react";
import styles from "./styles.module.css";

export default function DefaultModal({ isOpen, onClose, Children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onclick={onClose}>
      <div className={styles.modal} onclick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton}>Fechar</button>
      </div>

      {Children}
    </div>
  );
}
