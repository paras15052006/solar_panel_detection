import { useState } from "react";

function SolarAnalyzer() {
  const [image, setImage] = useState(null);
  const [metersPerPixel, setMetersPerPixel] = useState("");
  const [result, setResult] = useState(null);
  

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("file", image);
    formData.append(
      "square_meters_per_pixel",
      metersPerPixel
    );

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Solar Panel Analyzer</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Meters per pixel"
        value={metersPerPixel}
        onChange={(e) =>
          setMetersPerPixel(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleAnalyze}>
        Analyze
      </button>

      {result && (
  <div>
    <h3>Results</h3>

    <p>Roof Area: {result.roof_area_m2} m²</p>

    <p>Solar Area: {result.solar_area_m2} m²</p>

    <p>Panel Count: {result.panel_count}</p>

    <h3>Roof Detection</h3>

    <img
      src={result.roof_image}
      alt="Roof Detection"
      width="600"
    />

    <h3>Solar Panel Detection</h3>

    <img
      src={result.solar_image}
      alt="Solar Detection"
      width="600"
    />
  </div>
)}
    </div>
  );
}

export default SolarAnalyzer;