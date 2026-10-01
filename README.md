# Ultra Premium Ecommerce — Frontend

A modern, responsive ecommerce storefront and admin UI built with **React 18 + Vite + Tailwind CSS**.

The repository contains the **complete frontend** of the platform: home page, product catalog with filtering/search, cart and checkout flows, authentication, account area, and an admin panel. Product content ships as **mock data** in the repo, so the app runs out of the box with no backend. A ready-made REST API client layer (`src/services/api/`) is included so the UI can be pointed at a real backend by changing one environment variable.

> **Repo:** https://github.com/AlveeHossain45/Ecommerce-Platform

---

## Overview

Building a premium storefront requires dozens of interlocking pieces: catalog browsing, filtering, a persistent cart, a checkout flow, account pages, and an admin back office. This project solves that by providing a single, cohesive React application that covers the entire shopping journey as a frontend, with:

- **Real, working UI logic** — filtering, sorting, cart math, form validation, and theming all run client-side.
- **Runs with no backend setup** — all catalog/testimonial content is local mock data (`src/data/mockData.js`).
- **A clear seam for a backend** — every API call is isolated in `src/services/api/*` and reads its base URL from `VITE_API_URL`.

This makes it useful as a storefront template, a UI prototype for a real store, or a starting point for a full-stack ecommerce build.

---

## Features

### Catalog & browsing
- Product listing page with **client-side search** (name / description / brand), **category filter**, **price-range slider**, **brand toggle buttons**, **minimum-rating filter**, and **sorting** (featured, newest, price, rating, name)
- **Grid / list view toggle** and an active-filter counter with reset
- **Quick View modal** (gallery, quantity stepper, add to cart) directly from the listing
- Category index (`/categories`) and per-category page (`/category/:category`) with sidebar filters, simulated loading state, and computed stats
- Home page sections: hero, featured products, category grid, testimonials carousel, stats and services bands

### Cart & checkout
- Slide-over **cart sidebar** plus a full **cart page** (quantity ±, remove, clear, empty state)
- **Cart badge counter** in the header
- Order totals calculated client-side: subtotal, discount, shipping and tax
- Cart contents **persisted in `localStorage`** (survives refresh)
- Checkout flow with **shipping address form**, **shipping options** (standard / express / overnight) and a **live order summary**, wrapped in a 3-step checkout layout

### Wishlist
- Wishlist state (add / remove / move to cart) managed by `CartContext` and persisted in `localStorage`

### Authentication & accounts
- **Login** and **Registration** forms with social sign-in buttons (a reusable OTP verification component also exists in `components/auth/`)
- Simulated auth with **demo accounts**, role-based **permissions** (`admin`, `moderator`, `customer`, `viewer`) and a reusable `AuthGuard` + `hasPermission` API
- **24-hour session** with expiry check and automatic logout; user/session/permissions persisted in `localStorage`
- Account area: **profile** (view/edit UI — edits are not persisted yet) and **order history** (mock orders)

### Admin panel (`/admin`)
- **Dashboard** with revenue/order/customer/product KPI cards and a recent-orders table
- **Product management** — add, edit, delete, search, category/status filters, sorting, and computed stats
- **Order management** — search, status filter, sorting, and status updates (pending → processing → shipped → delivered / cancelled)
- Dedicated admin layout with sidebar navigation and mobile drawer

### Theming & UI
- **Light / dark / system** theme (class-based, persisted), plus color-scheme, contrast-level and reduced-motion options
- **Responsive** layout with mobile navigation and touch-friendly cart
- **Framer Motion** animations (page sections, cart slide-over, modal transitions)
- **Lucide** icon set, Tailwind CSS design tokens (`primary` / `secondary` scales, `darkMode: 'class'`)

### Content & SEO
- Static **About** and **Contact** pages (contact form has manual validation + simulated submission)
- Animated **404 page**
- `robots.txt`, `sitemap.xml`, and a PWA `manifest.json` in `public/`

> **Note:** `axios`, `react-hook-form`, `react-hot-toast` and `tailwind-merge` are declared in `package.json` but are not imported anywhere yet; the app currently uses `fetch`, controlled forms and inline validation instead.

---

## Main Modules / Pages

