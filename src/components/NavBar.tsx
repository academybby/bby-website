import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  // Apply theme to root element
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("light", !isDark);
  }

  const links = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Coaching", path: "/coaching" },
    { label: "Community", path: "/community" },
    { label: "Certifications", path: "/certifications" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">BBY academy</Link>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <div className="lang-toggle">
          <button className="lang-btn active">EN</button>
          <button className="lang-btn">TH</button>
        </div>
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <button className="btn-line">Chat on LINE</button>
      </div>
    </nav>
  );
}
