export default function About() {
  const styles = {
    about: {
      minHeight: '100vh',
      background: '#0B0F1A',
      padding: '40px 20px',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      border: 'none',
      outline: 'none',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      border: 'none',
      outline: 'none',
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px',
      border: 'none',
      outline: 'none',
    },
    tag: {
      display: 'inline-block',
      background: 'rgba(245, 166, 35, 0.1)',
      color: '#F5A623',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '16px',
      border: '1px solid rgba(245, 166, 35, 0.2)',
    },
    title: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '42px',
      fontWeight: 700,
      color: 'white',
      marginBottom: '16px',
      border: 'none',
      outline: 'none',
    },
    titleSpan: {
      color: '#F5A623',
    },
    description: {
      color: '#6B7A99',
      fontSize: '18px',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: 1.8,
      border: 'none',
      outline: 'none',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '60px',
      border: 'none',
      outline: 'none',
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '16px',
      padding: '30px',
      transition: 'all 0.3s ease',
    },
    icon: {
      fontSize: '32px',
      marginBottom: '16px',
    },
    featureTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '20px',
      color: 'white',
      marginBottom: '12px',
    },
    featureDesc: {
      color: '#6B7A99',
      lineHeight: 1.6,
      fontSize: '15px',
    },
    techSection: {
      textAlign: 'center',
      paddingTop: '20px',
      border: 'none',
      outline: 'none',
    },
    techTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '28px',
      color: 'white',
      marginBottom: '30px',
    },
    techGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '12px',
      border: 'none',
      outline: 'none',
    },
    techItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '10px 24px',
      borderRadius: '30px',
      color: '#6B7A99',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      cursor: 'default',
    }
  };

  return (
    <section style={styles.about}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>🌞 About Our Project</span>
          <h1 style={styles.title}>
            Solar<span style={styles.titleSpan}>Vision AI</span>
          </h1>
          <p style={styles.description}>
            An AI-powered platform that analyzes rooftops from satellite and
            aerial images to detect solar panels, estimate rooftop area, and
            determine the maximum additional solar panels that can be installed.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.icon}>🔍</div>
            <h3 style={styles.featureTitle}>Solar Panel Detection</h3>
            <p style={styles.featureDesc}>
              Uses Computer Vision and Deep Learning models to detect and count
              existing solar panels automatically.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>🏠</div>
            <h3 style={styles.featureTitle}>Rooftop Analysis</h3>
            <p style={styles.featureDesc}>
              Identifies rooftop boundaries and calculates the total usable
              rooftop area.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>📊</div>
            <h3 style={styles.featureTitle}>Capacity Estimation</h3>
            <p style={styles.featureDesc}>
              Predicts the maximum number of additional solar panels that can
              be installed.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.icon}>⚡</div>
            <h3 style={styles.featureTitle}>Energy Insights</h3>
            <p style={styles.featureDesc}>
              Estimates solar power generation and provides sustainability
              insights.
            </p>
          </div>
        </div>

        <div style={styles.techSection}>
          <h2 style={styles.techTitle}>🛠 Technologies Used</h2>

          <div style={styles.techGrid}>
            <span style={styles.techItem}>React</span>
            <span style={styles.techItem}>FastAPI</span>
            <span style={styles.techItem}>Python</span>
            <span style={styles.techItem}>YOLO</span>
            <span style={styles.techItem}>Machine Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}