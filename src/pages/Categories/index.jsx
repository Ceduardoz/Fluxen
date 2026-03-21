import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import { getCategories } from "../../services/categoryServices";
import { ButtonIcon, DefaultButton } from "../../components/Buttons";
import MainTemplate from "../../templates/MainTemplate";
import { CategoryCardItem } from "../../components/Card";

import styles from "./styles.module.css";

export default function Categories() {
  const [summaryCards, setSummaryCards] = useState([]);

  const categoryVariantMap = {
    Alimentação: "food",
    Moradia: "housing",
    Salário: "salary",
    Lazer: "leisure",
    Transporte: "transport",
    Educação: "education",
    Assinaturas: "subscriptions",
    Outros: "others",
    Saúde: "health",
  };

  useEffect(() => {
    async function loadCardsCategories() {
      try {
        const data = await getCategories();

        setSummaryCards(
          data.map((category) => ({
            variant: categoryVariantMap[category.name] || "default",
            title: category.name,
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
        <section className={`${styles.field} ${styles.fieldCategoriesGlobals}`}>
          <h2>Categorias</h2>
          <div className={styles.cardsGrid}>
            {summaryCards.map((card) => (
              <CategoryCardItem
                key={card.title}
                variant={card.variant}
                title={card.title}
              />
            ))}
          </div>
        </section>

        <section className={`${styles.field} ${styles.fieldCategoriesPrivate}`}>
          <h2 className={styles.title}>Minhas Categorias </h2>
          <ButtonIcon>
            <CirclePlus />
          </ButtonIcon>
        </section>
      </div>
    </MainTemplate>
  );
}
