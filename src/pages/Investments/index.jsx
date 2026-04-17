import { useEffect, useState } from "react";
import { CirclePlus, TrendingUp } from "lucide-react";

import { getAccount } from "../../services/AccountServices";
import {
  getInvestments,
  postInvestment,
  deleteInvestment,
} from "../../services/investmentServices";
import { createInvestmentSchema } from "../../schemas/investmentSchemas";

import styles from "./styles.module.css";

import MainTemplate from "../../templates/MainTemplate";
import DefaultButton from "../../components/Buttons/DefaultButton";
import LoadingPage from "../../components/LoadingPage";

import InvestmentCardItem from "../../components/Card/InvestmentsCardItem";
import InvestmentModal from "../../components/Modal/InvestmentsModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import InvestmentSimulator from "../../components/InvestmentsSimulator";

const INITIAL_FORM_DATA = {
  name: "",
  type: "CDB",
  institution: "",
  investedAmount: "",
  annualRate: "",
  startDate: new Date().toISOString().split("T")[0],
};

export default function InvestmentPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [accounts, setAccounts] = useState([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const [errors, setErrors] = useState({});

  async function loadData() {
    try {
      setLoading(true);
      const [investmentsData, accountData] = await Promise.all([
        getInvestments(),
        getAccount(),
      ]);
      setInvestments(investmentsData);
      setAccounts(accountData);
    } catch (error) {
      console.error("Erro ao buscar investimentos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleOpenCreateModal() {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setMessage("");
    setMessageType(undefined);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    if (isSaving) return;

    setIsModalOpen(false);
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

  async function handleSubmit(data) {
    setErrors({});
    setMessage("");
    setMessageType(undefined);

    const result = createInvestmentSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsSaving(true);
      await postInvestment(data);

      setMessageType("success");
      setMessage("Investimento criado com sucesso");

      setTimeout(async () => {
        await loadData();
        handleCloseModal();
      }, 1000);
    } catch (error) {
      console.error("Erro ao salvar investimento:", error);
      setMessageType("error");
      setMessage("Erro ao salvar investimento");
    } finally {
      setIsSaving(false);
    }
  }

  function handleOpenDeleteModal(investment) {
    setItemToDelete(investment);
    setIsDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    try {
      setIsDeleting(true);
      await deleteInvestment(itemToDelete.id);
      await loadData();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MainTemplate>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Investimentos</h1>
            <div className={styles.spacer}>
              <DefaultButton onClick={handleOpenCreateModal}>
                <CirclePlus size={20} /> Novo Investimento
              </DefaultButton>
            </div>
          </div>
          <div className={styles.contentLayout}>
            <section className={styles.investmentsSection}>
              <h2>Meus Investimentos</h2>
              <div className={styles.cardsGrid}>
                {investments.map((inv) => (
                  <InvestmentCardItem
                    key={inv.id}
                    investment={inv}
                    onDelete={() => handleOpenDeleteModal(inv)}
                  />
                ))}
                {investments.length === 0 && (
                  <p className={styles.emptyText}>
                    Nenhum investimento cadastrado.
                  </p>
                )}
              </div>
            </section>

            <section className={styles.simulatorSection}>
              <div className={styles.header}>
                <h2 className={styles.title}>Simulador</h2>
              </div>
              <InvestmentSimulator />
            </section>
          </div>
        </div>
      )}

      <InvestmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isSaving={isSaving}
        accounts={accounts}
        errors={errors}
        message={message}
        messageType={messageType}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Investimento"
        message={`Deseja realmente excluir "${itemToDelete?.name}"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </MainTemplate>
  );
}
