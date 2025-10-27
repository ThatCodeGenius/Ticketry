A polished, designer-focused React implementation of a Ticket Management app. All CSS has been migrated into CSS Modules (component-scoped `.module.css` files) for predictable styles and easy maintenance. A minimal global stylesheet exposes theme variables only.

**Highlights**
i. Landing page with a wavy SVG hero, overlapping decorative circles, and glass-like cards.
ii. Authentication simulated via `localStorage` using key `ticketapp_session` (see services).
iii. Protected routes (Dashboard & Tickets) that require a valid session token.
iv. Full Ticket CRUD with validation and user-friendly inline + toast feedback.
v. Every interactive element includes `data-testid` for test automation.
vi. Accessible markup: semantic tags, focus states, ARIA attributes, alt text.

**Run locally**

1. `npm install`
2. `npm run dev`

**Test user**
Email: `test@example.com` Password: `password123`

**Implementation notes**

i. Tickets are stored at `localStorage.ticketapp_tickets` as an array.
ii. Authentication stores an object at `localStorage.ticketapp_session`.
iii. All styles are component-scoped using CSS Modules located next to components.
