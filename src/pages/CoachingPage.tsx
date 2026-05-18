import "../styles/coaching.css";
import { Link } from "react-router-dom";

const PACKAGES = [
  {
    category: "University Interview Prep",
    icon: "🎓",
    items: [
      { name: "Basic Session", duration: "60 min", price: "฿490", desc: "Introduction and assessment", popular: false },
      { name: "Standard Package", duration: "3×90 min", price: "฿1,290", desc: "Full preparation with feedback", popular: false },
      { name: "Premium Package", duration: "5×90 min", price: "฿2,490", desc: "Complete coaching with mock interviews", popular: true },
      { name: "Group Workshop", duration: "3 hrs", price: "฿390/person", desc: "6-10 students per session", popular: false },
    ],
  },
  {
    category: "Job Interview Prep",
    icon: "💼",
    items: [
      { name: "Entry Level", duration: "90 min", price: "฿590", desc: "CV review + basic interview prep", popular: false },
      { name: "Standard Package", duration: "4×90 min", price: "฿1,690", desc: "Mock interviews + detailed feedback", popular: true },
      { name: "Aviation Specialty", duration: "5×2 hrs", price: "฿2,990", desc: "For cabin crew & aviation careers", popular: false },
      { name: "Resume Review", duration: "—", price: "฿290", desc: "Professional CV feedback within 48hrs", popular: false },
    ],
  },
  {
    category: "English Speaking Coaching",
    icon: "🗣️",
    items: [
      { name: "Speaking Confidence", duration: "60 min", price: "฿390", desc: "Overcome fear of speaking", popular: false },
      { name: "Business English Interview", duration: "90 min", price: "฿790", desc: "Corporate communication coaching", popular: false },
      { name: "Accent Improvement", duration: "4×60 min", price: "฿1,490", desc: "Reduce accent, improve clarity", popular: true },
      { name: "Mock Interview (Express)", duration: "45 min", price: "฿290", desc: "Quick practice with instant feedback", popular: false },
    ],
  },
];

const BUNDLES = [
  { name: "Job Hunter Starter", price: "฿790", includes: ["Entry Level Interview", "Resume Review"], saving: "฿90" },
  { name: "Aviation Dream", price: "฿3,290", includes: ["Aviation Specialty (5×2hr)", "Resume Review", "Mock Interview Express"], saving: "฿580" },
  { name: "University Success", price: "฿1,190", includes: ["Standard University Package", "Group Workshop"], saving: "฿490" },
  { name: "Complete Interview Mastery", price: "฿2,490", includes: ["All 3 categories combined", "Full feedback report"], saving: "฿780" },
];

const ADDONS = [
  { name: "Video Recording", price: "+฿150", desc: "Record your session to review later" },
  { name: "Extra Mock Session", price: "+฿290", desc: "Add more practice rounds" },
  { name: "Follow-up Review", price: "+฿290", desc: "Check-in after 2 weeks" },
  { name: "LINE VIP Access", price: "+฿190/mo", desc: "Direct message support anytime" },
];

