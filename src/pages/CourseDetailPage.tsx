import "../styles/course-detail.css";
import { useParams, Link } from "react-router-dom";
import { ALL_COURSES } from "../data/courses-data";

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = ALL_COURSES.find(c => c.id === Number(id)) || ALL_COURSES[0];

  return (
    <div className="cdp">
      {/* Hero */}
      <section className="cdp-hero">
        <div className="cdp-hero-bg">
          <img src={course.img} alt={course.title} />
          <div className="cdp-hero-overlay" />
        </div>
        <div className="cdp-hero-inner">
          <div className="cdp-hero-content">
            <div className="cdp-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/courses">Courses</Link> / <span>{course.title}</span>
            </div>
            <div className="cdp-tags">
              <span className="cdp-cat-tag">{course.cat}</span>
              <span className={`cdp-level-tag cdp-level-${course.level.toLowerCase()}`}>{course.level}</span>
            </div>
            <h1>{course.title}</h1>
            <p>{course.desc}</p>
            <div className="cdp-meta-row">
              <span>⭐ {course.rating} ({course.reviewCount} reviews)</span>
              <span>👥 {course.students} students</span>
              <span>📹 {course.lessons} lessons</span>
              <span>⏱ {course.weeks} weeks</span>
              <span>🌐 {course.language}</span>
            </div>
          </div>
          <div className="cdp-sticky-card">
            <img src={course.img} alt={course.title} className="cdp-card-thumb" />
            <div className="cdp-card-body">
              <div className="cdp-price-row">
                <span className="cdp-price">{course.price}</span>
                <span className="cdp-original-price">{course.originalPrice}</span>
              </div>
              <button className="btn-gold cdp-enroll-btn">Enroll Now →</button>
              <button className="btn-outline-pill cdp-line-btn">💬 Chat on LINE</button>
              <div className="cdp-card-features">
                {["✅ Lifetime access", "✅ Certificate included", "✅ Mobile friendly", "✅ Thai support"].map((f, i) => (
                  <div key={i} className="cdp-feature">{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cdp-body">
        <div className="cdp-main">
          {/* What You'll Learn */}
          <section className="cdp-section">
            <h2>What You'll Learn</h2>
            <div className="cdp-highlights-grid">
              {course.highlights.map((h, i) => (
                <div className="cdp-highlight" key={i}>
                  <span className="cdp-check">✓</span><span>{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="cdp-section">
            <h2>Course Curriculum</h2>
            <p className="cdp-section-sub">{course.lessons} lessons · {course.weeks} weeks</p>
            <div className="cdp-curriculum">
              {course.curriculum.map((item, i) => (
                <div className="cdp-week" key={i}>
                  <div className="cdp-week-header">
                    <div className="cdp-week-num">{i + 1}</div>
                    <div className="cdp-week-info">
                      <div className="cdp-week-label">{item.week}</div>
                      <div className="cdp-week-title">{item.title}</div>
                      <div className="cdp-week-desc">{item.desc}</div>
                    </div>
                    <div className="cdp-week-lessons">{item.lessons} lessons</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section className="cdp-section">
            <h2>Your Instructor</h2>
            <div className="cdp-instructor">
              <img src={course.instructor.img} alt={course.instructor.name} />
              <div className="cdp-instructor-info">
                <h3>{course.instructor.name}</h3>
                <p className="cdp-instructor-title">{course.instructor.title}</p>
                <div className="cdp-instructor-stats">
                  <span>⭐ {course.instructor.rating}</span>
                  <span>👥 {course.instructor.students}+ students</span>
                  <span>🎓 {course.instructor.exp} experience</span>
                </div>
                <p className="cdp-instructor-bio">{course.instructor.bio}</p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="cdp-section">
            <h2>Student Reviews</h2>
            <div className="cdp-rating-summary">
              <div className="cdp-big-rating">{course.rating}</div>
              <div>
                <div className="cdp-stars">★★★★★</div>
                <div className="cdp-rating-count">Based on {course.reviewCount} reviews</div>
              </div>
            </div>
            <div className="cdp-reviews">
              {course.reviewsList.map((r, i) => (
                <div className="cdp-review" key={i}>
                  <img src={r.img} alt={r.name} />
                  <div>
                    <div className="cdp-review-header">
                      <span className="cdp-reviewer">{r.name}</span>
                      <span className="cdp-review-result">{r.result}</span>
                    </div>
                    <div className="cdp-review-stars">{"★".repeat(r.rating)}</div>
                    <p>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Pricing */}
      <section className="cdp-pricing">
        <div className="cdp-pricing-inner">
          <h2>Choose Your Plan</h2>
          <p>Select the learning experience that fits your goals</p>
          <div className="cdp-plans">
            {course.plans.map((plan, i) => (
              <div className={`cdp-plan${plan.highlight ? " highlight" : ""}`} key={i}>
                {plan.highlight && <div className="cdp-plan-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="cdp-plan-price">{plan.price}</div>
                <ul>
                  {plan.features.map((f, j) => (
                    <li key={j}><span>✓</span>{f}</li>
                  ))}
                </ul>
                <button className={plan.highlight ? "btn-gold" : "btn-outline-pill"}>Get Started →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cdp-cta">
        <div className="cdp-cta-glow" />
        <h2>Ready to Get Started?</h2>
        <p>Join {course.students}+ students already learning with BBY Academy</p>
        <div className="cdp-cta-btns">
          <button className="btn-gold">Enroll Now →</button>
          <button className="btn-outline-pill">💬 Ask on LINE</button>
        </div>
      </section>
    </div>
  );
}
