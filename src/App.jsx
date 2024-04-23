// Routers
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

//components
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Rooms from "./components/Rooms";

// (ADMIN Components)
import RequestedRoom from "./components/Requestedroom";
import History from "./components/History";

//Protected Route
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
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/a/request"
            element={
              <ProtectedRoute>
                <RequestedRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/a/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
