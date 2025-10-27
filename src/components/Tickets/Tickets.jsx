import React, { useState, useEffect } from "react";
import { ticketService } from "../../services/tickets";
import TicketCard from "../TicketCard/TicketCard";
import TicketForm from "../TicketForm/TicketForm";
import styles from "./Tickets.module.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setTickets(ticketService.all());
  }, []);

  function handleCreate(data) {
    try {
      const createTicketService = ticketService.create(data);
      setTickets((prev) => [createTicketService, ...prev]);
      setMessage({ type: "success", text: "Ticket created" });
      setTimeout(() => setMessage(null), 2500);
    } catch (e) {
      setMessage({ type: "error", text: "Failed to create ticket" });
    }
  }

  function handleUpdate(id, data) {
    try {
      ticketService.update(id, data);
      setTickets(ticketService.all());
      setEditing(null);
      setMessage({ type: "success", text: "Ticket updated" });
      setTimeout(() => setMessage(null), 2500);
    } catch (e) {
      setMessage({ type: "error", text: "Failed to update ticket" });
    }
  }

  function handleDelete(id) {
    if (!confirm("Delete this ticket?")) return;
    try {
      ticketService.remove(id);
      setTickets(ticketService.all());
      setMessage({ type: "success", text: "Ticket deleted" });
      setTimeout(() => setMessage(null), 2500);
    } catch (e) {
      setMessage({ type: "error", text: "Failed to delete ticket" });
    }
  }

  return (
    <section className={styles.wrap} data-testid="tickets-page">
      <div className={styles.top}>
        <h2 data-testid="tickets-title">Tickets</h2>
        <p className={styles.sub}>Create, update and resolve tickets</p>
      </div>

      <div className={styles.formWrap}>
        <TicketForm
          onCreate={handleCreate}
          editing={editing}
          onUpdate={handleUpdate}
          onCancel={() => setEditing(null)}
          data-testid="ticket-form"
        />
      </div>

      {message && (
        <div
          className={`${styles.toast} ${
            message.type === "error" ? styles.error : styles.success
          }`}
          role="status"
          data-testid="toast"
        >
          {message.text}
        </div>
      )}

      <div className={styles.grid} data-testid="tickets-grid">
        {tickets.length === 0 && (
          <p data-testid="no-tickets" className={styles.empty}>
            No tickets yet - create one
          </p>
        )}
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={() => setEditing(ticket)}
            onDelete={() => handleDelete(ticket.id)}
            data-testid={`ticket-${ticket.id}`}
          />
        ))}
      </div>
    </section>
  );
}
