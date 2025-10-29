import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "rani" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/doctor-login-bg.png')", // ✅ Image from /public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          padding: 30,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          minWidth: 300,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Doctor Login</h2>

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ width: "100%", marginBottom: 20, padding: 10 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
