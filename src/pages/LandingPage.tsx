import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="lp">
      {/* Navbar */}
      <nav className="nav">
        <div className="logo">
          BBY<span>Language & Tech Institute</span>
        </div>
        <ul className="nav-links">
          <li><a href="#">หลักสูตร</a></li>
          <li><a href="#">บริการ</a></li>
          <li><a href="#">ราคา</a></li>
          <li><a href="#">เกี่ยวกับเรา</a></li>
        </ul>
        <button className="btn-nav">เริ่มเรียนวันนี้</button>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="ti ti-map-pin" />
              เชียงใหม่ · Online & Offline
            </div>
            <h1>เรียนภาษา เทคโนโลยี<br />และ<em> อนาคตของคุณ</em></h1>
            <p>
              สถาบันการศึกษาครบวงจรแห่งเดียวในเชียงใหม่ที่รวม ภาษาอังกฤษ
              ภาษาจีน Coding การเงิน และกฎหมาย ไว้ในที่เดียว
            </p>
            <div className="hero-btns">
              <button className="btn-primary">ดูหลักสูตรทั้งหมด</button>
              <button className="btn-outline">ทดลองเรียนฟรี</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">65+</div><div className="stat-label">หลักสูตร</div></div>
              <div className="stat"><div className="stat-num">6</div><div className="stat-label">สายรายได้</div></div>
              <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Upsell Margin</div></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="course-preview-title">หลักสูตรยอดนิยม</div>
            {[
              { icon: "ti-language", color: "cc-gold", name: "Business English", sub: "ภาษาอังกฤษสำหรับองค์กร", price: "฿2,490" },
              { icon: "ti-brand-python", color: "cc-blue", name: "Python for Automation", sub: "Coding สำหรับผู้เริ่มต้น", price: "฿4,990" },
              { icon: "ti-plane", color: "cc-red", name: "Cabin Crew English", sub: "Aviation English", price: "฿3,490" },
              { icon: "ti-chart-line", color: "cc-purple", name: "Technical Analysis", sub: "การเงินและการลงทุน", price: "฿3,490" },
            ].map((c, i) => (
              <div className="course-card-mini" key={i}>
                <div className={`cc-icon ${c.color}`}><i className={`ti ${c.icon}`} /></div>
                <div className="cc-text">
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-sub">{c.sub}</div>
                </div>
                <div className="cc-price">{c.price}</div>
              </div>
            ))}
            <div className="course-footer">
              <span>65+ หลักสูตร · ออนไลน์ตลอด 24 ชม.</span>
              <button>ดูทั้งหมด →</button>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Categories */}
      <section className="section">
        <div className="section-label">หมวดหมู่การเรียน</div>
        <div className="section-title">เลือกเรียนในสิ่งที่คุณต้องการ</div>
        <div className="section-sub">ครอบคลุม 6 หมวดหลัก สำหรับทุกช่วงอายุและทุกเป้าหมาย ตั้งแต่เด็กอายุ 7 ปี ถึงมืออาชีพ</div>
        <div className="categories-grid">
          {[
            { icon: "ti-language", color: "#C9A84C", name: "ภาษาอังกฤษ", count: "14 หลักสูตร · TOEIC, IELTS, Business", price: "฿1,490 – ฿3,990" },
            { icon: "ti-letter-case", color: "#E8573A", name: "ภาษาจีน", count: "13 หลักสูตร · HSK 1–6, Business", price: "฿1,490 – ฿3,990" },
            { icon: "ti-code", color: "#5CC4A8", name: "Coding & Tech", count: "30 หลักสูตร · เด็กและผู้ใหญ่", price: "฿1,990 – ฿9,900" },
            { icon: "ti-chart-line", color: "#A88FE0", name: "การเงินและการลงทุน", count: "4 หลักสูตร · Technical Analysis", price: "฿2,490 – ฿4,990" },
            { icon: "ti-gavel", color: "#C9A84C", name: "กฎหมาย", count: "4 หลักสูตร · ตั๋วทนาย, เนติบัณฑิต", price: "฿3,990 – ฿9,900" },
            { icon: "ti-plane", color: "#5CC4A8", name: "Aviation English", count: "4 หลักสูตร · Cabin Crew, Ground Staff", price: "฿2,990 – ฿5,990" },
          ].map((cat, i) => (
            <div className="cat-card" key={i}>
              <div className="cat-icon" style={{ color: cat.color }}>
                <i className={`ti ${cat.icon}`} style={{ fontSize: 24 }} />
              </div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count}</div>
              <div className="cat-price">{cat.price}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Revenue Models */}
      <section className="models-section">
        <div className="models-inner">
          <div className="section-label">โมเดลธุรกิจ</div>
          <div className="section-title">6 สายรายได้ที่หลากหลาย</div>
          <div className="section-sub">ระบบ BBY ออกแบบมาเพื่อการเติบโตที่ยั่งยืน ด้วยรายได้หลายช่องทางและ Margin สูง</div>
          <div className="models-grid">
            {[
              { num: "01", tag: "64% ของรายได้", name: "คอร์สออนไลน์", desc: "65+ คอร์ส ขายผ่านแพลตฟอร์ม Teachable/Kajabi เรียนได้ตลอด 24 ชม.", rev: "฿50K–฿140K/เดือน", badge: "" },
              { num: "02", tag: "16.8% ของรายได้", name: "Community", desc: "กลุ่ม Discord/Line, Language Tour, Coffee & Conversation ในเชียงใหม่", rev: "฿39K–฿51K/เดือน", badge: "" },
              { num: "03", tag: "Margin 98%", name: "Upsell Services", desc: "เตรียมสัมภาษณ์งาน/มหาวิทยาลัย, Mock Interview, Resume Review", rev: "฿121K–฿182K/เดือน", badge: "↑ สูงสุด" },
              { num: "04", tag: "10.1% ของรายได้", name: "สอนสด (Live)", desc: "B2C ตัวต่อตัว/กลุ่ม + B2B อบรมองค์กร มหาวิทยาลัย โรงเรียน", rev: "฿75K–฿95K/เดือน", badge: "" },
              { num: "05", tag: "5.2% ของรายได้", name: "ใบรับรองและสอบ", desc: "Aviation Certificate, Business English, Mock Exam TOEIC/IELTS", rev: "฿18K–฿25K/เดือน", badge: "" },
              { num: "06", tag: "Pilot ต.ค. 2026", name: "Subscription", desc: "VIP, Corporate, Annual Pass, Parent Membership เริ่ม ฿590/เดือน", rev: "฿34K–฿35K/เดือน", badge: "" },
            ].map((m, i) => (
              <div className="model-card" key={i}>
                <div className="model-num">{m.num}</div>
                <div className="model-tag">{m.tag}{m.badge && <span className="model-pct">{m.badge}</span>}</div>
                <div className="model-name">{m.name}</div>
                <div className="model-desc">{m.desc}</div>
                <div className="model-rev">{m.rev}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Features */}
      <section className="section">
        <div className="section-label">ทำไมต้อง BBY</div>
        <div className="section-title">จุดแข็งของเรา</div>
        <div className="features-grid">
          {[
            { icon: "ti-school", title: "ใกล้มหาวิทยาลัยเชียงใหม่", desc: "ทำเลดีที่สุดในเชียงใหม่ ใกล้ มช., โรงเรียนสาธิต และชุมชนสนามบิน" },
            { icon: "ti-devices", title: "Online & Offline ครบวงจร", desc: "เรียนออนไลน์ได้ทุกที่ทุกเวลา หรือเข้าร่วมกิจกรรมออฟไลน์ในเชียงใหม่" },
            { icon: "ti-certificate", title: "ใบรับรองมืออาชีพ", desc: "ใบรับรองที่นายจ้างยอมรับ Aviation, Business English, Chinese" },
            { icon: "ti-users", title: "Community แบบ Active", desc: "Language Tour, Coffee & Conversation และ Workshop สุดสัปดาห์ทุกเดือน" },
            { icon: "ti-target", title: "เตรียมสัมภาษณ์แบบจริงจัง", desc: "Mock Interview, Resume Review, Coaching ตัวต่อตัว Margin 98%" },
            { icon: "ti-robot", title: "AI & Tech สำหรับยุคใหม่", desc: "คอร์ส AI for Work, Python, Full-Stack สำหรับทั้งเด็กและผู้ใหญ่" },
          ].map((f, i) => (
            <div className="feat" key={i}>
              <div className="feat-icon"><i className={`ti ${f.icon}`} /></div>
              <div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-label" style={{ marginBottom: "0.75rem" }}>เริ่มต้นวันนี้</div>
        <h2>พร้อมที่จะเรียนรู้<br />สิ่งที่ดีที่สุดในชีวิตแล้วหรือยัง?</h2>
        <p>เข้าร่วมกับผู้เรียนหลายร้อยคนที่กำลังพัฒนาทักษะภาษา เทคโนโลยี และการเงินกับ BBY Institute</p>
        <button className="btn-primary">สมัครเรียนเลย →</button>
        <button className="btn-outline" style={{ marginLeft: "1rem" }}>ติดต่อสอบถาม</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">BBY Institute</div>
        <div className="footer-text">เชียงใหม่ ประเทศไทย · Language & Tech Education</div>
        <div className="footer-text">© 2026 BBY Language & Tech Institute</div>
      </footer>
    </div>
  );
}
