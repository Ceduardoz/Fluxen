import { useState } from "react";
import { CircleX } from "lucide-react";

import styles from "./styles.module.css";
import { transactionsSchemas } from "../../schemas/transactionsSchemas";
import {
  postTransactions,
  patchTransaction,
} from "../../services/transactionsServices";
import { FinanceForm } from "../Forms";
import Message from "../Message";

const EMPTY_TRANSACTION_FORM = {
  title: "",
  description: "",
  amount: "",
  type: "EXPENSE",
  date: "",
  accountId: 13,
  categoryId: undefined,
  toAccountId: undefined,
};

export const DefaultModal = ({
  isOpen,
  onClose,
  categories = [],
  onTransactionCreated,
  transactionToEdit,
  initialData = EMPTY_TRANSACTION_FORM,
  children,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);

  if (!isOpen) return null;

  async function handleTransactionsSubmit(e) {
    e.preventDefault();
    setMessage("");

    const res = transactionsSchemas.safeParse(formData);

    if (!res.success) {
      setMessage("Preencha os campos corretamente");
      return;
    }

    const payload = {
      title: res.data.title,
      description: res.data.description || "",
      amount: res.data.amount,
      type: res.data.type,
      date: res.data.date.toISOString(),
      accountId: res.data.accountId,
      ...(res.data.categoryId ? { categoryId: res.data.categoryId } : {}),
      ...(res.data.toAccountId ? { toAccountId: res.data.toAccountId } : {}),
    };

    try {
      if (transactionToEdit) {
        await patchTransaction(transactionToEdit.id, payload);
        setMessageType("success");
        setMessage("Transação atualizada com sucesso");
      } else {
        await postTransactions(payload);
        setMessageType("error");
        setMessage("Transação criada com sucesso");
      }

      if (onTransactionCreated) {
        await onTransactionCreated();
      }

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (e) {
      console.log(e);
      setMessage("Erro ao salvar transação");
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
          <Message message={message} type={messageType} />

          <FinanceForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
          />
        </form>
      </div>
    </div>
  );
};

export default DefaultModal;
