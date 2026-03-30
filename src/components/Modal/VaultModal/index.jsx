import styles from "./styles.module.css";
import DefaultModal from "../DefaultModal";
import VaultForm from "../../Forms/VaultForm";

export default function VaultModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  onEdit = null,
  isSaving = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Nova Caixinha</h2>

      <VaultForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        onEdit={onEdit}
        isSaving={isSaving}
      />
    </DefaultModal>
  );
}
