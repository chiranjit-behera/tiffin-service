# 🥡 Tiffin Service App

A full-stack Tiffin Box Delivery Web App built using the **MERN stack (MongoDB, Express, React, Node.js)** and **Bootstrap** for styling. The app allows users to browse a weekly thali-based menu, subscribe to veg/non-veg plans, and manage delivery locations. Admins can manage menus, users, subscriptions, and view dashboard analytics.

---

## 🚀 Features

### 👤 User
- Secure Sign Up / Sign In with JWT
- View daily lunch and dinner menus (Veg/Non-Veg)
- Subscribe to weekly/monthly tiffin plans
- Choose delivery zones and update personal details

### 🧑‍💼 Admin
- Add/Edit/Delete menu items for each day
- Separate veg and non-veg thali configuration
- Manage users and subscription plans
- View analytics via charts (e.g., subscriptions, user growth)

---

## 🛠️ Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React.js, Bootstrap       |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB (with Mongoose)       |
| Auth      | JWT + bcrypt                  |
<!-- | Charts    | Chart.js or Recharts (Admin)  | -->

---

## 📁 Folder Structure

### 📁 Folder Structure

```text
├── client/                 # React frontend (Bootstrap-based)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, icons
│   │   ├── components/    # Reusable components (Navbar, MenuCard, etc.)
│   │   ├── pages/         # Home, Login, Signup, Dashboard, AdminPanel
│   │   ├── services/      # API calls using Axios
│   │   ├── utils/         # Helper functions (e.g., token, auth)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                # Express backend
│   ├── config/            # MongoDB connection and environment setup
│   ├── controllers/       # Business logic for routes
│   ├── middleware/        # Auth, error handling
│   ├── models/            # Mongoose schemas (User, Menu, Subscription)
│   ├── routes/            # API routes (auth, menu, subscriptions)
│   ├── utils/             # Token helpers, validators
│   ├── .env
│   ├── server.js
│   └── package.json
```



---

## 🔐 Environment Setup

### ✅ Server `.env` File
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tiffin
JWT_SECRET=jwtkey
```


# Clone the repository
```
git clone https://github.com/your-username/tiffin-service-app.git
cd tiffin-service-app
```

# Install server dependencies
```
cd server
npm install
```

# Install client dependencies
```
cd ../client
npm install
```
