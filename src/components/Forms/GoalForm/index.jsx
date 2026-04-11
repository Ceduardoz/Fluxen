import styles from "./styles.module.css";
import ColorInput from "../../Inputs/ColorInput";
import DefaultInput from "../../Inputs/DefaultInput";
import DefaultButton from "../../Buttons/DefaultButton";

export default function GoalForm({
  formData,
  onChange,
  onSubmit,
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
              required
            />
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
          </div>
        </div>
      </div>
      <div className={styles.field}>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={onChange}
          required
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
      </div>
      <DefaultButton type="submit" disabled={isSaving}>
        {isSaving ? "Salvando..." : "Criar"}
      </DefaultButton>
    </form>
  );
}
