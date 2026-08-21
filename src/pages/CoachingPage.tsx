import "../styles/coaching.css";
import { Link } from "react-router-dom";
import { IconMessageCircle, IconSchool, IconBriefcase, IconMicrophone, IconClock, IconCheck } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";

const TEXT = {
  EN: {
    breadcrumb_home: "Home",
    breadcrumb: "Coaching",
    badge: "Margin 98% · Zero Marketing Cost",
    title: "Coaching &",
    title_highlight: "Interview Prep",
    sub: "One-on-one coaching to get you into your dream university or land your dream job. Real practice, real feedback, real results.",
    btn1: "Book a Session →",
    btn2: "Chat on LINE",
    stats: [
      { num: "98%", label: "Profit Margin" },
      { num: "500+", label: "Sessions Done" },
      { num: "95%", label: "Success Rate" },
      { num: "฿290", label: "Starting Price" },
    ],
    how_title: "How It Works",
    how_sub: "Simple 4-step process to get you ready",
    steps: [
      { step: "01", title: "Book a Session", desc: "Choose your package and book via LINE or our website. We'll confirm within 2 hours." },
      { step: "02", title: "Assessment Call", desc: "Free 15-min call to understand your goals and customize the coaching plan." },
      { step: "03", title: "Coaching Sessions", desc: "Practice with expert coaches via Zoom or in-person in Chiang Mai." },
      { step: "04", title: "Get Results", desc: "Apply your skills with confidence. We follow up to celebrate your success!" },
    ],
    pkg_sub: "Choose the package that fits your timeline and budget",
    popular: "Most Popular",
    book_now: "Book Now →",
    bundle_title: "Bundle Packages",
    bundle_sub: "Save more with our curated bundles",
    save: "Save",
    get_bundle: "Get Bundle →",
    addon_title: "Add-on Services",
    addon_sub: "Enhance your coaching experience",
    testimonials_title: "Success Stories",
    testimonials_sub: "Real students, real results",
    cta_title: "Ready to Ace Your Interview?",
    cta_sub: "Book your first session today — starting at just ฿290",
    cta_btn1: "Book a Session →",
    cta_btn2: "Chat on LINE",
    packages: [
      {
        category: "University Interview Prep",
        items: [
          { name: "Basic Session", duration: "60 min", price: "฿490", desc: "Introduction and assessment", popular: false },
          { name: "Standard Package", duration: "3×90 min", price: "฿1,290", desc: "Full preparation with feedback", popular: false },
          { name: "Premium Package", duration: "5×90 min", price: "฿2,490", desc: "Complete coaching with mock interviews", popular: true },
          { name: "Group Workshop", duration: "3 hrs", price: "฿390/person", desc: "6-10 students per session", popular: false },
        ],
      },
      {
        category: "Job Interview Prep",
        items: [
          { name: "Entry Level", duration: "90 min", price: "฿590", desc: "CV review + basic interview prep", popular: false },
          { name: "Standard Package", duration: "4×90 min", price: "฿1,690", desc: "Mock interviews + detailed feedback", popular: true },
          { name: "Aviation Specialty", duration: "5×2 hrs", price: "฿2,990", desc: "For cabin crew & aviation careers", popular: false },
          { name: "Resume Review", duration: "—", price: "฿290", desc: "Professional CV feedback within 48hrs", popular: false },
        ],
      },
      {
        category: "English Speaking Coaching",
        items: [
          { name: "Speaking Confidence", duration: "60 min", price: "฿390", desc: "Overcome fear of speaking", popular: false },
          { name: "Business English Interview", duration: "90 min", price: "฿790", desc: "Corporate communication coaching", popular: false },
          { name: "Accent Improvement", duration: "4×60 min", price: "฿1,490", desc: "Reduce accent, improve clarity", popular: true },
          { name: "Mock Interview (Express)", duration: "45 min", price: "฿290", desc: "Quick practice with instant feedback", popular: false },
        ],
      },
    ],
    bundles: [
      { name: "Job Hunter Starter", price: "฿790", includes: ["Entry Level Interview", "Resume Review"], saving: "฿90" },
      { name: "Aviation Dream", price: "฿3,290", includes: ["Aviation Specialty (5×2hr)", "Resume Review", "Mock Interview Express"], saving: "฿580" },
      { name: "University Success", price: "฿1,190", includes: ["Standard University Package", "Group Workshop"], saving: "฿490" },
      { name: "Complete Interview Mastery", price: "฿2,490", includes: ["All 3 categories combined", "Full feedback report"], saving: "฿780" },
    ],
    addons: [
      { name: "Video Recording", price: "+฿150", desc: "Record your session to review later" },
      { name: "Extra Mock Session", price: "+฿290", desc: "Add more practice rounds" },
      { name: "Follow-up Review", price: "+฿290", desc: "Check-in after 2 weeks" },
      { name: "LINE VIP Access", price: "+฿190/mo", desc: "Direct message support anytime" },
    ],
    testimonials: [
      { name: "Nattida K.", result: "Landed Dream Job at SCB", quote: "The mock interviews were so realistic. I felt completely prepared on the actual day.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
      { name: "Pongpat S.", result: "Accepted to Chulalongkorn", quote: "Coach helped me structure my answers perfectly. Got into my first choice university!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
      { name: "Malisa T.", result: "Hired as Cabin Crew at Thai Airways", quote: "The Aviation Specialty package was exactly what I needed. Now living my dream!", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
    ],
  },
  TH: {
    breadcrumb_home: "หน้าหลัก",
    breadcrumb: "โค้ชชิ่ง",
    badge: "Margin 98% · ต้นทุนการตลาดเป็นศูนย์",
    title: "โค้ชชิ่งและ",
    title_highlight: "เตรียมสัมภาษณ์",
    sub: "โค้ชชิ่งแบบตัวต่อตัวเพื่อช่วยให้คุณเข้ามหาวิทยาลัยในฝันหรือได้งานในฝัน ฝึกจริง ได้รับ feedback จริง ผลลัพธ์จริง",
    btn1: "จองเซสชั่น →",
    btn2: "แชทบน LINE",
    stats: [
      { num: "98%", label: "กำไร" },
      { num: "500+", label: "เซสชั่นที่ทำแล้ว" },
      { num: "95%", label: "อัตราความสำเร็จ" },
      { num: "฿290", label: "ราคาเริ่มต้น" },
    ],
    how_title: "ขั้นตอนการทำงาน",
    how_sub: "4 ขั้นตอนง่ายๆ เพื่อเตรียมคุณให้พร้อม",
    steps: [
      { step: "01", title: "จองเซสชั่น", desc: "เลือกแพ็คเกจและจองผ่าน LINE หรือเว็บไซต์ เราจะยืนยันภายใน 2 ชั่วโมง" },
      { step: "02", title: "โทรประเมิน", desc: "โทรฟรี 15 นาทีเพื่อเข้าใจเป้าหมายของคุณและปรับแผนการโค้ช" },
      { step: "03", title: "เซสชั่นโค้ชชิ่ง", desc: "ฝึกกับโค้ชผู้เชี่ยวชาญผ่าน Zoom หรือพบตัวในเชียงใหม่" },
      { step: "04", title: "รับผลลัพธ์", desc: "ใช้ทักษะของคุณอย่างมั่นใจ เราติดตามผลเพื่อร่วมยินดีกับความสำเร็จ!" },
    ],
    pkg_sub: "เลือกแพ็คเกจที่เหมาะกับเวลาและงบประมาณของคุณ",
    popular: "ยอดนิยม",
    book_now: "จองเลย →",
    bundle_title: "แพ็คเกจรวม",
    bundle_sub: "ประหยัดมากขึ้นกับแพ็คเกจรวมของเรา",
    save: "ประหยัด",
    get_bundle: "รับแพ็คเกจ →",
    addon_title: "บริการเสริม",
    addon_sub: "เพิ่มประสิทธิภาพการโค้ชชิ่งของคุณ",
    testimonials_title: "เรื่องราวความสำเร็จ",
    testimonials_sub: "นักเรียนจริง ผลลัพธ์จริง",
    cta_title: "พร้อมที่จะสัมภาษณ์ได้อย่างยอดเยี่ยม?",
    cta_sub: "จองเซสชั่นแรกวันนี้ — เริ่มต้นที่ ฿290",
    cta_btn1: "จองเซสชั่น →",
    cta_btn2: "แชทบน LINE",
    packages: [
      {
        category: "เตรียมสัมภาษณ์มหาวิทยาลัย",
        items: [
          { name: "เซสชั่นพื้นฐาน", duration: "60 นาที", price: "฿490", desc: "ประเมินและเริ่มต้น", popular: false },
          { name: "แพ็คเกจมาตรฐาน", duration: "3×90 นาที", price: "฿1,290", desc: "เตรียมครบพร้อม feedback", popular: false },
          { name: "แพ็คเกจพรีเมียม", duration: "5×90 นาที", price: "฿2,490", desc: "โค้ชครบพร้อม mock interview", popular: true },
          { name: "Workshop กลุ่ม", duration: "3 ชม.", price: "฿390/คน", desc: "6-10 คนต่อเซสชั่น", popular: false },
        ],
      },
      {
        category: "เตรียมสัมภาษณ์งาน",
        items: [
          { name: "ระดับเริ่มต้น", duration: "90 นาที", price: "฿590", desc: "ตรวจ CV + เตรียมสัมภาษณ์เบื้องต้น", popular: false },
          { name: "แพ็คเกจมาตรฐาน", duration: "4×90 นาที", price: "฿1,690", desc: "Mock interview + feedback ละเอียด", popular: true },
          { name: "Aviation Specialty", duration: "5×2 ชม.", price: "฿2,990", desc: "สำหรับแอร์โฮสเตสและงานการบิน", popular: false },
          { name: "ตรวจ Resume", duration: "—", price: "฿290", desc: "Feedback CV มืออาชีพภายใน 48 ชม.", popular: false },
        ],
      },
      {
        category: "โค้ชการพูดภาษาอังกฤษ",
        items: [
          { name: "สร้างความมั่นใจในการพูด", duration: "60 นาที", price: "฿390", desc: "เอาชนะความกลัวการพูด", popular: false },
          { name: "Business English Interview", duration: "90 นาที", price: "฿790", desc: "โค้ชการสื่อสารในองค์กร", popular: false },
          { name: "ปรับสำเนียง", duration: "4×60 นาที", price: "฿1,490", desc: "ลดสำเนียง เพิ่มความชัดเจน", popular: true },
          { name: "Mock Interview ด่วน", duration: "45 นาที", price: "฿290", desc: "ฝึกด่วนพร้อม feedback ทันที", popular: false },
        ],
      },
    ],
    bundles: [
      { name: "Job Hunter Starter", price: "฿790", includes: ["สัมภาษณ์งานระดับเริ่มต้น", "ตรวจ Resume"], saving: "฿90" },
      { name: "Aviation Dream", price: "฿3,290", includes: ["Aviation Specialty (5×2ชม.)", "ตรวจ Resume", "Mock Interview ด่วน"], saving: "฿580" },
      { name: "University Success", price: "฿1,190", includes: ["แพ็คเกจมหาวิทยาลัยมาตรฐาน", "Workshop กลุ่ม"], saving: "฿490" },
      { name: "Complete Interview Mastery", price: "฿2,490", includes: ["ทั้ง 3 หมวดรวม", "รายงาน feedback ครบ"], saving: "฿780" },
    ],
    addons: [
      { name: "บันทึกวิดีโอ", price: "+฿150", desc: "บันทึกเซสชั่นเพื่อดูย้อนหลัง" },
      { name: "Mock เพิ่ม", price: "+฿290", desc: "เพิ่มรอบฝึกซ้อม" },
      { name: "ติดตามผล", price: "+฿290", desc: "เช็คอินหลังจาก 2 สัปดาห์" },
      { name: "LINE VIP Access", price: "+฿190/เดือน", desc: "ส่งข้อความโดยตรงได้ตลอดเวลา" },
    ],
    testimonials: [
      { name: "ณัทธิดา ก.", result: "ได้งานในฝันที่ SCB", quote: "Mock interview สมจริงมาก รู้สึกเตรียมพร้อมสมบูรณ์ในวันจริง", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
      { name: "พงศ์พัฒน์ ส.", result: "ได้เข้าจุฬาลงกรณ์", quote: "โค้ชช่วยจัดโครงสร้างคำตอบได้ดีมาก ได้เข้ามหาวิทยาลัยอันดับ 1!", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
      { name: "มาลิสา ท.", result: "ได้งาน Cabin Crew การบินไทย", quote: "แพ็คเกจ Aviation Specialty คือสิ่งที่ต้องการ ตอนนี้ใช้ชีวิตในฝันแล้ว!", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
    ],
  },
};

const PKG_ICONS = [IconSchool, IconBriefcase, IconMicrophone];

export default function CoachingPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];

  return (
    <div className="coaching">
      <section className="ch-hero">
        <div className="ch-hero-inner">
          <div className="ch-breadcrumb"><Link to="/">{tx.breadcrumb_home}</Link> / <span>{tx.breadcrumb}</span></div>
          <div className="ch-badge">{tx.badge}</div>
          <h1>{tx.title}<br /><span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
          <div className="ch-hero-btns">
            <button className="btn-gold">{tx.btn1}</button>
            <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.btn2}</button>
          </div>
          <div className="ch-hero-stats">
            {tx.stats.map((s, i) => (
              <div className="ch-stat" key={i}>
                <div className="ch-stat-num">{s.num}</div>
                <div className="ch-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">{tx.how_title}</h2>
          <p className="ch-sub center">{tx.how_sub}</p>
          <div className="ch-steps">
            {tx.steps.map((s, i) => (
              <div className="ch-step" key={i}>
                <div className="ch-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {tx.packages.map((pkg, pi) => (
        <section className={`ch-section${pi % 2 === 1 ? " alt" : ""}`} key={pi}>
          <div className="ch-inner">
            <div className="ch-pkg-header">
              <span className="ch-pkg-icon">{(() => { const Icon = PKG_ICONS[pi]; return <Icon size={24} />; })()}</span>
              <div>
                <h2 className="ch-title">{pkg.category}</h2>
                <p className="ch-sub">{tx.pkg_sub}</p>
              </div>
            </div>
            <div className="ch-pkg-grid">
              {pkg.items.map((item, ii) => (
                <div className={`ch-pkg-card${item.popular ? " popular" : ""}`} key={ii}>
                  {item.popular && <div className="ch-popular-badge">{tx.popular}</div>}
                  <h3>{item.name}</h3>
                  <p className="ch-pkg-desc">{item.desc}</p>
                  <div className="ch-pkg-duration"><IconClock size={14} /> {item.duration}</div>
                  <div className="ch-pkg-price">{item.price}</div>
                  <button className={item.popular ? "btn-gold" : "btn-outline-pill"}>{tx.book_now}</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">{tx.bundle_title}</h2>
          <p className="ch-sub center">{tx.bundle_sub}</p>
          <div className="ch-bundles">
            {tx.bundles.map((bundle, i) => (
              <div className="ch-bundle" key={i}>
                <div className="ch-bundle-top">
                  <h3>{bundle.name}</h3>
                  <div className="ch-bundle-saving">{tx.save} {bundle.saving}</div>
                </div>
                <ul>
                  {bundle.includes.map((item, j) => (
                    <li key={j}><span><IconCheck size={14} /></span>{item}</li>
                  ))}
                </ul>
                <div className="ch-bundle-bottom">
                  <div className="ch-bundle-price">{bundle.price}</div>
                  <button className="btn-gold-sm">{tx.get_bundle}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-section alt">
        <div className="ch-inner">
          <h2 className="ch-title center">{tx.addon_title}</h2>
          <p className="ch-sub center">{tx.addon_sub}</p>
          <div className="ch-addons">
            {tx.addons.map((addon, i) => (
              <div className="ch-addon" key={i}>
                <div className="ch-addon-info">
                  <h3>{addon.name}</h3>
                  <p>{addon.desc}</p>
                </div>
                <div className="ch-addon-price">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-inner">
          <h2 className="ch-title center">{tx.testimonials_title}</h2>
          <p className="ch-sub center">{tx.testimonials_sub}</p>
          <div className="ch-testimonials">
            {tx.testimonials.map((t, i) => (
              <div className="ch-testimonial" key={i}>
                <div className="ch-quote">"</div>
                <p>"{t.quote}"</p>
                <div className="ch-testimonial-author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <div className="ch-author-name">{t.name}</div>
                    <div className="ch-author-result">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-cta">
        <div className="ch-cta-glow" />
        <h2>{tx.cta_title}</h2>
        <p>{tx.cta_sub}</p>
        <div className="ch-cta-btns">
          <button className="btn-gold">{tx.cta_btn1}</button>
          <button className="btn-outline-pill"><IconMessageCircle size={18} /> {tx.cta_btn2}</button>
        </div>
      </section>
    </div>
  );
}
