import styles from "./styles.module.css";
import AccountForm from "../../Forms/AccountForm";
import DefaultModal from "../DefaultModal";

export default function AccountModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  accountToEdit = null,
  isSaving = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {accountToEdit ? "Editar Conta" : "Nova Conta"}
      </h2>

      <AccountForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        accountToEdit={accountToEdit}
        isSaving={isSaving}
      />
    </DefaultModal>
  );
}
