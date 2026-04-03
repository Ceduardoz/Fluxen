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

export default function UserSettings() {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    initialBalance: "",
  });

  const loadAccounts = async () => {
    try {
      const data = await getAccount();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleOpenModal = () => {
    setAccountToEdit(null);
    setFormData({
      name: "",
      initialBalance: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (account) => {
    setAccountToEdit(account);
    setFormData({
      name: account.name,
      initialBalance: account.initialBalance,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data) => {
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
  };

  // 🔥 deletar
  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      await loadAccounts();
    } catch (err) {
      console.error(err);
    }
  };

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
              initialBalance={account.initialBalance}
              onEdit={handleEdit}
              onDelete={handleDelete}
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
    </MainTemplate>
  );
}
