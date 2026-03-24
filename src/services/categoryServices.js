import api from "./server";

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

export async function deleteCategory(id) {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
}
