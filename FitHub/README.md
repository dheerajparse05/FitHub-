# FitHub 🏋️‍♂️

FitHub is a static, multi-page fitness website featuring a shop, workout programs, trainer profiles, a cart with checkout, and a login page.

## Structure

```
FitHub/
├── index.html            # Home page (hero + feature strip)
├── shop.html              # Product shop (24 products, add to cart)
├── programs.html          # Fitness programs
├── trainers.html          # Meet the trainers
├── cart.html              # Cart + checkout (EmailJS order form)
├── login.html             # Login page
├── css/
│   ├── base.css           # Shared design tokens, navbar, footer, buttons
│   ├── home.css
│   ├── shop.css
│   ├── programs.css
│   ├── trainers.css
│   ├── cart.css
│   └── login.css
├── js/
│   ├── nav.js              # Mobile menu toggle + live cart badge + footer year
│   ├── shop.js              # Add-to-cart logic
│   └── cart.js               # Cart rendering, quantity controls, checkout
├── assets/
│   └── images/             # All site images (product, trainer, program photos)
├── README.md
├── LICENSE
└── .gitignore
```

## Design System

All pages share `css/base.css`, which defines the color palette, typography (Oswald for headings, Inter for body text), buttons, navbar, and footer as CSS custom properties. Every page-specific stylesheet builds on top of these tokens, so style changes only need to happen in one place.

- **Palette:** near-black background, warm amber accent, soft muted grey text
- **Type:** Oswald (display/headings) + Inter (body), loaded from Google Fonts
- **Components:** consistent navbar with a live cart-count badge and a collapsing mobile menu, shared button styles, and a shared footer across every page

## Features

- 🛍️ **Shop** – 24 fitness products with an "Add to Cart" button
- 🛒 **Cart** – Items persist via `localStorage`, with quantity controls, item removal, and a checkout form
- 🔔 **Live cart badge** – The navbar shows a running item count on every page
- 📱 **Responsive nav** – Collapses into a mobile menu below 820px, with visible keyboard focus states throughout
- 💳 **Checkout** – Orders are emailed via [EmailJS](https://www.emailjs.com/); a QR-code popup is shown for online payment
- 🏆 **Programs** – Strength, Cardio, Yoga, and HIIT programs
- 🧑‍🏫 **Trainers** – Trainer profiles with specializations
- 🔐 **Login** – Simple login form (front-end only, no backend auth)

## Getting Started

This is a pure HTML/CSS/JS static site — no build step required.

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/FitHub.git
   cd FitHub
   ```
2. Open `index.html` in your browser, or serve it locally:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", select **Deploy from a branch**, choose `main` and `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/FitHub/`.

## Notes

- The cart/checkout uses a public EmailJS key in `cart.html`. EmailJS public keys are safe to expose client-side by design, but you should still swap in **your own** EmailJS service ID, template ID, and public key before using this in production.
- No backend/database is included — the cart is stored in the browser's `localStorage`, and login is not connected to real authentication.

## License

This project is available under the [MIT License](LICENSE).
