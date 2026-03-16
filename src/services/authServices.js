import api from "./server";

export async function postRegister(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function postLogin(data) {
  const response = await api.post("/auth/login", data);
  return response.data;
}
