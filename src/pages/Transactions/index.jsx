import { useEffect, useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";

import { getTransactions } from "../../services/transactionsServices";
import { getCategories } from "../../services/categoryServices";

import MainTemplate from "../../templates/MainTemplate";
import DefaultModal from "../../components/DefaultModal";
import { FinanceForm } from "../../components/Forms";
import TransactionsTable from "../../components/TransactionsTable";

import styles from "./styles.module.css";
import { DefaultButton } from "../../components/Buttons";
import { TransactionInput } from "../../components/Inputs";

function normalizeArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const responseTransactions = await getTransactions();
        const transactionsData = normalizeArray(responseTransactions);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
        setError("Não foi possível carregar as transações.");
        setTransactions([]);
      }

      try {
        const responseCategories = await getCategories();
        const categoriesData = normalizeArray(responseCategories);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
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

  return (
    <MainTemplate>
      <div className={styles.filter}>
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

        <DefaultButton onClick={() => setIsModalOpen(true)}>
          <CirclePlus />
          Adicionar Transação
        </DefaultButton>

        <DefaultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h2>Adicionar Finanças</h2>
          <FinanceForm />
        </DefaultModal>
      </div>

      {loading ? (
        <p className={styles.loadingAPI}>Carregando transações...</p>
      ) : error ? (
        <p className={styles.loadingAPI}>{error}</p>
      ) : (
        <TransactionsTable
          transactions={filteredTransactions}
          categories={transactionsWithCategory}
        />
      )}
    </MainTemplate>
  );
}
