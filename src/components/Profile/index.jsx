import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/authServices";
import { updateUser, deleteUser } from "../../services/UserServices";

import styles from "./styles.module.css";

import Message from "../Message";
import DefaultInput from "../Inputs/DefaultInput";
import DefaultButton from "../Buttons/DefaultButton";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getMe();

        setFormData((prev) => ({
          ...prev,
          name: response.name || "",
          email: response.email || "",
        }));
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoadingUpdate(true);

      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      await updateUser(payload);

      setMessageType("success");
      setMessage("Perfil atualizado!");

      setTimeout(() => {
        setMessage("");
      }, 2500);

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setMessageType("error");
      setMessage("Não foi possível atualizar o perfil.");
    } finally {
      setLoadingUpdate(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  async function handleDeleteAccount() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.",
    );

    if (!confirmDelete) return;

    try {
      setLoadingDelete(true);

      await deleteUser();

      localStorage.removeItem("token");
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar conta. Tente novamente.");
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.profileHeader}>
        <h2>Meu Perfil</h2>
        <Message type={messageType} message={message} />
      </div>

      <div className={styles.field}>
        <DefaultInput
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />

        <DefaultInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <DefaultInput
          type="password"
          name="password"
          placeholder="Nova senha (opcional)"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className={styles.action}>
        <DefaultButton type="submit" disabled={loadingUpdate}>
          {loadingUpdate ? "Salvando..." : "Atualizar"}
        </DefaultButton>

        <DefaultButton type="button" onClick={handleLogout}>
          Sair
        </DefaultButton>

        <DefaultButton
          type="button"
          onClick={handleDeleteAccount}
          disabled={loadingDelete}
        >
          {loadingDelete ? "Deletando..." : "Deletar conta"}
        </DefaultButton>
      </div>
    </form>
  );
}
