import styles from "./styles.module.css";
import { DefaultInput } from "../Inputs";

export const FinanceForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Ex: Mercado do mês"
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
        />
      </div>

      <div className={styles.field}>
        <span>Tipo</span>

        <div className={styles.radioGroup}>
          <label>
            <input type="radio" name="type" value="income" />
            Receita
          </label>

          <label>
            <input type="radio" name="type" value="expense" />
            Despesa
          </label>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="category">Categoria</label>
        <select id="category" name="category">
          <option value="">Selecione uma categoria</option>
          <option value="salary">Salário</option>
          <option value="food">Alimentação</option>
          <option value="transport">Transporte</option>
          <option value="leisure">Lazer</option>
          <option value="health">Saúde</option>
          <option value="other">Outros</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="date">Data</label>
        <input id="date" name="date" type="date" />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          placeholder="Observações sobre a transação"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Adicionar
      </button>
    </form>
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
