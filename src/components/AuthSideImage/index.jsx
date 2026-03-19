import styles from "./styles.module.css";

export default function AuthSideImage({ isRegister }) {
  return (
    <article
      className={`${styles.side} ${styles.imageSide} ${
        isRegister ? styles.imageRegister : styles.imageLogin
      }`}
    >
      <div className={styles.imageContent}>
        <img
          src="/finance_illustration_600.png"
          alt="Finance illustration"
          className={styles.image}
        />
      </div>
    </article>
  );
}
