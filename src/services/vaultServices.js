import api from "./server";

export async function getVaults() {
  const response = await api.get(`/vaults`);
  return response.data;
}

export async function postVault(data) {
  const response = await api.post("/vaults", data);
  return response.data;
}

export async function deleteVault(id) {
  const response = await api.delete(`/vaults/${id}`);
  return response.data;
}

export async function patchVault(id, data) {
  const response = await api.patch(`/vaults/${id}`, data);
  return response.data;
}

export async function depositVault(id, data) {
  const response = await api.post(`/vaults/${id}/deposit`, data);
  return response.data;
}

export async function withdrawVault(id, data) {
  const response = await api.post(`/vaults/${id}/withdraw`, data);
  return response.data;
}
