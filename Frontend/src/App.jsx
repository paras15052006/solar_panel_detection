import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import About from "./components/About";
import SolarAnalyzer from "./components/SolarAnalyzer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  const [result, setResult] = useState(null);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <SolarAnalyzer
              setResult={setResult}
            />
          }
        />


        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;