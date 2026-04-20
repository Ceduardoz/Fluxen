import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Pencil,
  Trash2,
} from "lucide-react";

import styles from "./styles.module.css";

export default function GoalCardItem({
  title,
  description,
  targetAmount,
  color,
  balance,
  isCustom = true,
  onEdit,
  onDelete,
  onDeposit,
  onWithdraw,
}) {
  const goalColor = color || "#6b7280";

  return (
    <div
      className={styles.goalCards}
      style={{
        border: `2px solid ${goalColor}`,
      }}
    >
      {/* HEADER */}
      <div className={styles.header} style={{ backgroundColor: goalColor }}>
        <div className={styles.headerContent}>
          {balance >= targetAmount ? (
            <h2>
              <del>{title}</del>
            </h2>
          ) : (
            <h2>{title}</h2>
          )}
        </div>

        {isCustom && (
          <div className={styles.actions}>
            <button onClick={onWithdraw}>
              <BanknoteArrowDown color="#fd1d47" />
            </button>
            <button onClick={onDeposit}>
              <BanknoteArrowUp color="#08ad45" />
            </button>
            <button onClick={onEdit}>
              <Pencil color="#545cf4" />
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={onDelete}
            >
              <Trash2 color="#fd1d47" />
            </button>
          </div>
        )}
      </div>
      {/* BODY */}
      <div className={styles.body}>
        <h3>{description}</h3>
        <p className={styles.description}>
          Meta:
          {balance >= targetAmount ? (
            <strong style={{ color: goalColor }}> R${balance} </strong>
          ) : (
            <span> R${balance} </span>
          )}
          de
          <strong style={{ color: goalColor }}> R${targetAmount}</strong>
        </p>
      </div>
    </div>
  );
}
