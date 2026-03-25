import styles from "./styles.module.css";

export default function TransactionInput({ ...props }) {
  return <input {...props} className={styles.TransactionInput} />;
}
