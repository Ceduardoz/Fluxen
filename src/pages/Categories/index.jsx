import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import { getCategories } from "../../services/categoryServices";
import { ButtonIcon } from "../../components/Buttons";
import MainTemplate from "../../templates/MainTemplate";
import { CategoryCardItem } from "../../components/Card";

import styles from "./styles.module.css";

export default function Categories() {
  const [summaryCards, setSummaryCards] = useState([]);

  useEffect(() => {
    async function loadCardsCategories() {
      try {
        const data = await getCategories();

        setSummaryCards(
          data.map((category) => ({
            userId: category.userId,
            color: category.color,
            title: category.name,
            categoryType: category.categoryType,
          })),
        );
      } catch (e) {
        console.log(e);
      }
    }

    loadCardsCategories();
  }, []);

  return (
    <MainTemplate>
      <div className={styles.categoriesWrapper}>
        <section className={`${styles.field}`}>
          <h2 className={styles.title}>Categorias</h2>
          <div className={styles.cardsGrid}>
            {summaryCards
              .filter((card) => card.userId === null)
              .map((card) => (
                <CategoryCardItem
                  key={card.title}
                  title={card.title}
                  type={card.categoryType}
                  color={card.color}
                  isCustom={card.userId === null ? false : true}
                />
              ))}
          </div>
        </section>

        <section className={`${styles.field}`}>
          <h2 className={styles.title}>
            Minhas Categorias{" "}
            <ButtonIcon>
              <CirclePlus />
            </ButtonIcon>
          </h2>

          <div className={styles.cardsGrid}>
            {summaryCards
              .filter((card) => card.userId !== null)
              .map((card) => (
                <CategoryCardItem
                  key={card.title}
                  title={card.title}
                  type={card.categoryType}
                  color={card.color}
                  isCustom={card.userId === null ? false : true}
                />
              ))}
          </div>
        </section>
      </div>
    </MainTemplate>
  );
}
