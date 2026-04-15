import { useState, useMemo } from "react";
import styles from "./styles.module.css";
import DefaultInput from "../Inputs/DefaultInput";

const calculateProjection = (amount, rate, viewType) => {
  const p = Number(amount);
  const annualRateEff = (14.65 * (Number(rate) / 100)) / 100;
  const periods = viewType === "months" ? 12 : 10;

  const results = [];
  for (let t = 1; t <= periods; t++) {
    let m;
    if (viewType === "months") {
      const monthlyRate = Math.pow(1 + annualRateEff, 1 / 12) - 1;
      m = p * Math.pow(1 + monthlyRate, t);
    } else {
      m = p * Math.pow(1 + annualRateEff, t);
    }

    results.push({
      period: t,
      value: m,
      profit: m - p,
    });
  }
  return results;
};

export default function InvestmentSimulator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("100");
  const [viewType, setViewType] = useState("months");

  const results = useMemo(() => {
    if (!amount || amount <= 0) return [];
    return calculateProjection(amount, rate, viewType);
  }, [amount, rate, viewType]);

  return (
    <div className={styles.simulatorContainer}>
      <p className={styles.helperText}>
        Simule o rendimento baseado na taxa CDI atual (11,75% a.a.)
      </p>

      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label className={styles.label}>Quanto você tem?</label>
          <DefaultInput
            type="number"
            name="amount"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>% do CDI</label>
          <DefaultInput
            type="number"
            name="rate"
            placeholder="100"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={viewType === "months" ? styles.activeTab : styles.tab}
          onClick={() => setViewType("months")}
        >
          Mensal (1 ano)
        </button>
        <button
          className={viewType === "years" ? styles.activeTab : styles.tab}
          onClick={() => setViewType("years")}
        >
          Anual (10 anos)
        </button>
      </div>

      <div className={styles.resultsWrapper}>
        {results.length > 0 ? (
          <div className={styles.resultsList}>
            {results.map((item) => (
              <div key={item.period} className={styles.resultRow}>
                <span className={styles.periodLabel}>
                  {item.period}
                  {viewType === "months" ? "º mês" : "º ano"}
                </span>
                <div className={styles.valueGroup}>
                  <span className={styles.totalValue}>
                    R${" "}
                    {item.value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className={styles.profitValue}>
                    + R${" "}
                    {item.profit.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Insira um valor para ver a projeção do seu dinheiro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
