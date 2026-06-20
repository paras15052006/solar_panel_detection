import { Routes, Route } from "react-router-dom";

import About from "./components/About";
import SolarAnalyzer from "./components/SolarAnalyzer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<SolarAnalyzer />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  );
}

export default App;