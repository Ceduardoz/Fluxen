import styles from "./styles.module.css";
import CategoryForm from "../../Forms/CategoryForm/index.jsx";
import DefaultModal from "../DefaultModal";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  categoryToEdit = null,
  isSaving = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {categoryToEdit ? "Editar Categoria" : "Nova Categoria"}
      </h2>

      <CategoryForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        categoryToEdit={categoryToEdit}
        isSaving={isSaving}
      />
    </DefaultModal>
  );
}
