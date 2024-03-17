// CSS Styles imports
import "../src/styles/login.css";
import "../src/styles/register.css";
import "../src/styles/dashboard.css";
import "../src/styles/request-styles.css";

// Routers
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RequestForms from "./components/RequestForms";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requestforms" element={<RequestForms />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
