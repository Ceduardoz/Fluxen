import { useState } from "react";

import {
  transactionsSchemas,
  updateTransactionSchema,
} from "../../../schemas/transactionsSchemas";

import {
  postTransactions,
  patchTransaction,
} from "../../../services/transactionsServices";

import FinanceForm from "../../Forms/FinanceForm";
import Message from "../../Message";
import DefaultModal from "../DefaultModal";
import DefaultButton from "../../Buttons/DefaultButton";

import styles from "./styles.module.css";

const EMPTY_TRANSACTION_FORM = {
  title: "",
  description: "",
  amount: "",
  type: "EXPENSE",
  date: "",
  accountId: undefined,
  categoryId: undefined,
  toAccountId: undefined,
};

function normalizeInitialData(data) {
  if (!data) return { ...EMPTY_TRANSACTION_FORM };

  return {
    title: data.title || "",
    description: data.description || "",
    amount: data.amount ?? "",
    type: data.type || "EXPENSE",
    date: data.date ? String(data.date).split("T")[0] : "",
    accountId: data.accountId ?? 14,
    categoryId: data.categoryId ?? undefined,
    toAccountId: data.toAccountId ?? undefined,
  };
}

export default function TransactionModal({
  isOpen,
  onClose,
  categories = [],
  accounts = [],
  onTransactionCreated,
  transactionToEdit = null,
  initialData = EMPTY_TRANSACTION_FORM,
}) {
  const [formData, setFormData] = useState(() =>
    normalizeInitialData(transactionToEdit || initialData),
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  function handleClose() {
    if (isSaving) return;
    onClose();
  }

  async function handleTransactionsSubmit(e) {
    e.preventDefault();
    setErrors({});

    setMessage("");
    setMessageType(undefined);

    const schema = transactionToEdit
      ? updateTransactionSchema
      : transactionsSchemas;

    const res = schema.safeParse(formData);

    if (!res.success) {
      const fieldErrors = res.error.flatten().fieldErrors;
      setErrors(fieldErrors);
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
      setIsSaving(true);

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
        setTimeout(async () => {
          onClose();
          await onTransactionCreated();
        }, 1800);
      }
    } catch (error) {
      console.log(error);
      setMessageType("error");
      setMessage("Erro ao salvar transação");
      setIsSaving(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DefaultModal isOpen={isOpen} onClose={handleClose}>
      <h2 className={styles.title}>
        {transactionToEdit ? "Editar Transação" : "Nova Transação"}
      </h2>

      <form onSubmit={handleTransactionsSubmit}>
        <Message message={message} type={messageType} />

        <FinanceForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          accounts={accounts}
          errors={errors}
        />

        <DefaultButton type="submit" disabled={isSaving}>
          {isSaving
            ? transactionToEdit
              ? "Salvando..."
              : "Adicionando..."
            : transactionToEdit
              ? "Editar"
              : "Adicionar"}
        </DefaultButton>
      </form>
    </DefaultModal>
  );
}
