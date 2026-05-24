import "../styles/contact.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    breadcrumb_home: "Home",
    title: "Get in",
    title_highlight: "Touch",
    sub: "Have questions? We're here to help you find the perfect course and start your learning journey.",
    form_title: "Send us a Message",
    form_sub: "Fill in the form and we'll get back to you within 24 hours",
    name: "Full Name *", name_placeholder: "Your full name",
    email: "Email *", email_placeholder: "your@email.com",
    phone: "Phone", phone_placeholder: "08X-XXX-XXXX",
    interest: "I'm interested in",
    interests: ["Select a course category", "English Courses", "Chinese Courses", "Coding & Tech", "Finance & Investment", "Law Courses", "Aviation English", "Coaching & Interview", "Community", "Certifications"],
    message: "Message", message_placeholder: "Tell us about your goals or questions...",
    send_btn: "Send Message →",
    success_title: "Message Sent!",
    success_sub: "Thank you! We'll contact you within 24 hours.",
    send_another: "Send Another",
    contact_title: "Contact Information",
    email_label: "Email", phone_label: "Phone", location_label: "Location", hours_label: "Hours",
    location_val: "Chiang Mai, Thailand\nNear Chiang Mai University",
    hours_val: "Mon–Fri: 9:00–20:00\nSat–Sun: 10:00–18:00",
    line_title: "Chat on LINE",
    line_sub: "Get instant answers from our team. We reply within minutes!",
    line_btn: "Open LINE Chat →",
    line_id: "LINE ID: @bbyacademy",
    quick_title: "Quick Links",
    quick_links: ["📚 Browse All Courses", "💼 Coaching & Interview", "👥 Join Community", "🏅 Certifications"],
    faq_title: "Frequently Asked Questions",
    faqs: [
      { q: "How do I enroll in a course?", a: "You can enroll directly on our website or chat with us on LINE. We'll guide you through the process." },
      { q: "Are courses available online?", a: "Yes! All courses are available online 24/7. Some also have offline options in Chiang Mai." },
      { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee if you're not satisfied with the course." },
      { q: "Can I get a certificate?", a: "Yes, all courses include a certificate of completion. Aviation and Business English certificates are recognized by employers." },
      { q: "Do you teach in Thai?", a: "Yes, most courses are taught in Thai with English materials to maximize understanding." },
      { q: "How long do I have access?", a: "All self-paced courses come with lifetime access so you can learn at your own pace." },
    ],
  },
  TH: {
    breadcrumb_home: "หน้าหลัก",
    title: "ติดต่อ",
    title_highlight: "เรา",
    sub: "มีคำถาม? เราพร้อมช่วยคุณหาหลักสูตรที่เหมาะสมและเริ่มต้นการเรียนรู้",
    form_title: "ส่งข้อความหาเรา",
    form_sub: "กรอกฟอร์มและเราจะติดต่อกลับภายใน 24 ชั่วโมง",
    name: "ชื่อ-นามสกุล *", name_placeholder: "ชื่อของคุณ",
    email: "อีเมล *", email_placeholder: "your@email.com",
    phone: "เบอร์โทรศัพท์", phone_placeholder: "08X-XXX-XXXX",
    interest: "สนใจเรื่อง",
    interests: ["เลือกหมวดหลักสูตร", "คอร์สภาษาอังกฤษ", "คอร์สภาษาจีน", "Coding & Tech", "การเงินและการลงทุน", "คอร์สกฎหมาย", "ภาษาอังกฤษการบิน", "โค้ชชิ่งและสัมภาษณ์", "ชุมชน", "ใบรับรอง"],
    message: "ข้อความ", message_placeholder: "บอกเราเกี่ยวกับเป้าหมายหรือคำถามของคุณ...",
    send_btn: "ส่งข้อความ →",
    success_title: "ส่งข้อความแล้ว!",
    success_sub: "ขอบคุณ! เราจะติดต่อกลับภายใน 24 ชั่วโมง",
    send_another: "ส่งอีกครั้ง",
    contact_title: "ข้อมูลติดต่อ",
    email_label: "อีเมล", phone_label: "โทรศัพท์", location_label: "ที่ตั้ง", hours_label: "เวลาทำการ",
    location_val: "เชียงใหม่ ประเทศไทย\nใกล้มหาวิทยาลัยเชียงใหม่",
    hours_val: "จ.–ศ.: 9:00–20:00\nส.–อา.: 10:00–18:00",
    line_title: "แชทบน LINE",
    line_sub: "รับคำตอบทันทีจากทีมงาน ตอบภายในไม่กี่นาที!",
    line_btn: "เปิด LINE Chat →",
    line_id: "LINE ID: @bbyacademy",
    quick_title: "ลิงก์ด่วน",
    quick_links: ["📚 ดูหลักสูตรทั้งหมด", "💼 โค้ชชิ่งและสัมภาษณ์", "👥 เข้าร่วมชุมชน", "🏅 ใบรับรอง"],
    faq_title: "คำถามที่พบบ่อย",
    faqs: [
      { q: "สมัครเรียนได้อย่างไร?", a: "สมัครได้โดยตรงบนเว็บไซต์หรือแชทกับเราบน LINE เราจะแนะนำขั้นตอนให้" },
      { q: "คอร์สมีออนไลน์ไหม?", a: "มีครับ! ทุกคอร์สมีออนไลน์ 24/7 บางคอร์สมีตัวเลือกออฟไลน์ในเชียงใหม่ด้วย" },
      { q: "มีนโยบายคืนเงินไหม?", a: "เรามีการรับประกันคืนเงิน 7 วัน หากคุณไม่พอใจกับคอร์ส" },
      { q: "ได้รับใบรับรองไหม?", a: "ได้ครับ ทุกคอร์สมีใบรับรองการจบหลักสูตร ใบรับรอง Aviation และ Business English ได้รับการยอมรับจากนายจ้าง" },
      { q: "สอนเป็นภาษาไทยไหม?", a: "ใช่ครับ ส่วนใหญ่สอนเป็นภาษาไทยพร้อมสื่อภาษาอังกฤษเพื่อความเข้าใจสูงสุด" },
      { q: "เข้าถึงได้นานแค่ไหน?", a: "คอร์ส self-paced ทั้งหมดมี lifetime access เรียนได้ตามจังหวะของคุณ" },
    ],
  },
};

