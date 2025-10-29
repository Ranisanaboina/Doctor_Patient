# Doctor-Patient — README

**Project:** Doctor-Patient (Healthcare Dashboard)

A full-stack healthcare dashboard built with a **React (Vite) client** and an **Express + MongoDB server**. This README explains the project structure, how to install dependencies, configure environment variables, and run the project locally. It's written for another developer or recruiter who wants to clone and run your project.

---

## Table of Contents

* Project structure
* Prerequisites
* Environment variables (.env)
* Install dependencies
* Run the server
* Run the client
* API overview (important routes)
* Typical workflows
* Troubleshooting & tips
* Useful commands

---

## Project structure

Top-level folders:

```
Docter-Patient/
├─ client/          # React (Vite) frontend
├─ server/          # Express backend (Node.js)
├─ .gitignore
└─ README.md
```

### server/ (Express backend)

```
server/
├─ config/          # configuration helpers (e.g., db connection)
├─ models/          # Mongoose models (Patient, Suggestion, User, etc.)
├─ routes/          # Express route handlers (e.g., /api/patients, /api/suggestions)
├─ node_modules/    # installed packages (do not commit)
├─ .env             # environment variables (not committed)
├─ package.json
├─ package-lock.json
└─ server.js        # entry point (starts the Express server)
```

**Notes on server files:**

* `config/` typically contains a `db.js` or `dbConnect.js` file that reads `process.env.MONGO_URI` and connects to MongoDB using Mongoose.
* `models/` contains schema definitions (e.g., `Patient.js`, `Suggestion.js`). These define how patient and suggestion documents are stored in MongoDB.
* `routes/` contains route files such as `patientRoutes.js`, `suggestionRoutes.js`. They are usually mounted in `server.js` like `app.use('/api/patients', patientRoutes)`.
* `server.js` sets up middleware (bodyParser / express.json), CORS, mounts routes, handles errors, and listens on a port (e.g., `process.env.PORT || 5000`).

### client/ (React + Vite frontend)

```
client/
├─ node_modules/    # installed packages (do not commit)
├─ public/          # static assets (images, favicon)
├─ src/             # React source files (components, pages, services)
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ pages/         # pages like Dashboard, PatientRegister, NormalFever
│  ├─ components/    # reusable UI components
│  └─ services/      # API helper functions (fetch wrappers)
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ index.html
├─ eslint.config.js
└─ .gitignore
```

**Notes on client files:**

* `src/services/api.js` (or similar) usually contains functions that call backend endpoints (e.g., `getPatients()`, `createPatient(data)`), often using `fetch` or `axios`.
* `vite.config.js` configures the dev server and build options.
* `npm run dev` runs the Vite dev server on a local port (commonly `5173`).

---

## Prerequisites

* Node.js (v16 or later recommended)
* npm (comes with Node) or yarn
* MongoDB: either a local MongoDB server (via MongoDB Community / Docker) or a MongoDB Atlas cluster.
* Git (to clone the repo)

---

## Environment variables (.env)

Create a `.env` file in the **server/** folder (do **not** commit this file). Example contents:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/doctor_patient_db
JWT_SECRET=your_jwt_secret_here     # if auth is used
NODE_ENV=development
```

If you use MongoDB Atlas, `MONGO_URI` will be the Atlas connection string.

---

## Install dependencies

Run these commands from the project root or the folder indicated.

### 1) Server

```bash
cd server
npm install
npm start
```

### 2) Client

```bash
cd ../client
npm install
npm run dev
```

> If you see a `package-lock.json` or `node_modules` already in the repo, it’s fine — the `npm install` command will ensure correct packages are present.

---

## Run the project (development)

Make sure MongoDB is running and `.env` is configured.

### Start the server (entry file: `server/server.js`)

From the `server/` folder:

```bash
cd server
node server.js
# OR, if package.json has a start script:
# npm start
```

You should see console output like `Server running on port 5000` and a message that MongoDB connected.

### Start the client (Vite)

From the `client/` folder:

```bash
cd client
npm run dev
```

Vite will start the dev server (e.g., `http://localhost:5173`) and typically display the exact URL in the terminal.

**Now open the client URL in your browser**. The frontend should be able to communicate with the backend API at `http://localhost:5000` (or whichever port you configured).

---

## API overview (important routes)

*This is a general overview; adjust to match your actual route names in ********routes/********.*

* `GET /api/patients` — list all patients

* `GET /api/patients/:id` — get single patient

* `POST /api/patients` — create new patient

* `PUT /api/patients/:id` — update patient

* `DELETE /api/patients/:id` — delete patient

* `GET /api/suggestions` — list suggestions (e.g., fever remedies)

* `POST /api/suggestions` — add a suggestion

> If you have authentication, endpoints may require a JWT in `Authorization: Bearer <token>` header.

---

## Typical developer workflow

1. Clone the repo: `git clone <repo-url>`
2. Set up `.env` in `server/` with your MongoDB URI.
3. `cd server && npm install && node server.js` to run backend.
4. `cd client && npm install && npm run dev` to run frontend.
5. Open the client URL and test pages (patient registration, fever checks, etc.).

---

## Troubleshooting

* **Issue:** Client cannot talk to server (CORS or network error)

  * Ensure server has CORS enabled (e.g., `app.use(cors())`) and the server `PORT` is correct.
  * In development, the client may proxy API calls — check `package.json` or service helper for `baseURL`.

* **Issue:** MongoDB connection fails

  * Check `MONGO_URI` in `.env` for typos.
  * If using local MongoDB, ensure the service is running (`sudo systemctl start mongod` or Docker container running).
  * If using Atlas, ensure your IP is whitelisted and credentials are correct.

* **Issue:** Port already in use

  * Kill the process using the port or change the port in `.env`.

* **Issue:** Missing env variable errors

  * Confirm your `.env` contains all required keys.

---

## Production build (optional)

To build the client for production:

```bash
cd client
npm run build
```

You can then serve the `dist/` folder with a static server or configure the Express server to serve static files from `client/dist`.

---

## Useful commands

* `cd server && npm install` — install server deps
* `cd server && node server.js` — start server
* `cd client && npm install` — install client deps
* `cd client && npm run dev` — start Vite dev server
* `cd client && npm run build` — build production bundle

---

## Final notes for contributors / recruiters

* This project is built as a learning portfolio for UI/UX and full-stack skills.
* If you'd like to see API examples or Postman collection, I can add them.
* Replace placeholder `.env` values with secure credentials before deploying.

---

If you want, I can also:

* Add a `postman_collection.json` for the API,
* Provide sample seed data and a seed script to populate MongoDB,
* Create a small guide to deploy the app (Heroku / Railway for server + Netlify / Vercel for client).

Thank you — Sanaboina Rani
