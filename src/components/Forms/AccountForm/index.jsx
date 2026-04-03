import styles from "./styles.module.css";

import { BANKS } from "../../../mocks/bankMocks";
import DefaultButton from "../../Buttons/DefaultButton";
import DefaultInput from "../../Inputs/DefaultInput";

export default function AccountForm({
  formData,
  onChange,
  onSubmit,
  accountToEdit,
  isSaving,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || formData.initialBalance === "") return;

    onSubmit({
      ...formData,
      initialBalance: Number(formData.initialBalance),
      type: "CHECKING",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Nome</label>
        <select name="name" value={formData.name} onChange={onChange}>
          <option value="">Selecione um banco</option>

          {BANKS.map((bank) => (
            <option key={bank.name} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Valor inicial</label>
        <DefaultInput
          type="number"
          name="initialBalance"
          value={formData.initialBalance}
          onChange={onChange}
          placeholder="0.00"
        />
      </div>

      <DefaultButton type="submit" disabled={isSaving}>
        {isSaving
          ? "Salvando..."
          : accountToEdit
            ? "Salvar alterações"
            : "Criar conta"}
      </DefaultButton>
    </form>
  );
}
