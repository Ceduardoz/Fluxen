import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import { getCategories, deleteCategory } from "../../services/categoryServices";
import { ButtonIcon } from "../../components/Buttons";
import MainTemplate from "../../templates/MainTemplate";
import { CategoryCardItem } from "../../components/Card";
import { ConfirmModal } from "../../components/Modal";

import styles from "./styles.module.css";

export default function Categories() {
  const [summaryCards, setSummaryCards] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadCardsCategories() {
    try {
      const data = await getCategories();

      setSummaryCards(
        data.map((category) => ({
          id: category.id,
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

  useEffect(() => {
    loadCardsCategories();
  }, []);

  function handleOpenDeleteModal(category) {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  }

  async function handleConfirmDeleteCategory() {
    if (!categoryToDelete) return;

    try {
      setIsDeleting(true);
      await deleteCategory(categoryToDelete.id);
      await loadCardsCategories();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MainTemplate>
      <div className={styles.categoriesWrapper}>
        <section className={styles.field}>
          <h2 className={styles.title}>Categorias</h2>

          <div className={styles.cardsGrid}>
            {summaryCards
              .filter((card) => card.userId === null)
              .map((card) => (
                <CategoryCardItem
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  type={card.categoryType}
                  color={card.color}
                  isCustom={false}
                />
              ))}
          </div>
        </section>

        <section className={styles.field}>
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
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  type={card.categoryType}
                  color={card.color}
                  isCustom={true}
                  onDelete={() => handleOpenDeleteModal(card)}
                />
              ))}
          </div>
        </section>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteCategory}
        title="Excluir categoria"
        message={`Tem certeza que deseja excluir a categoria "${categoryToDelete?.title || ""}"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </MainTemplate>
  );
}
