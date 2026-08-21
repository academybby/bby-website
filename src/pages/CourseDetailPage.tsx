import "../styles/course-detail.css";
import { useParams, Link } from "react-router-dom";
import { IconMessageCircle, IconCheck, IconStarFilled, IconUsers, IconVideo, IconClock, IconWorld, IconSchool } from "@tabler/icons-react";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    home: "Home", courses: "Courses",
    enroll_btn: "Enroll Now →",
    line_btn: "Chat on LINE",
    features: ["Lifetime access", "Certificate included", "Mobile friendly", "Thai support"],
    learn_title: "What You'll Learn",
    curriculum_title: "Course Curriculum",
    instructor_title: "Your Instructor",
    reviews_title: "Student Reviews",
    reviews_based: "Based on",
    reviews_suffix: "reviews",
    pricing_title: "Choose Your Plan",
    pricing_sub: "Select the learning experience that fits your goals",
    popular_badge: "Most Popular",
    get_started: "Get Started →",
    cta_title: "Ready to Get Started?",
    cta_join: "Join",
    cta_suffix: "students already learning with BBY Academy",
    cta_btn1: "Enroll Now →",
    cta_btn2: "Ask on LINE",
    lessons_label: "lessons",
    weeks_label: "weeks",
    students_label: "students",
    experience_label: "experience",
    discount: "-24%",
  },
  TH: {
    home: "หน้าหลัก", courses: "หลักสูตร",
    enroll_btn: "สมัครเรียนเลย →",
    line_btn: "แชทบน LINE",
    features: ["เข้าถึงตลอดชีพ", "มีใบรับรอง", "รองรับมือถือ", "รองรับภาษาไทย"],
    learn_title: "สิ่งที่คุณจะได้เรียน",
    curriculum_title: "หลักสูตรการเรียน",
    instructor_title: "ผู้สอนของคุณ",
    reviews_title: "รีวิวจากนักเรียน",
    reviews_based: "จาก",
    reviews_suffix: "รีวิว",
    pricing_title: "เลือกแผนของคุณ",
    pricing_sub: "เลือกประสบการณ์การเรียนที่เหมาะกับเป้าหมายของคุณ",
    popular_badge: "ยอดนิยม",
    get_started: "เริ่มต้นเลย →",
    cta_title: "พร้อมที่จะเริ่มต้นแล้วหรือยัง?",
    cta_join: "เข้าร่วมกับ",
    cta_suffix: "นักเรียนที่กำลังเรียนกับ BBY Academy",
    cta_btn1: "สมัครเรียนเลย →",
    cta_btn2: "สอบถามบน LINE",
    lessons_label: "บทเรียน",
    weeks_label: "สัปดาห์",
    students_label: "นักเรียน",
    experience_label: "ประสบการณ์",
    discount: "-24%",
  },
};

