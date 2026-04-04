import styles from "./styles.module.css";
import SummaryCardItem from "../SummaryCardItem";

// imprimir todos os cards
export default function SummaryCards({ cards = [], variant = "row" }) {
  return (
    <div className={variant === "grid" ? styles.grid : styles.content}>
      {cards.map((card) => (
        <SummaryCardItem
          key={card.variant}
          variant={card.variant}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
}
