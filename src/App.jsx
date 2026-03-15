import { Routes, Route } from "react-router-dom";

import Transations from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transacoes" element={<Transations />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
