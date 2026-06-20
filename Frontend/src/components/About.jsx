import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-header">
          <span className="about-tag">🌞 About Our Project</span>
          <h1>
            Solar<span>Vision AI</span>
          </h1>
          <p>
            An AI-powered platform that analyzes rooftops from satellite and
            aerial images to detect solar panels, estimate rooftop area, and
            determine the maximum additional solar panels that can be installed.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Solar Panel Detection</h3>
            <p>
              Uses Computer Vision and Deep Learning models to detect and count
              existing solar panels automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🏠</div>
            <h3>Rooftop Analysis</h3>
            <p>
              Identifies rooftop boundaries and calculates the total usable
              rooftop area.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Capacity Estimation</h3>
            <p>
              Predicts the maximum number of additional solar panels that can
              be installed.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Energy Insights</h3>
            <p>
              Estimates solar power generation and provides sustainability
              insights.
            </p>
          </div>
        </div>

        <div className="tech-section">
          <h2>🛠 Technologies Used</h2>

          <div className="tech-grid">
            <span>React</span>
            <span>FastAPI</span>
            <span>Python</span>
            <span>OpenCV</span>
            <span>YOLO</span>
            <span>MongoDB</span>
            <span>Machine Learning</span>
            <span>Computer Vision</span>
          </div>
        </div>

      </div>
    </section>
  );
}