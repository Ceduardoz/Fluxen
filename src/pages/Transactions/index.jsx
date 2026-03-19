import { useEffect, useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";

import { getTransactions } from "../../services/transactionsServices";
import MainTemplate from "../../templates/MainTemplate";
import DefaultModal from "../../components/DefaultModal";
import { FinanceForm } from "../../components/Forms";
import TransactionsTable from "../../components/TransactionsTable";

import styles from "./styles.module.css";
import { DefaultButton } from "../../components/Buttons";
import { TransactionInput } from "../../components/Inputs";

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
        const response = await getTransactions();

        setTransactions(Array.isArray(response) ? response : []);
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
        <>
          <TransactionsTable transactions={filteredTransactions} />
        </>
      )}
    </MainTemplate>
  );
}