All active routes are defined in [`src/App.jsx`](src/App.jsx):

| Route | Layout | Page | What it does |
|---|---|---|---|
| `/` | MainLayout | `pages/home/HomePage.jsx` | Hero, featured products, categories, testimonials, marketing sections |
| `/products` | MainLayout | `pages/products/ProductListing.jsx` | Catalog with search, filters, sorting, grid/list, quick view |
| `/categories` | MainLayout | `pages/products/CategoriesPage.jsx` | All categories derived from mock data |
| `/category/:category` | MainLayout | `pages/products/CategoryView.jsx` | Products of one category with sidebar filters |
| `/cart` | MainLayout | `pages/checkout/Cart.jsx` | Cart lines, quantities, order summary |
| `/checkout` | CheckoutLayout | `pages/checkout/Shipping.jsx` | Shipping address + shipping method + order summary |
| `/auth/login` | AuthLayout | `pages/auth/Login.jsx` | Sign-in form + social auth |
| `/auth/register` | AuthLayout | `pages/auth/Register.jsx` | Registration form + social auth |
| `/profile` | MainLayout | `pages/user/Profile.jsx` | Profile view / edit |
| `/orders` | MainLayout | `pages/user/OrderHistory.jsx` | Order history list (mock orders) |
| `/about` | MainLayout | `pages/About.jsx` | Static about page |
| `/contact` | MainLayout | `pages/Contact.jsx` | Contact form + contact details |
| `/admin` | AdminLayout | `pages/admin/Dashboard.jsx` | KPI cards and recent orders |
| `/admin/products` | AdminLayout | `pages/admin/Products.jsx` | Product CRUD table + modals |
| `/admin/orders` | AdminLayout | `pages/admin/Orders.jsx` | Order list, filters, status updates |
| `*` | — | `pages/NotFound.jsx` | 404 |

