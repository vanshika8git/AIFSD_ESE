# 🛡️ AI-Powered Complaint Management System 🤖✨

Welcome to the **AI-Powered Complaint Management System**! This is a state-of-the-art MERN stack web application designed to streamline civic and organizational grievance registration. Using Artificial Intelligence, it automatically analyzes, summarizes, prioritizes, and routes complaints to the appropriate departments.

The user interface features a premium dark-mode **glassmorphism** design with rich emojis, smooth hover animations, and intuitive layouts.

---

## 🚀 Key Features

* **🔐 Secure Auth Wall:** Custom JWT-based user sign-up and login. Dashboard access is strictly guarded.
* **🤖 AI Analysis & Routing:** Integrates with OpenAI models (via OpenRouter API) to:
  * Detect complaint urgency/priority (High 🚨, Medium ⚠️, Low 🧹).
  * Assign the responsible department (Electricity ⚡, Water 💧, Sanitation 🧹, etc.).
  * Generate a concise 1-2 line summary.
  * Compose a professional automatic response.
* **📋 Dynamic Grievance Hub:** Log complaints, view full details, and read real-time status updates.
* **✅ One-Click Resolution:** Simple button for administrators or department heads to mark active complaints as resolved.
* **🗑️ Safe Deletion:** Option to permanently remove complaints from the database with double-check confirmations.
* **🔍 Search & Filter:** Instantly filter complaints by Category or search for specific locations in real-time.
* **🎨 Premium Glassmorphic UI:** A beautifully centered interface crafted using modern CSS variables, responsive typography, and glowing micro-animations.

---

## 🛠️ Tech Stack

### Backend 🖥️
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Auth:** JSON Web Token (JWT) & bcrypt (password hashing)
* **AI Integration:** Axios (connecting to OpenRouter API)

### Frontend 💻
* **Framework:** React.js (built with Vite)
* **Routing:** React Router DOM (v6)
* **Styling:** Custom CSS (featuring modern variables, Outfit font, and glassmorphism)
* **API Calls:** Axios (with interceptors to attach authorization headers automatically)

---

## 📂 Project Structure

```text
AIFSD_ESE/
├── backend/
│   ├── config/             # DB Connection configuration
│   ├── controllers/        # Express handlers (auth, complaints, AI)
│   ├── middleware/         # Auth verification, error handling, validation
│   ├── models/             # Mongoose schemas (User, Complaint)
│   ├── routes/             # Express routing mapping
│   ├── services/           # External AI API integration services
│   ├── utils/              # Helper functions (token generation)
│   ├── .env.example        # Reference for environment variables
│   ├── server.js           # Server startup script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Central Axios API client config
│   │   ├── components/     # Layout parts (Navbar, ProtectedRoute)
│   │   ├── pages/          # App Views (Login, Register, Dashboard, etc.)
│   │   ├── styles/         # Global glassmorphic stylesheet
│   │   ├── App.jsx         # App router setup
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md               # You are here! 📍
```

---

## ⚙️ Setup & Installation

Follow these steps to run the application locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vanshika8git/AIFSD_ESE.git
cd AIFSD_ESE
```

### 2️⃣ Configure the Backend 💻
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend/` folder and populate it with the following configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the server:
   ```bash
   # Production mode
   node server.js
   
   # Development mode (with nodemon auto-restart)
   npm run dev
   ```

### 3️⃣ Configure the Frontend 🖥️
1. Open a new terminal tab/window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify that the baseURL in `frontend/src/api/axios.js` matches your target backend URL (either local port `5000` or a deployed instance):
   ```javascript
   const API = axios.create({
       baseURL: "https://aifsd-ese-jetj.onrender.com/api", // or "http://localhost:5000/api"
   });
   ```
4. Run the React app:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints Summary

### Authentication Routes 🔑
* `POST /api/auth/signup` - Register a new user account.
* `POST /api/auth/login` - Authenticate user and retrieve JWT token.

### Complaint Routes 📋
* `POST /api/complaints` - Register a new complaint (Requires Token 🔐, automatically triggers AI processing).
* `GET /api/complaints` - Fetch all registered complaints (Requires Token 🔐).
* `PUT /api/complaints/:id` - Update the status of a complaint (Requires Token 🔐).
* `GET /api/complaints/search/location?location=...` - Search complaints by location (Requires Token 🔐).
* `GET /api/complaints/filter/category?category=...` - Filter complaints by category (Requires Token 🔐).
* `DELETE /api/complaints/:id` - Permanently remove a complaint (Requires Token 🔐).

---

## 🖼️ User Experience Preview
* **Authentication:** A clean `/` root page showing a glowing login card. There is an option to switch to `/register` easily. No navigation bar is displayed until authentication is confirmed.
* **Dashboard:** A centered control room offering live KPI statistics (Total Filed 📁, Pending ⏳, Resolved ✅, Urgent 🔥) and rapid navigation buttons.
* **AI Analysis Summary:** Dashed lavender boxes showing instant summaries and auto-suggested departments on each card.
* **Actions:** Immediate status updates when clicking **Resolve ✅** and confirmation alerts on clicking **Delete 🗑️**.

---

Enjoy using the **AI-Powered Complaint Management System**! For issues, suggestions, or contributions, feel free to open a pull request. 🚀🛡️
