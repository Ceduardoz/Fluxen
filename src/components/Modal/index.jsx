import { useState } from "react";
import { CircleX } from "lucide-react";

import styles from "./styles.module.css";
import {
  transactionsSchemas,
  updateTransactionSchema,
} from "../../schemas/transactionsSchemas";
import {
  postTransactions,
  patchTransaction,
} from "../../services/transactionsServices";
import FinanceForm from "../Forms/FinanceForm";
import { DefaultButton } from "../Buttons";
import Message from "../Message";

const EMPTY_TRANSACTION_FORM = {
  title: "",
  description: "",
  amount: "",
  type: "EXPENSE",
  date: "",
  accountId: 14,
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

    const schema = transactionToEdit
      ? updateTransactionSchema
      : transactionsSchemas;

    const res = schema.safeParse(formData);

    if (!res.success) {
      setMessageType("error");
      setMessage("Preencha os campos corretamente");
      return;
    }

    const payload = {
      title: res.data.title,
      description: res.data.description || "",
      amount: res.data.amount,
      type: res.data.type,
      date: res.data.date,
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
        setMessageType("success");
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
      setMessageType("error");
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
          <DefaultButton type="submit">
            {transactionToEdit ? "Editar" : "Adicionar"}
          </DefaultButton>
        </form>
      </div>
    </div>
  );
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CircleX />
        </button>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
