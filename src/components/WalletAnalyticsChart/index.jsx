import styles from "./styles.module.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// formatar dinheiro
function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

// tooltip custom
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipLabel}>{label}</span>
      <strong className={styles.tooltipValue}>
        {formatMoney(payload[0].value)}
      </strong>
    </div>
  );
}

export default function WalletAnalyticsChart({ transactions = [] }) {
  // remove transferências e ordena por data
  const filteredTransactions = transactions
    .filter((transaction) => transaction.type !== "TRANSFER")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = filteredTransactions.reduce((acc, transaction) => {
    const amount =
      transaction.type === "EXPENSE"
        ? -Number(transaction.amount || 0)
        : Number(transaction.amount || 0);

    const previousBalance = acc.length > 0 ? acc[acc.length - 1].value : 0;

    const newBalance = previousBalance + amount;

    acc.push({
      time: new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      value: newBalance,
    });

    return acc;
  }, []);

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
        >
          {/* Gradiente da área */}
          <defs>
            <linearGradient id="walletFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--chart-color)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--chart-color)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          {/* grade */}
          <CartesianGrid
            vertical={false}
            stroke="var(--text-muted)"
            strokeDasharray="4 4"
          />

          {/* eixo X */}
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text)", fontSize: 12 }}
          />

          {/* eixo Y */}
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text)", fontSize: 12 }}
            tickFormatter={(v) =>
              Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k` : v
            }
          />

          {/* tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* área */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--chart-color)"
            strokeWidth={3}
            fill="url(#walletFill)"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
