import { useMemo, useState } from "react";
import {
  EditIcon,
  Trash2,
  ArrowBigRightDash,
  ArrowBigLeftDash,
} from "lucide-react";

import { hexToRgba } from "../../utils/colors";
import { BANKS } from "../../mocks/bankMocks";
import IconButton from "../Buttons/IconButton";
import styles from "./styles.module.css";

function formatDate(date) {
  if (!date) return "-";

  const [year, month, day] = String(date).split("T")[0].split("-");
  return `${day}/${month}/${year}`;
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
  if (type === "RESERVE") return "Deposito";
  if (type === "UNRESERVE") return "Retirada";
  return type;
}

export default function TransactionsTable({
  transactions = [],
  onDelete,
  onEdit,
}) {
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
            <th>Banco</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map((item) => {
              const categoryColor = item.category?.color || "#6b7280";
              const bankData = BANKS.find((b) => b.name === item.account?.name);
              const bankColor = bankData?.colors?.[0] || "#e5e7eb";

              function getBadgeClass(type) {
                if (type === "EXPENSE") return styles.expense;
                if (type === "INCOME") return styles.income;
                if (type === "RESERVE" || type === "UNRESERVE")
                  return styles.goal;
                return styles.defaultBadge;
              }

              function getValueClass(type) {
                if (type === "EXPENSE") return styles.expenseValue;
                if (type === "INCOME") return styles.incomeValue;
                if (type === "RESERVE" || type === "UNRESERVE")
                  return styles.goalValue;
                return "";
              }

              return (
                <tr key={item.id}>
                  <td>{formatDate(item.date)}</td>

                  <td>{item.title}</td>

                  <td>
                    {item.account?.name ? (
                      <span
                        className={styles.categoryBadge}
                        style={{
                          background: hexToRgba(bankColor),
                          color: bankColor,
                        }}
                      >
                        {item.account.name}
                      </span>
                    ) : (
                      <span className={styles.categoryFallback}>Sem banco</span>
                    )}
                  </td>

                  <td>
                    {item.category ? (
                      <span
                        className={styles.categoryBadge}
                        style={{
                          backgroundColor: hexToRgba(categoryColor),
                          color: categoryColor,
                        }}
                      >
                        {item.category.name}
                      </span>
                    ) : (
                      <span className={styles.categoryFallback}>
                        Sem categoria
                      </span>
                    )}
                  </td>

                  <td>
                    <span className={getBadgeClass(item.type)}>
                      {formatType(item.type)}
                    </span>
                  </td>

                  <td className={getValueClass(item.type)}>
                    {item.type === "UNRESERVE" || item.type === "EXPENSE"
                      ? `-$
                    {formatMoney(item.amount)}`
                      : formatMoney(item.amount)}
                  </td>

                  <td>
                    <IconButton
                      onClick={() => onEdit(item)}
                      className={`${styles.iconesTable} ${styles.editIcon}`}
                    >
                      <EditIcon size={18} />
                    </IconButton>

                    <IconButton
                      onClick={() => onDelete(item)}
                      className={`${styles.iconesTable} ${styles.deleteIcon}`}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">Nenhuma transação encontrada.</td>
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
