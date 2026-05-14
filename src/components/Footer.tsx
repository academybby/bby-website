import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">BBY academy</div>
          <p>Transform your future through premium education</p>
          <div className="social-row">
            {["FB", "IG", "X", "LI", "YT"].map((s, i) => (
              <a key={i} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/courses">Courses</Link>
          <Link to="/community">Community</Link>
          <Link to="/coaching">Coaching</Link>
          <Link to="/certifications">Certifications</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <a href="mailto:hello@bbyacademy.com">✉ hello@bbyacademy.com</a>
          <a href="tel:+6621234567">📞 +66 2 123 4567</a>
          <a href="#">📍 Chiang Mai, Thailand</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BBY academy. All rights reserved.</span>
        <span>Empowering learners worldwide.</span>
      </div>
    </footer>
  );
}
