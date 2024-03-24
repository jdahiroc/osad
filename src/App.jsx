// Routers
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
//components
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import RequestForms from "./components/RequestForms";
import ProtectedRoute from "./components/ProtectedRoute";
//bootstrap link
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/requestforms"
            element={
              <ProtectedRoute>
                <RequestForms />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
