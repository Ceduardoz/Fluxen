import styles from "./styles.module.css";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// Dados mock.
const data = [
  { name: "Saldo em conta", value: 33 },
  { name: "Despesas", value: 55 },
  { name: "Cofre", value: 12 },
];

// Paleta do gráfico.
const COLORS = [
  /*--accent-purple-1:*/ "#7a4dff",
  /*--accent-red-1:*/ "#ff2d5a",
  /*--accent-blue-1:*/ "#3b82f6",
];

// Tooltip custom do Recharts.
// Atenção: payload do Recharts muda conforme config; manter defensivo (active/payload).
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const p = payload[0];
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{p.name}</span>
      <strong className={styles.tooltipValue}>{p.value}%</strong>
    </div>
  );
}

export default function TrafficDonut() {
  // Total central do gráfico: assume que os valores são percentuais.
  const total = data.reduce((acc, i) => acc + i.value, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartBox}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Donut chart principal */}
            <Pie
              data={data}
              dataKey="value"
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={2}
              stroke="transparent"
            >
              {/* Cores por índice */}
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>

            {/* Tooltip com UI custom */}
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centro do gráfico: conteúdo de resumo/total */}
        <div className={styles.center}>
          <span className={styles.centerTop}>Total</span>
          <strong className={styles.centerValue}>{total}%</strong>
        </div>
      </div>

      {/* Legenda: espelha dataset e paleta */}
      <div className={styles.legend}>
        {data.map((item, i) => (
          <div key={item.name} className={styles.legendItem}>
            {/* Dot com cor correspondente */}
            <span className={styles.dot} style={{ background: COLORS[i] }} />
            <span className={styles.legendText}>
              <strong>{item.value}%</strong> {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
