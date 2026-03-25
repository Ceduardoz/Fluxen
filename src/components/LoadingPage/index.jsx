import styles from "./styles.module.css";

export default function LoadingPage() {
  return (
    <svg className={styles.pl} width="240" height="240" viewBox="0 0 240 240">
      <circle
        className={`${styles.plRing} ${styles.PlRingA}`}
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 660"
        strokeDashoffset="-330"
        strokeLinecap="round"
      />
      <circle
        className={`${styles.plRing} ${styles.PlRingB}`}
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 220"
        strokeDashoffset="-110"
        strokeLinecap="round"
      />
      <circle
        className={`${styles.plRing} ${styles.PlRingC}`}
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
      <circle
        className={`${styles.plRing} ${styles.PlRingD}`}
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
    </svg>
  );
}
