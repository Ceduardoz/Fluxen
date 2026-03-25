import styles from "./styles.module.css";

export default function ColorInput({ ...props }) {
  return <input {...props} className={styles.colorInput} />;
}
