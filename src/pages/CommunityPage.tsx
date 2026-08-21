import "../styles/community.css";
import { Link } from "react-router-dom";
import { IconMessageCircle, IconMicrophone, IconBooks, IconBuildingBank, IconCoffee, IconTarget, IconClock, IconUsers, IconCalendar, IconCheck, IconMapPin } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    breadcrumb_home: "Home",
    breadcrumb: "Community",
    badge: "Online & Offline · Chiang Mai",
    title: "Language",
    title_highlight: "Community",
    sub: "Practice with real people in real situations. Join our growing community of learners in Chiang Mai and online.",
    btn1: "Join Community →",
    btn2: "Chat on LINE",
    stats: [
      { num: "200+", label: "Active Members" },
      { num: "8x", label: "Sessions/Month" },
      { num: "฿150", label: "Starting Price" },
      { num: "4", label: "Activity Types" },
    ],
    online_title: "Online Community",
    online_sub: "Connect with learners anytime, anywhere",
    online_items: [
      { name: "Discord & LINE Group", price: "฿799/month", desc: "Join our active Discord server and LINE group. Daily conversations, resources, and support.", btn: "Join Now →" },
      { name: "Weekly Speaking Sessions", price: "฿199/session", desc: "Live speaking practice every week with native speakers and fellow learners.", btn: "Book Session →" },
      { name: "Study Groups", price: "฿590/month", desc: "Structured study groups for TOEIC, IELTS, HSK, and Coding. Learn together, grow faster.", btn: "Join Group →" },
    ],
    offline_title: "Offline Activities",
    offline_sub: "Real experiences in Chiang Mai",
    activities: [
      {
        name: "Language Tour",
        tagline: "Walk & Talk Around CMU",
        desc: "2-hour walking tour around Chiang Mai University. Practice English or Chinese while exploring the campus, temples, and local spots.",
        price: "฿350/person", duration: "2 hours", size: "8-10 people", frequency: "4x/month",
        highlights: ["Practice real conversations outdoors", "Explore CMU campus and surroundings", "Meet new friends and practice partners", "Led by native speakers"],
      },
      {
        name: "Coffee & Conversation",
        tagline: "Relax, Sip & Speak",
        desc: "Casual 1.5-hour language sessions at cozy Chiang Mai cafés. No pressure, just practice in a comfortable, social setting.",
        price: "฿150/person", duration: "1.5 hours", size: "6-8 people", frequency: "8x/month",
        highlights: ["Most affordable community activity", "Relaxed and fun atmosphere", "Different café every time", "Multiple language options"],
      },
      {
        name: "Weekend Workshop",
        tagline: "Intensive 3-Hour Practice",
        desc: "3-hour intensive workshops on specific topics: job interviews, presentations, TOEIC prep, or conversational fluency.",
        price: "฿690/person", duration: "3 hours", size: "10-15 people", frequency: "2x/month",
        highlights: ["Focused topic each session", "Professional workshop format", "Take-home materials included", "Expert facilitators"],
      },
    ],
    membership_title: "Membership Plans",
    membership_sub: "Get unlimited access and save more",
    plans: [
      { name: "VIP Membership", price: "฿990/month", features: ["All events access", "Priority booking", "10% course discount", "Members-only content"], popular: true },
      { name: "Annual Pass", price: "฿9,900/year", features: ["Unlimited community events", "15% course discount", "Free monthly workshop", "VIP support"], popular: false },
      { name: "Parent Membership", price: "฿590/month", features: ["Kids courses access", "Parent workshops", "Monthly progress report", "Family community"], popular: false },
    ],
    popular: "Most Popular",
    join_btn: "Get Started →",
    schedule_title: "Upcoming Events",
    schedule_sub: "Book your spot before it fills up",
    events: [
      { date: "Every Tuesday", time: "18:00–19:30", name: "Coffee & Conversation", location: "Ristr8to Coffee, Nimman", spots: "3 spots left", type: "coffee" },
      { date: "Every Saturday", time: "09:00–11:00", name: "Language Tour CMU", location: "CMU Main Gate", spots: "5 spots left", type: "tour" },
      { date: "2nd & 4th Sunday", time: "13:00–16:00", name: "Weekend Workshop", location: "BBY Learning Space", spots: "8 spots left", type: "workshop" },
      { date: "Every Wednesday", time: "20:00–21:00", name: "Online Speaking Session", location: "Zoom", spots: "Open", type: "online" },
    ],
    book_spot: "Book Spot →",
    cta_title: "Ready to Practice with Real People?",
    cta_sub: "Join hundreds of learners already improving their language skills with BBY Community",
    cta_btn1: "Join Community →",
    cta_btn2: "Chat on LINE",
  },
  TH: {
    breadcrumb_home: "หน้าหลัก",
    breadcrumb: "ชุมชน",
    badge: "ออนไลน์และออฟไลน์ · เชียงใหม่",
    title: "ชุมชน",
    title_highlight: "ภาษา",
    sub: "ฝึกกับคนจริงในสถานการณ์จริง เข้าร่วมชุมชนผู้เรียนที่กำลังเติบโตในเชียงใหม่และออนไลน์",
    btn1: "เข้าร่วมชุมชน →",
    btn2: "แชทบน LINE",
    stats: [
      { num: "200+", label: "สมาชิกที่ active" },
      { num: "8x", label: "เซสชั่น/เดือน" },
      { num: "฿150", label: "ราคาเริ่มต้น" },
      { num: "4", label: "ประเภทกิจกรรม" },
    ],
    online_title: "ชุมชนออนไลน์",
    online_sub: "เชื่อมต่อกับผู้เรียนได้ทุกที่ทุกเวลา",
    online_items: [
      { name: "กลุ่ม Discord & LINE", price: "฿799/เดือน", desc: "เข้าร่วม Discord server และกลุ่ม LINE ที่คึกคัก บทสนทนาประจำวัน ทรัพยากร และการสนับสนุน", btn: "เข้าร่วมเลย →" },
      { name: "เซสชั่นพูดรายสัปดาห์", price: "฿199/เซสชั่น", desc: "ฝึกพูดสดทุกสัปดาห์กับเจ้าของภาษาและเพื่อนผู้เรียน", btn: "จองเซสชั่น →" },
      { name: "กลุ่มเรียน", price: "฿590/เดือน", desc: "กลุ่มเรียนที่มีโครงสร้างสำหรับ TOEIC, IELTS, HSK และ Coding เรียนด้วยกัน เติบโตเร็วขึ้น", btn: "เข้าร่วมกลุ่ม →" },
    ],
    offline_title: "กิจกรรมออฟไลน์",
    offline_sub: "ประสบการณ์จริงในเชียงใหม่",
    activities: [
      {
        name: "Language Tour",
        tagline: "เดินและพูดรอบ มช.",
        desc: "ทัวร์เดินเท้า 2 ชั่วโมงรอบมหาวิทยาลัยเชียงใหม่ ฝึกภาษาอังกฤษหรือจีนขณะสำรวจวิทยาเขต วัด และสถานที่ท้องถิ่น",
        price: "฿350/คน", duration: "2 ชั่วโมง", size: "8-10 คน", frequency: "4 ครั้ง/เดือน",
        highlights: ["ฝึกบทสนทนาจริงกลางแจ้ง", "สำรวจวิทยาเขต มช. และพื้นที่รอบข้าง", "พบเพื่อนใหม่และคู่ฝึก", "นำโดยเจ้าของภาษา"],
      },
      {
        name: "Coffee & Conversation",
        tagline: "ผ่อนคลาย จิบกาแฟ และพูดคุย",
        desc: "เซสชั่นภาษา 1.5 ชั่วโมงแบบสบายๆ ที่คาเฟ่แสนน่ารักในเชียงใหม่ ไม่มีแรงกดดัน แค่ฝึกในบรรยากาศสบายและเป็นกันเอง",
        price: "฿150/คน", duration: "1.5 ชั่วโมง", size: "6-8 คน", frequency: "8 ครั้ง/เดือน",
        highlights: ["กิจกรรมชุมชนที่ราคาถูกที่สุด", "บรรยากาศผ่อนคลายและสนุก", "คาเฟ่ใหม่ทุกครั้ง", "หลายตัวเลือกภาษา"],
      },
      {
        name: "Weekend Workshop",
        tagline: "ฝึกเข้มข้น 3 ชั่วโมง",
        desc: "Workshop เข้มข้น 3 ชั่วโมงในหัวข้อเฉพาะ: สัมภาษณ์งาน การนำเสนอ เตรียม TOEIC หรือความคล่องในบทสนทนา",
        price: "฿690/คน", duration: "3 ชั่วโมง", size: "10-15 คน", frequency: "2 ครั้ง/เดือน",
        highlights: ["หัวข้อเฉพาะแต่ละเซสชั่น", "รูปแบบ Workshop มืออาชีพ", "มีเอกสารประกอบให้กลับบ้าน", "วิทยากรผู้เชี่ยวชาญ"],
      },
    ],
    membership_title: "แผนสมาชิก",
    membership_sub: "รับสิทธิ์ไม่จำกัดและประหยัดมากขึ้น",
    plans: [
      { name: "VIP Membership", price: "฿990/เดือน", features: ["เข้าทุกกิจกรรม", "จองก่อนสิทธิ์พิเศษ", "ส่วนลดคอร์ส 10%", "คอนเทนต์สมาชิกเท่านั้น"], popular: true },
      { name: "Annual Pass", price: "฿9,900/ปี", features: ["กิจกรรมชุมชนไม่จำกัด", "ส่วนลดคอร์ส 15%", "Workshop ฟรีทุกเดือน", "VIP support"], popular: false },
      { name: "Parent Membership", price: "฿590/เดือน", features: ["เข้าถึงคอร์สเด็ก", "Workshop สำหรับพ่อแม่", "รายงานความก้าวหน้ารายเดือน", "ชุมชนครอบครัว"], popular: false },
    ],
    popular: "ยอดนิยม",
    join_btn: "เริ่มต้นเลย →",
    schedule_title: "กิจกรรมที่กำลังจะมาถึง",
    schedule_sub: "จองที่นั่งก่อนเต็ม",
    events: [
      { date: "ทุกวันอังคาร", time: "18:00–19:30", name: "Coffee & Conversation", location: "Ristr8to Coffee, นิมมาน", spots: "เหลือ 3 ที่นั่ง", type: "coffee" },
      { date: "ทุกวันเสาร์", time: "09:00–11:00", name: "Language Tour มช.", location: "ประตูหลัก มช.", spots: "เหลือ 5 ที่นั่ง", type: "tour" },
      { date: "อาทิตย์ที่ 2 และ 4", time: "13:00–16:00", name: "Weekend Workshop", location: "BBY Learning Space", spots: "เหลือ 8 ที่นั่ง", type: "workshop" },
      { date: "ทุกวันพุธ", time: "20:00–21:00", name: "Online Speaking Session", location: "Zoom", spots: "เปิดรับ", type: "online" },
    ],
    book_spot: "จองที่นั่ง →",
    cta_title: "พร้อมฝึกกับคนจริงแล้วหรือยัง?",
    cta_sub: "เข้าร่วมกับผู้เรียนหลายร้อยคนที่กำลังพัฒนาทักษะภาษากับ BBY Community",
    cta_btn1: "เข้าร่วมชุมชน →",
    cta_btn2: "แชทบน LINE",
  },
};

