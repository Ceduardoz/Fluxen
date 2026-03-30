import styles from "./styles.module.css";
import DefaultInput from "../../Inputs/DefaultInput";
import DefaultButton from "../../Buttons/DefaultButton";

export default function DepositWithDrawForm({
  formData,
  onChange,
  onSubmit,
  type,
  isSaving = false,
}) {
  const isDeposit = type === "deposit";
  const amount = Number(formData.amount);

  const isInvalid = !amount || amount <= 0;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="amount">
          {isDeposit ? "Valor para guardar" : "Valor para retirar"}
        </label>
        <DefaultInput
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={onChange}
          required
          autoFocus
        />
      </div>

      <div className={styles.actions}>
        <DefaultButton
          type="submit"
          disabled={isSaving || isInvalid}
          style={{
            backgroundColor: isDeposit ? "#10b981" : "#ef4444",
            width: "100%",
            marginTop: "20px",
          }}
        >
          {isSaving
            ? "Processando..."
            : isDeposit
              ? "Confirmar Depósito"
              : "Confirmar Retirada"}
        </DefaultButton>
      </div>
    </form>
  );
}
