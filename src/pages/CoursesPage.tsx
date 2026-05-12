import "../styles/courses.css";
import { useState } from "react";

const ALL_COURSES = [
  // English
  { id: 1, cat: "English", sub: "General", level: "Beginner", title: "Everyday English", desc: "Build confidence in daily conversations and situations", weeks: 8, price: "฿1,490", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80" },
  { id: 2, cat: "English", sub: "General", level: "Intermediate", title: "Business English", desc: "Master professional communication for the workplace", weeks: 10, price: "฿2,490", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80" },
  { id: 3, cat: "English", sub: "General", level: "Intermediate", title: "Conversational English", desc: "Speak naturally and confidently in any situation", weeks: 8, price: "฿1,990", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
  { id: 4, cat: "English", sub: "General", level: "Beginner", title: "Travel English", desc: "Communicate effectively while traveling abroad", weeks: 6, price: "฿1,490", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80" },
  { id: 5, cat: "English", sub: "Exam", level: "Intermediate", title: "TOEIC Preparation", desc: "Score 750+ with proven test-taking strategies", weeks: 12, price: "฿2,990", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" },
  { id: 6, cat: "English", sub: "Exam", level: "Advanced", title: "IELTS Mastery", desc: "Achieve Band 7+ with expert guidance and practice", weeks: 14, price: "฿3,490", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  // Chinese
  { id: 7, cat: "Chinese", sub: "General", level: "Beginner", title: "Everyday Chinese", desc: "Start speaking Chinese from day one", weeks: 8, price: "฿1,490", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" },
  { id: 8, cat: "Chinese", sub: "General", level: "Intermediate", title: "Business Chinese", desc: "Conduct meetings and negotiations in Mandarin", weeks: 10, price: "฿2,490", img: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=600&q=80" },
  { id: 9, cat: "Chinese", sub: "Exam", level: "Beginner", title: "HSK 1-2 Preparation", desc: "Pass HSK 1 and 2 with confidence", weeks: 8, price: "฿1,990", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
  { id: 10, cat: "Chinese", sub: "Exam", level: "Intermediate", title: "HSK 4-6 Preparation", desc: "Comprehensive Chinese proficiency test preparation", weeks: 10, price: "฿3,490", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" },
  // Coding
  { id: 11, cat: "Coding", sub: "Kids", level: "Beginner", title: "Coding Fun Game", desc: "Kids aged 7-12 learn coding through games", weeks: 8, price: "฿1,990", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" },
  { id: 12, cat: "Coding", sub: "Kids", level: "Beginner", title: "Python for Kids", desc: "Introduction to Python programming for ages 10-15", weeks: 10, price: "฿2,490", img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80" },
  { id: 13, cat: "Coding", sub: "Adult", level: "Beginner", title: "Python for Automation", desc: "Automate repetitive tasks and boost productivity", weeks: 10, price: "฿4,990", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
  { id: 14, cat: "Coding", sub: "Adult", level: "Intermediate", title: "Full-Stack Web Development", desc: "Build production-ready web applications from scratch", weeks: 20, price: "฿9,900", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80" },
  { id: 15, cat: "Coding", sub: "Adult", level: "Beginner", title: "AI & ChatGPT for Work", desc: "Use AI tools to supercharge your productivity", weeks: 6, price: "฿2,990", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80" },
  // Finance
  { id: 16, cat: "Finance", sub: "", level: "Beginner", title: "Basic Investment", desc: "Start your investment journey with solid fundamentals", weeks: 8, price: "฿2,490", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80" },
  { id: 17, cat: "Finance", sub: "", level: "Intermediate", title: "Technical Analysis", desc: "Read charts and make data-driven investment decisions", weeks: 10, price: "฿3,990", img: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=600&q=80" },
  { id: 18, cat: "Finance", sub: "", level: "Beginner", title: "Financial Planning", desc: "Plan your financial future with expert strategies", weeks: 8, price: "฿2,990", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
  // Law
  { id: 19, cat: "Law", sub: "", level: "Advanced", title: "สอบตั๋วทนาย", desc: "เตรียมสอบใบอนุญาตทนายความ ครบทุกวิชา", weeks: 16, price: "฿9,900", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
  { id: 20, cat: "Law", sub: "", level: "Advanced", title: "สอบเนติบัณฑิต", desc: "ติวเข้มสอบเนติบัณฑิตยสภา ผ่านในครั้งเดียว", weeks: 20, price: "฿9,900", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
  // Aviation
  { id: 21, cat: "Aviation", sub: "", level: "Intermediate", title: "Cabin Crew English", desc: "English for flight attendants and in-flight service", weeks: 10, price: "฿3,490", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80" },
  { id: 22, cat: "Aviation", sub: "", level: "Beginner", title: "Ground Staff English", desc: "Communication skills for airport ground operations", weeks: 8, price: "฿2,990", img: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&q=80" },
];

const CATS = ["All", "English", "Chinese", "Coding", "Finance", "Law", "Aviation"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [search, setSearch] = useState("");

  const filtered = ALL_COURSES.filter(c => {
    const matchCat = activeCat === "All" || c.cat === activeCat;
    const matchLevel = activeLevel === "All Levels" || c.level === activeLevel;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div className="cp">
      {/* Hero */}
      <section className="cp-hero">
        <div className="cp-hero-inner">
          <div className="cp-breadcrumb"><a href="#">Home</a> / <span>Courses</span></div>
          <h1>All <span className="gold">Courses</span></h1>
          <p>65+ courses across 6 categories — find the perfect course for your goals</p>
          <div className="cp-stats">
            {[
              { num: "65+", label: "Courses" },
              { num: "6", label: "Categories" },
              { num: "2,000+", label: "Graduates" },
              { num: "95%", label: "Success Rate" },
            ].map((s, i) => (
              <div className="cp-stat" key={i}>
                <span className="cp-stat-num">{s.num}</span>
                <span className="cp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="cp-filters-bar">
        <div className="cp-filters-inner">
          <div className="cp-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="cp-filter-group">
            {CATS.map(cat => (
              <button key={cat} className={`cp-filter-btn${activeCat === cat ? " active" : ""}`} onClick={() => setActiveCat(cat)}>{cat}</button>
            ))}
          </div>
          <div className="cp-filter-group">
            {LEVELS.map(level => (
              <button key={level} className={`cp-level-btn${activeLevel === level ? " active" : ""}`} onClick={() => setActiveLevel(level)}>{level}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="cp-results">
        <div className="cp-results-inner">
          <div className="cp-results-header">
            <span className="cp-count">{filtered.length} courses found</span>
          </div>
          <div className="cp-grid">
            {filtered.map(course => (
              <div className="cp-card" key={course.id}>
                <div className="cp-card-img">
                  <img src={course.img} alt={course.title} />
                  <span className={`cp-badge cp-badge-${course.level.toLowerCase()}`}>{course.level}</span>
                  <span className="cp-cat-tag">{course.cat}</span>
                </div>
                <div className="cp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="cp-card-meta">
                    <span>⏱ {course.weeks} weeks</span>
                    {course.sub && <span>📂 {course.sub}</span>}
                  </div>
                  <div className="cp-card-foot">
                    <span className="cp-price">{course.price}</span>
                    <button className="btn-gold-sm">Enroll Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="cp-empty">
              <div>🔍</div>
              <p>No courses found. Try a different search or filter.</p>
              <button className="btn-gold" onClick={() => { setActiveCat("All"); setActiveLevel("All Levels"); setSearch(""); }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cp-cta">
        <div className="cp-cta-glow" />
        <h2>Not Sure Which Course?</h2>
        <p>Chat with us and we'll recommend the perfect course for your goals</p>
        <div className="cp-cta-btns">
          <button className="btn-gold">💬 Chat on LINE</button>
          <button className="btn-outline-pill">📞 Call Us</button>
        </div>
      </section>
    </div>
  );
}
