import styles from "./styles.module.css";
import { User, Mail, Lock, EyeOff } from "lucide-react";

export default function Auth() {
  return (
    <main className={styles.authPage}>
      <section className={styles.card}>
        <header className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <span className={styles.logoPartOne}></span>
            <span className={styles.logoPartTwo}></span>
            <span className={styles.logoPartThree}></span>
          </div>
          <h2>Finance</h2>
        </header>

        <h3 className={styles.title}>Login to your account</h3>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={20} />
            <input type="email" placeholder="Email" />
          </div>

          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <input type="password" placeholder="Password" />
            <button type="button" className={styles.inputAction}>
              Forgot Password?
            </button>
          </div>

          <label className={styles.checkboxRow}>
            <input type="checkbox" defaultChecked />
            <span>Remember me</span>
          </label>

          <button type="submit" className={styles.primaryButton}>
            Login
          </button>
        </form>

        <p className={styles.switchText}>
          Don&apos;t have an account? <a href="/">Register</a>
        </p>

        <div className={styles.divider}>
          <span></span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <span className={styles.socialIcon}>G</span>
            Google
          </button>

          <button type="button" className={styles.socialButton}>
            <span className={`${styles.socialIcon} ${styles.facebookIcon}`}>
              f
            </span>
            Facebook
          </button>
        </div>
      </section>

      <section className={styles.card}>
        <header className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <span className={styles.logoPartOne}></span>
            <span className={styles.logoPartTwo}></span>
            <span className={styles.logoPartThree}></span>
          </div>
          <h2>Finance</h2>
        </header>

        <h3 className={styles.title}>Create a new account</h3>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={20} />
            <input type="text" placeholder="Full Name" />
          </div>

          <div className={styles.inputGroup}>
            <Mail className={styles.inputIcon} size={20} />
            <input type="email" placeholder="Email" />
          </div>

          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <input type="password" placeholder="Password" />
          </div>

          <div className={styles.inputGroup}>
            <EyeOff className={styles.inputIcon} size={20} />
            <input type="password" placeholder="Confirm Password" />
          </div>

          <button type="submit" className={styles.primaryButton}>
            Register
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <a href="/">Login</a>
        </p>

        <div className={styles.divider}>
          <span></span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <span className={styles.socialIcon}>G</span>
            Google
          </button>

          <button type="button" className={styles.socialButton}>
            <span className={`${styles.socialIcon} ${styles.facebookIcon}`}>
              f
            </span>
            Facebook
          </button>
        </div>
      </section>
    </main>
  );
}
