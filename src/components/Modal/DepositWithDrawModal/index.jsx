import styles from "./styles.module.css";
import DefaultModal from "../DefaultModal";
import DepositWithDrawForm from "../../Forms/DepositWithDrawForm";

export default function DepositWithDrawModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  type,
  vaultName,
  isSaving = false,
}) {
  const isDeposit = type === "deposit";

  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {isDeposit ? "Guardar Dinheiro" : "Retirar Dinheiro"}
      </h2>

      <h3 className={styles.subtitle}>
        Caixinha: <strong>{vaultName}</strong>
      </h3>

      <DepositWithDrawForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        type={type}
        isSaving={isSaving}
      />
    </DefaultModal>
  );
}
