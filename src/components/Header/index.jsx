import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, Icon, Type } from "lucide-react";

import styles from "./styles.module.css";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.setItem("theme");
    if (storageTheme === "dark" || storageTheme === "light")
      return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(event) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" || "light";

      return nextTheme;
    });
  }

  return (
    <header className={styles.header}>
      <h4 className={styles.NameUser}>Bem Vindo (Usuario)</h4>

      <SunIcon />
    </header>
  );
}
