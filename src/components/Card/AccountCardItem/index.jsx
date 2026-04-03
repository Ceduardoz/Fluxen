import { Pencil, Trash2 } from "lucide-react";

import styles from "./styles.module.css";
import { BANKS } from "../../../mocks/bankMocks";

export default function AccountCardItem({
  title,
  initialBalance,
  isCustom = true,
  onEdit,
  onDelete,
}) {
  const bank = BANKS.find((b) => b.name === title);
  return (
    <div
      className={styles.card}
      style={{
        background: bank?.colors[0] || "#f9f9f9",
      }}
    >
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
              onClick={onDelete}
              type="button"
              className={styles.deleteButton}
            >
              <Trash2 color="#fd1d47" size={16} />
            </button>
          </div>
        )}
      </div>
      <h3>
        {Number(initialBalance).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h3>
    </div>
  );
}
