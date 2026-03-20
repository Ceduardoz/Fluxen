import api from "./server";

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}
