import styles from "./styles.module.css";

export default function DefaultInput({ ...props }) {
  return <input {...props} className={styles.DefaultInput} />;
}
