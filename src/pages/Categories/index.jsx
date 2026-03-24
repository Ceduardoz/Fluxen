import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryServices";

import { ButtonIcon } from "../../components/Buttons";
import MainTemplate from "../../templates/MainTemplate";
import { CategoryCardItem } from "../../components/Card";
import { ConfirmModal } from "../../components/Modal/";
import CategoryFormModal from "../../components/Modal/CategoryModal";

import styles from "./styles.module.css";

const INITIAL_FORM_DATA = {
  name: "",
  color: "#7c3aed",
  categoryType: "INCOME",
};

export default function Categories() {
  const [summaryCards, setSummaryCards] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

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
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setSummaryCards([]);
    }
  }

  useEffect(() => {
    loadCardsCategories();
  }, []);

  function handleOpenCreateModal() {
    setSelectedCategory(null);
    setFormData(INITIAL_FORM_DATA);
    setCategoryModalOpen(true);
  }

  function handleOpenEditModal(category) {
    setSelectedCategory(category);
    setFormData({
      name: category.title ?? "",
      color: category.color ?? "#7c3aed",
      categoryType: category.categoryType ?? "INCOME",
    });
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    if (isSaving) return;

    setCategoryModalOpen(false);
    setSelectedCategory(null);
    setFormData(INITIAL_FORM_DATA);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitCategory(e) {
    e.preventDefault();

    try {
      setIsSaving(true);

      console.log(formData);

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, formData);
      } else {
        await createCategory(formData);
      }

      await loadCardsCategories();
      handleCloseCategoryModal();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      setIsSaving(false);
    }
  }

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

  console.log(summaryCards);

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
            <ButtonIcon onClick={handleOpenCreateModal}>
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
                  onEdit={() => handleOpenEditModal(card)}
                  onDelete={() => handleOpenDeleteModal(card)}
                />
              ))}
          </div>
        </section>
      </div>

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        onSubmit={handleSubmitCategory}
        formData={formData}
        onChange={handleChange}
        categoryToEdit={selectedCategory}
        isSaving={isSaving}
      />

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
