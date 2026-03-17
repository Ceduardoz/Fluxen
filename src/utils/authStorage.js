export function authStorage() {
  const token = localStorage.getItem("@token");
  return !!token;
}

export function getUser() {
  const user = localStorage.getItem("@user");
  return user ? JSON.parse(user) : null;
}
