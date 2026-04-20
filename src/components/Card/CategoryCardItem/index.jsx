import { Pencil, Trash2 } from "lucide-react";

import { lightenColor } from "../../../utils/colors";
import styles from "./styles.module.css";

export default function CategoryCardItem({
  title,
  type,
  color,
  isCustom = true,
  onEdit,
  onDelete,
}) {
  const categoryColor = color || "#6b7280";

  return (
    <div className={styles.cardCategory}>
      {/* HEADER */}
      <div
        className={styles.header}
        style={{
          backgroundColor: categoryColor,
        }}
      >
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{title}</h2>
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

      {/* BODY */}
      <div
        className={styles.body}
        style={{
          backgroundColor: lightenColor(categoryColor),
        }}
      >
        <span
          className={`${styles.badge} ${
            type === "INCOME" ? styles.income : styles.expense
          }`}
        >
          {type === "INCOME" ? "Receita" : "Despesa"}
        </span>
      </div>
    </div>
  );
}
