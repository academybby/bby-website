import "../styles/landing.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const COURSES = [
  { id: 1, cat: "English", level: "Intermediate", title: "Business English Mastery", desc: "Master professional communication for career advancement", weeks: 12, price: "฿12,900", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80" },
  { id: 2, cat: "Coding", level: "Beginner", title: "Python for Data Science", desc: "Build modern data science skills with Python, pandas, and ML", weeks: 16, price: "฿18,900", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
  { id: 3, cat: "Coding", level: "Beginner", title: "Full-Stack Web Development", desc: "Build production-ready web applications from scratch", weeks: 20, price: "฿24,900", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80" },
  { id: 4, cat: "Chinese", level: "Intermediate", title: "HSK 4-6 Preparation", desc: "Comprehensive Chinese proficiency test preparation", weeks: 10, price: "฿11,900", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" },
  { id: 5, cat: "Finance", level: "Intermediate", title: "Financial Analysis Fundamentals", desc: "Learn financial modeling and investment analysis", weeks: 8, price: "฿13,900", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80" },
  { id: 6, cat: "Law", level: "Beginner", title: "Business Law Essentials", desc: "Understand contracts, compliance, and business regulations", weeks: 10, price: "฿15,900", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
];
const CATS = ["All", "English", "Chinese", "Coding", "Finance", "Law"];

export default function LandingPage() {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat === "All" ? COURSES : COURSES.filter(c => c.cat === activeCat);

  return (
    <div className="lp">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <h1>Upgrade Your Skills.<br /><span className="gold">Transform Your<br />Future.</span></h1>
          <p>Learn English, Chinese, Coding, and Career Skills with real-world results.</p>
          <div className="hero-btns">
            <Link to="/courses" className="btn-gold">Start Learning →</Link>
            <button className="btn-outline-pill">💬 Chat on LINE</button>
          </div>
        </div>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </section>

      {/* BBY Ecosystem */}
      <section className="full-section alt">
        <div className="inner">
          <h2 className="section-title center">BBY Ecosystem</h2>
          <p className="section-sub center">Your complete learning journey in one place</p>
          <div className="eco-grid">
            {[
              { icon: "📚", name: "Online Courses", desc: "Learn anytime, anywhere with structured lessons", link: "View Courses", path: "/courses" },
              { icon: "👥", name: "Language Community", desc: "Practice speaking with real people in small groups", link: "Join Community", path: "/community" },
              { icon: "💼", name: "Coaching & Interview", desc: "Prepare for university and job interviews", link: "Get Coaching", path: "/coaching" },
              { icon: "🎬", name: "Live Classes", desc: "1-on-1 and group sessions with expert teachers", link: "Book Class", path: "/coaching" },
              { icon: "🏅", name: "Certifications", desc: "Get recognized certificates and skill validation", link: "Take Test", path: "/certifications" },
              { icon: "👑", name: "Membership", desc: "Unlock premium benefits and exclusive access", link: "Join Now", path: "/contact" },
            ].map((item, i) => (
              <div className="eco-card" key={i}>
                <div className="eco-icon">{item.icon}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <Link to={item.path} className="eco-link">{item.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="full-section">
        <div className="inner">
          <h2 className="section-title center">Featured Courses</h2>
          <p className="section-sub center">Learn from industry experts with proven results</p>
          <div className="filter-tabs">
            {CATS.map(cat => (
              <button key={cat} className={`filter-tab${activeCat === cat ? " active" : ""}`} onClick={() => setActiveCat(cat)}>{cat}</button>
            ))}
          </div>
          <div className="courses-grid">
            {filtered.map(course => (
              <div className="course-card" key={course.id}>
                <div className="course-img">
                  <img src={course.img} alt={course.title} />
                  <span className="course-badge">{course.level}</span>
                </div>
                <div className="course-body">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="course-meta">
                    <span>⏱ {course.weeks} weeks</span>
                    <span>📊 {course.level}</span>
                  </div>
                  <div className="course-foot">
                    <span className="course-price">{course.price}</span>
                    <Link to={`/courses/${course.id}`} className="btn-gold-sm">View Details →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/courses" className="btn-gold">ดูหลักสูตรทั้งหมด →</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="full-section alt">
        <div className="inner">
          <div className="stats-grid">
            {[
              { num: "2,000+", label: "Successful Graduates" },
              { num: "65+", label: "Courses Available" },
              { num: "95%", label: "Student Success Rate" },
              { num: "6", label: "Learning Programs" },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BBY */}
      <section className="full-section">
        <div className="inner">
          <h2 className="section-title center">Why Choose BBY Academy?</h2>
          <p className="section-sub center">We're not just another language school — we're your partner in transformation</p>
          <div className="why-grid">
            {[
              { icon: "🎯", title: "Real-World Results", desc: "Our students get into top universities, land dream jobs, and achieve career transformations." },
              { icon: "👨‍🏫", title: "Expert Native Teachers", desc: "Learn from certified instructors who are native speakers with years of teaching experience." },
              { icon: "🏆", title: "Proven Track Record", desc: "95% of our students achieve their target scores. Over 2,000 successful graduates with BBY." },
              { icon: "⏰", title: "Flexible Learning", desc: "Study at your own pace with 24/7 online access, or join live classes that fit your schedule." },
            ].map((item, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{item.icon}</div>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="full-section alt">
        <div className="inner">
          <h2 className="section-title center">Student Success Stories</h2>
          <p className="section-sub center">Real results from real students</p>
          <div className="testimonials-grid">
            {[
              { quote: "BBY Academy helped me achieve my dream IELTS score. The teachers are professional and the community sessions boosted my confidence.", name: "Somchai P.", result: "IELTS 5.5 → 7.0", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
              { quote: "The interview coaching was incredible. I got my first tech job thanks to BBY's personalized guidance and mock interviews.", name: "Nattida K.", result: "Landed Dream Job", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
              { quote: "I never thought I could pass HSK 5, but the structured curriculum and native Chinese teachers made it possible in just 3 months!", name: "Thanat W.", result: "HSK 5 Passed", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
            ].map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="quote-mark">"</div>
                <div className="stars">★★★★★</div>
                <p>"{t.quote}"</p>
                <hr className="t-divider" />
                <div className="t-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-result">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <h2>Start Your Learning<br />Journey Today</h2>
        <p>Join BBY Academy and unlock your full potential.</p>
        <div className="hero-btns" style={{ justifyContent: "center" }}>
          <Link to="/courses" className="btn-gold">View Courses →</Link>
          <button className="btn-outline-pill">💬 Chat on LINE</button>
        </div>
      </section>
    </div>
  );
}
