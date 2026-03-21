import styles from "./styles.module.css";
import SummaryCardItem from "./SummaryCardItem";

// imprimir todos os cards
export default function SummaryCards({ cards }) {
  return (
    <div className={styles.content}>
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
