import styles from "./styles.module.css";
import CategoryForm from "../../Forms/CategoryForm";
import DefaultModal from "../DefaultModal";
import Message from "../../Message";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  categoryToEdit = null,
  isSaving = false,
  message = "",
  messageType,
  errors = {},
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {categoryToEdit ? "Editar Categoria" : "Nova Categoria"}
      </h2>

      <Message message={message} type={messageType} />

      <CategoryForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        categoryToEdit={categoryToEdit}
        isSaving={isSaving}
        errors={errors}
      />
    </DefaultModal>
  );
}
