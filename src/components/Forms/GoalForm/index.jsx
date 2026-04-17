import styles from "./styles.module.css";
import ColorInput from "../../Inputs/ColorInput";
import DefaultInput from "../../Inputs/DefaultInput";
import DefaultButton from "../../Buttons/DefaultButton";

export default function GoalForm({
  formData,
  onChange,
  onSubmit,
  errors = {},
  isSaving = false,
  accounts = [],
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.fieldsWrapper}>
        <div className={styles.fieldGroup}>
          <div className={styles.field}>
            <label htmlFor="name">Nome</label>
            <DefaultInput
              id="name"
              name="name"
              type="text"
              placeholder="Digite o nome da caixinha"
              value={formData.name}
              onChange={onChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Descrição</label>
            <DefaultInput
              id="description"
              name="description"
              type="text"
              placeholder="Descrição"
              value={formData.description}
              onChange={onChange}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <div className={styles.field}>
            <label htmlFor="amount">Valor</label>
            <DefaultInput
              id="amount"
              name="targetAmount"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.targetAmount}
              onChange={onChange}
            />
            {errors.targetAmount && (
              <p className={styles.error}>{errors.targetAmount}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="color">Cor</label>
            <ColorInput
              id="color"
              name="color"
              type="color"
              value={formData.color || "#7c3aed"}
              onChange={onChange}
            />
            {errors.color && <p className={styles.error}>{errors.color}</p>}
          </div>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="accountId" className={styles.labelSelect}>
          Conta
        </label>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={onChange}
          className={styles.input}
        >
          <option value="" disabled>
            Selecione uma conta
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        {errors.accountId && <p className={styles.error}>{errors.accountId}</p>}
      </div>
      <DefaultButton type="submit" disabled={isSaving}>
        {isSaving ? "Salvando..." : "Criar"}
      </DefaultButton>
    </form>
  );
}
