import "../styles/landing.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";

const FEATURED = ALL_COURSES.slice(0, 6);

const TEXT = {
  EN: {
    hero_title1: "Upgrade Your Skills.",
    hero_title2: "Transform Your Future.",
    hero_sub: "Learn English, Chinese, Coding, and Career Skills with real-world results.",
    hero_btn1: "Start Learning →",
    hero_btn2: "💬 Chat on LINE",
    eco_title: "BBY Ecosystem",
    eco_sub: "Your complete learning journey in one place",
    eco_cards: [
      { name: "Online Courses", desc: "Learn anytime, anywhere with structured lessons", link: "View Courses" },
      { name: "Language Community", desc: "Practice speaking with real people in small groups", link: "Join Community" },
      { name: "Coaching & Interview", desc: "Prepare for university and job interviews", link: "Get Coaching" },
      { name: "Live Classes", desc: "1-on-1 and group sessions with expert teachers", link: "Book Class" },
      { name: "Certifications", desc: "Get recognized certificates and skill validation", link: "Take Test" },
      { name: "Membership", desc: "Unlock premium benefits and exclusive access", link: "Join Now" },
    ],
    courses_title: "Featured Courses",
    courses_sub: "Learn from industry experts with proven results",
    courses_btn: "View All Courses →",
    view_details: "View Details →",
    cats: ["All", "English", "Chinese", "Coding", "Finance", "Law"],
    weeks: "weeks",
    level_map: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" } as Record<string, string>,
    stats: [
      { num: "2,000+", label: "Successful Graduates" },
      { num: "65+", label: "Courses Available" },
      { num: "95%", label: "Student Success Rate" },
      { num: "6", label: "Learning Programs" },
    ],
    why_title: "Why Choose BBY Academy?",
    why_sub: "We're not just another language school — we're your partner in transformation",
    why_cards: [
      { icon: "🎯", title: "Real-World Results", desc: "Our students get into top universities, land dream jobs, and achieve career transformations." },
      { icon: "👨‍🏫", title: "Expert Native Teachers", desc: "Learn from certified instructors who are native speakers with years of teaching experience." },
      { icon: "🏆", title: "Proven Track Record", desc: "95% of our students achieve their target scores. Over 2,000 successful graduates with BBY." },
      { icon: "⏰", title: "Flexible Learning", desc: "Study at your own pace with 24/7 online access, or join live classes that fit your schedule." },
    ],
    testimonials_title: "Student Success Stories",
    testimonials_sub: "Real results from real students",
    testimonials: [
      { quote: "BBY Academy helped me achieve my dream IELTS score. The teachers are professional and the community sessions boosted my confidence.", name: "Somchai P.", result: "IELTS 5.5 → 7.0", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
      { quote: "The interview coaching was incredible. I got my first tech job thanks to BBY's personalized guidance and mock interviews.", name: "Nattida K.", result: "Landed Dream Job", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
      { quote: "I never thought I could pass HSK 5, but the structured curriculum and native Chinese teachers made it possible in just 3 months!", name: "Thanat W.", result: "HSK 5 Passed", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
    ],
    cta_title: "Start Your Learning Journey Today",
    cta_sub: "Join BBY Academy and unlock your full potential.",
    cta_btn1: "View Courses →",
    cta_btn2: "💬 Chat on LINE",
  },
  TH: {
    hero_title1: "อัพเกรดทักษะของคุณ",
    hero_title2: "เปลี่ยนอนาคตของคุณ",
    hero_sub: "เรียนภาษาอังกฤษ ภาษาจีน Coding และทักษะอาชีพกับผลลัพธ์จริง",
    hero_btn1: "เริ่มเรียนเลย →",
    hero_btn2: "💬 แชทบน LINE",
    eco_title: "ระบบนิเวศ BBY",
    eco_sub: "เส้นทางการเรียนรู้ครบวงจรในที่เดียว",
    eco_cards: [
      { name: "คอร์สออนไลน์", desc: "เรียนได้ทุกที่ทุกเวลากับบทเรียนที่มีโครงสร้างชัดเจน", link: "ดูคอร์ส" },
      { name: "ชุมชนภาษา", desc: "ฝึกพูดกับคนจริงๆ ในกลุ่มเล็กๆ", link: "เข้าร่วมชุมชน" },
      { name: "โค้ชชิ่งและสัมภาษณ์", desc: "เตรียมสัมภาษณ์มหาวิทยาลัยและงาน", link: "รับโค้ชชิ่ง" },
      { name: "เรียนสด", desc: "เรียนตัวต่อตัวหรือกลุ่มกับครูผู้เชี่ยวชาญ", link: "จองเรียนสด" },
      { name: "ใบรับรอง", desc: "รับใบรับรองที่ได้รับการยอมรับและยืนยันทักษะ", link: "สอบเลย" },
      { name: "สมาชิก", desc: "ปลดล็อกสิทธิประโยชน์พรีเมียมและการเข้าถึงพิเศษ", link: "สมัครสมาชิก" },
    ],
    courses_title: "หลักสูตรแนะนำ",
    courses_sub: "เรียนจากผู้เชี่ยวชาญในอุตสาหกรรมที่มีผลลัพธ์พิสูจน์แล้ว",
    courses_btn: "ดูหลักสูตรทั้งหมด →",
    view_details: "ดูรายละเอียด →",
    cats: ["ทั้งหมด", "อังกฤษ", "จีน", "Coding", "การเงิน", "กฎหมาย"],
    weeks: "สัปดาห์",
    level_map: { Beginner: "เริ่มต้น", Intermediate: "กลาง", Advanced: "สูง" } as Record<string, string>,
    stats: [
      { num: "2,000+", label: "ผู้เรียนที่สำเร็จแล้ว" },
      { num: "65+", label: "หลักสูตรที่มีให้เรียน" },
      { num: "95%", label: "อัตราความสำเร็จ" },
      { num: "6", label: "โปรแกรมการเรียนรู้" },
    ],
    why_title: "ทำไมต้องเลือก BBY Academy?",
    why_sub: "เราไม่ใช่แค่โรงเรียนสอนภาษา — เราคือพาร์ทเนอร์ในการเปลี่ยนแปลงของคุณ",
    why_cards: [
      { icon: "🎯", title: "ผลลัพธ์จริงในชีวิตจริง", desc: "นักเรียนของเราเข้ามหาวิทยาลัยชั้นนำ ได้งานในฝัน และเปลี่ยนเส้นทางอาชีพ" },
      { icon: "👨‍🏫", title: "ครูเจ้าของภาษาผู้เชี่ยวชาญ", desc: "เรียนจากผู้สอนที่ได้รับการรับรองซึ่งเป็นเจ้าของภาษาพื้นเมืองและมีประสบการณ์สูง" },
      { icon: "🏆", title: "ประวัติความสำเร็จที่พิสูจน์แล้ว", desc: "95% ของนักเรียนผ่านเป้าหมายที่ตั้งไว้ ผู้สำเร็จการศึกษากว่า 2,000 คน" },
      { icon: "⏰", title: "เรียนได้ยืดหยุ่น", desc: "เรียนตามจังหวะของคุณด้วยการเข้าถึง 24/7 หรือเข้าเรียนสดตามตารางที่เหมาะกับคุณ" },
    ],
    testimonials_title: "เรื่องราวความสำเร็จของนักเรียน",
    testimonials_sub: "ผลลัพธ์จริงจากนักเรียนจริง",
    testimonials: [
      { quote: "BBY Academy ช่วยให้ฉันได้คะแนน IELTS ตามที่ฝัน ครูสอนมืออาชีพมากและ community sessions ช่วยเพิ่มความมั่นใจ", name: "สมชาย พ.", result: "IELTS 5.5 → 7.0", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
      { quote: "การโค้ชสัมภาษณ์ยอดเยี่ยมมาก ฉันได้งานเทคโนโลยีครั้งแรกต้องขอบคุณการแนะนำส่วนตัวของ BBY", name: "ณัทธิดา ก.", result: "ได้งานในฝัน", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
      { quote: "ไม่เคยคิดว่าจะผ่าน HSK 5 ได้ แต่หลักสูตรที่มีโครงสร้างชัดเจนและครูชาวจีนทำให้เป็นไปได้ใน 3 เดือน!", name: "ธนัท ว.", result: "ผ่าน HSK 5", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
    ],
    cta_title: "เริ่มต้นการเดินทางเรียนรู้ของคุณวันนี้",
    cta_sub: "เข้าร่วม BBY Academy และปลดล็อกศักยภาพสูงสุดของคุณ",
    cta_btn1: "ดูหลักสูตร →",
    cta_btn2: "💬 แชทบน LINE",
  },
};

const ECO_PATHS = ["/courses", "/community", "/coaching", "/coaching", "/certifications", "/contact"];
const ECO_ICONS = ["📚", "👥", "💼", "🎬", "🏅", "👑"];
const CAT_KEYS = ["All", "English", "Chinese", "Coding", "Finance", "Law"];

export default function LandingPage() {
  const [activeCat, setActiveCat] = useState(0);
  const { lang } = useLang();
  const tx = TEXT[lang];
  const filtered = activeCat === 0 ? FEATURED : FEATURED.filter(c => c.cat === CAT_KEYS[activeCat]);

  return (
    <div className="lp">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <h1>{tx.hero_title1}<br /><span className="gold">{tx.hero_title2}</span></h1>
          <p>{tx.hero_sub}</p>
          <div className="hero-btns">
            <Link to="/courses" className="btn-gold">{tx.hero_btn1}</Link>
            <button className="btn-outline-pill">{tx.hero_btn2}</button>
          </div>
        </div>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </section>

      {/* BBY Ecosystem */}
      <section className="full-section alt">
        <div className="inner">
          <h2 className="section-title center">{tx.eco_title}</h2>
          <p className="section-sub center">{tx.eco_sub}</p>
          <div className="eco-grid">
            {tx.eco_cards.map((item, i) => (
              <div className="eco-card" key={i}>
                <div className="eco-icon">{ECO_ICONS[i]}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <Link to={ECO_PATHS[i]} className="eco-link">{item.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="full-section">
        <div className="inner">
          <h2 className="section-title center">{tx.courses_title}</h2>
          <p className="section-sub center">{tx.courses_sub}</p>
          <div className="filter-tabs">
            {tx.cats.map((cat, i) => (
              <button key={i} className={`filter-tab${activeCat === i ? " active" : ""}`} onClick={() => setActiveCat(i)}>{cat}</button>
            ))}
          </div>
          <div className="courses-grid">
            {filtered.map(course => (
              <Link to={`/courses/${course.id}`} className="course-card" key={course.id} style={{ textDecoration: "none" }}>
                <div className="course-img">
                  <img src={course.img} alt={course.title} />
                  <span className="course-badge">{tx.level_map[course.level]}</span>
                </div>
                <div className="course-body">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="course-meta">
                    <span>⏱ {course.weeks} {tx.weeks}</span>
                    <span>📊 {tx.level_map[course.level]}</span>
                  </div>
                  <div className="course-foot">
                    <span className="course-price">{course.price}</span>
                    <span className="btn-gold-sm">{tx.view_details}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/courses" className="btn-gold">{tx.courses_btn}</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="full-section alt">
        <div className="inner">
          <div className="stats-grid">
            {tx.stats.map((s, i) => (
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
          <h2 className="section-title center">{tx.why_title}</h2>
          <p className="section-sub center">{tx.why_sub}</p>
          <div className="why-grid">
            {tx.why_cards.map((item, i) => (
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
          <h2 className="section-title center">{tx.testimonials_title}</h2>
          <p className="section-sub center">{tx.testimonials_sub}</p>
          <div className="testimonials-grid">
            {tx.testimonials.map((t, i) => (
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
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_sub}</p>
        <div className="hero-btns" style={{ justifyContent: "center" }}>
          <Link to="/courses" className="btn-gold">{tx.cta_btn1}</Link>
          <button className="btn-outline-pill">{tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
