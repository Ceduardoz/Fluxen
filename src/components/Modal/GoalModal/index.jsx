import styles from "./styles.module.css";
import DefaultModal from "../DefaultModal";
import GoalForm from "../../Forms/GoalForm";

export default function GoalModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  accounts = [],
  onEdit = null,
  isSaving = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Nova Caixinha</h2>

      <GoalForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        onEdit={onEdit}
        isSaving={isSaving}
        accounts={accounts}
      />
    </DefaultModal>
  );
}
