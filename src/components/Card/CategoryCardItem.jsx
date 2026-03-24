import { Pencil, Trash2 } from "lucide-react";

import { lightenColor } from "../../utils/colors";
import styles from "./styles.module.css";

export default function CategoryCardItem({
  title,
  type,
  color,
  isCustom = true,
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
          <h2>{title}</h2>
        </div>

        {isCustom && (
          <div className={styles.actions}>
            <button>
              <Pencil color="#545cf4" size={16} />
            </button>
            <button>
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
