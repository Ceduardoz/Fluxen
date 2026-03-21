import { DefaultButton } from "../../components/Buttons";
import MainTemplate from "../../templates/MainTemplate";

import styles from "./styles.module.css";

export default function Categories() {
  return (
    <MainTemplate>
      <section className={styles.field}></section>

      <section className={styles.field}>
        <div></div>
        <h2 className={styles.title}>Minhas Categorias</h2>
        <DefaultButton />
      </section>
    </MainTemplate>
  );
}
