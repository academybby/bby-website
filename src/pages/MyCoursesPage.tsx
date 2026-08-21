import "../styles/my-courses.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IconVideo, IconClock } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { ALL_COURSES } from "../data/courses-data";

const TEXT = {
  EN: {
    title: "My", title_highlight: "Courses",
    sub: "Courses you're enrolled in",
    empty: "You haven't enrolled in any courses yet.",
    browse: "Browse Courses →",
    continue: "Continue Learning →",
    loading: "Loading your courses…",
    error: "Couldn't load your courses. Please try again.",
    weeks: "weeks", lessons: "lessons",
  },
  TH: {
    title: "คอร์สของ", title_highlight: "ฉัน",
    sub: "คอร์สที่คุณลงทะเบียนไว้",
    empty: "คุณยังไม่ได้ลงทะเบียนคอร์สใด ๆ",
    browse: "ดูหลักสูตรทั้งหมด →",
    continue: "เรียนต่อ →",
    loading: "กำลังโหลดคอร์สของคุณ…",
    error: "โหลดคอร์สไม่สำเร็จ กรุณาลองใหม่",
    weeks: "สัปดาห์", lessons: "บทเรียน",
  },
};

export default function MyCoursesPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];
  const { user, session, loading: authLoading } = useAuth();

  const [courseIds, setCourseIds] = useState<number[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!session) return;
    fetch("/api/my-enrollments", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load enrollments");
        return res.json();
      })
      .then(data => setCourseIds(data.courseIds))
      .catch(() => setError(true));
  }, [session]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" state={{ from: "/my-courses" }} replace />;

  const courses = courseIds?.map(id => ALL_COURSES.find(c => c.id === id)).filter((c): c is typeof ALL_COURSES[number] => !!c) ?? null;

  return (
    <div className="mc">
      <section className="mc-hero">
        <div className="mc-hero-inner">
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
        </div>
      </section>

      <section className="mc-main">
        <div className="mc-main-inner">
          {error && <p className="mc-error">{tx.error}</p>}
          {!error && courses === null && <p className="mc-status">{tx.loading}</p>}
          {!error && courses !== null && courses.length === 0 && (
            <div className="mc-empty">
              <p>{tx.empty}</p>
              <Link to="/courses" className="btn-gold">{tx.browse}</Link>
            </div>
          )}
          {courses && courses.length > 0 && (
            <div className="mc-grid">
              {courses.map(course => (
                <div className="mc-card" key={course.id}>
                  <div className="mc-card-img">
                    <img src={course.img} alt={course.title} />
                  </div>
                  <div className="mc-card-body">
                    <h3>{course.title}</h3>
                    <div className="mc-card-meta">
                      <span><IconVideo size={14} /> {course.lessons} {tx.lessons}</span>
                      <span><IconClock size={14} /> {course.weeks} {tx.weeks}</span>
                    </div>
                    <Link to={`/courses/${course.id}/learn`} className="btn-gold mc-continue-btn">{tx.continue}</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
