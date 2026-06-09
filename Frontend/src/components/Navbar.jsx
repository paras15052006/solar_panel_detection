import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

  .nav-root {
    width: 100%;
    background: #0B0F1A;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: sticky;
    top: 0;
    z-index: 100;
    font-family: 'Inter', sans-serif;
  }

  .nav-glow {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.6) 40%, rgba(0,212,180,0.4) 70%, transparent 100%);
  }

  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 28px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  /* Logo */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    cursor: pointer;
  }

  .nav-logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.05));
    border: 1px solid rgba(245,166,35,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }

  .nav-logo-icon svg {
    width: 20px;
    height: 20px;
    stroke: #F5A623;
  }

  .nav-logo-pulse {
    position: absolute;
    inset: -3px;
    border-radius: 13px;
    border: 1px solid rgba(245,166,35,0.25);
    animation: navPulse 3s ease-in-out infinite;
  }

  @keyframes navPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  .nav-logo-text {}

  .nav-logo-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #E8EDF5;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .nav-logo-title span {
    background: linear-gradient(90deg, #F5A623, #FFD97D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-logo-sub {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3D4F6E;
    margin-top: 1px;
  }

  /* Nav links */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  .nav-link {
    position: relative;
    padding: 8px 16px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #6B7A99;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
    letter-spacing: 0.01em;
    user-select: none;
  }

  .nav-link:hover {
    color: #E8EDF5;
    background: rgba(255,255,255,0.04);
  }

  .nav-link.active {
    color: #F5A623;
    background: rgba(245,166,35,0.08);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 2px;
    border-radius: 1px;
    background: #F5A623;
    box-shadow: 0 0 6px rgba(245,166,35,0.6);
  }

  /* CTA button */
  .nav-cta {
    margin-left: 12px;
    padding: 8px 18px;
    background: linear-gradient(135deg, #F5A623, #FFD97D);
    border: none;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #0B0F1A;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.01em;
  }

  .nav-cta:hover {
    box-shadow: 0 4px 16px rgba(245,166,35,0.35);
    transform: translateY(-1px);
  }

  .nav-cta svg {
    width: 14px;
    height: 14px;
  }

  /* Status badge */
  .nav-status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: rgba(0,212,180,0.08);
    border: 1px solid rgba(0,212,180,0.18);
    border-radius: 20px;
    margin-right: 8px;
  }

  .nav-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00D4B4;
    box-shadow: 0 0 6px rgba(0,212,180,0.8);
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .nav-status-text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #00D4B4;
  }

  /* Mobile menu toggle */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
  }

  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #6B7A99;
    border-radius: 2px;
    transition: all 0.25s;
  }

  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #F5A623; }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #F5A623; }

  /* Mobile drawer */
  .nav-mobile {
    display: none;
    background: #0F1423;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 12px 20px 20px;
  }

  .nav-mobile.open { display: block; }

  .nav-mobile-link {
    display: block;
    padding: 12px 16px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #6B7A99;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-mobile-link:hover { color: #E8EDF5; background: rgba(255,255,255,0.04); }
  .nav-mobile-link.active { color: #F5A623; background: rgba(245,166,35,0.08); }

  @media (max-width: 640px) {
    .nav-links, .nav-status, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
  }
`;

const LINKS = ["Home", "Dashboard", "About"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <nav className="nav-root">
        <div className="nav-glow" />
        <div className="nav-inner">
          {/* Logo */}
          <div className="nav-logo" onClick={() => setActive("Home")}>
            <div className="nav-logo-icon">
              <div className="nav-logo-pulse" />
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="5"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="5" y2="12"/>
                <line x1="19" y1="12" x2="22" y2="12"/>
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
              </svg>
            </div>
            <div className="nav-logo-text">
              <div className="nav-logo-title">Solar <span>Analyzer</span></div>
              <div className="nav-logo-sub">AI Rooftop Detection</div>
            </div>
          </div>

          {/* Desktop nav */}
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li
                key={link}
                className={`nav-link${active === link ? " active" : ""}`}
                onClick={() => setActive(link)}
              >
                {link}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center" }}>

            <button
              className={`nav-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
          {LINKS.map((link) => (
            <div
              key={link}
              className={`nav-mobile-link${active === link ? " active" : ""}`}
              onClick={() => { setActive(link); setMenuOpen(false); }}
            >
              {link}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;