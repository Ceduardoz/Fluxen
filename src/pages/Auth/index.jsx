import { useState } from "react";
import styles from "./styles.module.css";
import { User, Mail, Lock, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loginSchemas, registerSchemas } from "../../schemas/authSchemas";
import { postLogin, postRegister } from "../../services/authServices";
import Message from "../../components/Message";
import DefaultButton from "../../components/Buttons/DefaultButton";
import Logo from "../../components/Logo";
import AuthTemplate from "../../templates/AuthTemplate";
import LoginRegisterForm from "../../components/Forms/LoginRegisterForm";
import AuthSideImage from "../../components/AuthSideImage";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    icon: Mail,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Senha",
    icon: Lock,
    action: "esqueceu senha?",
  },
];

const registerFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Nome",
    icon: User,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    icon: Mail,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Senha",
    icon: Lock,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirmar Senha",
    icon: EyeOff,
  },
];

export default function Auth() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);

  const navigate = useNavigate();

  function resetFeedback() {
    setMessage("");
    setError({});
  }

  function resetForm() {
    setFormData(initialFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function switchMode(mode) {
    resetFeedback();
    resetForm();
    setIsRegister(mode === "register");
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    resetFeedback();

    const user = {
      email: formData.email,
      password: formData.password,
    };

    const res = loginSchemas.safeParse(user);

    if (!res.success) {
      setError(res.error.flatten().fieldErrors);
      return;
    }

    try {
      const response = await postLogin(res.data);

      setMessageType("success");
      setMessage("Login feito com sucesso");

      localStorage.setItem("token", response.token);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (e) {
      setMessageType("error");
      setMessage(e.response?.data?.message || "Erro ao fazer login");
      console.log(e.response?.data);
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    resetFeedback();

    const res = registerSchemas.safeParse(formData);

    if (!res.success) {
      setError(res.error.flatten().fieldErrors);
      return;
    }

    const user = {
      name: res.data.name,
      email: res.data.email,
      password: res.data.password,
    };

    try {
      await postRegister(user);

      setMessageType("success");
      setMessage("Cadastro feito com sucesso");

      setTimeout(() => {
        switchMode("login");
      }, 1500);
    } catch (e) {
      setMessageType("error");
      setMessage(e.response?.data?.message || "Erro ao cadastrar");
      console.log(e.response?.data);
    }
  }

  const fields = isRegister ? registerFields : loginFields;
  const formTitle = isRegister ? "Criar nova conta" : "Login";
  const submitText = isRegister ? "Cadastrar" : "Login";
  const handleSubmit = isRegister ? handleRegisterSubmit : handleLoginSubmit;

  return (
    <AuthTemplate>
      <section
        className={`${styles.container} ${
          isRegister ? styles.registerMode : ""
        }`}
      >
        <article className={`${styles.side} ${styles.formSide}`}>
          <div
            className={`${styles.card} ${
              isRegister ? styles.left : styles.right
            }`}
          >
            <header className={styles.logoArea}>
              <Logo />
              <h2 className={styles.nameLogo}>Finance</h2>
            </header>

            <h3 className={styles.title}>{formTitle}</h3>

            <Message message={message} type={messageType} />

            <form onSubmit={handleSubmit} className={styles.form}>
              {fields.map((field) => (
                <LoginRegisterForm
                  key={field.name}
                  icon={field.icon}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={error[field.name]?.[0]}
                  actionText={field.action}
                />
              ))}

              {!isRegister && (
                <label className={styles.checkboxRow}>
                  <input type="checkbox" defaultChecked />
                  <span>Lembre-se</span>
                </label>
              )}

              <DefaultButton type="submit">{submitText}</DefaultButton>
            </form>

            {!isRegister ? (
              <p className={styles.switchText}>
                Não tem conta?{" "}
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => switchMode("register")}
                >
                  Cadastrar
                </button>
              </p>
            ) : (
              <p className={styles.switchText}>
                Você já possui uma conta?{" "}
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => switchMode("login")}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </article>

        <AuthSideImage isRegister={isRegister} />
      </section>
    </AuthTemplate>
  );
}
