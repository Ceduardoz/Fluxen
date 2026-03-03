import SummaryCards from "./components/SummaryCards";
import DashboardGraphs from "./components/DashboardGraphs";
import MainTemplate from "../../templates/MainTemplate";

// dados Mock
const SUMMARY_CARDS = [
  { variant: "balance", title: "Saldo em Conta", value: "R$3000" },
  { variant: "expenses", title: "Despesas", value: "R$3000" },
  { variant: "safe", title: "Cofre", value: "R$3000" },
  { variant: "performance", title: "Rendimento", value: "R$3000" },
];

export default function Dashboard() {
  return (
    <MainTemplate>
      <SummaryCards cards={SUMMARY_CARDS} />
      <DashboardGraphs />
    </MainTemplate>
  );
}
