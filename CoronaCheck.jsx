import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CoronaCheck() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoronaPatients();
  }, []);

  const fetchCoronaPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      const filtered = res.data.filter(
        (p) => p.disease.toLowerCase() === "coronacheck"
      );
      setPatients(filtered);
    } catch (err) {
      console.error("Error fetching patients:", err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("/corona.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "30px",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 700,
          margin: "0 auto",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Corona Check Patients
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/normalfever")}
          >
            Normal Fever
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#e91e63" }}
            onClick={() => navigate("/coronacheck")}
          >
            Corona Check
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4caf50" }}
            onClick={() => navigate("/heartdisease")}
          >
            Heart Disease
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Box>

        {patients.length === 0 ? (
          <Typography variant="body1" align="center">
            No patients found.
          </Typography>
        ) : (
          <ul style={{ fontSize: "18px" }}>
            {patients.map((p) => (
              <li key={p._id}>
                <strong>{p.name}</strong> - Age: {p.age} - Disease: {p.disease}
              </li>
            ))}
          </ul>
        )}
      </Paper>
    </Box>
  );
}

export default CoronaCheck;
