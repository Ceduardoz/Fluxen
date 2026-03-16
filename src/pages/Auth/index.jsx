import { useState } from "react";
import styles from "./styles.module.css";
import { User, Mail, Lock, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loginSchemas, registerSchemas } from "../../schemas/authSchemas";
import { postLogin, postRegister } from "../../services/authServices";
import Message from "../../components/Message";

import Logo from "../../components/logo";
import AuthTemplate from "../../templates/AuthTemplate";

export default function Auth() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(undefined);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError({});

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

      console.log(response);

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
    setMessage("");
    setError({});

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
      const response = await postRegister(user);

      setMessageType("success");
      setMessage("Cadastro feito com sucesso");

      console.log(response);

      setTimeout(() => {
        setIsRegister(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 1500);
    } catch (e) {
      setMessageType("error");
      setMessage(e.response?.data?.message || "Erro ao cadastrar");
      console.log(e.response?.data);
    }
  }

  return (
    <AuthTemplate>
      <section
        className={`${styles.container} ${
          isRegister ? styles.registerMode : ""
        }`}
      >
        <article className={`${styles.side} ${styles.formSide}`}>
          {!isRegister ? (
            <div className={`${styles.card} ${styles.right}`}>
              <header className={styles.logoArea}>
                <Logo />
                <h2 className={styles.nameLogo}>Finance</h2>
              </header>

              <h3 className={styles.title}>Login</h3>

              <Message message={message} type={messageType} />

              <form onSubmit={handleLoginSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <User className={styles.inputIcon} size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {error.email && (
                  <p className={styles.formError}>{error.email[0]}</p>
                )}

                <div className={styles.inputGroup}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button type="button" className={styles.inputAction}>
                    esqueceu senha?
                  </button>
                </div>
                {error.password && (
                  <p className={styles.formError}>{error.password[0]}</p>
                )}

                <label className={styles.checkboxRow}>
                  <input type="checkbox" defaultChecked />
                  <span>Lembre-se</span>
                </label>

                <button type="submit" className={styles.primaryButton}>
                  Login
                </button>
              </form>

              <p className={styles.switchText}>
                Não tem conta?{" "}
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => {
                    setIsRegister(true);
                    setMessage("");
                    setError({});
                  }}
                >
                  Cadastrar
                </button>
              </p>
            </div>
          ) : (
            <div className={`${styles.card} ${styles.left}`}>
              <header className={styles.logoArea}>
                <Logo />
                <h2 className={styles.nameLogo}>Finance</h2>
              </header>

              <h3 className={styles.title}>Criar nova conta</h3>

              <Message message={message} type={messageType} />

              <form onSubmit={handleRegisterSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <User className={styles.inputIcon} size={20} />
                  <input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {error.name && (
                  <p className={styles.formError}>{error.name[0]}</p>
                )}

                <div className={styles.inputGroup}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {error.email && (
                  <p className={styles.formError}>{error.email[0]}</p>
                )}

                <div className={styles.inputGroup}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error.password && (
                  <p className={styles.formError}>{error.password[0]}</p>
                )}

                <div className={styles.inputGroup}>
                  <EyeOff className={styles.inputIcon} size={20} />
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {error.confirmPassword && (
                  <p className={styles.formError}>{error.confirmPassword[0]}</p>
                )}

                <button type="submit" className={styles.primaryButton}>
                  Cadastrar
                </button>
              </form>

              <p className={styles.switchText}>
                Você já possui uma conta?{" "}
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => {
                    setIsRegister(false);
                    setMessage("");
                    setError({});
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </article>

        <article
          className={
            isRegister
              ? `${styles.side} ${styles.imageSide} ${styles.right}`
              : `${styles.side} ${styles.imageSide} ${styles.left}`
          }
        >
          <div className={styles.imageContent}>
            <img
              src="/finance_illustration_600.png"
              alt="Finance illustration"
              className={styles.image}
            />
          </div>
        </article>
      </section>
    </AuthTemplate>
  );
}
