import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Router>
      {/* Suspense will wrap the routes and show a fallback while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
