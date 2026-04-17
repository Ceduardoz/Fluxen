import { useState } from "react";

import styles from "./styles.module.css";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";

// Template geral do app
export default function MainTemplate({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Cliquei no menu!"); // Adicione este log para testar
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.appShell}>
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <Header onMenuClick={toggleSidebar} />

          <main className={styles.main}>{children}</main>

          {isSidebarOpen && (
            <div className={styles.overlay} onClick={closeSidebar} />
          )}
        </div>
      </div>
    </div>
  );
}
