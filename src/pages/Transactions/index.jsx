import { useEffect, useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";

import {
  getTransactions,
  deleteTransaction,
} from "../../services/transactionsServices";
import { getCategories } from "../../services/categoryServices";

import MainTemplate from "../../templates/MainTemplate";
import DefaultModal from "../../components/Modal";
import { TransactionsTable } from "../../components/Table";

import styles from "./styles.module.css";
import { DefaultButton } from "../../components/Buttons";
import { TransactionInput } from "../../components/Inputs";

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
  accountId: 13,
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
    accountId: transaction.accountId || 13,
    categoryId:
      transaction.categoryId ??
      transaction.category_id ??
      transaction.idCategory ??
      undefined,
    toAccountId: transaction.toAccountId ?? undefined,
  };
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([loadTransactions(), loadCategories()]);
      setLoading(false);
    }

    loadData();
  }, []);

  const transactionsWithCategory = useMemo(() => {
    return transactions.map((transaction) => {
      const foundCategory = categories.find((category) => {
        return (
          category.id === transaction.categoryId ||
          category.id === transaction.category_id ||
          category.id === transaction.idCategory
        );
      });

      return {
        ...transaction,
        categoryName:
          transaction.category?.name ||
          foundCategory?.name ||
          transaction.category ||
          "-",
      };
    });
  }, [transactions, categories]);

  const filteredTransactions = useMemo(() => {
    return transactionsWithCategory.filter((transaction) => {
      const title = String(transaction.title || "").toLowerCase();
      const categoryName = String(transaction.categoryName || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch = title.includes(term) || categoryName.includes(term);

      const matchesMonth = selectedMonth
        ? String(transaction.date || "").startsWith(selectedMonth)
        : true;

      return matchesSearch && matchesMonth;
    });
  }, [transactionsWithCategory, searchTerm, selectedMonth]);

  async function handleDeleteTransaction(id) {
    const confirmDelete = confirm("Deseja realmente excluir esta transação?");
    if (!confirmDelete) return;

    await deleteTransaction(id);
    await loadTransactions();
  }

  function handleOpenCreateModal() {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(transaction) {
    setSelectedTransaction(transaction);
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

        <DefaultModal
          key={
            selectedTransaction ? `edit-${selectedTransaction.id}` : "create"
          }
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          categories={categories}
          onTransactionCreated={loadTransactions}
          transactionToEdit={selectedTransaction}
          initialData={modalInitialData}
        >
          <h2>
            {selectedTransaction ? "Editar Finanças" : "Adicionar Finanças"}
          </h2>
        </DefaultModal>
      </section>

      {loading ? (
        <p className={styles.loadingAPI}>Carregando transações...</p>
      ) : error ? (
        <p className={styles.loadingAPI}>{error}</p>
      ) : (
        <TransactionsTable
          transactions={filteredTransactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleOpenEditModal}
        />
      )}
    </MainTemplate>
  );
}
