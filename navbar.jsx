// src/components/Navbar.jsx
import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        bgcolor: "#e3f2fd",
        justifyContent: "center",
      }}
    >
      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Button>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Patient Register
      </Button>
      <Button variant="contained" onClick={() => navigate("/normalfever")}>
        Normal Fever
      </Button>
      <Button variant="contained" onClick={() => navigate("/coronacheck")}>
        Corona Check
      </Button>
      <Button variant="contained" onClick={() => navigate("/heartdisease")}>
        Heart Disease
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
