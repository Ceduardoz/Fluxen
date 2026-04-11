import api from "./server";

export async function getGoals() {
  const response = await api.get("/goals");
  return response.data;
}

export async function postGoal(data) {
  const response = await api.post("/goals", data);
  return response.data;
}

export async function patchGoal(id, data) {
  const response = await api.patch(`/goals/${id}`, data);
  return response.data;
}

export async function deleteGoal(id) {
  const response = await api.delete(`/goals/${id}`);
  return response.data;
}

export async function createGoalTransaction(data) {
  const response = await api.post("/transactions", data);
  return response.data;
}

export async function getAccountsForGoal() {
  const response = await api.get("/account");
  return response.data;
}
