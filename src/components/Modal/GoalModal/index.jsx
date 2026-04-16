import styles from "./styles.module.css";
import DefaultModal from "../DefaultModal";
import GoalForm from "../../Forms/GoalForm";
import Message from "../../Message";

export default function GoalModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  accounts = [],
  onEdit = null,
  isSaving = false,
  message = "",
  messageType,
  errors = {},
  goalToEdit = null,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {goalToEdit ? "Editar Meta" : "Nova Caixinha"}
      </h2>

      <Message message={message} type={messageType} />

      <GoalForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        onEdit={onEdit}
        isSaving={isSaving}
        accounts={accounts}
        errors={errors}
        goalToEdit={goalToEdit}
      />
    </DefaultModal>
  );
}
