import { ChartNoAxesCombined } from "lucide-react";
import styles from "./styles.module.css";
import Card from "./Card";

export default function SummaryCardItem({ variant, title, value }) {
  return (
    <Card variant={variant}>
      <h2>{title}</h2>

      <div className={styles.currentGroup}>
        <div className={styles.currentValue}>
          <span>valor atual</span>
          <h3>{value}</h3>
        </div>

        <ChartNoAxesCombined size={50} />
      </div>
    </Card>
  );
}
