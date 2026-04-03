import api from "./server";

export async function getAccount() {
  const response = await api.get("/account");
  return response.data;
}

export async function postAccount(data) {
  const response = await api.post("/account", data);
  return response.data;
}

export async function deleteAccount(id) {
  const response = await api.delete(`/account/${id}`);
  return response.data;
}

export async function patchAccount(id, data) {
  const response = await api.patch(`/account/${id}`, data);
  return response.data;
}
