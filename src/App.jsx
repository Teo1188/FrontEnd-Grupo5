import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExtraHour from "./pages/ExtraHour";
import PasswordRecovery from "./pages/PasswordRecovery";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrahours" element={<ExtraHour />} />
      </Routes>
    </Router>
  )
}

export default App