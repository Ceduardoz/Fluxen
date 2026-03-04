import { Routes, Route } from "react-router-dom";

import Transations from "./pages/Transations";
import Dashboard from "./pages/Dashoboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transations" element={<Transations />} />
    </Routes>
  );
}
