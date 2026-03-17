import { useEffect, useState } from "react";
import api from "../../services/server";

import { useAuthGuard } from "../../hook/useAuthGuard";
import SummaryCards from "./components/SummaryCards";
import DashboardGraphs from "./components/DashboardGraphs";
import MainTemplate from "../../templates/MainTemplate";

export default function Dashboard() {
  useAuthGuard();

  const [summaryCards, setSummaryCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    accountBalance: 0,
    expenses: 0,
    vault: 0,
    investment: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardResponse, transactionsResponse] = await Promise.all([
          api.get("/dashboard"),
          api.get("/transactions"),
        ]);

        const data = dashboardResponse.data;
        const transactionsData = transactionsResponse.data;

        setDashboardData({
          accountBalance: Number(data.accountBalance || 0),
          expenses: Number(data.expenses || 0),
          vault: Number(data.vault || 0),
          investment: Number(data.investment || 0),
        });

        setTransactions(
          Array.isArray(transactionsData) ? transactionsData : [],
        );

        setSummaryCards([
          {
            variant: "balance",
            title: "Total em Conta",
            value: `R$ ${Number(data.accountBalance || 0).toFixed(2)}`,
          },
          {
            variant: "expenses",
            title: "Despesas",
            value: `R$ ${Number(data.expenses || 0).toFixed(2)}`,
          },
          {
            variant: "safe",
            title: "Cofre",
            value: `R$ ${Number(data.vault || 0).toFixed(2)}`,
          },
          {
            variant: "investments",
            title: "Investimento",
            value: `R$ ${Number(data.investment || 0).toFixed(2)}`,
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dashboard:", error);

        setDashboardData({
          accountBalance: 0,
          expenses: 0,
          vault: 0,
          investment: 0,
        });

        setTransactions([]);

        setSummaryCards([
          { variant: "balance", title: "Total em Conta", value: "R$ 0,00" },
          { variant: "expenses", title: "Despesas", value: "R$ 0,00" },
          { variant: "safe", title: "Cofre", value: "R$ 0,00" },
          { variant: "investments", title: "Investimento", value: "R$ 0,00" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <MainTemplate>
      {loading ? (
        <p>Carregando dashboard...</p>
      ) : (
        <>
          <SummaryCards cards={summaryCards} />
          <DashboardGraphs
            dashboardData={dashboardData}
            transactions={transactions}
          />
        </>
      )}
    </MainTemplate>
  );
}
