import api from "./server";

export async function getVaults() {
  const response = await api.get(`/vault`);
  return response.data;
}

export async function postVault(data) {
  const response = await api.post("/vault", data);
  return response.data;
}

export async function deleteVault(id) {
  const response = await api.delete(`/vault/${id}`);
  return response.data;
}

export async function patchVault(id, data) {
  const response = await api.patch(`/vault/${id}`, data);
  return response.data;
}
