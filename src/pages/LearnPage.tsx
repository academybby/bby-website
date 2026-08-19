import "../styles/learn.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";
import { useEnrollment } from "../context/EnrollmentContext";

const TEXT = {
  EN: {
    home: "Home", courses: "Courses",
    back_course: "Back to Course",
    your_progress: "Your Progress",
    complete: "Complete",
    curriculum: "Curriculum",
    mark_complete: "Mark as Complete",
    completed: "✓ Completed",
    next_lesson: "Next Lesson →",
    prev_lesson: "← Previous",
    notes_title: "Notes",
    notes_ph: "Take notes while watching...",
    save_notes: "Save Notes",
    resources_title: "Resources",
    no_resources: "No additional resources for this lesson.",
    lesson: "Lesson",
    video_placeholder: "🎬 Video will appear here once uploaded",
    locked: "🔒 Complete previous lesson to unlock",
    checking: "Checking your access…",
    not_enrolled_title: "Course Locked",
    not_enrolled_sub: "You need to complete enrollment and payment to access this course.",
    check_email_ph: "Enter the email you enrolled with",
    check_access_btn: "Check Access",
    go_enroll: "Enroll Now →",
  },
  TH: {
    home: "หน้าหลัก", courses: "หลักสูตร",
    back_course: "กลับไปหน้าคอร์ส",
    your_progress: "ความคืบหน้าของคุณ",
    complete: "เสร็จสมบูรณ์",
    curriculum: "หลักสูตร",
    mark_complete: "ทำเครื่องหมายว่าเรียนแล้ว",
    completed: "✓ เรียนแล้ว",
    next_lesson: "บทเรียนถัดไป →",
    prev_lesson: "← บทก่อนหน้า",
    notes_title: "บันทึก",
    notes_ph: "จดบันทึกขณะดูวิดีโอ...",
    save_notes: "บันทึกโน้ต",
    resources_title: "แหล่งข้อมูล",
    no_resources: "ไม่มีแหล่งข้อมูลเพิ่มเติมสำหรับบทเรียนนี้",
    lesson: "บทเรียน",
    video_placeholder: "🎬 วิดีโอจะแสดงที่นี่หลังอัปโหลด",
    locked: "🔒 เรียนบทก่อนหน้าให้เสร็จก่อนเพื่อปลดล็อก",
    checking: "กำลังตรวจสอบสิทธิ์เข้าเรียน…",
    not_enrolled_title: "คอร์สถูกล็อก",
    not_enrolled_sub: "คุณต้องสมัครเรียนและชำระเงินให้เสร็จสิ้นก่อนจึงจะเข้าถึงคอร์สนี้ได้",
    check_email_ph: "กรอกอีเมลที่ใช้สมัครเรียน",
    check_access_btn: "ตรวจสอบสิทธิ์",
    go_enroll: "สมัครเรียนเลย →",
  },
};

type AccessStatus = "checking" | "locked" | "unlocked";

export default function LearnPage() {
  const { id } = useParams();
  // Keying on `id` forces a full remount when the course changes, so access-check
  // state naturally resets to its initial value instead of needing a manual reset
  // (which would mean calling setState synchronously inside the effect below).
  return <LearnPageForCourse key={id ?? "unknown"} id={id} />;
}

