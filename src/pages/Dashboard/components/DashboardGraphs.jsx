import { useEffect, useState } from "react";
import styles from "../styles.module.css";

import WalletAnalyticsChart from "../../../components/WalletAnalyticsChart";
import TrafficDonut from "../../../components/TrafficDonut";
import GraphCard from "../../../components/GraphsCard";
import { getTransactions } from "../../../services/transactionsServices";

export default function DashboardGraphs({ dashboardData = {} }) {
  const accountBalance = dashboardData.accountBalance || 0;
  const totalExpenses = dashboardData.expenses || 0;
  const safeBalance = dashboardData.vault || 0;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await getTransactions();
        console.log("response.data:", response);

        const data = Array.isArray(response) ? response : [];
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        setTransactions([]);
      }
    }

    loadTransactions();
  }, []);

  const total = accountBalance + totalExpenses + safeBalance;

  const donutData =
    total > 0
      ? [
          { name: "Saldo em conta", value: (accountBalance / total) * 100 },
          { name: "Despesas", value: (totalExpenses / total) * 100 },
          { name: "Cofre", value: (safeBalance / total) * 100 },
        ]
      : [
          { name: "Saldo em conta", value: 500 },
          { name: "Despesas", value: 300 },
          { name: "Cofre", value: 1000 },
        ];

  return (
    <div className={styles.graphs}>
      <GraphCard title="Carteira Analítica">
        <WalletAnalyticsChart transactions={transactions} />
      </GraphCard>

      <GraphCard title="Tráfego">
        <TrafficDonut data={donutData} />
      </GraphCard>
    </div>
  );
}
