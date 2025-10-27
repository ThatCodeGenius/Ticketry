import { v4 as uuidv4 } from "uuid";

export const ticketService = {
  key: "ticketry_tickets",
  load() {
    try {
      return JSON.parse(localStorage.getItem(this.key) || "[]");
    } catch (e) {
      return [];
    }
  },
  save(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  },
  all() {
    return this.load();
  },

  create({ title, description, status, priority }) {
    const ticketInfo = {
      id: uuidv4(),
      title,
      description: description || "",
      status,
      priority: priority || "normal",
      createdAt: Date.now(),
    };

    const list = this.load();
    list.unshift(ticketInfo);
    this.save(list);
    return ticketInfo;
  },

  update(id, data) {
    const list = this.load();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error("Not found");
    list[idx] = { ...list[idx], ...data };
    this.save(list);
    return list[idx];
  },
  remove(id) {
    let list = this.load();
    list = list.filter((x) => x.id !== id);
    this.save(list);
    return true;
  },
  find(id) {
    return this.load().find((x) => x.id === id);
  },
};
