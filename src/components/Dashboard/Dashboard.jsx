import React from "react";
import { Link } from "react-router-dom";
import { ticketService } from "../../services/tickets";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const tickets = ticketService.all();
  const total = tickets.length;
  const open = tickets.filter((ticket) => ticket.status === "open").length;
  const inprog = tickets.filter(
    (ticket) => ticket.status === "in_progress"
  ).length;
  const closed = tickets.filter((ticket) => ticket.status === "closed").length;

  return (
    <section className={styles.wrap} data-testid="dashboard-page">
      <div className={styles.header}>
        <h2 data-testid="dashboard-title">Overview</h2>
        <p className={styles.sub}>A quick summary of recent activity</p>
      </div>

      <div className={styles.grid} data-testid="dashboard-stats">
        <div className={styles.card} data-testid="stat-total-2">
          <h3>Total</h3>
          <p>{total}</p>
        </div>
        <div className={styles.cardOpen} data-testid="stat-open-2">
          <h3>Open</h3>
          <p>{open}</p>
        </div>
        <div className={styles.cardInProg} data-testid="stat-inprog-2">
          <h3>In Progress</h3>
          <p>{inprog}</p>
        </div>
        <div className={styles.cardClosed} data-testid="stat-closed-2">
          <h3>Resolved</h3>
          <p>{closed}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          to="/tickets"
          className={styles.btn}
          data-testid="btn-manage-tickets"
        >
          Manage Tickets
        </Link>
      </div>
    </section>
  );
}
