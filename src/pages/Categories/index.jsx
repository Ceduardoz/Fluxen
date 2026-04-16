import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryServices";

import {
  categorySchema,
  updateCategorySchema,
} from "../../schemas/categorySchemas";

import MainTemplate from "../../templates/MainTemplate";
import CategoryCardItem from "../../components/Card/CategoryCardItem";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import CategoryModal from "../../components/Modal/CategoryModal";
import LoadingPage from "../../components/LoadingPage";
import DefaultButton from "../../components/Buttons/DefaultButton";

import styles from "./styles.module.css";

const INITIAL_FORM_DATA = {
  name: "",
  color: "#7c3aed",
  categoryType: "INCOME",
};

export default function Categories() {
  const [summaryCards, setSummaryCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const [errors, setErrors] = useState({});

  async function loadCardsCategories() {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCardsCategories();
  }, []);

  function handleOpenCreateModal() {
    setSelectedCategory(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setMessage("");
    setMessageType(undefined);
    setCategoryModalOpen(true);
  }

  function handleOpenEditModal(category) {
    setSelectedCategory(category);

    setFormData({
      name: category.title ?? "",
      color: category.color ?? "#7c3aed",
      categoryType: category.categoryType ?? "INCOME",
    });

    setErrors({});
    setMessage("");
    setMessageType(undefined);
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    if (isSaving) return;

    setCategoryModalOpen(false);
    setSelectedCategory(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setMessage("");
    setMessageType(undefined);
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

    setErrors({});
    setMessage("");
    setMessageType(undefined);

    const schema = selectedCategory ? updateCategorySchema : categorySchema;

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSaving(true);

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, result.data);

        setMessageType("success");
        setMessage("Categoria atualizada com sucesso");
      } else {
        setMessageType("success");
        setMessage("Categoria criada com sucesso");
        await createCategory(result.data);
      }

      setTimeout(async () => {
        handleCloseCategoryModal();
        await loadCardsCategories();
      }, 1800);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);

      setMessageType("error");
      setMessage("Erro ao salvar categoria");
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

  return (
    <MainTemplate>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className={styles.categoriesWrapper}>
            <section className={styles.field}>
              <div className={styles.headerCategories}>
                <h2 className={styles.title}>Categorias</h2>
              </div>

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
              <div className={styles.headerCategories}>
                <h2 className={styles.title}>Minhas Categorias</h2>

                <div className={styles.spacer}>
                  <DefaultButton onClick={handleOpenCreateModal}>
                    <CirclePlus />
                    Adicionar Categoria
                  </DefaultButton>
                </div>
              </div>

              <div className={`${styles.cardsGrid} ${styles.scrollbar}`}>
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

          <CategoryModal
            isOpen={isCategoryModalOpen}
            onClose={handleCloseCategoryModal}
            onSubmit={handleSubmitCategory}
            formData={formData}
            onChange={handleChange}
            categoryToEdit={selectedCategory}
            isSaving={isSaving}
            message={message}
            messageType={messageType}
            errors={errors}
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
        </div>
      )}
    </MainTemplate>
  );
}
