import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";

import {
  getGoals,
  postGoal,
  patchGoal,
  deleteGoal,
  createGoalTransaction,
  getAccountsForGoal,
} from "../../services/goalServices";

import styles from "./styles.module.css";

import MainTemplate from "../../templates/MainTemplate";
import DefaultButton from "../../components/Buttons/DefaultButton";
import LoadingPage from "../../components/LoadingPage";

import GoalCardItem from "../../components/Card/GoalCardItem";
import GoalModal from "../../components/Modal/GoalModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DepositWithDrawModal from "../../components/Modal/DepositWithDrawModal";

const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  targetAmount: "",
  accountId: "",
  color: "#7c3aed",
};

export default function GoalPage() {
  const [summaryCards, setSummaryCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isGoalModalOpen, setGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [transactionForm, setTransactionForm] = useState({ amount: "" });

  async function loadData() {
    try {
      setLoading(true);
      const [goalsData, accountsData] = await Promise.all([
        getGoals(),
        getAccountsForGoal(),
      ]);

      setAccounts(accountsData);

      setSummaryCards(
        goalsData.map((goal) => ({
          id: goal.id,
          accountId: goal.accountId,
          title: goal.name,
          balance: Number(goal.currentAmount || 0),
          description: goal.description,
          targetAmount: Number(goal.targetAmount || 0),
          color: goal.color,
        })),
      );
    } catch (error) {
      console.error("Erro ao buscar dados das metas:", error);
      setSummaryCards([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleOpenCreateModal() {
    setSelectedGoal(null);
    setFormData(INITIAL_FORM_DATA);
    setGoalModalOpen(true);
  }

  function handleOpenEditModal(goal) {
    setSelectedGoal(goal);
    setFormData({
      name: goal.title ?? "",
      description: goal.description ?? "",
      targetAmount: goal.targetAmount ?? 0,
      accountId: goal.accountId ?? "",
      color: goal.color ?? "#7c3aed",
    });
    setGoalModalOpen(true);
  }

  function handleCloseGoalModal() {
    if (isSaving) return;
    setGoalModalOpen(false);
    setSelectedGoal(null);
    setFormData(INITIAL_FORM_DATA);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "targetAmount" || name === "accountId" ? Number(value) : value,
    }));
  }

  async function handleSubmitGoal(e) {
    e.preventDefault();

    try {
      setIsSaving(true);

      if (selectedGoal) {
        const { accountId: _, ...dataToUpdate } = formData;
        await patchGoal(selectedGoal.id, dataToUpdate);
      } else {
        await postGoal(formData);
      }

      await loadData();
      handleCloseGoalModal();
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleOpenDeleteModal(goal) {
    setGoalToDelete(goal);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setGoalToDelete(null);
  }

  async function handleConfirmDeleteGoal() {
    if (!goalToDelete) return;

    try {
      setIsDeleting(true);
      await deleteGoal(goalToDelete.id);
      await loadData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir meta:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleOpenTransactionModal(goal, type) {
    setSelectedGoal(goal);
    setTransactionType(type);
    setTransactionForm({ amount: "" });
    setTransactionModalOpen(true);
  }

  function handleTransactionChange(e) {
    const { name, value } = e.target;
    setTransactionForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitTransaction(e) {
    e.preventDefault();

    try {
      setIsSaving(true);
      const amount = Number(transactionForm.amount);

      if (!amount || amount <= 0) return;

      const transactionPayload = {
        title:
          transactionType === "deposit"
            ? "Depósito na Meta"
            : "Resgate da Meta",
        amount: amount,
        type: transactionType === "deposit" ? "RESERVE" : "UNRESERVE",
        date: new Date().toISOString(),
        accountId: selectedGoal.accountId,
        goalId: selectedGoal.id,
      };

      await createGoalTransaction(transactionPayload);

      await loadData();
      setTransactionModalOpen(false);
    } catch (error) {
      console.error(
        "Erro na transação:",
        error.response?.data?.message || error.message,
      );
      alert(error.response?.data?.message || "Erro ao realizar transação");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <MainTemplate>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={styles.goalsWrapper}>
          <section className={styles.field}>
            <div className={styles.headerGoal}>
              <h2 className={styles.title}>Minhas Metas</h2>

              <div className={styles.spacer}>
                <DefaultButton onClick={handleOpenCreateModal}>
                  <CirclePlus /> Adicionar Meta
                </DefaultButton>
              </div>
            </div>

            <div className={styles.cardsGrid}>
              {summaryCards.map((card) => (
                <GoalCardItem
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
                  onDeposit={() => handleOpenTransactionModal(card, "deposit")}
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
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={handleCloseGoalModal}
        onSubmit={handleSubmitGoal}
        formData={formData}
        onChange={handleChange}
        isSaving={isSaving}
        accounts={accounts}
      />

      {/* DELETE */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteGoal}
        title="Excluir meta"
        message={`Tem certeza que deseja excluir a meta "${goalToDelete?.title || ""}"? O saldo guardado nela voltará para a sua conta principal.`}
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
        goalName={selectedGoal?.title} // Alterado de vaultName para goalName, ajuste no modal se precisar!
        isSaving={isSaving}
      />
    </MainTemplate>
  );
}
