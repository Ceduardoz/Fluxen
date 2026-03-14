import { useEffect, useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";

import api from "../../services/server";
import MainTemplate from "../../templates/MainTemplate";
import DefaultModal from "../../components/DefaultModal";
import FinanceForm from "../../components/FinanceForm";
import TransactionsTable from "../../components/TransactionsTable";
import WalletAnalyticsChart from "../../components/WalletAnalyticsChart";

import styles from "./styles.module.css";

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await api.get("/transactions");
        const data = response.data;

        console.log("Transações da API:", data);

        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
        setError("Não foi possível carregar as transações.");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const title = String(transaction.title || "").toLowerCase();
      const categoryName = String(
        transaction.category?.name || transaction.category || "",
      ).toLowerCase();

      const matchesSearch =
        title.includes(searchTerm.toLowerCase()) ||
        categoryName.includes(searchTerm.toLowerCase());

      const matchesMonth = selectedMonth
        ? String(transaction.date || "").startsWith(selectedMonth)
        : true;

      return matchesSearch && matchesMonth;
    });
  }, [transactions, searchTerm, selectedMonth]);

  return (
    <MainTemplate>
      <div className={styles.filter}>
        <input
          type="search"
          name="search"
          className={styles.inputsFilter}
          id="search"
          placeholder="&#128269; Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="month"
          name="month"
          id="month"
          className={styles.inputsFilter}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />

        <button
          className={`${styles.OpenModalBtn} ${styles.inputsFilter}`}
          onClick={() => setIsModalOpen(true)}
        >
          <CirclePlus />
          Adicionar Transação
        </button>

        <DefaultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h2>Adicionar Finanças</h2>
          <FinanceForm />
        </DefaultModal>
      </div>

      {loading ? (
        <p>Carregando transações...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <WalletAnalyticsChart transactions={filteredTransactions} />
          <TransactionsTable transactions={filteredTransactions} />
        </>
      )}
    </MainTemplate>
  );
}
