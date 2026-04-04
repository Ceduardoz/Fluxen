import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
  getAccount,
  postAccount,
  patchAccount,
  deleteAccount,
} from "../../services/AccountServices";
import MainTemplate from "../../templates/MainTemplate";
import AccountCardItem from "../../components/Card/AccountCardItem";
import AccountModal from "../../components/Modal/AccountModal";
import DefaultButton from "../../components/Buttons/DefaultButton";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export default function UserSettings() {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    initialBalance: "",
  });

  async function loadAccounts() {
    try {
      const data = await getAccount();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  function handleOpenModal() {
    setAccountToEdit(null);
    setFormData({
      name: "",
      initialBalance: "",
    });
    setIsModalOpen(true);
  }

  function handleEdit(account) {
    setAccountToEdit(account);
    setFormData({
      name: account.name,
      initialBalance: account.initialBalance,
    });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(data) {
    try {
      setIsSaving(true);

      if (accountToEdit) {
        await patchAccount(accountToEdit.id, data);
      } else {
        await postAccount(data);
      }

      await loadAccounts();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAccount(id);
      await loadAccounts();
    } catch (err) {
      console.error(err);
    }
  }

  function handleOpenDeleteModal(account) {
    setAccountToDelete(account);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setAccountToDelete(null);
  }

  async function handleConfirmDeleteAccount() {
    if (!accountToDelete) return;

    try {
      setIsDeleting(true);

      await deleteAccount(accountToDelete.id);
      await loadAccounts();

      handleCloseDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MainTemplate>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Contas</h2>
          <div className={styles.actions}>
            <DefaultButton onClick={handleOpenModal}>
              Criar nova conta
            </DefaultButton>
          </div>
        </div>

        <div className={styles.cards}>
          {accounts.map((account) => (
            <AccountCardItem
              key={account.id}
              title={account.name}
              initialBalance={account.balance}
              onEdit={() => handleEdit(account)}
              onDelete={() => handleOpenDeleteModal(account)}
            />
          ))}
        </div>
      </div>

      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        accountToEdit={accountToEdit}
        isSaving={isSaving}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteAccount}
        title="Excluir conta"
        message={`Tem certeza que deseja excluir a conta "${accountToDelete?.name || ""}"?`}
        confirmText="Excluir"
        isLoading={isDeleting}
      />
    </MainTemplate>
  );
}
