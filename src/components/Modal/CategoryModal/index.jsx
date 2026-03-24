import { CircleX } from "lucide-react";

import styles from "./styles.module.css";
import CategoryForm from "../../Forms/CategoryForm.jsx";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  categoryToEdit = null,
  isSaving = false,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CircleX />
        </button>
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
      </div>
    </div>
  );
}
