import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sa-root {
    min-height: 100vh;
    background: #0B0F1A;
    background-image:
      radial-gradient(ellipse 80% 40% at 50% -10%, rgba(245,166,35,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 30% at 80% 100%, rgba(0,212,180,0.08) 0%, transparent 50%);
    font-family: 'Inter', sans-serif;
    color: #E8EDF5;
    padding: 40px 24px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sa-header { 
    text-align: center; 
    margin-bottom: 48px;
    max-width: 760px;
    width: 100%;
  }

  .sa-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #F5A623; margin-bottom: 12px;
  }

  .sa-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 5vw, 48px); font-weight: 700;
    line-height: 1.1; color: #E8EDF5; letter-spacing: -0.02em;
  }

  .sa-title span {
    background: linear-gradient(90deg, #F5A623, #FFD97D);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .sa-subtitle { 
    margin-top: 12px; 
    font-size: 15px; 
    color: #6B7A99; 
  }

  .sa-card {
    background: #141929; 
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px; 
    padding: 32px;
    max-width: 900px; 
    width: 100%;
    margin: 0 auto 24px;
    position: relative; 
    overflow: hidden;
  }

  .sa-card::before {
    content: ''; 
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,166,35,0.4), transparent);
  }

  .sa-upload-zone {
    border: 2px dashed rgba(245,166,35,0.25); 
    border-radius: 16px;
    padding: 48px 24px; 
    text-align: center; 
    cursor: pointer;
    transition: all 0.25s ease; 
    position: relative; 
    background: rgba(245,166,35,0.03);
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sa-upload-zone:hover { 
    border-color: rgba(245,166,35,0.6); 
    background: rgba(245,166,35,0.06); 
  }

  .sa-upload-zone.has-file { 
    border-color: rgba(0,212,180,0.5); 
    background: rgba(0,212,180,0.05); 
    padding: 16px;
  }

  .sa-upload-zone input[type="file"] { 
    position: absolute; 
    inset: 0; 
    opacity: 0; 
    cursor: pointer; 
    width: 100%; 
    height: 100%; 
  }

  .sa-upload-icon {
    width: 56px; 
    height: 56px; 
    border-radius: 16px;
    background: rgba(245,166,35,0.12); 
    display: flex;
    align-items: center; 
    justify-content: center; 
    margin: 0 auto 16px; 
    position: relative;
  }

  .sa-upload-icon svg { 
    width: 26px; 
    height: 26px; 
    stroke: #F5A623; 
  }

  .sa-upload-pulse {
    position: absolute; 
    inset: -6px; 
    border-radius: 22px;
    border: 1.5px solid rgba(245,166,35,0.35);
    animation: pulse 2.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.06); }
  }

  .sa-upload-label { 
    font-family: 'Space Grotesk', sans-serif; 
    font-size: 16px; 
    font-weight: 600; 
    color: #C8D0E0; 
    margin-bottom: 6px; 
  }

  .sa-upload-hint { 
    font-size: 13px; 
    color: #3D4F6E; 
  }

  .sa-image-preview {
    width: 100%;
    max-height: 500px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .sa-image-preview img {
    width: 100%;
    height: 100%;
    max-height: 500px;
    object-fit: contain;
    display: block;
  }

  .sa-image-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(11, 15, 26, 0.8);
    backdrop-filter: blur(10px);
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 12px;
    color: #6B7A99;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 0.04em;
  }

  .sa-image-overlay span {
    color: #E8EDF5;
    font-weight: 600;
  }

  .sa-remove-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #FCA5A5;
    padding: 6px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
  }

  .sa-remove-btn:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .sa-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }

  .sa-btn {
    background: linear-gradient(135deg, #F5A623, #FFD97D); 
    color: #0B0F1A;
    border: none; 
    border-radius: 12px; 
    padding: 13px 32px;
    font-family: 'Space Grotesk', sans-serif; 
    font-size: 15px; 
    font-weight: 700;
    letter-spacing: 0.02em; 
    cursor: pointer; 
    transition: all 0.2s ease;
    display: flex; 
    align-items: center; 
    gap: 8px; 
    white-space: nowrap;
    width: 100%;
    justify-content: center;
  }

  .sa-btn:hover { 
    transform: translateY(-1px); 
    box-shadow: 0 8px 24px rgba(245,166,35,0.3); 
  }

  .sa-btn:disabled { 
    opacity: 0.4; 
    cursor: not-allowed; 
    transform: none; 
    box-shadow: none; 
  }

  .sa-btn svg { 
    width: 16px; 
    height: 16px; 
  }

  .sa-spinner {
    width: 18px; 
    height: 18px; 
    border: 2px solid rgba(245,166,35,0.2);
    border-top-color: #F5A623; 
    border-radius: 50%;
    animation: spin 0.8s linear infinite; 
    flex-shrink: 0;
  }

  @keyframes spin { 
    to { transform: rotate(360deg); } 
  }

  .sa-loading {
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: 12px; 
    padding: 32px; 
    color: #6B7A99; 
    font-size: 14px; 
    font-weight: 500;
  }

  .sa-error {
    background: rgba(239,68,68,0.08); 
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 12px; 
    padding: 14px 18px; 
    font-size: 14px;
    color: #FCA5A5; 
    margin-top: 16px;
  }

  .sa-results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  .sa-result-image {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    background: #0B0F1A;
  }

  .sa-result-image-header {
    padding: 12px 16px;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .sa-result-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .sa-result-dot.amber { background: #F5A623; }
  .sa-result-dot.teal { background: #00D4B4; }

  .sa-result-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6B7A99;
  }

  .sa-result-image img {
    width: 100%;
    display: block;
    max-height: 400px;
    object-fit: contain;
  }

  .sa-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }

  .sa-stat-item {
    background: #0B0F1A;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 16px;
    text-align: center;
  }

  .sa-stat-label {
    font-size: 11px;
    color: #3D4F6E;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  .sa-stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 700;
  }

  .sa-stat-value.amber { color: #F5A623; }
  .sa-stat-value.teal { color: #00D4B4; }
  .sa-stat-value.purple { color: #A78BFA; }

  .sa-stat-sub {
    font-size: 11px;
    color: #3D4F6E;
    margin-top: 4px;
  }

  .sa-param-group {
    margin-top: 16px;
  }

  .sa-param-label {
    display: block;
    font-size: 13px;
    color: #6B7A99;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .sa-param-input {
    width: 100%;
    padding: 10px 14px;
    background: #0B0F1A;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: #E8EDF5;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    transition: border-color 0.2s;
  }

  .sa-param-input:focus {
    outline: none;
    border-color: rgba(245,166,35,0.4);
  }

  .sa-param-input:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .sa-stats {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 560px) {
    .sa-card {
      padding: 16px;
    }
    .sa-upload-zone {
      padding: 32px 16px;
      min-height: 200px;
    }
    .sa-results-grid {
      grid-template-columns: 1fr;
    }
    .sa-stats {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .sa-stat-value {
      font-size: 18px;
    }
  }
`;

export default function SolarAnalyzer() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [squareMetersPerPixel, setSquareMetersPerPixel] = useState("0.025");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => { 
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    if (!squareMetersPerPixel || parseFloat(squareMetersPerPixel) <= 0) {
      setError("Please enter a valid area per pixel value.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("square_meters_per_pixel", squareMetersPerPixel);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Server returned ${response.status}`;
        try {
          const err = await response.json();
          errorMessage = err.detail || errorMessage;
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) { 
      console.error("Error:", err);
      setError(err.message || "Analysis failed. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sa-root">

        <header className="sa-header">
          <p className="sa-eyebrow">☀️ Solar Analysis</p>
          <h1 className="sa-title">Solar <span>Potential</span> Scanner</h1>
          <p className="sa-subtitle">Upload a satellite image to analyze solar panel potential</p>
        </header>

        <div className="sa-card">
          <div className={`sa-upload-zone${image ? " has-file" : ""}`}>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            
            {previewUrl ? (
              <div className="sa-image-preview">
                <img src={previewUrl} alt="Uploaded satellite image" />
                <div className="sa-image-overlay">
                  📐 <span>{image.name}</span>
                </div>
                <button 
                  className="sa-remove-btn"
                  onClick={handleRemoveImage}
                  type="button"
                >
                  ✕ Remove
                </button>
              </div>
            ) : (
              <div className="sa-empty-state">
                <div className="sa-upload-icon">
                  <div className="sa-upload-pulse" />
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p className="sa-upload-label">Drop your image here</p>
                <p className="sa-upload-hint">PNG, JPG, WebP — satellite or aerial view</p>
              </div>
            )}
          </div>

          <div className="sa-param-group">
            <label className="sa-param-label">Area per pixel (m²)</label>
            <input
              className="sa-param-input"
              type="number"
              step="0.001"
              min="0.001"
              value={squareMetersPerPixel}
              onChange={(e) => setSquareMetersPerPixel(e.target.value)}
              disabled={loading}
              placeholder="e.g., 0.025"
            />
          </div>

          {error && <div className="sa-error">⚠ {error}</div>}

          {image && !loading && !result && (
            <div style={{ marginTop: '20px' }}>
              <button className="sa-btn" onClick={handleAnalyze}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Analyze Image
              </button>
            </div>
          )}

          {loading && (
            <div className="sa-loading">
              <div className="sa-spinner" />
              Analyzing image...
            </div>
          )}
        </div>

        {result && !loading && (
          <div className="sa-card">
            <div className="sa-stats">
              <div className="sa-stat-item">
                <p className="sa-stat-label">Solar Area</p>
                <p className="sa-stat-value teal">{result.solar_area_m2?.toFixed(1) || 0} m²</p>
                <p className="sa-stat-sub">Area of Currently installed</p>
              </div>
              <div className="sa-stat-item">
                <p className="sa-stat-label">Roof Area</p>
                <p className="sa-stat-value amber">{result.roof_area_m2?.toFixed(1) || 0} m²</p>
                <p className="sa-stat-sub">Total available Area</p>
              </div>
              <div className="sa-stat-item">
                <p className="sa-stat-label">Max Panels</p>
                <p className="sa-stat-value purple">{result.max_panels_possible || 0}</p>
                <p className="sa-stat-sub">Panels of size 2300x1200 mm Possible</p>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <p className="sa-chart-title" style={{ textAlign: 'left', marginBottom: '12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 600, color: '#6B7A99', letterSpacing: '0.04em' }}>
                Detection Results
              </p>
              <div className="sa-results-grid">
                {result.roof_image && (
                  <div className="sa-result-image">
                    <div className="sa-result-image-header">
                      <div className="sa-result-dot amber" />
                      <span className="sa-result-label">Roof Detection</span>
                    </div>
                    <img src={result.roof_image} alt="Roof detection" />
                  </div>
                )}

                {result.solar_image && (
                  <div className="sa-result-image">
                    <div className="sa-result-image-header">  
                      <div className="sa-result-dot teal" />
                      <span className="sa-result-label">Panel Detection</span>
                    </div>
                    <img src={result.solar_image} alt="Solar panel detection" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="sa-card" style={{ 
          textAlign: 'center',
          opacity: '0.5',
          border: '1px solid rgba(255,255,255,0.03)'
        }}>
          <p style={{ 
            fontSize: '13px', 
            color: '#6B7A99',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {loading ? '⏳ Processing your image...' :
             result ? `✅ Complete - ${result.max_panels_possible || 0} panels possible` :
             image ? '📸 Enter area per pixel and click "Analyze Image"' :
             '📸 Upload an image to begin'}
          </p>
        </div>

      </div>
    </>
  );
}