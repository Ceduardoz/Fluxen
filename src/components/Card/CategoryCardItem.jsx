import ContainerCard from "./ContainerCard";
import styles from "./styles.module.css";

export default function CategoryCardItem({ variant, title }) {
  return (
    <ContainerCard variant={variant}>
      <div className={styles.content}>
        <h2>{title}</h2>
      </div>
    </ContainerCard>
  );
}
