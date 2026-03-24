import styles from "./styles.module.css";

export default function ContainerCard({ children, variant = "default" }) {
  const className = [styles.cardDashboard, variant ? styles[variant] : null]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{children}</div>;
}
