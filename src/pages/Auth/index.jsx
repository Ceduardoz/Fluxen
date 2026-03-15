import { useState } from "react";
import styles from "./styles.module.css";
import { User, Mail, Lock, EyeOff } from "lucide-react";

import Logo from "../../components/logo";
import AuthTemplate from "../../templates/AuthTemplate";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

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
                <h2>Finance</h2>
              </header>

              <h3 className={styles.title}>Login</h3>

              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <User className={styles.inputIcon} size={20} />
                  <input type="email" placeholder="Email" />
                </div>

                <div className={styles.inputGroup}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input type="password" placeholder="Senha" />
                  <button type="button" className={styles.inputAction}>
                    esqueceu senha?
                  </button>
                </div>

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
                  onClick={() => setIsRegister(true)}
                >
                  Cadastrar
                </button>
              </p>
            </div>
          ) : (
            <div className={`${styles.card} ${styles.left}`}>
              <header className={styles.logoArea}>
                <Logo />
                <h2>Finance</h2>
              </header>

              <h3 className={styles.title}>Criar nova conta</h3>

              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <User className={styles.inputIcon} size={20} />
                  <input type="text" placeholder="Nome" />
                </div>

                <div className={styles.inputGroup}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input type="email" placeholder="Email" />
                </div>

                <div className={styles.inputGroup}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input type="password" placeholder="Senha" />
                </div>

                <div className={styles.inputGroup}>
                  <EyeOff className={styles.inputIcon} size={20} />
                  <input type="password" placeholder="Confirmar Senha" />
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Cadastrar
                </button>
              </form>

              <p className={styles.switchText}>
                Você já possui uma conta?{" "}
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={() => setIsRegister(false)}
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
