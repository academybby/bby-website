import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconSun, IconMoon, IconLogin2, IconLogout, IconUserCircle } from "@tabler/icons-react";
import "../styles/Navbar.css";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const { lang, setLang, t } = useLang();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
          {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>
        {user ? (
          <div className="nav-account">
            <Link to="/my-courses" className="nav-account-link">
              <IconUserCircle size={16} /> {t("My Courses", "คอร์สของฉัน")}
            </Link>
            <button className="nav-account-logout" onClick={handleSignOut} title={t("Log out", "ออกจากระบบ")}>
              <IconLogout size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-login-btn">
            <IconLogin2 size={16} /> {t("Login", "เข้าสู่ระบบ")}
          </Link>
        )}
        <button className="btn-line">{t("Chat on LINE", "แชทบน LINE")}</button>
      </div>
    </nav>
  );
}
