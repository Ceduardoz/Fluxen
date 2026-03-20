import { useState } from "react";
import { CircleX } from "lucide-react";

import styles from "./styles.module.css";
import { transactionsSchemas } from "../../schemas/transactionsSchemas";
import { postTransactions } from "../../services/transactionsServices";
import { FinanceForm } from "../Forms";

export const DefaultModal = ({
  isOpen,
  onClose,
  categories = [],
  onTransactionCreated,
  children,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "EXPENSE",
    date: "",
    accountId: 3,
    categoryId: undefined,
    toAccountId: undefined,
  });

  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  async function handleTransactionsSubmit(e) {
    e.preventDefault();
    setMessage("");

    const res = transactionsSchemas.safeParse(formData);

    if (!res.success) {
      setMessage("Preencha os campos corretamente");
      return;
    }

    try {
      await postTransactions(res.data);

      setMessage("Transação criada com sucesso");

      setFormData({
        title: "",
        description: "",
        amount: "",
        type: "EXPENSE",
        date: "",
        accountId: 1,
        categoryId: undefined,
        toAccountId: undefined,
      });

      if (onTransactionCreated) {
        onTransactionCreated();
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (e) {
      console.error("Erro ao criar transação:", e);
      setMessage("Erro ao criar transação");
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CircleX />
        </button>

        {children}

        <form onSubmit={handleTransactionsSubmit}>
          <FinanceForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
          />
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default DefaultModal;
