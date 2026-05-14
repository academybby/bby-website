import "../styles/courses.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ALL_COURSES } from "../data/courses-data";


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
      <section className="cp-hero">
        <div className="cp-hero-inner">
          <div className="cp-breadcrumb"><Link to="/">Home</Link> / <span>Courses</span></div>
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

      <section className="cp-results">
        <div className="cp-results-inner">
          <div className="cp-results-header">
            <span className="cp-count">{filtered.length} courses found</span>
          </div>
          <div className="cp-grid">
            {filtered.map(course => (
              <Link to={`/courses/${course.id}`} className="cp-card" key={course.id} style={{ textDecoration: "none" }}>
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
                    <span className="btn-gold-sm">View Details →</span>
                  </div>
                </div>
              </Link>
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
