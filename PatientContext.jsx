import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../components/navbar";

function PatientRegister() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    disease: "",
  });
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:5000/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/patients/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/patients", form);
    }
    setForm({ name: "", age: "", address: "", disease: "" });
    setEditingId(null);
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/patients/${id}`);
    fetchPatients();
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient._id);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Registration
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Age"
            fullWidth
            margin="normal"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <TextField
            label="Disease"
            fullWidth
            margin="normal"
            value={form.disease}
            onChange={(e) => setForm({ ...form, disease: e.target.value })}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {editingId ? "Update Patient" : "Add Patient"}
          </Button>
        </Paper>

        <Typography variant="h5" gutterBottom>
          Registered Patients
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.address}</TableCell>
                <TableCell>{p.disease}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(p._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default PatientRegister;
