import styles from "./styles.module.css";
import ColorInput from "../../Inputs/ColorInput";
import DefaultInput from "../../Inputs/DefaultInput";
import DefaultButton from "../../Buttons/DefaultButton";

export default function CategoryForm({
  formData,
  onChange,
  onSubmit,
  categoryToEdit = null,
  isSaving = false,
  errors = {},
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Nome</label>
        <DefaultInput
          id="name"
          name="name"
          type="text"
          placeholder="Digite o nome da categoria"
          value={formData.name}
          onChange={onChange}
        />

        {errors.name && <span className={styles.error}>{errors.name[0]}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="color">Cor</label>
        <ColorInput
          id="color"
          name="color"
          type="color"
          value={formData.color}
          onChange={onChange}
        />

        {errors.color && (
          <span className={styles.error}>{errors.color[0]}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="categoryType">Tipo</label>
        <select
          id="categoryType"
          name="categoryType"
          value={formData.categoryType}
          onChange={onChange}
        >
          <option value="EXPENSE">Despesa</option>
          <option value="INCOME">Receita</option>
        </select>

        {errors.categoryType && (
          <span className={styles.error}>{errors.categoryType[0]}</span>
        )}
      </div>

      <div className={styles.actions}>
        <DefaultButton type="submit" disabled={isSaving}>
          {isSaving ? "Salvando..." : categoryToEdit ? "Atualizar" : "Criar"}
        </DefaultButton>
      </div>
    </form>
  );
}
