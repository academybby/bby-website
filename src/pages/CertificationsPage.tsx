import "../styles/certifications.css";
import { Link } from "react-router-dom";
import { IconMessageCircle, IconPlane, IconBriefcase, IconMicrophone, IconLanguage, IconBook, IconChartBar, IconNotes, IconClock, IconCalendar, IconCheck } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    breadcrumb_home: "Home",
    breadcrumb: "Certifications",
    badge: "Recognized by Employers · Professional Certificates",
    title: "BBY",
    title_highlight: "Certifications",
    sub: "Earn certificates that employers recognize. Validate your skills and boost your career with BBY's professional certification programs.",
    btn1: "Get Certified →",
    btn2: "Chat on LINE",
    stats: [
      { num: "8", label: "Certificate Types" },
      { num: "2,000+", label: "Certified Students" },
      { num: "95%", label: "Employer Recognition" },
      { num: "฿290", label: "Starting Price" },
    ],
    certs_title: "Available Certificates",
    certs_sub: "Choose the certificate that fits your career goals",
    certs: [
      {
        id: "aviation", category: "Aviation",
        name: "Aviation English Proficiency",
        price: "฿1,200", duration: "2 hours", validity: "2 years",
        desc: "ICAO-aligned English test for aviation professionals. Required for cabin crew and ground staff positions.",
        includes: ["Written exam (60 min)", "Speaking assessment (30 min)", "Listening comprehension (30 min)", "Official certificate + digital badge"],
        suitable: "Cabin crew, ground staff, aviation students",
        popular: true,
      },
      {
        id: "business", category: "English",
        name: "Business English Certificate",
        price: "฿990", duration: "1.5 hours", validity: "3 years",
        desc: "Prove your business English proficiency to employers. Covers writing, speaking, and professional communication.",
        includes: ["Business writing test", "Speaking assessment", "Vocabulary & grammar test", "Official certificate"],
        suitable: "Professionals, job seekers, MBA students",
        popular: false,
      },
      {
        id: "communication", category: "English",
        name: "English Communication Certificate",
        price: "฿890", duration: "1.5 hours", validity: "3 years",
        desc: "Validate everyday English skills. Covers Everyday English, Conversational English, Travel English, and Study English.",
        includes: ["Listening test", "Speaking test", "Reading comprehension", "Official certificate"],
        suitable: "General learners, travelers, students",
        popular: false,
      },
      {
        id: "speaking", category: "English",
        name: "Speaking Proficiency Assessment",
        price: "฿790", duration: "45 min", validity: "2 years",
        desc: "Focused speaking assessment to prove verbal communication skills in English.",
        includes: ["1-on-1 speaking test", "Pronunciation assessment", "Fluency evaluation", "Detailed feedback report"],
        suitable: "Job seekers, presenters, teachers",
        popular: false,
      },
      {
        id: "chinese", category: "Chinese",
        name: "Chinese Communication Certificate",
        price: "฿890", duration: "1.5 hours", validity: "3 years",
        desc: "Validate Chinese language skills. Covers Business Chinese, Everyday Chinese, Conversational Chinese, and Travel Chinese.",
        includes: ["Listening comprehension", "Reading test", "Speaking assessment", "Official certificate"],
        suitable: "Business professionals, travelers, students",
        popular: false,
      },
      {
        id: "hsk", category: "Chinese",
        name: "HSK Prep Test",
        price: "฿890", duration: "2 hours", validity: "1 year",
        desc: "Official HSK preparation test to assess readiness before the actual exam. Detailed score analysis included.",
        includes: ["Full mock HSK exam", "Score analysis report", "Weakness identification", "Study recommendation"],
        suitable: "HSK exam candidates",
        popular: false,
      },
      {
        id: "level", category: "Assessment",
        name: "Level Assessment Test",
        price: "฿290", duration: "30 min", validity: "6 months",
        desc: "Quick assessment to identify your current language level and recommend the right course.",
        includes: ["Grammar & vocabulary test", "Reading comprehension", "Level report", "Course recommendation"],
        suitable: "New students, course selectors",
        popular: false,
      },
      {
        id: "mock", category: "Exam Prep",
        name: "Mock Exam Package",
        price: "฿690", duration: "Full exam time", validity: "N/A",
        desc: "Full mock exams for TOEIC, IELTS, CU-TEP, and A-Level with detailed score analysis.",
        includes: ["Full mock exam (your choice)", "Detailed score breakdown", "Weakness analysis", "Study plan"],
        suitable: "Exam candidates",
        popular: false,
      },
    ],
    addons_title: "Add-on Services",
    addons: [
      { name: "Express Certificate", price: "+฿300", desc: "Receive certificate within 24 hours" },
      { name: "Digital Badge", price: "+฿150", desc: "LinkedIn-ready digital badge for your profile" },
      { name: "Portfolio Package", price: "+฿490", desc: "Professional portfolio with all your certificates" },
    ],
    process_title: "How to Get Certified",
    process_sub: "Simple 4-step process",
    steps: [
      { step: "01", title: "Choose Your Certificate", desc: "Select the certificate that matches your career goals" },
      { step: "02", title: "Book Your Exam", desc: "Book online or via LINE. Pick your preferred date and time" },
      { step: "03", title: "Take the Exam", desc: "Online or in-person at our Chiang Mai center. Results within 3 days" },
      { step: "04", title: "Get Certified", desc: "Receive your official certificate and digital badge. Share on LinkedIn!" },
    ],
    popular_badge: "Most Popular",
    get_certified: "Get Certified →",
    suitable: "Suitable for",
    duration_label: "Duration",
    validity_label: "Valid for",
    includes_label: "Includes",
    cta_title: "Ready to Get Certified?",
    cta_sub: "Join 2,000+ students who have validated their skills with BBY certificates",
    cta_btn1: "Get Certified →",
    cta_btn2: "Chat on LINE",
  },
  TH: {
    breadcrumb_home: "หน้าหลัก",
    breadcrumb: "ใบรับรอง",
    badge: "นายจ้างยอมรับ · ใบรับรองมืออาชีพ",
    title: "BBY",
    title_highlight: "ใบรับรอง",
    sub: "รับใบรับรองที่นายจ้างยอมรับ ยืนยันทักษะของคุณและพัฒนาอาชีพกับโปรแกรมใบรับรองมืออาชีพของ BBY",
    btn1: "รับใบรับรอง →",
    btn2: "แชทบน LINE",
    stats: [
      { num: "8", label: "ประเภทใบรับรอง" },
      { num: "2,000+", label: "ผู้ได้รับใบรับรอง" },
      { num: "95%", label: "นายจ้างยอมรับ" },
      { num: "฿290", label: "ราคาเริ่มต้น" },
    ],
    certs_title: "ใบรับรองที่มีให้",
    certs_sub: "เลือกใบรับรองที่เหมาะกับเป้าหมายอาชีพของคุณ",
    certs: [
      {
        id: "aviation", category: "การบิน",
        name: "Aviation English Proficiency",
        price: "฿1,200", duration: "2 ชั่วโมง", validity: "2 ปี",
        desc: "ทดสอบภาษาอังกฤษตามมาตรฐาน ICAO สำหรับผู้ประกอบอาชีพการบิน จำเป็นสำหรับตำแหน่ง Cabin Crew และ Ground Staff",
        includes: ["ข้อสอบเขียน (60 นาที)", "ทดสอบการพูด (30 นาที)", "ทดสอบการฟัง (30 นาที)", "ใบรับรองอย่างเป็นทางการ + digital badge"],
        suitable: "Cabin crew, ground staff, นักเรียนการบิน",
        popular: true,
      },
      {
        id: "business", category: "ภาษาอังกฤษ",
        name: "Business English Certificate",
        price: "฿990", duration: "1.5 ชั่วโมง", validity: "3 ปี",
        desc: "พิสูจน์ความสามารถภาษาอังกฤษธุรกิจแก่นายจ้าง ครอบคลุมการเขียน การพูด และการสื่อสารแบบมืออาชีพ",
        includes: ["ทดสอบการเขียนธุรกิจ", "ทดสอบการพูด", "ทดสอบคำศัพท์และไวยากรณ์", "ใบรับรองอย่างเป็นทางการ"],
        suitable: "มืออาชีพ ผู้หางาน นักศึกษา MBA",
        popular: false,
      },
      {
        id: "communication", category: "ภาษาอังกฤษ",
        name: "English Communication Certificate",
        price: "฿890", duration: "1.5 ชั่วโมง", validity: "3 ปี",
        desc: "ยืนยันทักษะภาษาอังกฤษในชีวิตประจำวัน ครอบคลุม Everyday, Conversational, Travel และ Study English",
        includes: ["ทดสอบการฟัง", "ทดสอบการพูด", "ทดสอบการอ่าน", "ใบรับรองอย่างเป็นทางการ"],
        suitable: "ผู้เรียนทั่วไป นักท่องเที่ยว นักเรียน",
        popular: false,
      },
      {
        id: "speaking", category: "ภาษาอังกฤษ",
        name: "Speaking Proficiency Assessment",
        price: "฿790", duration: "45 นาที", validity: "2 ปี",
        desc: "ทดสอบการพูดเฉพาะเพื่อพิสูจน์ทักษะการสื่อสารด้วยวาจาภาษาอังกฤษ",
        includes: ["ทดสอบพูด 1-on-1", "ประเมินการออกเสียง", "ประเมินความคล่อง", "รายงาน feedback ละเอียด"],
        suitable: "ผู้หางาน นักนำเสนอ ครู",
        popular: false,
      },
      {
        id: "chinese", category: "ภาษาจีน",
        name: "Chinese Communication Certificate",
        price: "฿890", duration: "1.5 ชั่วโมง", validity: "3 ปี",
        desc: "ยืนยันทักษะภาษาจีน ครอบคลุม Business Chinese, Everyday Chinese, Conversational Chinese และ Travel Chinese",
        includes: ["ทดสอบการฟัง", "ทดสอบการอ่าน", "ทดสอบการพูด", "ใบรับรองอย่างเป็นทางการ"],
        suitable: "มืออาชีพธุรกิจ นักท่องเที่ยว นักเรียน",
        popular: false,
      },
      {
        id: "hsk", category: "ภาษาจีน",
        name: "HSK Prep Test",
        price: "฿890", duration: "2 ชั่วโมง", validity: "1 ปี",
        desc: "ทดสอบเตรียม HSK อย่างเป็นทางการเพื่อประเมินความพร้อมก่อนสอบจริง พร้อมวิเคราะห์คะแนนละเอียด",
        includes: ["Mock exam HSK เต็มรูปแบบ", "รายงานวิเคราะห์คะแนน", "ระบุจุดอ่อน", "แนะนำแผนการเรียน"],
        suitable: "ผู้เตรียมสอบ HSK",
        popular: false,
      },
      {
        id: "level", category: "การประเมิน",
        name: "Level Assessment Test",
        price: "฿290", duration: "30 นาที", validity: "6 เดือน",
        desc: "ทดสอบด่วนเพื่อระบุระดับภาษาปัจจุบันของคุณและแนะนำหลักสูตรที่เหมาะสม",
        includes: ["ทดสอบไวยากรณ์และคำศัพท์", "ทดสอบการอ่าน", "รายงานระดับ", "แนะนำหลักสูตร"],
        suitable: "นักเรียนใหม่ ผู้เลือกหลักสูตร",
        popular: false,
      },
      {
        id: "mock", category: "เตรียมสอบ",
        name: "Mock Exam Package",
        price: "฿690", duration: "เวลาสอบเต็ม", validity: "ไม่มีกำหนด",
        desc: "Mock exam เต็มรูปแบบสำหรับ TOEIC, IELTS, CU-TEP และ A-Level พร้อมวิเคราะห์คะแนนละเอียด",
        includes: ["Mock exam เต็มรูปแบบ (เลือกได้)", "วิเคราะห์คะแนนละเอียด", "วิเคราะห์จุดอ่อน", "แผนการเรียน"],
        suitable: "ผู้เตรียมสอบ",
        popular: false,
      },
    ],
    addons_title: "บริการเสริม",
    addons: [
      { name: "ออกใบรับรองด่วน", price: "+฿300", desc: "รับใบรับรองภายใน 24 ชั่วโมง" },
      { name: "Digital Badge", price: "+฿150", desc: "Digital badge พร้อมใส่ LinkedIn" },
      { name: "Portfolio Package", price: "+฿490", desc: "Portfolio มืออาชีพรวมทุกใบรับรอง" },
    ],
    process_title: "ขั้นตอนการรับใบรับรอง",
    process_sub: "4 ขั้นตอนง่ายๆ",
    steps: [
      { step: "01", title: "เลือกใบรับรอง", desc: "เลือกใบรับรองที่ตรงกับเป้าหมายอาชีพของคุณ" },
      { step: "02", title: "จองการสอบ", desc: "จองออนไลน์หรือผ่าน LINE เลือกวันและเวลาที่ต้องการ" },
      { step: "03", title: "เข้าสอบ", desc: "ออนไลน์หรือที่ศูนย์เชียงใหม่ ผลสอบภายใน 3 วัน" },
      { step: "04", title: "รับใบรับรอง", desc: "รับใบรับรองอย่างเป็นทางการและ digital badge แชร์บน LinkedIn ได้เลย!" },
    ],
    popular_badge: "ยอดนิยม",
    get_certified: "รับใบรับรอง →",
    suitable: "เหมาะสำหรับ",
    duration_label: "ระยะเวลา",
    validity_label: "อายุ",
    includes_label: "รวมถึง",
    cta_title: "พร้อมรับใบรับรองแล้วหรือยัง?",
    cta_sub: "เข้าร่วมกับผู้เรียนกว่า 2,000 คนที่ยืนยันทักษะด้วยใบรับรอง BBY",
    cta_btn1: "รับใบรับรอง →",
    cta_btn2: "แชทบน LINE",
  },
};

