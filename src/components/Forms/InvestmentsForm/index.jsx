import styles from "./styles.module.css";
import DefaultButton from "../../Buttons/DefaultButton";
import DefaultInput from "../../Inputs/DefaultInput";

export default function InvestmentForm({
  formData,
  onChange,
  onSubmit,
  investmentToEdit,
  isSaving,
  accounts = [],
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.investedAmount || !formData.annualRate) {
      return alert("Preencha os campos obrigatórios");
    }

    onSubmit({
      ...formData,
      investedAmount: Number(formData.investedAmount),
      annualRate: Number(formData.annualRate),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.fieldsGroup}>
          <div className={styles.field}>
            <label className={styles.label}>Título do Investimento</label>
            <DefaultInput
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Ex: Reserva de Emergência"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Instituição (Sua Conta)</label>
              <select
                name="institution"
                value={formData.institution}
                onChange={onChange}
                className={styles.select}
              >
                <option value="">Selecione uma conta</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.name}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo</label>
              <select name="type" value={formData.type} onChange={onChange}>
                <option value="CDB">CDB</option>
                <option value="CDI">CDI</option>
                <option value="LCI">LCI</option>
                <option value="LCA">LCA</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.fieldsGroup}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Valor Investido</label>
              <DefaultInput
                type="number"
                name="investedAmount"
                value={formData.investedAmount}
                onChange={onChange}
                placeholder="0.00"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Rentabilidade (% do CDI)</label>
              <DefaultInput
                type="number"
                name="annualRate"
                value={formData.annualRate}
                onChange={onChange}
                placeholder="Ex: 100 (para 100% do CDI)"
              />
              <small className={styles.helperText}>
                Base atual do CDI: 11,25% ao ano.
              </small>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Data de Início</label>
            <DefaultInput
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <DefaultButton type="submit" disabled={isSaving}>
        {isSaving
          ? "Salvando..."
          : investmentToEdit
            ? "Salvar alterações"
            : "Criar Investimento"}
      </DefaultButton>
    </form>
  );
}
