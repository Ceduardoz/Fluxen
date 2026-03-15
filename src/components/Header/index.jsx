import { useState, useEffect } from "react";
import { SunIcon, Moon, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import DefaultButton from "../DefaultButton";
import styles from "./styles.module.css";

export default function Header() {
  const navigate = useNavigate();
  const localtion = useLocation();

  const titles = {
    "/": "Bem Vindo, usuário",
    "/transacoes": "Transações",
  };

  function handleIsLogged() {
    let isLogged = false;

    if (!isLogged) return navigate("/auth");
    return navigate("/settingsAuth");
  }

  const pageTitle = titles[localtion.pathname] || "dashboard";

  // Pegar o tema pelo localStorage
  // Evita leitura desnecessária do localStorage a cada render.
  // Garante fallback seguro para "light".
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
        <DefaultButton onClick={handleIsLogged}>
          <User />
        </DefaultButton>

        {/* Botão mudança de tema. */}
        <DefaultButton
          aria-label="mudar tema"
          title="mudar tema"
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </DefaultButton>
      </div>
    </header>
  );
}
