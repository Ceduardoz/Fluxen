import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

import MainTemplate from "../../templates/MainTemplate";
import DefaultButton from "../../components/Buttons/DefaultButton";
import LoadingPage from "../../components/LoadingPage";
// Importe o card e as funções de serviço que estavam faltando
import VaultsCardItem from "../../components/Card/VaultsCardItem";
import {
  getVaults,
  postVault,
  patchVault,
  deleteVault,
} from "../../services/vaultServices";

import styles from "./styles.module.css";
import CategoryModal from "../../components/Modal/CategoryModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  targetAmount: 0,
  color: "#7c3aed",
};

export default function Vault() {
  const [summaryCards, setSummaryCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vaultToDelete, setVaultToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVaultModalOpen, setVaultModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function loadVaults() {
    try {
      setLoading(true);
      const data = await getVaults();
      setSummaryCards(
        data.map((vault) => ({
          id: vault.id,
          userId: vault.userId,
          color: vault.color,
          title: vault.name,
          balance: vault.balance,
          description: vault.description,
          targetAmount: vault.targetAmount,
        })),
      );
    } catch (error) {
      console.error("Erro ao buscar caixinhas:", error);
      setSummaryCards([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVaults();
  }, []);

  function handleOpenCreateModal() {
    setSelectedVault(null);
    setFormData(INITIAL_FORM_DATA);
    setVaultModalOpen(true);
  }

  function handleOpenEditModal(vault) {
    setSelectedVault(vault);
    setFormData({
      name: vault.title ?? "",
      description: vault.description ?? "",
      targetAmount: vault.targetAmount ?? 0,
      color: vault.color ?? "#7c3aed",
    });
    setVaultModalOpen(true);
  }

  function handleOpenDeleteModal(category) {
    setVaultToDelete(category);
    setIsDeleteModalOpen(true);
  }

  function handleCloseVaultModal() {
    if (isSaving) return;
    setVaultModalOpen(false);
    setSelectedVault(null);
    setFormData(INITIAL_FORM_DATA);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "targetAmount" ? Number(value) : value,
    }));
  }

  async function handleSubmitVault(e) {
    e.preventDefault();
    try {
      setIsSaving(true);
      if (selectedVault) {
        await patchVault(selectedVault.id, formData);
      } else {
        await postVault(formData);
      }
      await loadVaults();
      handleCloseVaultModal();
    } catch (error) {
      console.error("Erro ao salvar caixinha:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;

    setIsDeleteModalOpen(false);
    setVaultToDelete(null);
  }

  async function handleConfirmDeleteVault() {
    if (!vaultToDelete) return;

    try {
      setIsDeleting(true);
      await deleteVault(vaultToDelete.id);
      await loadVaults();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir caixinha:", error);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <MainTemplate>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={styles.vaultsWrapper}>
          <section className={styles.field}>
            <div className={styles.headerVault}>
              <h2 className={styles.title}>Minhas Caixinhas</h2>
              <div className={styles.spacer}>
                <DefaultButton onClick={handleOpenCreateModal}>
                  <CirclePlus /> Adicionar Caixinha
                </DefaultButton>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {summaryCards
                .filter((card) => card.userId !== null)
                .map((card) => (
                  <VaultsCardItem
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    targetAmount={card.targetAmount}
                    balance={card.balance}
                    color={card.color}
                    isCustom={true}
                    onEdit={() => handleOpenEditModal(card)}
                    onDelete={() => handleOpenDeleteModal(card)}
                  />
                ))}
            </div>
          </section>
        </div>
      )}

      <CategoryModal
        isOpen={isVaultModalOpen}
        onClose={handleCloseVaultModal}
        onSubmit={handleSubmitVault}
        formData={formData}
        onChange={handleChange}
        categoryToEdit={selectedVault}
        isSaving={isSaving}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteVault}
        title="Excluir caixinha"
        message={`Tem certeza que deseja excluir a caixinha "${vaultToDelete?.title || ""}"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </MainTemplate>
  );
}
