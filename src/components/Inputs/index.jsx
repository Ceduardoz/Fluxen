import styles from "./styles.module.css";

export const DefaultInput = ({ ...props }) => {
  return <input {...props} className={styles.inputDefault} />;
};
export const TransactionInput = ({ ...props }) => {
  return <input {...props} className={styles.TransactionInput} />;
};
