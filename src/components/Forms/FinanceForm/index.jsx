import styles from "./styles.module.css";
import DefaultInput from "../../Inputs/DefaultInput";

export default function FinanceForm({
  formData,
  setFormData,
  categories = [],
}) {
  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    const categoryId = value === "" ? undefined : Number(value);

    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );

    setFormData((prev) => ({
      ...prev,
      categoryId,
      type:
        selectedCategory && selectedCategory.name !== "Outros"
          ? selectedCategory.categoryType
          : prev.type,
    }));
  }

  const selectedCategory = categories.find(
    (category) => category.id === formData.categoryId,
  );

  const isOthersCategory = selectedCategory?.name === "Outros";
  const shouldDisableTypeRadio = selectedCategory && !isOthersCategory;

  return (
    <div className={styles.form}>
      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="title">Título</label>
          <DefaultInput
            id="title"
            name="title"
            type="text"
            placeholder="Ex: Mercado do mês"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount">Valor</label>
          <DefaultInput
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <span>Tipo</span>

          <div className={`${styles.radioGroup}`}>
            <label>
              <DefaultInput
                type="radio"
                name="type"
                value="INCOME"
                checked={formData.type === "INCOME"}
                onChange={handleChange}
                disabled={shouldDisableTypeRadio}
              />
              Receita
            </label>

            <label>
              <DefaultInput
                type="radio"
                name="type"
                value="EXPENSE"
                checked={formData.type === "EXPENSE"}
                onChange={handleChange}
                disabled={shouldDisableTypeRadio}
              />
              Despesa
            </label>
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label htmlFor="categoryId">Categoria</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId ?? ""}
            onChange={handleCategoryChange}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Data</label>
          <DefaultInput
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            placeholder="Observações sobre a transação"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
