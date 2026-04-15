import api from "./server";

export async function getInvestments() {
  const response = await api.get("/investments");
  return response.data;
}

export async function getInvestmentById(id) {
  const response = await api.get(`/investments/${id}`);
  return response.data;
}

export async function postInvestment(data) {
  const response = await api.post("/investments", data);
  return response.data;
}

export async function deleteInvestment(id) {
  const response = await api.delete(`/investments/${id}`);
  return response.data;
}
