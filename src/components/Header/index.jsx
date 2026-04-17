import { useState, useEffect } from "react";
import { SunIcon, Moon, User, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { getMe } from "../../services/authServices";
import IconButton from "../Buttons/IconButton";
import styles from "./styles.module.css";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      const userData = await getMe();
      setUser(userData);
    }
    loadUser();
  }, []);

  const titles = {
    "/": `Bem Vindo, ${user.name || "usuário"}`,
    "/transactions": "Transações",
    "/categories": "Categorias",
    "/vault": "Metas",
    "/investments": "Investimentos",
    "/user-settings": "Configurações",
  };

  const pageTitle = titles[location.pathname] || "Dashboard";

  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem("theme");
    return storageTheme === "dark" || storageTheme === "light"
      ? storageTheme
      : "light";
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <Moon />,
  };

  function handleThemeChange(e) {
    e.preventDefault();
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleIsLogged() {
    let token = localStorage.getItem("token");
    if (!token) return navigate("/auth");
    return navigate("/user-settings");
  }

  return (
    <header className={styles.header}>
      {/* Botão de menu que aciona a prop onMenuClick */}
      <IconButton className={styles.menuButton} onClick={onMenuClick}>
        <Menu size={24} />
      </IconButton>

      <h4 className={styles.NameUser}>{pageTitle}</h4>

      <div className={styles.icones}>
        <IconButton onClick={handleIsLogged}>
          <User size={20} />
        </IconButton>

        <IconButton
          aria-label="mudar tema"
          title="mudar tema"
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </IconButton>
      </div>
    </header>
  );
}
