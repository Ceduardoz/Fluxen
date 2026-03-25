import { CircleX } from "lucide-react";
import styles from "./styles.module.css";

export default function DefaultModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CircleX />
        </button>

        {children}
      </div>
    </div>
  );
}
