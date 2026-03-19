import { useState, useEffect } from "react";
import { SunIcon, Moon, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { getMe } from "../../services/authServices";
import { ButtonIcon } from "../Buttons";
import styles from "./styles.module.css";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const localtion = useLocation();

  useEffect(() => {
    async function loadUser() {
      const user = await getMe();
      setUser(user);
    }

    loadUser();
  }, []);

  const titles = {
    "/": `Bem Vindo, ${user.name || "usuário"}`,
    "/transacoes": "Transações",
  };

  function handleIsLogged() {
    let isLogged = localStorage.getItem("token");

    if (!isLogged) return navigate("/auth");
    return navigate("/settingsAuth");
  }

  const pageTitle = titles[localtion.pathname] || "dashboard";

  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme === "dark" || storageTheme === "light") {
      return storageTheme;
    }
    return "light";
  });

  // Objeto para definir o icone
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <Moon />,
  };

  function handleThemeChange(e) {
    e.preventDefault();

    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  // Mudança de tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className={styles.header}>
      <h4 className={styles.NameUser}>{pageTitle}</h4>

      <div className={styles.icones}>
        <ButtonIcon onClick={handleIsLogged}>
          <User />
        </ButtonIcon>

        {/* Botão mudança de tema. */}
        <ButtonIcon
          aria-label="mudar tema"
          title="mudar tema"
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </ButtonIcon>
      </div>
    </header>
  );
}
