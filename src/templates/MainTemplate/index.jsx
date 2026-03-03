import styles from "./styles.module.css";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";

// Template geral do app
export default function MainTemplate({ children }) {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
