import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

import MainTemplate from "../../templates/MainTemplate";
import DefaultButton from "../../components/Buttons/DefaultButton";
import LoadingPage from "../../components/LoadingPage";
import VaultsCardItem from "../../components/Card/VaultsCardItem";

import {
  getVaults,
  postVault,
  patchVault,
  deleteVault,
  depositVault,
  withdrawVault,
} from "../../services/vaultServices";

import styles from "./styles.module.css";

import VaultModal from "../../components/Modal/VaultModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DepositWithDrawModal from "../../components/Modal/DepositWithDrawModal";

const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  targetAmount: "",
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
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [transactionForm, setTransactionForm] = useState({ amount: "" });

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

  function handleOpenDeleteModal(vault) {
    setVaultToDelete(vault);
    setIsDeleteModalOpen(true);
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

  function handleOpenTransactionModal(vault, type) {
    setSelectedVault(vault);
    setTransactionType(type);
    setTransactionForm({ amount: "" });
    setTransactionModalOpen(true);
  }

  function handleTransactionChange(e) {
    const { name, value } = e.target;

    setTransactionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitTransaction(e) {
    e.preventDefault();

    try {
      setIsSaving(true);

      const amount = Number(transactionForm.amount);

      if (!amount || amount <= 0) {
        return;
      }

      if (transactionType === "deposit") {
        await depositVault(selectedVault.id, { amount });
      } else {
        await withdrawVault(selectedVault.id, { amount });
      }

      await loadVaults();
      setTransactionModalOpen(false);
    } catch (error) {
      console.error("Erro na transação:", error);
    } finally {
      setIsSaving(false);
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
              <h2 className={styles.title}>Minhas Metas</h2>

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
                    onDeposit={() =>
                      handleOpenTransactionModal(card, "deposit")
                    }
                    onWithdraw={() =>
                      handleOpenTransactionModal(card, "withdraw")
                    }
                  />
                ))}
            </div>
          </section>
        </div>
      )}

      {/* CREATE / EDIT */}
      <VaultModal
        isOpen={isVaultModalOpen}
        onClose={handleCloseVaultModal}
        onSubmit={handleSubmitVault}
        formData={formData}
        onChange={handleChange}
        isSaving={isSaving}
        onEdit={handleOpenEditModal}
      />

      {/* DELETE */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteVault}
        title="Excluir caixinha"
        message={`Tem certeza que deseja excluir a caixinha "${
          vaultToDelete?.title || ""
        }"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />

      {/* TRANSAÇÃO */}
      <DepositWithDrawModal
        isOpen={isTransactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSubmit={handleSubmitTransaction}
        formData={transactionForm}
        onChange={handleTransactionChange}
        type={transactionType}
        vaultName={selectedVault?.title}
        isSaving={isSaving}
      />
    </MainTemplate>
  );
}
