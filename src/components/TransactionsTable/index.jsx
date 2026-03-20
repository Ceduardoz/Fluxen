import { useMemo, useState } from "react";
import {
  EditIcon,
  Trash2,
  ArrowBigRightDash,
  ArrowBigLeftDash,
} from "lucide-react";
import styles from "./styles.module.css";

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("pt-BR");
}

function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function formatType(type) {
  if (type === "INCOME") return "Receita";
  if (type === "EXPENSE") return "Despesa";
  if (type === "TRANSFER") return "Transferência";
  return type;
}

export default function TransactionsTable({ transactions = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.max(1, Math.ceil(transactions.length / itemsPerPage));

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return transactions.slice(startIndex, startIndex + itemsPerPage);
  }, [transactions, currentPage]);

  return (
    <div className={styles.containerTable}>
      <h2 className={styles.title}>Transações</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map((item) => {
              const isExpense = item.type === "EXPENSE";

              return (
                <tr key={item.id}>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.title}</td>
                  <td>{item.categoryName || "-"}</td>
                  <td>
                    <span
                      className={isExpense ? styles.expense : styles.income}
                    >
                      {formatType(item.type)}
                    </span>
                  </td>
                  <td
                    className={
                      isExpense ? styles.expenseValue : styles.incomeValue
                    }
                  >
                    {formatMoney(item.amount)}
                  </td>
                  <td>
                    <button
                      className={`${styles.iconesTable} ${styles.editIcon}`}
                    >
                      <EditIcon size={18} />
                    </button>
                    <button
                      className={`${styles.iconesTable} ${styles.deleteIcon}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">Nenhuma transação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ArrowBigLeftDash />
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ArrowBigRightDash />
        </button>
      </div>
    </div>
  );
}
