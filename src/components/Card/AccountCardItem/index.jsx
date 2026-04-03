import { Pencil, Trash2 } from "lucide-react";

import styles from "./styles.module.css";

export default function AccountCardItem({
  title,
  initialBalance,
  isCustom = true,
  onEdit,
  onDelete,
}) {
  return (
    <div className={styles.cardCategory}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>{title}</h2>
        </div>

        {isCustom && (
          <div className={styles.actions}>
            <button onClick={onEdit}>
              <Pencil color="#545cf4" size={16} />
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={onDelete}
            >
              <Trash2 color="#fd1d47" size={16} />
            </button>
          </div>
        )}
      </div>
      <p>
        {Number(initialBalance).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}
