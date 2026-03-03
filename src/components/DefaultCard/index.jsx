import styles from "./styles.module.css";

export default function DefaultCard({ children, variant = "default" }) {
  // Definir a cor do card e as informação para ele
  const className = [styles.card, variant ? styles[variant] : null];

  return <div className={className.join(" ")}>{children}</div>;
}
