import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <section className={styles.hero} data-testid="hero">
      <svg
        className={styles.wave}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="url(#g)"
          fillOpacity="0.18"
          d="M0,128L80,106.7C160,85,320,43,480,53.3C640,64,800,128,960,154.7C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#00c2ff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="u-container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <h1 className={styles.title} data-testid="hero-title">
              Ticketry <span>"Clarity for every issue."</span>
            </h1>
            <p className={styles.subtitle} data-testid="hero-desc">
              Efficiently manage, track, and resolve your tickets with ease.
              Empower your team with a smarter, faster, and more organized
              workflow that keeps every issue on track. Transform ticket
              handling into a seamless experience from creation to resolution
              all in one intuitive platform.
            </p>
            <div className={styles.ctas}>
              <Link
                to="/auth/login"
                className={styles.primary}
                data-testid="cta-login"
              >
                Login
              </Link>
              <Link
                to="/auth/login"
                className={styles.secondary}
                data-testid="cta-getstarted"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className={styles.right} aria-hidden="true">
            <div className={styles.circle} data-testid="decor-circle-1" />
            <div className={styles.circleSmall} data-testid="decor-circle-2" />

            <div className={styles.card} data-testid="feature-box-1">
              <h3>Fast Triage</h3>
              <p>
                Priority flags and quick filters let you focus on what matters.
              </p>
            </div>

            <div className={styles.cardAccent} data-testid="feature-box-2">
              <h3>Secure Sessions</h3>
              <p>
                Simulated token-based sessions with safe local storage handling.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statsBar} data-testid="landing-stats">
          <div className={styles.statCard} data-testid="stat-total">
            <h4>Total Tickets</h4>
            <p>—</p>
          </div>
          <div className={styles.statCard} data-testid="stat-open">
            <h4>Open</h4>
            <p>—</p>
          </div>
          <div className={styles.statCard} data-testid="stat-resolved">
            <h4>Resolved</h4>
            <p>—</p>
          </div>
        </div>
      </div>
    </section>
  );
}