const LEVEL_MAP: Record<string, Record<string, string>> = {
  EN: { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" },
  TH: { Beginner: "เริ่มต้น", Intermediate: "กลาง", Advanced: "สูง" },
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const tx = TEXT[lang];
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
              <Link to="/">{tx.home}</Link> / <Link to="/courses">{tx.courses}</Link> / <span>{course.title}</span>
            </div>
            <div className="cdp-tags">
              <span className="cdp-cat-tag">{course.cat}</span>
              <span className={`cdp-level-tag cdp-level-${course.level.toLowerCase()}`}>{LEVEL_MAP[lang][course.level]}</span>
            </div>
            <h1>{course.title}</h1>
            <p>{course.desc}</p>
            <div className="cdp-meta-row">
              <span><IconStarFilled size={14} /> {course.rating} ({course.reviewCount} {tx.reviews_suffix})</span>
              <span><IconUsers size={14} /> {course.students} {tx.students_label}</span>
              <span><IconVideo size={14} /> {course.lessons} {tx.lessons_label}</span>
              <span><IconClock size={14} /> {course.weeks} {tx.weeks_label}</span>
              <span><IconWorld size={14} /> {course.language}</span>
            </div>
          </div>

          {/* Sticky Card */}
          <div className="cdp-sticky-card">
            <img src={course.img} alt={course.title} className="cdp-card-thumb" />
            <div className="cdp-card-body">
              <div className="cdp-price-row">
                <span className="cdp-price">{course.price}</span>
                <span className="cdp-original-price">{course.originalPrice}</span>
                <span className="cdp-discount">{tx.discount}</span>
              </div>
              <Link to={`/courses/${course.id}/enroll`} className="btn-gold cdp-enroll-btn">{tx.enroll_btn}</Link>
              <button className="btn-outline-pill cdp-line-btn"><IconMessageCircle size={18} /> {tx.line_btn}</button>
              <div className="cdp-card-features">
                {tx.features.map((f, i) => <div key={i} className="cdp-feature"><IconCheck size={16} /> {f}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cdp-body">
        <div className="cdp-main">

          {/* What You'll Learn */}
          <section className="cdp-section">
            <h2>{tx.learn_title}</h2>
            <div className="cdp-highlights-grid">
              {course.highlights.map((h, i) => (
                <div className="cdp-highlight" key={i}>
                  <span className="cdp-check"><IconCheck size={14} /></span><span>{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="cdp-section">
            <h2>{tx.curriculum_title}</h2>
            <p className="cdp-section-sub">{course.lessons} {tx.lessons_label} · {course.weeks} {tx.weeks_label}</p>
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
                    <div className="cdp-week-lessons">{item.lessons} {tx.lessons_label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section className="cdp-section">
            <h2>{tx.instructor_title}</h2>
            <div className="cdp-instructor">
              <img src={course.instructor.img} alt={course.instructor.name} />
              <div className="cdp-instructor-info">
                <h3>{course.instructor.name}</h3>
                <p className="cdp-instructor-title">{course.instructor.title}</p>
                <div className="cdp-instructor-stats">
                  <span><IconStarFilled size={14} /> {course.instructor.rating}</span>
                  <span><IconUsers size={14} /> {course.instructor.students}+ {tx.students_label}</span>
                  <span><IconSchool size={14} /> {course.instructor.exp} {tx.experience_label}</span>
                </div>
                <p className="cdp-instructor-bio">{course.instructor.bio}</p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="cdp-section">
            <h2>{tx.reviews_title}</h2>
            <div className="cdp-rating-summary">
              <div className="cdp-big-rating">{course.rating}</div>
              <div>
                <div className="cdp-stars">★★★★★</div>
                <div className="cdp-rating-count">{tx.reviews_based} {course.reviewCount} {tx.reviews_suffix}</div>
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
          <h2>{tx.pricing_title}</h2>
          <p>{tx.pricing_sub}</p>
          <div className="cdp-plans">
            {course.plans.map((plan, i) => (
              <div className={`cdp-plan${plan.highlight ? " highlight" : ""}`} key={i}>
                {plan.highlight && <div className="cdp-plan-badge">{tx.popular_badge}</div>}
                <h3>{plan.name}</h3>
                <div className="cdp-plan-price">{plan.price}</div>
                <ul>
                  {plan.features.map((f, j) => (
                    <li key={j}><span><IconCheck size={14} /></span>{f}</li>
                  ))}
                </ul>
                <Link
                  to={`/courses/${course.id}/enroll?plan=${encodeURIComponent(plan.name)}`}
                  className={plan.highlight ? "btn-gold" : "btn-outline-pill"}
                  style={{ width: "100%", textAlign: "center", display: "block" }}
                >{tx.get_started}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cdp-cta">
        <div className="cdp-cta-glow" />
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_join} {course.students}+ {tx.cta_suffix}</p>
        <div className="cdp-cta-btns">
          <Link to={`/courses/${course.id}/enroll`} className="btn-gold">{tx.cta_btn1}</Link>
          <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
