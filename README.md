# 🏦 Vaulted — Full-Stack E-Commerce Marketplace

Vaulted is a full-stack e-commerce marketplace that connects buyers and sellers through a modern storefront and a dedicated seller dashboard. The platform is split into a **Next.js frontend** and a **Node.js (Express) backend API**, backed by MongoDB, with integrated payments, image hosting, and an AI-powered shopping assistant.

---

## 🧱 Architecture

Vaulted is composed of two services:

| Service | Description |
|---|---|
| **Frontend** | Next.js 16 (App Router) storefront and seller dashboard |
| **Backend** | Node.js + Express REST API handling auth, products, cart, checkout, payments, and AI chat |

Both services communicate over a REST API secured with JWT (HTTP-only cookies) and CORS configured for the frontend origin.

---

## ✨ Features

### 🛒 Storefront & Shopping
- Responsive homepage with promotional banners, carousels, categories, and featured/trending products
- Product browsing with pricing, shipping info, stock levels, and sold counts
- Advanced filtering by category, price range, seller type, authorized sellers, delivery options, and listing status
- Sorting by price and creation date
- Shopping cart with quantity selection, stock-aware quantity validation, item removal, and live price calculations
- Checkout flow with saved address selection, order review, subtotal/shipping/tax breakdown, and PayHere payment integration
- Order history with pagination, payment status, delivery status, and tracking numbers

### 👤 Accounts & Profiles
- User registration and login with client-side validation and toast notifications
- Password hashing with `bcryptjs`
- JWT authentication via HTTP-only cookies
- Editable customer profile and personal information
- Shipping address management (add, edit, delete) with duplicate-address protection

### 🏪 Seller Tools
- Seller dashboard for adding and updating products
- Product image uploads (up to four images) via Cloudinary
- Management of product attributes, pricing, discounts, stock, and shipping fees
- Filtering and searching seller's own products
- Dashboard stats: total products, sold quantity, and revenue

### 🤖 AI Shopping Assistant
- Floating AI assistant widget with message history and loading indicators
- Context-aware follow-up understanding using prior conversation messages
- Answers generated from retrieved product and workflow information via **MongoDB Atlas Vector Search**
- Clearly reports when requested information isn't available

### 🔧 Platform & Reliability
- Centralized Axios instance with credentialed requests and unified error-to-toast handling
- Zod-based request validation on the backend
- Centralized API error handling with consistent HTTP status codes
- Sentry error monitoring and logging
- Mobile-friendly, responsive layouts across storefront, checkout, and seller screens

---

## 📐 Business Rules & API Behaviors

- A valid JWT cookie is issued on successful registration or login; protected routes reject requests without one
- Passwords must include uppercase, lowercase, numeric, and special characters
- Product creation requires **exactly four images**, each a supported format and under 5 MB
- Product stock must be greater than zero
- Cart item quantities cannot exceed available stock and must remain greater than zero
- Adding an already-cart-ed product increases its quantity instead of duplicating the line item
- Duplicate shipping addresses are rejected
- Checkout requires a valid saved address and calculates discounted prices, shipping charges, and 8% tax
- New orders are created with a `pending` status; product stock and sold count update automatically after checkout, and the cart is cleared
- PayHere payment notifications are only accepted when the MD5 signature is valid
- Order history is returned newest-first
- API responses follow standard status codes: `400` invalid data, `401` missing/invalid auth, `404` missing resource; unexpected errors are logged and reported to Sentry

---

## 🏗️ Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- Radix UI
- Lucide Icons
- React Hot Toast
- Embla Carousel

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- MongoDB Atlas Vector Search (AI knowledge retrieval)
- JWT authentication (HTTP-only cookies)
- bcryptjs (password hashing)
- Zod (request validation)
- Cloudinary (image hosting)
- PayHere (payment gateway)
- Sentry (error monitoring)
- CORS

---

## ✅ Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A MongoDB Atlas cluster (with Vector Search enabled for the AI assistant)
- A Cloudinary account (API key/secret)
- A PayHere merchant account (sandbox credentials for testing)
- A Sentry project DSN (optional, for error monitoring)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd vaulted
```

### 2. Install Dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

**Backend `.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAYHERE_MERCHANT_ID=your_payhere_merchant_id
PAYHERE_MERCHANT_SECRET=your_payhere_merchant_secret
SENTRY_DSN=your_sentry_dsn
CLIENT_ORIGIN=http://localhost:3000
```

**Frontend `.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Development Servers

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:5000`.

---

## 📸 Screenshots

> Add screenshots of the web app here.

| Homepage | Product Listing | Product Details |
|---|---|---|
| _<!-- screenshot -->_ | _<!-- screenshot -->_ | _<!-- screenshot -->_ |

| Cart | Checkout | Order History |
|---|---|---|
| _<!-- screenshot -->_ | _<!-- screenshot -->_ | _<!-- screenshot -->_ |

| Seller Dashboard | Add/Edit Product | AI Assistant |
|---|---|---|
| _<!-- screenshot -->_ | _<!-- screenshot -->_ | _<!-- screenshot -->_ |

---

## 📂 Project Structure

```
vaulted/
 ├── frontend/          # Next.js storefront & seller dashboard
 │    ├── app/          # App Router pages & layouts
 │    ├── components/   # Shared UI components (nav, forms, cards, carousels, checkout, seller tools)
 │    └── lib/          # API client, helpers
 │
 └── backend/           # Express REST API
      ├── routes/       # Auth, products, cart, checkout, orders, AI assistant
      ├── models/       # Mongoose schemas (User, Product, Order, Address, Cart)
      ├── middleware/   # Auth, validation (Zod), error handling
      └── services/     # Cloudinary, PayHere, Sentry, vector search integration
```

---

## 📄 License

Add your preferred license here (e.g. MIT, Apache 2.0) if you intend to open-source this project.
