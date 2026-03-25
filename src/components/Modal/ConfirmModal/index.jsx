import DefaultModal from "../DefaultModal";
import styles from "./styles.module.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  isLoading = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Excluindo..." : confirmText}
        </button>
      </div>
    </DefaultModal>
  );
}
