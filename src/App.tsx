import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/revenue" element={<Home />} />

        <Route path="/" element={<Navigate to="/revenue" replace />} />

        <Route path="*" element={<Navigate to="/revenue" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
