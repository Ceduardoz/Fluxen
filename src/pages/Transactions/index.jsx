import { useEffect, useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";

import {
  getTransactions,
  deleteTransaction,
} from "../../services/transactionsServices";
import { getCategories } from "../../services/categoryServices";
import { getAccount } from "../../services/AccountServices";

import styles from "./styles.module.css";

import MainTemplate from "../../templates/MainTemplate";
import TransactionModal from "../../components/Modal/TransactionsModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import TransactionsTable from "../../components/Table";
import LoadingPage from "../../components/LoadingPage";
import DefaultButton from "../../components/Buttons/DefaultButton";
import TransactionInput from "../../components/Inputs/TransactionInput";

function normalizeArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

const EMPTY_TRANSACTION_FORM = {
  title: "",
  description: "",
  amount: "",
  type: "EXPENSE",
  date: "",
  accountId: 1,
  categoryId: undefined,
  toAccountId: undefined,
};

function formatDateForInput(date) {
  if (!date) return "";
  return String(date).split("T")[0];
}

function mapTransactionToFormData(transaction) {
  if (!transaction) return EMPTY_TRANSACTION_FORM;

  return {
    title: transaction.title || "",
    description: transaction.description || "",
    amount: transaction.amount ?? "",
    type: transaction.type || "EXPENSE",
    date: formatDateForInput(transaction.date),
    accountId: transaction.accountId || null,
    categoryId:
      transaction.categoryId ??
      transaction.category_id ??
      transaction.idCategory ??
      transaction.category?.id ??
      undefined,
    toAccountId: transaction.toAccountId ?? undefined,
  };
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const [modalVersion, setModalVersion] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  async function loadTransactions() {
    try {
      const responseTransactions = await getTransactions();
      const transactionsData = normalizeArray(responseTransactions);

      setTransactions(transactionsData);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setError("Não foi possível carregar as transações.");
      setTransactions([]);
    }
  }

  async function loadCategories() {
    try {
      const responseCategories = await getCategories();
      const categoriesData = normalizeArray(responseCategories);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setCategories([]);
    }
  }

  async function loadAccounts() {
    try {
      const response = await getAccount();
      const data = normalizeArray(response);
      setAccounts(data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      setAccounts([]);
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([loadTransactions(), loadCategories(), loadAccounts()]);
      setLoading(false);
    }

    loadData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const title = String(transaction.title || "").toLowerCase();
      const categoryName = String(
        transaction.category?.name || "",
      ).toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch = title.includes(term) || categoryName.includes(term);

      const matchesMonth = selectedMonth
        ? String(transaction.date || "").startsWith(selectedMonth)
        : true;

      return matchesSearch && matchesMonth;
    });
  }, [transactions, searchTerm, selectedMonth]);

  function handleOpenDeleteModal(transaction) {
    setTransactionToDelete(transaction);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setTransactionToDelete(null);
  }

  async function handleConfirmDeleteTransaction() {
    if (!transactionToDelete) return;

    try {
      setIsDeleting(true);
      await deleteTransaction(transactionToDelete.id);
      await loadTransactions();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleOpenCreateModal() {
    setSelectedTransaction(null);
    setModalVersion((prev) => prev + 1);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(transaction) {
    const freshTransaction = transactions.find(
      (item) => item.id === transaction.id,
    );

    setSelectedTransaction(freshTransaction || transaction);
    setModalVersion((prev) => prev + 1);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }

  const modalInitialData = mapTransactionToFormData(selectedTransaction);

  return (
    <MainTemplate>
      <section className={styles.filter}>
        <TransactionInput
          type="search"
          name="search"
          className={styles.inputsFilter}
          id="search"
          placeholder="&#128269; Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TransactionInput
          type="month"
          name="month"
          id="month"
          className={styles.inputsFilter}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />

        <DefaultButton onClick={handleOpenCreateModal}>
          <CirclePlus />
          Adicionar Transação
        </DefaultButton>

        <TransactionModal
          key={`${selectedTransaction ? `edit-${selectedTransaction.id}` : "create"}-${modalVersion}`}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          categories={categories}
          accounts={accounts}
          onTransactionCreated={loadTransactions}
          transactionToEdit={selectedTransaction}
          initialData={modalInitialData}
        >
          <h2>
            {selectedTransaction ? "Editar Finanças" : "Adicionar Finanças"}
          </h2>
        </TransactionModal>
      </section>

      {loading ? (
        <LoadingPage />
      ) : error ? (
        <p className={styles.loadingAPI}>{error}</p>
      ) : (
        <TransactionsTable
          transactions={filteredTransactions}
          onDelete={handleOpenDeleteModal}
          onEdit={handleOpenEditModal}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTransaction}
        title="Excluir transação"
        message={`Tem certeza que deseja excluir a transação "${transactionToDelete?.title || ""}"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </MainTemplate>
  );
}
