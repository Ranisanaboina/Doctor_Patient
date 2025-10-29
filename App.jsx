import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PatientRegister from "./components/PatientRegister";
import NormalFever from "./components/NormalFever";
import CoronaCheck from "./components/CoronaCheck";
import HeartDisease from "./components/HeartDisease";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<PatientRegister />} />
      <Route path="/normalfever" element={<NormalFever />} />
      <Route path="/coronacheck" element={<CoronaCheck />} />
      <Route path="/heartdisease" element={<HeartDisease />} />
    </Routes>
  );
}

export default App;
