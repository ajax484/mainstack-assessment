import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/revenue" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