const QUICK_PATHS = ["/courses", "/coaching", "/community", "/certifications"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const { lang } = useLang();
  const tx = TEXT[lang];

  return (
    <div className="contact">
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <div className="ct-breadcrumb"><Link to="/">{tx.breadcrumb_home}</Link> / <span>{tx.title} {tx.title_highlight}</span></div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
        </div>
      </section>

      <section className="ct-main">
        <div className="ct-main-inner">
          <div className="ct-form-wrap">
            <h2>{tx.form_title}</h2>
            <p>{tx.form_sub}</p>
            {sent ? (
              <div className="ct-success">
                <div className="ct-success-icon">✅</div>
                <h3>{tx.success_title}</h3>
                <p>{tx.success_sub}</p>
                <button className="btn-gold" onClick={() => setSent(false)}>{tx.send_another}</button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label>{tx.name}</label>
                    <input type="text" placeholder={tx.name_placeholder} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="ct-field">
                    <label>{tx.email}</label>
                    <input type="email" placeholder={tx.email_placeholder} required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label>{tx.phone}</label>
                    <input type="tel" placeholder={tx.phone_placeholder} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="ct-field">
                    <label>{tx.interest}</label>
                    <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                      {tx.interests.map((opt, i) => <option key={i} value={i === 0 ? "" : opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div className="ct-field">
                  <label>{tx.message}</label>
                  <textarea placeholder={tx.message_placeholder} rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-gold ct-submit">{tx.send_btn}</button>
              </form>
            )}
          </div>

          <div className="ct-info">
            <div className="ct-info-card">
              <h3>{tx.contact_title}</h3>
              <div className="ct-info-items">
                <div className="ct-info-item">
                  <div className="ct-info-icon">✉</div>
                  <div><div className="ct-info-label">{tx.email_label}</div><a href="mailto:hello@bbyacademy.com">hello@bbyacademy.com</a></div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">📞</div>
                  <div><div className="ct-info-label">{tx.phone_label}</div><a href="tel:+6621234567">+66 2 123 4567</a></div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">📍</div>
                  <div><div className="ct-info-label">{tx.location_label}</div><span style={{ whiteSpace: "pre-line" }}>{tx.location_val}</span></div>
                </div>
                <div className="ct-info-item">
                  <div className="ct-info-icon">⏰</div>
                  <div><div className="ct-info-label">{tx.hours_label}</div><span style={{ whiteSpace: "pre-line" }}>{tx.hours_val}</span></div>
                </div>
              </div>
            </div>

            <div className="ct-line-card">
              <div className="ct-line-icon">💬</div>
              <h3>{tx.line_title}</h3>
              <p>{tx.line_sub}</p>
              <button className="btn-gold ct-line-btn">{tx.line_btn}</button>
              <div className="ct-line-id">{tx.line_id}</div>
            </div>

            <div className="ct-quick-card">
              <h3>{tx.quick_title}</h3>
              <div className="ct-quick-links">
                {tx.quick_links.map((l, i) => <Link key={i} to={QUICK_PATHS[i]}>{l}</Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ct-faq">
        <div className="ct-faq-inner">
          <h2>{tx.faq_title}</h2>
          <div className="ct-faq-grid">
            {tx.faqs.map((item, i) => (
              <div className="ct-faq-item" key={i}>
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
