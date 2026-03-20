import styles from "./styles.module.css";
import { DefaultInput } from "../Inputs";
import { DefaultButton } from "../Buttons";

export const FinanceForm = ({ formData, setFormData, categories = [] }) => {
  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  }

  function handleCategoryChange(e) {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      categoryId: value === "" ? undefined : Number(value),
    }));
  }

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Título</label>
        <input
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
        <input
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

        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="type"
              value="INCOME"
              checked={formData.type === "INCOME"}
              onChange={handleChange}
            />
            Receita
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="EXPENSE"
              checked={formData.type === "EXPENSE"}
              onChange={handleChange}
            />
            Despesa
          </label>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="categoryId">Categoria</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId ?? ""}
          onChange={handleCategoryChange}
        >
          {console.log(categories)}
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
        <input
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

      <DefaultButton type="submit">Adicionar</DefaultButton>
    </div>
  );
};

export const FormField = ({ icon: Icon, error, actionText, ...inputProps }) => {
  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.inputGroup}>
        {Icon && <Icon className={styles.inputIcon} size={20} />}

        <DefaultInput {...inputProps} />

        {actionText && (
          <button type="button" className={styles.inputAction}>
            {actionText}
          </button>
        )}
      </div>

      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
};
