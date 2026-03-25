import styles from "./styles.module.css";

export default function IconButton({ children, ...props }) {
  return (
    <button type="button" className={styles.IconButton} {...props}>
      {children}
    </button>
  );
}
