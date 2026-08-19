import "../styles/enroll.css";
import { useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";
import { useEnrollment } from "../context/EnrollmentContext";

const TEXT = {
  EN: {
    home: "Home", courses: "Courses", enroll: "Enroll",
    title: "Complete Your", title_highlight: "Enrollment",
    sub: "You're almost there! Fill in your details to start learning.",
    course_summary: "Course Summary",
    selected_plan: "Selected Plan",
    change_plan: "Change",
    your_info: "Your Information",
    name: "Full Name *", name_ph: "Your full name",
    email: "Email *", email_ph: "your@email.com",
    phone: "Phone Number *", phone_ph: "08X-XXX-XXXX",
    line_id: "LINE ID (optional)", line_ph: "Your LINE ID",
    payment_title: "Payment Method",
    payment_options: ["Bank Transfer", "Credit/Debit Card", "PromptPay QR", "Pay via LINE"],
    notes: "Additional Notes (optional)",
    notes_ph: "Any questions or special requests?",
    agree: "I agree to the Terms of Service and Privacy Policy",
    submit_btn: "Continue to Payment →",
    plans_label: "Select Your Plan",
    most_popular: "Most Popular",
    order_total: "Total",
  },
  TH: {
    home: "หน้าหลัก", courses: "หลักสูตร", enroll: "สมัครเรียน",
    title: "ทำการ", title_highlight: "สมัครเรียนให้สมบูรณ์",
    sub: "ใกล้เสร็จแล้ว! กรอกข้อมูลของคุณเพื่อเริ่มเรียน",
    course_summary: "สรุปหลักสูตร",
    selected_plan: "แผนที่เลือก",
    change_plan: "เปลี่ยน",
    your_info: "ข้อมูลของคุณ",
    name: "ชื่อ-นามสกุล *", name_ph: "ชื่อของคุณ",
    email: "อีเมล *", email_ph: "your@email.com",
    phone: "เบอร์โทรศัพท์ *", phone_ph: "08X-XXX-XXXX",
    line_id: "LINE ID (ไม่บังคับ)", line_ph: "LINE ID ของคุณ",
    payment_title: "วิธีการชำระเงิน",
    payment_options: ["โอนผ่านธนาคาร", "บัตรเครดิต/เดบิต", "PromptPay QR", "ชำระผ่าน LINE"],
    notes: "หมายเหตุเพิ่มเติม (ไม่บังคับ)",
    notes_ph: "มีคำถามหรือคำขอพิเศษไหม?",
    agree: "ฉันยอมรับข้อกำหนดการใช้บริการและนโยบายความเป็นส่วนตัว",
    submit_btn: "ไปที่การชำระเงิน →",
    plans_label: "เลือกแผนของคุณ",
    most_popular: "ยอดนิยม",
    order_total: "ยอดรวม",
  },
};

export default function EnrollPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const tx = TEXT[lang];
  const { setEmail } = useEnrollment();

  const course = ALL_COURSES.find(c => c.id === Number(id)) || ALL_COURSES[0];
  const initialPlanIdx = course.plans.findIndex(p => p.name === searchParams.get("plan"));
  const [planIdx, setPlanIdx] = useState(initialPlanIdx >= 0 ? initialPlanIdx : course.plans.findIndex(p => p.highlight) >= 0 ? course.plans.findIndex(p => p.highlight) : 0);

  const [form, setForm] = useState({ name: "", email: "", phone: "", lineId: "", notes: "", payment: 0, agree: false });

  const selectedPlan = course.plans[planIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) return;
    setEmail(form.email);
    navigate(`/courses/${course.id}/payment`, { state: { planIdx, form } });
  };

  return (
    <div className="enroll">
      <section className="enroll-hero">
        <div className="enroll-hero-inner">
          <div className="enroll-breadcrumb">
            <Link to="/">{tx.home}</Link> / <Link to="/courses">{tx.courses}</Link> / <Link to={`/courses/${course.id}`}>{course.title}</Link> / <span>{tx.enroll}</span>
          </div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
        </div>
      </section>

      <section className="enroll-main">
        <div className="enroll-main-inner">

          {/* Left: Form */}
          <form className="enroll-form" onSubmit={handleSubmit}>
            <div className="enroll-card">
              <h2>{tx.plans_label}</h2>
              <div className="enroll-plans">
                {course.plans.map((plan, i) => (
                  <div
                    key={i}
                    className={`enroll-plan-option${planIdx === i ? " selected" : ""}`}
                    onClick={() => setPlanIdx(i)}
                  >
                    {plan.highlight && <div className="enroll-plan-badge">{tx.most_popular}</div>}
                    <div className="enroll-plan-radio">{planIdx === i && <div className="enroll-plan-dot" />}</div>
                    <div className="enroll-plan-info">
                      <div className="enroll-plan-name">{plan.name}</div>
                      <div className="enroll-plan-features">{plan.features.slice(0, 2).join(" · ")}</div>
                    </div>
                    <div className="enroll-plan-price">{plan.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="enroll-card">
              <h2>{tx.your_info}</h2>
              <div className="enroll-row">
                <div className="enroll-field">
                  <label>{tx.name}</label>
                  <input type="text" placeholder={tx.name_ph} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="enroll-field">
                  <label>{tx.email}</label>
                  <input type="email" placeholder={tx.email_ph} required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="enroll-row">
                <div className="enroll-field">
                  <label>{tx.phone}</label>
                  <input type="tel" placeholder={tx.phone_ph} required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="enroll-field">
                  <label>{tx.line_id}</label>
                  <input type="text" placeholder={tx.line_ph} value={form.lineId} onChange={e => setForm({ ...form, lineId: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="enroll-card">
              <h2>{tx.payment_title}</h2>
              <div className="enroll-payment-grid">
                {tx.payment_options.map((opt, i) => (
                  <div
                    key={i}
                    className={`enroll-payment-option${form.payment === i ? " selected" : ""}`}
                    onClick={() => setForm({ ...form, payment: i })}
                  >
                    <div className="enroll-plan-radio">{form.payment === i && <div className="enroll-plan-dot" />}</div>
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <div className="enroll-card">
              <label className="enroll-label-block">{tx.notes}</label>
              <textarea placeholder={tx.notes_ph} rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>

            <label className="enroll-agree">
              <input type="checkbox" checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} />
              <span>{tx.agree}</span>
            </label>

            <button type="submit" className="btn-gold enroll-submit" disabled={!form.agree}>{tx.submit_btn}</button>
          </form>

          {/* Right: Summary */}
          <div className="enroll-summary">
            <div className="enroll-summary-card">
              <h3>{tx.course_summary}</h3>
              <img src={course.img} alt={course.title} className="enroll-summary-img" />
              <div className="enroll-summary-title">{course.title}</div>
              <div className="enroll-summary-meta">
                <span>⏱ {course.weeks} {lang === "EN" ? "weeks" : "สัปดาห์"}</span>
                <span>📹 {course.lessons} {lang === "EN" ? "lessons" : "บทเรียน"}</span>
              </div>
              <hr className="enroll-divider" />
              <div className="enroll-summary-row">
                <span>{tx.selected_plan}</span>
                <strong>{selectedPlan.name}</strong>
              </div>
              <hr className="enroll-divider" />
              <div className="enroll-summary-total">
                <span>{tx.order_total}</span>
                <span className="enroll-total-price">{selectedPlan.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
