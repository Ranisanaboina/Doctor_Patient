import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/dashboard.png')", // ✅ Relative path from public/
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        backdropFilter: "brightness(0.9)", // optional brightness filter
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#fff",
          fontWeight: "bold",
          textShadow: "1px 1px 4px #000",
        }}
      >
        Welcome to Healthcare Hospital
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/register")}
      >
        PATIENT REGISTRATION
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/normal-fever")}
      >
        NORMAL FEVER
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/corona-check")}
      >
        CORONA CHECK
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/heart-disease")}
      >
        HEART DISEASE
      </Button>
    </Box>
  );
}

export default Dashboard;
