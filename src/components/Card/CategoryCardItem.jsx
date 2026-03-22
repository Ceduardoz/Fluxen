import { Pencil, Trash2 } from "lucide-react";
import styles from "./styles.module.css";

export default function CategoryCardItem({
  title,
  variant = "default",
  type,
  icon: Icon,
  isCustom = true,
}) {
  return (
    <div className={`${styles.cardCategory} ${styles[variant]}`}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {Icon && <Icon size={20} />}
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
      <div className={styles.body}>
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
