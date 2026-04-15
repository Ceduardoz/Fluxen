import { Trash2, TrendingUp, Landmark } from "lucide-react";
import styles from "./styles.module.css";

export default function InvestmentCardItem({ investment, onDelete }) {
  const profit = investment.currentValue - Number(investment.investedAmount);
  const profitPercentage = (profit / Number(investment.investedAmount)) * 100;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.infoGroup}>
          <div className={styles.iconWrapper}>
            <Landmark size={30} />
          </div>
          <div>
            <h2 className={styles.name}>{investment.name}</h2>
            <span className={styles.institution}>
              {investment.institution || "Outros"}
            </span>
          </div>
        </div>
        <button className={styles.deleteBtn} onClick={onDelete}>
          <Trash2 size={18} />
        </button>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.dataRow}>
          <div className={styles.dataItem}>
            <span>Valor Investido</span>
            <strong>
              R${" "}
              {Number(investment.investedAmount).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>
          <div className={styles.dataItem}>
            <span>Valor Atual</span>
            <strong className={styles.currentValue}>
              ~R${" "}
              {investment.currentValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>
        </div>

        <div className={styles.profitBadge}>
          <TrendingUp size={14} />
          <span>Rendimento: </span>
          <strong>
            + R$ {profit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
          </strong>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.typeTag}>{investment.type}</span>
        <span className={styles.date}>
          Início: {new Date(investment.startDate).toLocaleDateString("pt-BR")}
        </span>
      </div>
    </div>
  );
}