const CERT_ICONS = [IconPlane, IconBriefcase, IconMessageCircle, IconMicrophone, IconLanguage, IconBook, IconChartBar, IconNotes];

export default function CertificationsPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];

  return (
    <div className="certifications">
      {/* Hero */}
      <section className="cert-hero">
        <div className="cert-hero-inner">
          <div className="cert-breadcrumb"><Link to="/">{tx.breadcrumb_home}</Link> / <span>{tx.breadcrumb}</span></div>
          <div className="cert-badge">{tx.badge}</div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
          <div className="cert-hero-btns">
            <button className="btn-gold">{tx.btn1}</button>
            <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.btn2}</button>
          </div>
          <div className="cert-hero-stats">
            {tx.stats.map((s, i) => (
              <div className="cert-stat" key={i}>
                <div className="cert-stat-num">{s.num}</div>
                <div className="cert-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="cert-section alt">
        <div className="cert-inner">
          <h2 className="cert-title center">{tx.process_title}</h2>
          <p className="cert-sub center">{tx.process_sub}</p>
          <div className="cert-steps">
            {tx.steps.map((s, i) => (
              <div className="cert-step" key={i}>
                <div className="cert-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="cert-section">
        <div className="cert-inner">
          <h2 className="cert-title center">{tx.certs_title}</h2>
          <p className="cert-sub center">{tx.certs_sub}</p>
          <div className="cert-grid">
            {tx.certs.map((cert, i) => {
              const Icon = CERT_ICONS[i];
              return (
              <div className={`cert-card${cert.popular ? " popular" : ""}`} key={i}>
                {cert.popular && <div className="cert-popular-badge">{tx.popular_badge}</div>}
                <div className="cert-card-header">
                  <div className="cert-icon"><Icon size={24} /></div>
                  <div>
                    <div className="cert-category">{cert.category}</div>
                    <h3>{cert.name}</h3>
                  </div>
                  <div className="cert-price">{cert.price}</div>
                </div>
                <p>{cert.desc}</p>
                <div className="cert-meta">
                  <span><IconClock size={14} /> {tx.duration_label}: {cert.duration}</span>
                  <span><IconCalendar size={14} /> {tx.validity_label}: {cert.validity}</span>
                </div>
                <div className="cert-includes">
                  <div className="cert-includes-title">{tx.includes_label}:</div>
                  {cert.includes.map((inc, j) => (
                    <div key={j} className="cert-include-item"><span><IconCheck size={14} /></span>{inc}</div>
                  ))}
                </div>
                <div className="cert-suitable">
                  <span className="cert-suitable-label">{tx.suitable}:</span> {cert.suitable}
                </div>
                <button className={cert.popular ? "btn-gold" : "btn-outline-pill"}>{tx.get_certified}</button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="cert-section alt">
        <div className="cert-inner">
          <h2 className="cert-title center">{tx.addons_title}</h2>
          <div className="cert-addons">
            {tx.addons.map((addon, i) => (
              <div className="cert-addon" key={i}>
                <div className="cert-addon-info">
                  <h3>{addon.name}</h3>
                  <p>{addon.desc}</p>
                </div>
                <div className="cert-addon-price">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cert-cta">
        <div className="cert-cta-glow" />
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_sub}</p>
        <div className="cert-cta-btns">
          <button className="btn-gold">{tx.cta_btn1}</button>
          <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
