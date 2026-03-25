import styles from "./styles.module.css";
import DefaultInput from "../../Inputs/DefaultInput";

export default function LoginRegisterForm({
  icon: Icon,
  error,
  actionText,
  ...inputProps
}) {
  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.inputGroup}>
        {Icon && <Icon className={styles.inputIcon} size={20} />}

        <DefaultInput {...inputProps} />

        {actionText && (
          <button type="button" className={styles.inputAction}>
            {actionText}
          </button>
        )}
      </div>

      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
}
