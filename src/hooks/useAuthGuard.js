import { useNavigate } from "react-router-dom";
import { isLoggedInSchemas } from "../schemas/isLoggedSchemas";

export function useAuthGuard() {
  const navigate = useNavigate();

  function requireAuth(action) {
    if (!isLoggedInSchemas()) {
      navigate("/auth");
      return;
    }

    action();
  }

  return { requireAuth };
}
