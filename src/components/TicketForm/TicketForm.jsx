import React, { useState, useEffect } from "react";
import styles from "./TicketForm.module.css";

const VALID_STATUSES = ["open", "in_progress", "closed"];

export default function TicketForm({ onCreate, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("normal");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setStatus(editing.status);
      setPriority(editing.priority);
    } else {
      setTitle("");
      setDescription("");
      setStatus("open");
      setPriority("normal");
    }
  }, [editing]);

  function validate() {
    const e = {};
    if (!title || title.trim().length === 0) e.title = "Title is required";
    if (!VALID_STATUSES.includes(status))
      e.status = "Status must be open, in_progress or closed";
    if (description && description.length > 1000)
      e.description = "Description is too long";
    return e;
  }

  function handleCreate(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    onCreate({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });
    // subtle micro-interaction: clear fields after creating
    setTitle("");
    setDescription("");
    setStatus("open");
    setPriority("normal");
  }

  function handleUpdate(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    onUpdate(editing.id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });
  }

  return (
    <form
      className={styles.form}
      onSubmit={editing ? handleUpdate : handleCreate}
      data-testid="form-ticket"
      aria-label="ticket form"
    >
      <div className={styles.row}>
        <label htmlFor="t-title" className={styles.label}>
          Title
        </label>
        <input
          id="t-title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-testid="input-title"
        />
        {errors.title && (
          <div className={styles.error} data-testid="error-title">
            {errors.title}
          </div>
        )}
      </div>

      <div className={styles.rowInline}>
        <div className={styles.field}>
          <label htmlFor="t-status" className={styles.label}>
            Status
          </label>
          <select
            id="t-status"
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            data-testid="select-status"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Resolved</option>
          </select>
          {errors.status && (
            <div className={styles.error} data-testid="error-status">
              {errors.status}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="t-priority" className={styles.label}>
            Priority
          </label>
          <select
            id="t-priority"
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            data-testid="select-priority"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="t-desc" className={styles.label}>
          Description
        </label>
        <textarea
          id="t-desc"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="input-desc"
        />
        {errors.description && (
          <div className={styles.error} data-testid="error-desc">
            {errors.description}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" data-testid="btn-save" className={styles.primary}>
          {editing ? "Save" : "Create ticket"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            data-testid="btn-cancel"
            className={styles.ghost}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
