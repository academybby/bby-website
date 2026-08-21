import { Link } from "react-router-dom";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import "../styles/footer.css";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    tagline: "Transform your future through premium education",
    quick_title: "Quick Links",
    quick_links: ["Courses", "Community", "Coaching", "Certifications", "Contact"],
    legal_title: "Legal",
    legal_links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
    contact_title: "Contact Us",
    copyright: "© 2026 BBY academy. All rights reserved.",
    tagline2: "Empowering learners worldwide.",
  },
  TH: {
    tagline: "เปลี่ยนอนาคตของคุณผ่านการศึกษาระดับพรีเมียม",
    quick_title: "ลิงก์ด่วน",
    quick_links: ["หลักสูตร", "ชุมชน", "โค้ชชิ่ง", "ใบรับรอง", "ติดต่อ"],
    legal_title: "กฎหมาย",
    legal_links: ["นโยบายความเป็นส่วนตัว", "ข้อกำหนดการใช้บริการ", "นโยบายการคืนเงิน"],
    contact_title: "ติดต่อเรา",
    copyright: "© 2026 BBY academy. สงวนลิขสิทธิ์",
    tagline2: "เสริมศักยภาพผู้เรียนทั่วโลก",
  },
};

const QUICK_PATHS = ["/courses", "/community", "/coaching", "/certifications", "/contact"];

export default function Footer() {
  const { lang } = useLang();
  const tx = TEXT[lang];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">BBY academy</div>
          <p>{tx.tagline}</p>
          <div className="social-row">
            {["FB", "IG", "X", "LI", "YT"].map((s, i) => (
              <a key={i} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>{tx.quick_title}</h4>
          {tx.quick_links.map((l, i) => <Link key={i} to={QUICK_PATHS[i]}>{l}</Link>)}
        </div>
        <div className="footer-col">
          <h4>{tx.legal_title}</h4>
          {tx.legal_links.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
        <div className="footer-col">
          <h4>{tx.contact_title}</h4>
          <a href="mailto:hello@bbyacademy.com"><IconMail size={16} /> hello@bbyacademy.com</a>
          <a href="tel:+6621234567"><IconPhone size={16} /> +66 2 123 4567</a>
          <a href="#"><IconMapPin size={16} /> Chiang Mai, Thailand</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{tx.copyright}</span>
        <span>{tx.tagline2}</span>
      </div>
    </footer>
  );
}
