import styles from "./styles.module.css";
import InvestmentForm from "../../Forms/InvestmentsForm";
import DefaultModal from "../DefaultModal";

export default function InvestmentsModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  accounts,
  investmentToEdit = null,
  isSaving = false,
}) {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>
        {investmentToEdit ? "Editar Investimento" : "Novo Investimento"}
      </h2>

      <InvestmentForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        investmentToEdit={investmentToEdit}
        isSaving={isSaving}
        accounts={accounts}
      />
    </DefaultModal>
  );
}
