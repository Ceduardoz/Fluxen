import { useNavigate } from "react-router-dom";
import { authStorage } from "../utils/authStorage";

export function useAuthGuard() {
  const navigate = useNavigate();

  function requireAuth(action) {
    if (!authStorage()) {
      navigate("/auth");
      return;
    }

    action();
  }

  return { requireAuth };
}
