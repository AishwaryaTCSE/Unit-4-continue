// src/App.jsx
import React from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CountrySearch from "./pages/CountrySearch";

function PrivateRoute({ children }) {
  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  // mode state is managed inside CountrySearch via reducer, but Navbar needs to control it.
  // To keep things simple we'll lift a tiny mode state here and pass a prop down via search route using element prop.
  // However CountrySearch has its own toggle; Navbar will not directly change it in this simple setup.
  const [mode, setMode] = React.useState("pagination");

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar onToggleMode={(m) => setMode(m)} mode={mode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={
              <PrivateRoute>
                <CountrySearch />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
