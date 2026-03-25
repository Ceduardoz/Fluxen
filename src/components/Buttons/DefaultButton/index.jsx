import styles from "./styles.module.css";

export default function DefaultButton({ children, ...props }) {
  return (
    <button className={styles.DefaultButton} {...props}>
      {children}
    </button>
  );
}
