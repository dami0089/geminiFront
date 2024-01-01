import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "./pages/auth";
import PrimerPassword from "./pages/auth/PrimerPassword";
import OlvidePassword from "./pages/auth/OlvidePassword";
import NuevoPassword from "./pages/auth/NuevoPassword";
import RutaProtegida from "./layouts/RutaProtegida";
import { Home } from "./pages/inicio";

import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
