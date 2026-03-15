import styles from "./styles.module.css";

// Template do Cadastro e Login
export default function MainTemplate({ children }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
