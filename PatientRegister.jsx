import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";

function PatientRegister() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    disease: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/patients/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/patients", form);
      }
      fetchPatients();
      setForm({ name: "", age: "", address: "", disease: "" });
    } catch (err) {
      console.error("Error saving patient:", err.message);
    }
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      address: patient.address,
      disease: patient.disease,
    });
    setEditingId(patient._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient:", err.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundImage: "url('/patient.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backdropFilter: "brightness(0.9)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          fontWeight: "bold",
          textShadow: "2px 2px 5px black",
        }}
      >
        Patient Registration
      </h2>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#1976d2" }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff9800" }}
          onClick={() => navigate("/normalfever")}
        >
          Normal Fever
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e91e63" }}
          onClick={() => navigate("/coronacheck")}
        >
          Corona Check
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#4caf50" }}
          onClick={() => navigate("/heartdisease")}
        >
          Heart Disease
        </Button>
      </div>

      {/* Form */}
      <Paper
        elevation={5}
        style={{
          maxWidth: "450px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Age"
          fullWidth
          name="age"
          value={form.age}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Address"
          fullWidth
          name="address"
          value={form.address}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Disease (e.g. normalfever, coronacheck, heartdisease)"
          fullWidth
          name="disease"
          value={form.disease}
          onChange={handleChange}
          margin="dense"
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          fullWidth
          style={{ marginTop: "10px" }}
        >
          {editingId ? "Update Patient" : "Add Patient"}
        </Button>
      </Paper>

      {/* Table */}
      <Paper
        elevation={3}
        style={{ marginTop: "40px", backgroundColor: "rgba(255,255,255,0.95)" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#2196f3" }}>
              <TableCell style={{ color: "#fff" }}>Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Age</TableCell>
              <TableCell style={{ color: "#fff" }}>Address</TableCell>
              <TableCell style={{ color: "#fff" }}>Disease</TableCell>
              <TableCell style={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p, index) => (
              <TableRow
                key={p._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f1f8ff" : "#e3f2fd",
                }}
              >
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.address}</TableCell>
                <TableCell>{p.disease}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(p)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default PatientRegister;