**Additional page components exist in the repo but are not wired to a route yet**, including `ProductDetail`, `SearchResults`, `Payment`, `Confirmation`, `AddressForm`, `OrderSummary`, `ShippingOptions`, `ForgotPassword`, `ResetPassword`, admin `Users` / `Analytics`, and user `Wishlist` / `Settings` / `AddressBook`. They are functional UI pieces awaiting routes (see [Future Improvements](#future-improvements)).

### Key shared components

| Area | Location | Highlights |
|---|---|---|
| Layout | `src/components/layout/` | `header.jsx` (nav, search, cart badge, user menu, mobile menu), `footer.jsx` |
| Cart | `src/components/cart/` | `cart-sidebar.jsx`, `cart-item.jsx`, `cart-summary.jsx` |
| Checkout | `src/components/checkout/` | `address-form.jsx`, `shipping-options.jsx`, `payment-methods.jsx`, `order-summary.jsx` |
| Product | `src/components/product/` | `product-card.jsx`, `product-grid.jsx`, `quick-view.jsx` (+ gallery, filters, reviews, variants) |
| Auth | `src/components/auth/` | `login-form.jsx`, `register-form.jsx`, `social-auth.jsx`, `otp-verification.jsx` |
| UI kit | `src/components/ui/`, `src/components/ui-kit/` | Modal, carousel, skeleton, tabs, toast, tooltip, pagination, accordion… |
| Layouts | `src/layouts/` | `MainLayout`, `AuthLayout`, `AdminLayout`, `CheckoutLayout` |

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI library | React 18 (function components + hooks) |
| Language | JavaScript / JSX |
| Build tool | Vite 4 (`@vitejs/plugin-react`) |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer (`darkMode: 'class'`) |
| State | React Context API (`AuthContext`, `CartContext`, `ThemeContext`, `SearchContext`) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Utilities | `clsx` |
| HTTP | Native `fetch` (in `src/services/api/*`) |
| Data | Local mock dataset (`src/data/mockData.js`) + `localStorage` persistence |

No backend, database, test runner, or linter is configured in this repository.

---

## Project Structure

```
ultra-premium-ecommerce-frontend/
├── index.html                 # Vite entry document
├── package.json               # scripts: dev / build / preview
├── vite.config.js             # dev server on port 3000, output → dist/
├── tailwind.config.js         # design tokens, darkMode: 'class'
├── postcss.config.js
├── .env.example               # environment variable template
├── .gitignore
├── fix-all.js                 # one-off codemod used during the TS → JS migration
├── project-structure.txt      # generated folder listing
├── public/
│   ├── favicon.ico
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx               # ReactDOM entry
    ├── App.jsx                # providers + route table
    ├── assets/                # icons, images, Lottie JSON
    ├── components/
    │   ├── auth/              # login, register, social auth, OTP
    │   ├── cart/              # sidebar, item, summary, mini-cart
    │   ├── checkout/          # address form, shipping options, payment methods, order summary
    │   ├── layout/            # header, footer, navigation, mobile menu, sidebar
    │   ├── product/           # card, grid, quick view, gallery, filters, reviews, variants
    │   ├── ui/                # modal, carousel, skeleton, tabs, toast, tooltip…
    │   └── ui-kit/            # alternate set of UI primitives
    ├── contexts/              # AuthContext, CartContext, ThemeContext, SearchContext
    ├── data/
    │   ├── mockData.js        # 12 mock products, 6 categories + selectors
    │   └── consta.js          # additional mock datasets
    ├── hooks/                 # useCart, useAuth, useSearch, usePagination, useDebounce…
    ├── layouts/               # MainLayout, AuthLayout, AdminLayout, CheckoutLayout
    ├── pages/
    │   ├── home/              # HomePage, HeroSection, FeaturedProducts, CategoryGrid, Testimonials
    │   ├── auth/              # Login, Register, ForgotPassword, ResetPassword
    │   ├── products/          # ProductListing, ProductDetail, CategoriesPage, CategoryView, SearchResults
    │   ├── checkout/          # Cart, Shipping, Payment, AddressForm, OrderSummary, Confirmation
    │   ├── admin/             # Dashboard, Products, Orders, Users, Analytics
    │   ├── user/              # Profile, OrderHistory, Wishlist, Settings, AddressBook
    │   ├── layouts/           # duplicate layout copies (unused)
    │   ├── About.jsx, Contact.jsx, NotFound.jsx
    ├── services/
    │   ├── api/               # authAPI, productAPI, orderAPI, paymentAPI, userAPI (fetch)
    │   └── utils/             # validators, formatters, currency, helpers, localization, animations
    ├── store/slices/          # zustand-style slices (not yet wired)
    ├── styles/                # globals.css (Tailwind entry), components.css, animations.css
    └── types/                 # JSDoc type stubs
```

---

## How It Works

1. **Boot** — Vite serves `index.html`, which loads `src/main.jsx` → `src/App.jsx`.
2. **Providers** — `ThemeProvider` → `AuthProvider` → `CartProvider` wrap the router, restoring theme, session and cart from `localStorage` on first paint.
3. **Layouts** — each route renders inside `MainLayout` (header + footer), `AuthLayout`, `AdminLayout`, or `CheckoutLayout`.
4. **Browse** — catalog pages read `mockProducts` from `src/data/mockData.js` and apply search / filter / sort entirely on the client.
5. **Add to cart** — `ProductCard` and `QuickView` call `CartContext.addToCart()`; state is merged by product id, the badge updates, and the cart is written to `localStorage`.
6. **Checkout** — the cart page links to `/checkout`, where address + shipping method + order summary are collected before the payment step (payment/confirmation screens exist but are not routed yet).
7. **Sign in** — `AuthContext.login()` simulates an API call, creates a 24-hour session and stores the user + permissions; `/profile` and `/orders` then render account data.
8. **Admin** — `/admin`, `/admin/products` and `/admin/orders` run in a separate layout; product/order changes update in-memory state for the session.
9. **Going to production data** — set `VITE_API_URL`, then swap the mock-data imports for the existing clients in `src/services/api/` (they already implement the endpoints below).

---

## Getting Started

### Prerequisites
- **Node.js 18+** and **npm**
- Git

### Installation

```bash
git clone https://github.com/AlveeHossain45/Ecommerce-Platform.git
cd Ecommerce-Platform
npm install
```

Create your local environment file (optional — the app runs without it):

```bash
# macOS / Linux
cp .env.example .env

# Windows
copy .env.example .env
```

### Run

```bash
npm run dev
```

Starts the Vite dev server on **http://localhost:3000** and opens your browser automatically.

### Other scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with hot reload (port 3000) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |

There are currently **no** `test` or `lint` scripts.

---

## Environment Variables

Configuration lives in `.env` (git-ignored). `.env.example` documents every variable:

| Variable | Purpose | Status in code |
|---|---|---|
| `VITE_API_URL` | Base URL of the REST API used by `src/services/api/*` | Read by the API client modules |
| `VITE_APP_NAME` | Application display name | Declared placeholder |
| `VITE_ENABLE_PWA` | Feature flag for PWA behaviour | Declared placeholder |
| `VITE_ENABLE_ANALYTICS` | Feature flag for analytics | Declared placeholder |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key for future payment integration | Declared placeholder |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for future image uploads | Declared placeholder |

> Never commit real keys. `.env` is excluded by `.gitignore`; only `.env.example` (placeholders) belongs in the repository. At present only `VITE_API_URL` is consumed by code — the remaining flags are prepared for upcoming integrations.

---

## Demo Accounts

Authentication is simulated in the browser, so these accounts work without a backend:

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@example.com` | `adminpass` |
| Moderator | `moderator@example.com` | `modpass` |
| Customer | `demo@example.com` | `password` |

---

## Data & Storage

**No database is used.** All catalog and marketing content comes from local files:

| Source | Contents |
|---|---|
| `src/data/mockData.js` | 12 products (price, images, brand, rating, stock, tags, specs) and 6 categories, plus selector helpers |
| `src/data/consta.js` | Additional mock products/categories/users/orders/reviews |
| Inline arrays in pages | Testimonials, dashboard KPIs, admin product/order/user seeds, contact details |

**Browser persistence** (`localStorage`):

| Key | Data |
|---|---|
| `premium_cart` | Cart lines (product + quantity) |
| `premium_wishlist` | Wishlist items |
| `premium_user`, `premium_session`, `premium_permissions` | Signed-in user, 24h session expiry, role permissions |
| `premium_theme`, `premium_color_scheme`, `premium_contrast`, `premium_reduced_motion` | Theme preferences |
| `premium_search_history`, `premium_trending_searches` | Search context state |

---

## API Documentation (API client layer)

`src/services/api/` contains five `fetch`-based clients ready to connect to a REST backend. They read `VITE_API_URL` (fallback `http://localhost/api`, payments fallback `http://localhost:5000/api`) and send `Authorization: Bearer <token>` where noted.

> These modules are **not yet called by any rendered page** — the running UI uses mock data instead. They document the contract the frontend expects.

### Auth — `authAPI.js`
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/auth/login` | Sign in (`{ email, password }`) | — |
| POST | `/auth/register` | Create account (user object) | — |
| POST | `/auth/logout` | End session | Bearer |
| GET | `/auth/me` | Current user | Bearer |

### Products — `productAPI.js`
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/products?<filter>` | List products with filters | — |
| GET | `/products/:id` | Product detail | — |
| GET | `/products/featured` | Featured products | — |
| GET | `/products/search?q=` | Search products | — |

### Orders — `orderAPI.js`
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/orders` | Place an order | Bearer |
| GET | `/orders` | List orders | Bearer |
| GET | `/orders/:id` | Order detail | Bearer |
| POST | `/orders/:id/cancel` | Cancel an order | Bearer |

### Payments — `paymentAPI.js`
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/payments/process` | Process a payment | — |
| POST | `/payments/create-intent` | Create payment intent (`{ amount, currency }`) | — |
| GET | `/payments/methods` | Available payment methods | — |

### Users — `userAPI.js`
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET / PUT | `/users/profile` | Read / update profile | Bearer |
| GET / POST | `/users/addresses` | List / add addresses | Bearer |
| PUT / DELETE | `/users/addresses/:id` | Update / delete address | Bearer |

---

## Screenshots

> **Placeholder** — run `npm run dev`, capture the pages below and save the images under `screenshots/`, then replace the paths.

```md
![Home](screenshots/home.png)
![Product listing](screenshots/products.png)
![Cart & checkout](screenshots/checkout.png)
![Admin panel](screenshots/admin.png)
```

Recommended captures: home page, `/products`, `/cart`, `/checkout`, `/auth/login` and `/admin`.

---

## Usage

**Shoppers**
1. Land on the home page → browse featured products or categories.
2. Open **Shop** (`/products`) → search, filter by category/price/brand/rating, switch grid/list, open **Quick View**, and add items to the cart.
3. Open the cart sidebar or `/cart` → adjust quantities, review totals, continue to `/checkout` → fill in the shipping address and choose a shipping method.
4. Sign in or register at `/auth/login` / `/auth/register`, then visit `/profile` and `/orders`.

**Store operators**
1. Sign in with `admin@example.com` / `adminpass`.
2. Go to `/admin` for KPIs and recent orders.
3. Manage the catalog at `/admin/products` (add / edit / delete / search / sort) and fulfilment at `/admin/orders` (filter and update order status).

---

## Admin Features

| Module | Capabilities |
|---|---|
| Dashboard (`/admin`) | Revenue, orders, customers and product KPI cards; recent-orders table with status badges |
| Products (`/admin/products`) | Add/edit via modal with validation, delete with confirmation, search, category & status filters, sorting, computed stat cards, image preview with fallback |
| Orders (`/admin/orders`) | Search, status filter, sort by date/amount, status transitions (pending, processing, shipped, delivered, cancelled) |
| Layout | Sidebar navigation (Dashboard / Products / Orders / Users / Analytics), "Back to Store" link, mobile drawer |

Admin product and order changes are **session-local** (React state) — they are not persisted or sent to a server.

---

## Security

What is actually implemented today:

- **Client-side demo authentication** — credentials are checked against hardcoded demo accounts in `AuthContext`; there is no server, no password hashing and no JWT issuance.
- **Session handling** — a 24-hour session with expiry timestamp, an auto-logout check every minute, and permission storage in `localStorage`.
- **Role & permission model** — `admin` / `moderator` / `customer` / `viewer` roles with permission sets, plus a reusable `AuthGuard` and `hasPermission()` helper for route/component gating.
- **Secrets hygiene** — `.env*` files are git-ignored; only `.env.example` placeholders are committed; no API keys or credentials are stored in the repository.
- **Crawler policy** — `public/robots.txt` disallows `/admin/`, `/user/`, `/profile/`, `/cart/` and `/checkout/`.
- **Prepared auth headers** — API clients send `Authorization: Bearer …` for protected endpoints once a backend is attached.
- **Form validation** — required-field checks plus `validateEmail` / `validatePassword` helpers in `src/services/utils/validators.js`.

**This is not a production-hardened application.** Admin routes are currently reachable without a guard, auth is simulated, and there is no server-side validation, rate limiting, or CSRF/XSS defence — all of that must come from a real backend.

---

## Future Improvements

- **Wire up a backend** — implement the endpoints documented above (or drop the unused API clients) and replace `mockData` imports with real fetches.
- **Finish routing** — add routes for product detail, search results, payment, confirmation, forgot/reset password, admin users & analytics, wishlist, settings and address book.
- **Protect private routes** — apply the existing `AuthGuard` to `/admin`, `/profile` and `/orders`.
- **Make URL params work** — `/products?search=` and `/products?category=` (used by the header search and category grid) are not read by the listing yet.
- **Fix the header theme button** — it calls `toggleTheme`, which `ThemeContext` does not export; the theme settings menu already provides the switching UI.
- **Unify cart pricing rules** — shipping/tax math differs between `CartContext`, `cart-summary` and `order-summary`.
- **Remove dead code** — duplicate layouts in `src/pages/layouts/`, unused `ui-kit/`, unused hooks, and `src/store/slices` (which import `zustand`, a package that is not installed).
- **Add quality tooling** — ESLint/Prettier, unit tests (none exist), and CI workflows.
- **Reduce bundle size** — route-level code splitting (the build warns about a >500 kB chunk) and lazy-loaded page components.
- **PWA polish** — populate `manifest.json` icons (currently empty) and add the favicon variants referenced by `index.html`.
- **Add screenshots** to this README.

---

## License

No license file is present in this repository. All rights are reserved by the author unless a license is added later.

---

## Author

**AlveeHossain45**

- GitHub: https://github.com/AlveeHossain45
- Repository: https://github.com/AlveeHossain45/Ecommerce-Platform
