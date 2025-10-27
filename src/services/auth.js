export const authService = {
  key: "ticketapp_session",
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const userExists = users.find(
      (u) => u.email === email && u.password === password
    );
    if (
      (email === "test@example.com" && password === "password123") ||
      userExists
    ) {
      const token = {
        token: btoa(email + "|" + Date.now()),
        email,
        createdAt: Date.now(),
      };
      localStorage.setItem(this.key, JSON.stringify(token));
      return { ok: true, token };
    }
    return { ok: false, message: "Invalid credentials" };
  },
  signup(email, password) {
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    if (users.find((u) => u.email === email))
      return { ok: false, message: "User already exists" };
    users.push({ email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    return this.login(email, password);
  },
  logout() {
    localStorage.removeItem(this.key);
  },
  isAuthenticated() {
    const s = JSON.parse(localStorage.getItem(this.key) || "null");
    return !!s;
  },
  getSession() {
    return JSON.parse(localStorage.getItem(this.key) || "null");
  },
};
