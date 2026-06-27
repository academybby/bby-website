import "../styles/learn.css";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";

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
  },
};

export default function LearnPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const tx = TEXT[lang];
  const course = ALL_COURSES.find(c => c.id === Number(id)) || ALL_COURSES[0];

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
