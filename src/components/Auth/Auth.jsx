import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth";
import styles from "./Auth.module.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError("Email and password are required");

    try {
      const res =
        mode === "login"
          ? authService.login(email, password)
          : authService.signup(email, password);
      if (res.ok) {
        navigate("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Failed to authenticate. Try again.");
    }
  }

  return (
    <div className={styles.wrap} data-testid="auth-page">
      <div className={styles.card} role="form" aria-labelledby="auth-heading">
        <h2
          id="auth-heading"
          className={styles.heading}
          data-testid="auth-heading"
        >
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>

        <form
          onSubmit={handleSubmit}
          data-testid="auth-form"
          className={styles.form}
        >
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            data-testid="input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            data-testid="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div role="alert" data-testid="auth-error" className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            data-testid="btn-submit"
            className={styles.primary}
          >
            {mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div className={styles.footer}>
          <p data-testid="auth-toggle">
            {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
              }}
              data-testid="btn-toggle"
              className={styles.link}
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>

          <div className={styles.example} data-testid="example-creds">
            <strong>Example</strong>
            <div>
              Email: <code data-testid="example-email">test@example.com</code>
            </div>
            <div>
              Password: <code data-testid="example-password">password123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
