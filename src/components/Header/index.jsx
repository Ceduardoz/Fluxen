import { useState, useEffect } from "react";
import { SunIcon, Moon } from "lucide-react";

import styles from "./styles.module.css";

export default function Header() {
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
      <h4 className={styles.NameUser}>Bem Vindo (Usuario)</h4>

      {/* Botão mudança de tema. */}
      <button
        aria-label="mudar tema"
        title="mudar tema"
        className={styles.buttonTheme}
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </button>
    </header>
  );
}