const ONLINE_ICONS = [IconMessageCircle, IconMicrophone, IconBooks];
const ACTIVITY_ICONS = [IconBuildingBank, IconCoffee, IconTarget];

export default function CommunityPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];

  return (
    <div className="community">
      {/* Hero */}
      <section className="cm-hero">
        <div className="cm-hero-inner">
          <div className="cm-breadcrumb"><Link to="/">{tx.breadcrumb_home}</Link> / <span>{tx.breadcrumb}</span></div>
          <div className="cm-badge">{tx.badge}</div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
          <div className="cm-hero-btns">
            <button className="btn-gold">{tx.btn1}</button>
            <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.btn2}</button>
          </div>
          <div className="cm-hero-stats">
            {tx.stats.map((s, i) => (
              <div className="cm-stat" key={i}>
                <div className="cm-stat-num">{s.num}</div>
                <div className="cm-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Community */}
      <section className="cm-section alt">
        <div className="cm-inner">
          <h2 className="cm-title center">{tx.online_title}</h2>
          <p className="cm-sub center">{tx.online_sub}</p>
          <div className="cm-online-grid">
            {tx.online_items.map((item, i) => {
              const Icon = ONLINE_ICONS[i];
              return (
              <div className="cm-online-card" key={i}>
                <div className="cm-online-icon"><Icon size={26} /></div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="cm-online-price">{item.price}</div>
                <button className="btn-gold-sm">{item.btn}</button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offline Activities */}
      <section className="cm-section">
        <div className="cm-inner">
          <h2 className="cm-title center">{tx.offline_title}</h2>
          <p className="cm-sub center">{tx.offline_sub}</p>
          <div className="cm-activities">
            {tx.activities.map((act, i) => {
              const Icon = ACTIVITY_ICONS[i];
              return (
              <div className="cm-activity" key={i}>
                <div className="cm-activity-header">
                  <div className="cm-activity-icon"><Icon size={24} /></div>
                  <div>
                    <h3>{act.name}</h3>
                    <div className="cm-activity-tagline">{act.tagline}</div>
                  </div>
                  <div className="cm-activity-price">{act.price}</div>
                </div>
                <p>{act.desc}</p>
                <div className="cm-activity-meta">
                  <span><IconClock size={14} /> {act.duration}</span>
                  <span><IconUsers size={14} /> {act.size}</span>
                  <span><IconCalendar size={14} /> {act.frequency}</span>
                </div>
                <div className="cm-activity-highlights">
                  {act.highlights.map((h, j) => (
                    <div key={j} className="cm-highlight"><span><IconCheck size={14} /></span>{h}</div>
                  ))}
                </div>
                <button className="btn-gold-sm">{tx.btn1}</button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="cm-section alt">
        <div className="cm-inner">
          <h2 className="cm-title center">{tx.schedule_title}</h2>
          <p className="cm-sub center">{tx.schedule_sub}</p>
          <div className="cm-events">
            {tx.events.map((event, i) => (
              <div className={`cm-event cm-event-${event.type}`} key={i}>
                <div className="cm-event-date">
                  <div className="cm-event-day">{event.date}</div>
                  <div className="cm-event-time">{event.time}</div>
                </div>
                <div className="cm-event-info">
                  <h3>{event.name}</h3>
                  <span><IconMapPin size={14} /> {event.location}</span>
                </div>
                <div className="cm-event-right">
                  <div className="cm-event-spots">{event.spots}</div>
                  <button className="btn-gold-sm">{tx.book_spot}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="cm-section">
        <div className="cm-inner">
          <h2 className="cm-title center">{tx.membership_title}</h2>
          <p className="cm-sub center">{tx.membership_sub}</p>
          <div className="cm-plans">
            {tx.plans.map((plan, i) => (
              <div className={`cm-plan${plan.popular ? " popular" : ""}`} key={i}>
                {plan.popular && <div className="cm-popular-badge">{tx.popular}</div>}
                <h3>{plan.name}</h3>
                <div className="cm-plan-price">{plan.price}</div>
                <ul>
                  {plan.features.map((f, j) => (
                    <li key={j}><span><IconCheck size={14} /></span>{f}</li>
                  ))}
                </ul>
                <button className={plan.popular ? "btn-gold" : "btn-outline-pill"}>{tx.join_btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cm-cta">
        <div className="cm-cta-glow" />
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_sub}</p>
        <div className="cm-cta-btns">
          <button className="btn-gold">{tx.cta_btn1}</button>
          <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