export default function CoachingPage() {
  return (
    <div className="coaching">
      {/* Hero */}
      <section className="ch-hero">
        <div className="ch-hero-inner">
          <div className="ch-breadcrumb"><Link to="/">Home</Link> / <span>Coaching</span></div>
          <div className="ch-badge">Margin 98% · Zero Marketing Cost</div>
          <h1>Coaching &<br /><span className="gold">Interview Prep</span></h1>
          <p>One-on-one coaching to get you into your dream university or land your dream job. Real practice, real feedback, real results.</p>
          <div className="ch-hero-btns">
            <button className="btn-gold">Book a Session →</button>
            <button className="btn-outline-pill">💬 Chat on LINE</button>
          </div>
          <div className="ch-hero-stats">
            {[
              { num: "98%", label: "Profit Margin" },
              { num: "500+", label: "Sessions Done" },
              { num: "95%", label: "Success Rate" },
              { num: "฿290", label: "Starting Price" },
            ].map((s, i) => (
              <div className="ch-stat" key={i}>
                <div className="ch-stat-num">{s.num}</div>
                <div className="ch-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">How It Works</h2>
          <p className="ch-sub center">Simple 4-step process to get you ready</p>
          <div className="ch-steps">
            {[
              { step: "01", title: "Book a Session", desc: "Choose your package and book via LINE or our website. We'll confirm within 2 hours." },
              { step: "02", title: "Assessment Call", desc: "Free 15-min call to understand your goals and customize the coaching plan." },
              { step: "03", title: "Coaching Sessions", desc: "Practice with expert coaches via Zoom or in-person in Chiang Mai." },
              { step: "04", title: "Get Results", desc: "Apply your skills with confidence. We follow up to celebrate your success!" },
            ].map((s, i) => (
              <div className="ch-step" key={i}>
                <div className="ch-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      {PACKAGES.map((pkg, pi) => (
        <section className={`ch-section${pi % 2 === 1 ? " alt" : ""}`} key={pi}>
          <div className="ch-inner">
            <div className="ch-pkg-header">
              <span className="ch-pkg-icon">{pkg.icon}</span>
              <div>
                <h2 className="ch-title">{pkg.category}</h2>
                <p className="ch-sub">Choose the package that fits your timeline and budget</p>
              </div>
            </div>
            <div className="ch-pkg-grid">
              {pkg.items.map((item, ii) => (
                <div className={`ch-pkg-card${item.popular ? " popular" : ""}`} key={ii}>
                  {item.popular && <div className="ch-popular-badge">Most Popular</div>}
                  <h3>{item.name}</h3>
                  <p className="ch-pkg-desc">{item.desc}</p>
                  <div className="ch-pkg-duration">⏱ {item.duration}</div>
                  <div className="ch-pkg-price">{item.price}</div>
                  <button className={item.popular ? "btn-gold" : "btn-outline-pill"}>Book Now →</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bundles */}
      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">Bundle Packages</h2>
          <p className="ch-sub center">Save more with our curated bundles</p>
          <div className="ch-bundles">
            {BUNDLES.map((bundle, i) => (
              <div className="ch-bundle" key={i}>
                <div className="ch-bundle-top">
                  <h3>{bundle.name}</h3>
                  <div className="ch-bundle-saving">Save {bundle.saving}</div>
                </div>
                <ul>
                  {bundle.includes.map((item, j) => (
                    <li key={j}><span>✓</span>{item}</li>
                  ))}
                </ul>
                <div className="ch-bundle-bottom">
                  <div className="ch-bundle-price">{bundle.price}</div>
                  <button className="btn-gold-sm">Get Bundle →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="ch-section alt">
        <div className="ch-inner">
          <h2 className="ch-title center">Add-on Services</h2>
          <p className="ch-sub center">Enhance your coaching experience</p>
          <div className="ch-addons">
            {ADDONS.map((addon, i) => (
              <div className="ch-addon" key={i}>
                <div className="ch-addon-info">
                  <h3>{addon.name}</h3>
                  <p>{addon.desc}</p>
                </div>
                <div className="ch-addon-price">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">Success Stories</h2>
          <p className="ch-sub center">Real students, real results</p>
          <div className="ch-testimonials">
            {[
              { name: "Nattida K.", result: "Landed Dream Job at SCB", quote: "The mock interviews were so realistic. I felt completely prepared on the actual day.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
              { name: "Pongpat S.", result: "Accepted to Chulalongkorn", quote: "Coach helped me structure my answers perfectly. Got into my first choice university!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
              { name: "Malisa T.", result: "Hired as Cabin Crew at Thai Airways", quote: "The Aviation Specialty package was exactly what I needed. Now living my dream!", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
            ].map((t, i) => (
              <div className="ch-testimonial" key={i}>
                <div className="ch-quote">"</div>
                <p>"{t.quote}"</p>
                <div className="ch-testimonial-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <div className="ch-author-name">{t.name}</div>
                    <div className="ch-author-result">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ch-cta">
        <div className="ch-cta-glow" />
        <h2>Ready to Ace Your Interview?</h2>
        <p>Book your first session today — starting at just ฿290</p>
        <div className="ch-cta-btns">
          <button className="btn-gold">Book a Session →</button>
          <button className="btn-outline-pill">💬 Chat on LINE</button>
        </div>
      </section>
    </div>
  );
}
