import styles from "../styles.module.css";
import WalletAnalyticsChart from "../../../components/WalletAnalyticsChart";
import TrafficDonut from "../../../components/TrafficDonut";
import GraphCard from "../../../components/GraphsCard";

// Card para cada gráfico do dashboard
export default function DashboardGraphs({ dashboardData }) {
  const accountBalance = dashboardData.accountBalance || 0;
  const totalExpenses = dashboardData.expenses || 0;
  const safeBalance = dashboardData.vault || 0;

  const total = accountBalance + totalExpenses + safeBalance;

  const donutData =
    total > 0
      ? [
          {
            name: "Saldo em conta",
            value: (accountBalance / total) * 100,
          },
          {
            name: "Despesas",
            value: (totalExpenses / total) * 100,
          },
          {
            name: "Cofre",
            value: (safeBalance / total) * 100,
          },
        ]
      : [
          { name: "Saldo em conta", value: 0 },
          { name: "Despesas", value: 0 },
          { name: "Cofre", value: 0 },
        ];

  return (
    <div className={styles.graphs}>
      <GraphCard title="Carteira Analítica">
        <WalletAnalyticsChart />
      </GraphCard>

      <GraphCard title="Tráfego">
        <TrafficDonut data={donutData} />
      </GraphCard>
    </div>
  );
}
