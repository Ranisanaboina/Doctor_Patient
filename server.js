// server/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("/routes/patientRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_URI; // ✔ using the .env variable

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/patients", patientRoutes);

// Root test route
app.get("/", (req, res) => res.send("Doctor-Patient API running 🚀"));

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
