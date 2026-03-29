import { BanknoteArrowDown, BanknoteArrowUp, Trash2 } from "lucide-react";

import styles from "./styles.module.css";

export default function VaultsCardItem({
  title,
  description,
  targetAmount,
  color,
  balance,
  isCustom = true,
  onEdit,
  onDelete,
}) {
  const vaultColor = color || "#6b7280";

  return (
    <div
      className={styles.cardCategory}
      style={{
        border: `2px solid ${vaultColor}`,
      }}
    >
      {/* HEADER */}
      <div
        className={styles.header}
        style={{ borderBottom: `2px solid ${vaultColor}` }}
      >
        <div className={styles.headerContent}>
          <h2>{title}</h2>
        </div>

        {isCustom && (
          <div className={styles.actions}>
            <button onClick={onEdit}>
              <BanknoteArrowDown color="#fd1d47" />
            </button>
            <button onClick={onEdit}>
              <BanknoteArrowUp color="#08ad45" />
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
      <div className={styles.body}>
        <h3>{description}</h3>
        <p>
          Meta: R${balance} de{" "}
          <strong style={{ color: vaultColor }}>R${targetAmount}</strong>
        </p>
      </div>
    </div>
  );
}
