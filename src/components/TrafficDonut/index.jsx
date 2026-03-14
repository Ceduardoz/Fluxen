import styles from "./styles.module.css";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#7a4dff", "#ff2d5a", "#3b82f6"];

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const p = payload[0];

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{p.name}</span>
      <strong className={styles.tooltipValue}>{formatPercent(p.value)}</strong>
    </div>
  );
}

export default function TrafficDonut({ data = [] }) {
  const total = data.reduce((acc, i) => acc + Number(i.value || 0), 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartBox}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={2}
              stroke="transparent"
            >
              {data.map((item, idx) => (
                <Cell key={item.name} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.center}>
          <span className={styles.centerTop}>Total</span>
          <strong className={styles.centerValue}>{formatPercent(total)}</strong>
        </div>
      </div>

      <div className={styles.legend}>
        {data.map((item, i) => (
          <div key={item.name} className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className={styles.legendText}>
              <strong>{formatPercent(item.value)}</strong> {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
