import api from "./server";

export async function getTransactions() {
  const response = await api.get("/transactions");
  return response.data;
}

export async function postTransactions(data) {
  const response = await api.post("/transactions", data);
  return response.data;
}

export async function deleteTransaction(id) {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
}

export async function patchTransaction(id) {
  const response = await api.patch(`/transactions/${id}`);
  return response.data;
}
