import { useEffect, useState } from "react";
import { getMe } from "../../services/authServices";
import { updateUser } from "../../services/UserServices";

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
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
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
      }, 300);

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setMessageType("error");
      setMessage("Não foi possível atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.profileHeader}>
        <h2>Meu Perfil </h2>
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
        <DefaultButton type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar"}
        </DefaultButton>
        <DefaultButton type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Sair"}
        </DefaultButton>
        <DefaultButton type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Deletar conta"}
        </DefaultButton>
      </div>
    </form>
  );
}
