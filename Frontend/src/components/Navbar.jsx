import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(245,166,35,0.6),
      rgba(0,212,180,0.4),
      transparent
    );
  }

  .nav-inner {
    max-width: 1200px;
    margin: auto;
    padding: 0 28px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .nav-logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(
      135deg,
      rgba(245,166,35,0.2),
      rgba(245,166,35,0.05)
    );
    border: 1px solid rgba(245,166,35,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
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
    animation: pulse 3s infinite;
  }

  @keyframes pulse {
    0%,100% {
      opacity: .4;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  .nav-logo-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: white;
  }

  .nav-logo-title span {
    color: #F5A623;
  }

  .nav-logo-sub {
    font-size: 11px;
    color: #6B7A99;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 8px;
  }

  .nav-link {
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    color: #6B7A99;
    font-family: 'Space Grotesk', sans-serif;
    transition: .3s;
  }

  .nav-link:hover {
    color: white;
    background: rgba(255,255,255,.05);
  }

  .nav-link.active {
    color: #F5A623;
    background: rgba(245,166,35,.1);
  }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-hamburger span {
    width: 22px;
    height: 2px;
    background: white;
  }

  .nav-mobile {
    display: none;
    background: #0F1423;
    padding: 10px 20px;
  }

  .nav-mobile.open {
    display: block;
  }

  .nav-mobile-link {
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    color: #6B7A99;
  }

  .nav-mobile-link.active {
    color: #F5A623;
    background: rgba(245,166,35,.1);
  }

  @media(max-width:640px){
    .nav-links{
      display:none;
    }

    .nav-hamburger{
      display:flex;
    }
  }
`;

const LINKS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/analyzer",
  },
  {
    name: "About",
    path: "/about",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>

      <nav className="nav-root">
        <div className="nav-glow" />

        <div className="nav-inner">

          {/* Logo */}
          <div
            className="nav-logo"
            onClick={() => navigate("/")}
          >
            <div className="nav-logo-icon">
              <div className="nav-logo-pulse" />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
              </svg>
            </div>

            <div>
              <div className="nav-logo-title">
                Solar <span>Analyzer</span>
              </div>

              <div className="nav-logo-sub">
                AI Rooftop Detection
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li
                key={link.name}
                className={`nav-link ${
                  location.pathname === link.path
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate(link.path)
                }
              >
                {link.name}
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            className="nav-hamburger"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`nav-mobile ${
            menuOpen ? "open" : ""
          }`}
        >
          {LINKS.map((link) => (
            <div
              key={link.name}
              className={`nav-mobile-link ${
                location.pathname === link.path
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
            >
              {link.name}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}