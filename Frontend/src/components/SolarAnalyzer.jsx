import { useState } from "react";

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
  }

  .sa-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .sa-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #F5A623;
    margin-bottom: 12px;
  }

  .sa-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    line-height: 1.1;
    color: #E8EDF5;
    letter-spacing: -0.02em;
  }

  .sa-title span {
    background: linear-gradient(90deg, #F5A623, #FFD97D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sa-subtitle {
    margin-top: 12px;
    font-size: 15px;
    font-weight: 400;
    color: #6B7A99;
    letter-spacing: 0.01em;
  }

  .sa-card {
    background: #141929;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 32px;
    max-width: 720px;
    margin: 0 auto 24px;
    position: relative;
    overflow: hidden;
  }

  .sa-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,166,35,0.4), transparent);
  }

  .sa-section-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #3D4F6E;
    margin-bottom: 16px;
  }

  /* Upload zone */
  .sa-upload-zone {
    border: 2px dashed rgba(245,166,35,0.25);
    border-radius: 16px;
    padding: 48px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    background: rgba(245,166,35,0.03);
  }

  .sa-upload-zone:hover {
    border-color: rgba(245,166,35,0.6);
    background: rgba(245,166,35,0.06);
  }

  .sa-upload-zone.has-file {
    border-color: rgba(0,212,180,0.5);
    background: rgba(0,212,180,0.05);
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

  .sa-upload-filename {
    font-size: 13px;
    font-weight: 500;
    color: #00D4B4;
    margin-top: 10px;
  }

  /* Input row */
  .sa-input-row {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    margin-top: 24px;
  }

  .sa-field {
    flex: 1;
  }

  .sa-field-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3D4F6E;
    margin-bottom: 8px;
    display: block;
  }

  .sa-input {
    width: 100%;
    background: #0B0F1A;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #E8EDF5;
    outline: none;
    transition: border-color 0.2s;
  }

  .sa-input::placeholder { color: #2D3A52; }

  .sa-input:focus {
    border-color: rgba(245,166,35,0.5);
    box-shadow: 0 0 0 3px rgba(245,166,35,0.08);
  }

  .sa-input::-webkit-inner-spin-button { -webkit-appearance: none; }

  /* Button */
  .sa-btn {
    background: linear-gradient(135deg, #F5A623, #FFD97D);
    color: #0B0F1A;
    border: none;
    border-radius: 12px;
    padding: 13px 28px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sa-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(245,166,35,0.3);
  }

  .sa-btn:active { transform: translateY(0); }

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

  /* Loading */
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

  .sa-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(245,166,35,0.2);
    border-top-color: #F5A623;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Results */
  .sa-results-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }

  .sa-results-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00D4B4;
    box-shadow: 0 0 8px rgba(0,212,180,0.7);
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .sa-results-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #E8EDF5;
  }

  .sa-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 28px;
  }

  .sa-stat {
    background: #0B0F1A;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 20px 16px;
    position: relative;
    overflow: hidden;
  }

  .sa-stat::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
  }

  .sa-stat.amber::after { background: linear-gradient(90deg, #F5A623, transparent); }
  .sa-stat.teal::after { background: linear-gradient(90deg, #00D4B4, transparent); }
  .sa-stat.purple::after { background: linear-gradient(90deg, #A78BFA, transparent); }

  .sa-stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3D4F6E;
    margin-bottom: 8px;
  }

  .sa-stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .sa-stat.amber .sa-stat-value { color: #F5A623; }
  .sa-stat.teal .sa-stat-value { color: #00D4B4; }
  .sa-stat.purple .sa-stat-value { color: #A78BFA; }

  .sa-stat-unit {
    font-size: 13px;
    font-weight: 400;
    opacity: 0.6;
    margin-left: 2px;
  }

  /* Image previews */
  .sa-images-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .sa-img-block {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .sa-img-header {
    padding: 12px 16px;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .sa-img-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .sa-img-dot.amber { background: #F5A623; }
  .sa-img-dot.teal { background: #00D4B4; }

  .sa-img-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6B7A99;
  }

  .sa-img-block img {
    width: 100%;
    display: block;
  }

  /* Error */
  .sa-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 14px;
    color: #FCA5A5;
    margin-top: 16px;
  }

  @media (max-width: 520px) {
    .sa-stats-grid { grid-template-columns: 1fr 1fr; }
    .sa-images-grid { grid-template-columns: 1fr; }
    .sa-input-row { flex-direction: column; }
    .sa-btn { width: 100%; justify-content: center; }
  }
`;

export default function SolarAnalyzer() {
  const [image, setImage] = useState(null);
  const [metersPerPixel, setMetersPerPixel] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!image) { setError("Please select a rooftop image."); return; }
    setError(null);
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("square_meters_per_pixel", metersPerPixel);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Analysis failed. Check that the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sa-root">
        {/* Header */}
        <header className="sa-header">
          <h1 className="sa-title">Solar <span>Potential</span> Scanner</h1>
          <p className="sa-subtitle">Upload a satellite image to detect roof area and optimal panel placement</p>
        </header>

        {/* Upload card */}
        <div className="sa-card">
          <p className="sa-section-label">Satellite Image</p>
          <div className={`sa-upload-zone${image ? " has-file" : ""}`}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => { setImage(e.target.files[0]); setResult(null); setError(null); }}
            />
            <div className="sa-upload-icon">
              <div className="sa-upload-pulse" />
              {image ? (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{stroke:"#00D4B4"}}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>
            <p className="sa-upload-label">{image ? "Image ready" : "Drop rooftop image here"}</p>
            <p className="sa-upload-hint">{image ? "" : "PNG, JPG, WebP — satellite or aerial view"}</p>
            {image && <p className="sa-upload-filename">{image.name}</p>}
          </div>

          <div className="sa-input-row">
            <div className="sa-field">
              <label className="sa-field-label">Scale Factor</label>
              <input
                className="sa-input"
                type="number"
                placeholder="e.g. 0.025"
                value={metersPerPixel}
                onChange={(e) => setMetersPerPixel(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            <button
              className="sa-btn"
              onClick={handleAnalyze}
              disabled={loading || !image}
            >
              {loading ? (
                <>
                  <div className="sa-spinner" />
                  Analyzing…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  Run Analysis
                </>
              )}
            </button>
          </div>

          {error && <div className="sa-error">⚠ {error}</div>}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="sa-card">
            <div className="sa-loading">
              <div className="sa-spinner" />
              Processing satellite imagery…
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="sa-card">
            <div className="sa-results-header">
              <div className="sa-results-dot" />
              <h2 className="sa-results-title">Analysis Complete</h2>
            </div>

            <div className="sa-stats-grid">
              <div className="sa-stat amber">
                <p className="sa-stat-label">Roof Area</p>
                <p className="sa-stat-value">
                  {typeof result.roof_area_m2 === "number" ? result.roof_area_m2.toLocaleString() : result.roof_area_m2}
                  <span className="sa-stat-unit">m²</span>
                </p>
              </div>
              <div className="sa-stat teal">
                <p className="sa-stat-label">Solar Area</p>
                <p className="sa-stat-value">
                  {typeof result.solar_area_m2 === "number" ? result.solar_area_m2.toLocaleString() : result.solar_area_m2}
                  <span className="sa-stat-unit">m²</span>
                </p>
              </div>
              <div className="sa-stat purple">
                <p className="sa-stat-label">Panel Count</p>
                <p className="sa-stat-value">{result.panel_count}</p>
              </div>
            </div>

            {(result.roof_image || result.solar_image) && (
              <div className="sa-images-grid">
                {result.roof_image && (
                  <div className="sa-img-block">
                    <div className="sa-img-header">
                      <div className="sa-img-dot amber" />
                      <span className="sa-img-label">Roof Detection</span>
                    </div>
                    <img src={result.roof_image} alt="Roof detection overlay" />
                  </div>
                )}
                {result.solar_image && (
                  <div className="sa-img-block">
                    <div className="sa-img-header">
                      <div className="sa-img-dot teal" />
                      <span className="sa-img-label">Panel Detection</span>
                    </div>
                    <img src={result.solar_image} alt="Solar panel detection overlay" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}