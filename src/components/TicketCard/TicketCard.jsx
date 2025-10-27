import React from "react";
import styles from "./TicketCard.module.css";

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article
      className={`${styles.card} ${styles[ticket.status]}`}
      data-testid={`card-${ticket.id}`}
      aria-labelledby={`card-title-${ticket.id}`}
    >
      <header className={styles.header}>
        <h3
          id={`card-title-${ticket.id}`}
          className={styles.title}
          data-testid={`card-title-${ticket.id}`}
        >
          {ticket.title}
        </h3>
        <span className={styles.tag} data-testid={`card-status-${ticket.id}`}>
          {ticket.status.replace("_", " ")}
        </span>
      </header>
      <p className={styles.desc} data-testid={`card-desc-${ticket.id}`}>
        {ticket.description || "—"}
      </p>
      <div className={styles.actions}>
        <button
          onClick={onEdit}
          data-testid={`btn-edit-${ticket.id}`}
          className={styles.edit}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          data-testid={`btn-delete-${ticket.id}`}
          className={styles.del}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
