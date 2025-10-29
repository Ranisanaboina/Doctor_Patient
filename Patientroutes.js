/* patientRoutes.js ------------------------------------ */
const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

/* ---------- GET  all patients (optionally filter by ?disease=Corona) ---------- */
router.get("/", async (req, res) => {
  const filter = req.query.disease ? { disease: req.query.disease } : {};
  const patients = await Patient.find(filter);
  res.json(patients);
});

/* ---------- POST  create a new patient ---------- */
router.post("/", async (req, res) => {
  const newPatient = await Patient.create(req.body);
  res.status(201).json(newPatient);
});

/* ---------- PUT  update a patient by ID ---------- */
router.put("/:id", async (req, res) => {
  const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/* ---------- DELETE patient by ID ---------- */
router.delete("/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
