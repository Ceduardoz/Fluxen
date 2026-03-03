import styles from "./styles.module.css";
import {
  ResponsiveContainer, // Tamanho do Gráfico
  AreaChart, // Gráfico da área
  Area, // Linha e preenchimento da área
  XAxis, // Horizontal
  YAxis, // Vertical
  Tooltip, // Tooltip
  CartesianGrid, // Grade de fundo
} from "recharts";

// dados Mock
const data = [
  { time: "10:00", value: 1200 },
  { time: "10:30", value: 4200 },
  { time: "11:00", value: 2800 },
  { time: "11:30", value: 6500 },
  { time: "12:00", value: 5200 },
  { time: "12:30", value: 9000 },
  { time: "13:00", value: 7800 },
  { time: "13:30", value: 11000 },
];

// formatar valores no padrão brasileiro
function formatMoney(v) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(v));
}

// Tooltip customizado do gráfico
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

export default function WalletAnalyticsChart() {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 10, left: 0, bottom: 0 }}
        >
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

          <CartesianGrid
            vertical={false}
            stroke="var(--text-muted)"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text)", fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text)", fontSize: 12 }}
            tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
          />

          <Tooltip content={<CustomTooltip />} />

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
