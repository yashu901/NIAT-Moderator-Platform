import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Onboard from "./pages/Onboard";

function App() {
  return (
    <BrowserRouter>

      

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<Onboard />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;