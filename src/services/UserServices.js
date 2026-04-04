import api from "./server";

export async function updateUser(data) {
  const response = await api.patch("/user", data);
  return response.data;
}

export async function deleteUser() {
  const response = await api.delete(`/user`);
  return response.data;
}
