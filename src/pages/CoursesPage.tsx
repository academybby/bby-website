import "../styles/courses.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconClock, IconFolder, IconMessageCircle, IconPhone } from "@tabler/icons-react";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    breadcrumb_home: "Home",
    breadcrumb_courses: "Courses",
    title: "All",
    title_highlight: "Courses",
    sub: "65+ courses across 6 categories — find the perfect course for your goals",
    stats: [
      { num: "65+", label: "Courses" },
      { num: "6", label: "Categories" },
      { num: "2,000+", label: "Graduates" },
      { num: "95%", label: "Success Rate" },
    ],
    search_placeholder: "Search courses...",
    cats: ["All", "English", "Chinese", "Coding", "Finance", "Law", "Aviation"],
    levels: ["All Levels", "Beginner", "Intermediate", "Advanced"],
    level_map: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" } as Record<string, string>,
    courses_found: "courses found",
    weeks: "weeks",
    view_details: "View Details →",
    no_courses: "No courses found. Try a different search or filter.",
    clear_filters: "Clear Filters",
    cta_title: "Not Sure Which Course?",
    cta_sub: "Chat with us and we'll recommend the perfect course for your goals",
    cta_btn1: "Chat on LINE",
    cta_btn2: "Call Us",
  },
  TH: {
    breadcrumb_home: "หน้าหลัก",
    breadcrumb_courses: "หลักสูตร",
    title: "หลักสูตร",
    title_highlight: "ทั้งหมด",
    sub: "65+ หลักสูตรใน 6 หมวด — หาหลักสูตรที่เหมาะกับเป้าหมายของคุณ",
    stats: [
      { num: "65+", label: "หลักสูตร" },
      { num: "6", label: "หมวดหมู่" },
      { num: "2,000+", label: "ผู้สำเร็จ" },
      { num: "95%", label: "อัตราสำเร็จ" },
    ],
    search_placeholder: "ค้นหาหลักสูตร...",
    cats: ["ทั้งหมด", "อังกฤษ", "จีน", "Coding", "การเงิน", "กฎหมาย", "การบิน"],
    levels: ["ทุกระดับ", "เริ่มต้น", "กลาง", "สูง"],
    level_map: { Beginner: "เริ่มต้น", Intermediate: "กลาง", Advanced: "สูง" } as Record<string, string>,
    courses_found: "หลักสูตรที่พบ",
    weeks: "สัปดาห์",
    view_details: "ดูรายละเอียด →",
    no_courses: "ไม่พบหลักสูตร ลองค้นหาหรือกรองใหม่",
    clear_filters: "ล้างตัวกรอง",
    cta_title: "ไม่แน่ใจว่าจะเลือกหลักสูตรไหน?",
    cta_sub: "แชทกับเราแล้วเราจะแนะนำหลักสูตรที่เหมาะกับเป้าหมายของคุณ",
    cta_btn1: "แชทบน LINE",
    cta_btn2: "โทรหาเรา",
  },
};

const CAT_KEYS = ["All", "English", "Chinese", "Coding", "Finance", "Law", "Aviation"];
const LEVEL_KEYS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [search, setSearch] = useState("");
  const { lang } = useLang();
  const tx = TEXT[lang];

  const filtered = ALL_COURSES.filter(c => {
    const matchCat = activeCat === 0 || c.cat === CAT_KEYS[activeCat];
    const matchLevel = activeLevel === 0 || c.level === LEVEL_KEYS[activeLevel];
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div className="cp">
      <section className="cp-hero">
        <div className="cp-hero-inner">
          <div className="cp-breadcrumb">
            <Link to="/">{tx.breadcrumb_home}</Link> / <span>{tx.breadcrumb_courses}</span>
          </div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
          <div className="cp-stats">
            {tx.stats.map((s, i) => (
              <div className="cp-stat" key={i}>
                <span className="cp-stat-num">{s.num}</span>
                <span className="cp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-filters-bar">
        <div className="cp-filters-inner">
          <div className="cp-search">
            <span><IconSearch size={16} /></span>
            <input
              type="text"
              placeholder={tx.search_placeholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="cp-filter-group">
            {tx.cats.map((cat, i) => (
              <button key={i} className={`cp-filter-btn${activeCat === i ? " active" : ""}`} onClick={() => setActiveCat(i)}>{cat}</button>
            ))}
          </div>
          <div className="cp-filter-group">
            {tx.levels.map((level, i) => (
              <button key={i} className={`cp-level-btn${activeLevel === i ? " active" : ""}`} onClick={() => setActiveLevel(i)}>{level}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-results">
        <div className="cp-results-inner">
          <div className="cp-results-header">
            <span className="cp-count">{filtered.length} {tx.courses_found}</span>
          </div>
          <div className="cp-grid">
            {filtered.map(course => (
              <Link to={`/courses/${course.id}`} className="cp-card" key={course.id} style={{ textDecoration: "none" }}>
                <div className="cp-card-img">
                  <img src={course.img} alt={course.title} />
                  <span className={`cp-badge cp-badge-${course.level.toLowerCase()}`}>{tx.level_map[course.level]}</span>
                  <span className="cp-cat-tag">{course.cat}</span>
                </div>
                <div className="cp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="cp-card-meta">
                    <span><IconClock size={14} /> {course.weeks} {tx.weeks}</span>
                    {course.sub && <span><IconFolder size={14} /> {course.sub}</span>}
                  </div>
                  <div className="cp-card-foot">
                    <span className="cp-price">{course.price}</span>
                    <span className="btn-gold-sm">{tx.view_details}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="cp-empty">
              <div><IconSearch size={32} /></div>
              <p>{tx.no_courses}</p>
              <button className="btn-gold" onClick={() => { setActiveCat(0); setActiveLevel(0); setSearch(""); }}>{tx.clear_filters}</button>
            </div>
          )}
        </div>
      </section>

      <section className="cp-cta">
        <div className="cp-cta-glow" />
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_sub}</p>
        <div className="cp-cta-btns">
          <button className="btn-gold"><IconMessageCircle size={18} /> {tx.cta_btn1}</button>
          <button className="btn-outline-pill"><IconPhone size={18} /> {tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
