import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Tickets from "./components/Tickets/Tickets";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { authService } from "./services/auth";
import styles from "./App.module.css";

export default function App() {
  const navigate = useNavigate();
  function handleLogout() {
    authService.logout();
    navigate("/auth/login");
  }

  const isAuthenticated = authService.isAuthenticated();

  return (
    <div className={styles.app} data-testid="app-root">
      <header data-testid="site-header">
        <div className="u-container" data-testid="header-container">
          <nav className={styles.nav} aria-label="Main navigation">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  data-testid="link-dashboard"
                  className={styles.navLink}
                >
                  Dashboard
                </Link>
                <Link
                  to="/tickets"
                  data-testid="link-tickets"
                  className={styles.navLink}
                >
                  Tickets
                </Link>
                <button
                  onClick={handleLogout}
                  data-testid="btn-logout"
                  className={`${styles.btnGhost} u-btn`}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className={styles.headerContainer}>
                <Link to="/" className={styles.brand} data-testid="link-home">
                  <img src="/public/Ticketry-logo.jpg" alt="Brand logo" />
                  Ticketry
                </Link>
                <div className={styles.headerRight}>
                  <Link
                    to="/auth/login"
                    data-testid="link-login"
                    className={styles.navLinkLogin}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/login"
                    data-testid="link-getstarted"
                    className={styles.cta}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className={styles.main} data-testid="main-content">
        <div className="u-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Auth />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Landing />} />
          </Routes>
        </div>
      </main>

      <footer className={styles.footer} data-testid="site-footer">
        <div className="u-container">
          <p data-testid="footer-text">
            © {new Date().getFullYear()} Ticketry "Crafted with care..!"
          </p>
        </div>
      </footer>
    </div>
  );
}
