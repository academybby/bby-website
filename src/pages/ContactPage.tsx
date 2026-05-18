import "../styles/contact.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact">
      {/* Hero */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <div className="ct-breadcrumb"><Link to="/">Home</Link> / <span>Contact</span></div>
          <h1>Get in <span className="gold">Touch</span></h1>
          <p>Have questions? We're here to help you find the perfect course and start your learning journey.</p>
        </div>
      </section>

      {/* Main */}
      <section className="ct-main">
        <div className="ct-main-inner">

          {/* Form */}
          <div className="ct-form-wrap">
            <h2>Send us a Message</h2>
            <p>Fill in the form and we'll get back to you within 24 hours</p>

            {sent ? (
              <div className="ct-success">
                <div className="ct-success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you! We'll contact you within 24 hours.</p>
                <button className="btn-gold" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit}>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your full name" required
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="ct-field">
                    <label>Email *</label>
                    <input type="email" placeholder="your@email.com" required
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label>Phone</label>
                    <input type="tel" placeholder="08X-XXX-XXXX"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="ct-field">
                    <label>I'm interested in</label>
                    <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                      <option value="">Select a course category</option>
                      <option>English Courses</option>
                      <option>Chinese Courses</option>
                      <option>Coding & Tech</option>
                      <option>Finance & Investment</option>
                      <option>Law Courses</option>
                      <option>Aviation English</option>
                      <option>Coaching & Interview</option>
                      <option>Community</option>
                      <option>Certifications</option>
                    </select>
                  </div>
                </div>
                <div className="ct-field">
                  <label>Message</label>
                  <textarea placeholder="Tell us about your goals or questions..." rows={5}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-gold ct-submit">Send Message →</button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="ct-info">
            <div className="ct-info-card">
              <h3>Contact Information</h3>
              <div className="ct-info-items">
                <div className="ct-info-item">
                  <div className="ct-info-icon">✉</div>
                  <div>
                    <div className="ct-info-label">Email</div>
                    <a href="mailto:hello@bbyacademy.com">hello@bbyacademy.com</a>
                  </div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">📞</div>
                  <div>
                    <div className="ct-info-label">Phone</div>
                    <a href="tel:+6621234567">+66 2 123 4567</a>
                  </div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">📍</div>
                  <div>
                    <div className="ct-info-label">Location</div>
                    <span>Chiang Mai, Thailand<br />Near Chiang Mai University</span>
                  </div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">⏰</div>
                  <div>
                    <div className="ct-info-label">Hours</div>
                    <span>Mon–Fri: 9:00–20:00<br />Sat–Sun: 10:00–18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LINE CTA */}
            <div className="ct-line-card">
              <div className="ct-line-icon">💬</div>
              <h3>Chat on LINE</h3>
              <p>Get instant answers from our team. We reply within minutes!</p>
              <button className="btn-gold ct-line-btn">Open LINE Chat →</button>
              <div className="ct-line-id">LINE ID: @bbyacademy</div>
            </div>

            {/* Quick Links */}
            <div className="ct-quick-card">
              <h3>Quick Links</h3>
              <div className="ct-quick-links">
                <Link to="/courses">📚 Browse All Courses</Link>
                <Link to="/coaching">💼 Coaching & Interview</Link>
                <Link to="/community">👥 Join Community</Link>
                <Link to="/certifications">🏅 Certifications</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ct-faq">
        <div className="ct-faq-inner">
          <h2>Frequently Asked Questions</h2>
          <div className="ct-faq-grid">
            {[
              { q: "How do I enroll in a course?", a: "You can enroll directly on our website or chat with us on LINE. We'll guide you through the process." },
              { q: "Are courses available online?", a: "Yes! All courses are available online 24/7. Some also have offline options in Chiang Mai." },
              { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee if you're not satisfied with the course." },
              { q: "Can I get a certificate?", a: "Yes, all courses include a certificate of completion. Aviation and Business English certificates are recognized by employers." },
              { q: "Do you teach in Thai?", a: "Yes, most courses are taught in Thai with English materials to maximize understanding." },
              { q: "How long do I have access?", a: "All self-paced courses come with lifetime access so you can learn at your own pace." },
            ].map((item, i) => (
              <div className="ct-faq-item" key={i}>
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
