import styles from "./styles.module.css";

export const DefaultButton = ({ children, ...props }) => {
  return (
    <button className={styles.buttonDefault} {...props}>
      {children}
    </button>
  );
};

export const ButtonIcon = ({ children, ...props }) => {
  return (
    <button type="button" className={styles.buttonIcon} {...props}>
      {children}
    </button>
  );
};
