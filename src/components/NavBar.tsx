import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useLang } from "../context/LanguageContext";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("light", !isDark);
  }

  const links = [
    { label: t("Home", "หน้าหลัก"), path: "/" },
    { label: t("Courses", "หลักสูตร"), path: "/courses" },
    { label: t("Coaching", "โค้ชชิ่ง"), path: "/coaching" },
    { label: t("Community", "ชุมชน"), path: "/community" },
    { label: t("Certifications", "ใบรับรอง"), path: "/certifications" },
    { label: t("Contact", "ติดต่อ"), path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">BBY academy</Link>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className={location.pathname === link.path ? "active" : ""}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <div className="lang-toggle">
          <button className={`lang-btn${lang === "EN" ? " active" : ""}`} onClick={() => setLang("EN")}>EN</button>
          <button className={`lang-btn${lang === "TH" ? " active" : ""}`} onClick={() => setLang("TH")}>TH</button>
        </div>
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <button className="btn-line">{t("Chat on LINE", "แชทบน LINE")}</button>
      </div>
    </nav>
  );
}
