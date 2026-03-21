import styles from "./styles.module.css";

export default function Card({ children, variant = "default" }) {
  // Definir a cor do card e as informação para ele
  const className = [styles.card, variant ? styles[variant] : null];

  return <div className={className.join(" ")}>{children}</div>;
}
