export function calculateProjection(amount, rate, periods, viewType) {
  const p = Number(amount);
  const annualRateEff = (11.75 * (Number(rate) / 100)) / 100;

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
}
