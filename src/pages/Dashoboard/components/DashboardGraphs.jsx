import styles from "../styles.module.css";
import WalletAnalyticsChart from "../../../components/WalletAnalyticsChart";
import TrafficDonut from "../../../components/TrafficDonut";
import GraphCard from "../../../components/GraphsCard";

// Card para cada gráfico do dashboard
export default function DashboardGraphs() {
  return (
    <div className={styles.content}>
      <GraphCard title="Carteira Analítica">
        <WalletAnalyticsChart />
      </GraphCard>

      <GraphCard title="Tráfego">
        <TrafficDonut />
      </GraphCard>
    </div>
  );
}