function LearnPageForCourse({ id }: { id?: string }) {
  const { lang } = useLang();
  const tx = TEXT[lang];
  const course = ALL_COURSES.find(c => c.id === Number(id)) || ALL_COURSES[0];
  const { email, setEmail, checkEnrolled, isEnrolledLocally } = useEnrollment();

  const [access, setAccess] = useState<AccessStatus>("checking");
  const [emailInput, setEmailInput] = useState(email);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (isEnrolledLocally(course.id)) {
        if (!cancelled) setAccess("unlocked");
        return;
      }
      if (!email) {
        if (!cancelled) setAccess("locked");
        return;
      }
      const enrolled = await checkEnrolled(course.id);
      if (!cancelled) setAccess(enrolled ? "unlocked" : "locked");
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id, email]);

  const handleCheckAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(emailInput);
  };

  // Flatten curriculum into individual lessons (mock structure)
  const allLessons = course.curriculum.flatMap((week, wi) =>
    Array.from({ length: Math.min(week.lessons, 4) }, (_, li) => ({
      weekIdx: wi,
      weekTitle: week.title,
      weekLabel: week.week,
      lessonNum: li + 1,
      title: `${week.title} — ${lang === "EN" ? "Part" : "ตอนที่"} ${li + 1}`,
      // YouTube unlisted video ID placeholder — replace with real video IDs later
      youtubeId: "KLEgzSzcFq0",
    }))
  );

  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState("");

  const current = allLessons[activeLesson];
  const progressPct = Math.round((completed.size / allLessons.length) * 100);

  if (access === "checking") {
    return (
      <div className="learn learn-locked-page">
        <div className="learn-locked-box">
          <p>{tx.checking}</p>
        </div>
      </div>
    );
  }

  if (access === "locked") {
    return (
      <div className="learn learn-locked-page">
        <div className="learn-locked-box">
          <div className="learn-locked-icon">🔒</div>
          <h1>{tx.not_enrolled_title}</h1>
          <p>{tx.not_enrolled_sub}</p>
          <form className="learn-locked-form" onSubmit={handleCheckAccess}>
            <input
              type="email"
              placeholder={tx.check_email_ph}
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              required
            />
            <button type="submit" className="btn-outline-pill">{tx.check_access_btn}</button>
          </form>
          <Link to={`/courses/${course.id}/enroll`} className="btn-gold">{tx.go_enroll}</Link>
        </div>
      </div>
    );
  }

  const toggleComplete = () => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(activeLesson)) next.delete(activeLesson);
      else next.add(activeLesson);
      return next;
    });
  };

  return (
    <div className="learn">
      {/* Top bar */}
      <div className="learn-topbar">
        <Link to={`/courses/${course.id}`} className="learn-back">← {tx.back_course}</Link>
        <div className="learn-topbar-title">{course.title}</div>
        <div className="learn-progress-mini">
          <div className="learn-progress-bar-mini">
            <div className="learn-progress-fill-mini" style={{ width: `${progressPct}%` }} />
          </div>
          <span>{progressPct}%</span>
        </div>
      </div>

      <div className="learn-body">
        {/* Sidebar */}
        <aside className="learn-sidebar">
          <div className="learn-sidebar-header">
            <h3>{tx.your_progress}</h3>
            <div className="learn-progress-bar">
              <div className="learn-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="learn-progress-text">{completed.size}/{allLessons.length} {tx.complete}</span>
          </div>
          <div className="learn-curriculum-list">
            <h4>{tx.curriculum}</h4>
            {allLessons.map((lesson, i) => (
              <button
                key={i}
                className={`learn-lesson-item${activeLesson === i ? " active" : ""}${completed.has(i) ? " done" : ""}`}
                onClick={() => setActiveLesson(i)}
              >
                <span className="learn-lesson-check">{completed.has(i) ? "✓" : i + 1}</span>
                <span className="learn-lesson-title">{lesson.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="learn-main">
          <div className="learn-video-wrap">
            {current.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${current.youtubeId}`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="learn-video"
              />
            ) : (
              <div className="learn-video-placeholder">
                <div>{tx.video_placeholder}</div>
              </div>
            )}
          </div>

          <div className="learn-lesson-header">
            <div>
              <div className="learn-lesson-label">{tx.lesson} {activeLesson + 1} / {allLessons.length}</div>
              <h1>{current.title}</h1>
            </div>
            <button
              className={`learn-complete-btn${completed.has(activeLesson) ? " done" : ""}`}
              onClick={toggleComplete}
            >
              {completed.has(activeLesson) ? tx.completed : tx.mark_complete}
            </button>
          </div>

          <div className="learn-nav-btns">
            <button
              className="btn-outline-pill"
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson(activeLesson - 1)}
            >{tx.prev_lesson}</button>
            <button
              className="btn-gold"
              disabled={activeLesson === allLessons.length - 1}
              onClick={() => setActiveLesson(activeLesson + 1)}
            >{tx.next_lesson}</button>
          </div>

          <div className="learn-tabs-grid">
            <div className="learn-card">
              <h3>{tx.notes_title}</h3>
              <textarea
                placeholder={tx.notes_ph}
                rows={6}
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
              <button className="btn-gold-sm">{tx.save_notes}</button>
            </div>
            <div className="learn-card">
              <h3>{tx.resources_title}</h3>
              <p className="learn-no-resources">{tx.no_resources}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
