import "../styles/payment.css";
import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { IconConfetti, IconMailOpened, IconDeviceMobile } from "@tabler/icons-react";
import { ALL_COURSES } from "../data/courses-data";
import { useLang } from "../context/LanguageContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { createCardToken } from "../lib/omiseClient";

const TEXT = {
  EN: {
    home: "Home", courses: "Courses", enroll: "Enroll", payment: "Payment",
    title: "Complete Your", title_highlight: "Payment",
    sub: "Confirm your order and complete payment to unlock your course.",
    order_summary: "Order Summary",
    plan: "Plan", total: "Total",
    method_title: "Payment Method",
    methods: ["Bank Transfer", "Credit/Debit Card", "PromptPay QR", "Pay via LINE"],
    bank_name: "Bank", bank_val: "Kasikorn Bank",
    bank_acc: "Account No.", bank_acc_val: "123-4-56789-0",
    bank_holder: "Account Name", bank_holder_val: "BBY Academy Co., Ltd.",
    bank_note: "Please transfer the exact amount and keep your receipt. We'll verify manually and email you once confirmed.",
    card_holder: "Cardholder Name", card_number: "Card Number", card_expiry: "Expiry (MM/YY)", card_cvv: "CVV",
    qr_note: "Scan this QR code with your banking app to pay via PromptPay.",
    qr_waiting: "Waiting for payment confirmation…",
    line_note: "Send your payment slip to our LINE account and we'll verify manually.",
    line_id: "LINE ID: @bbyacademy",
    confirm_btn: "Confirm Payment →",
    submit_order_btn: "Submit Order →",
    processing: "Processing...",
    success_title: "Payment Successful!",
    success_sub: "Your enrollment is confirmed. You now have full access to this course.",
    start_learning: "Start Learning →",
    back_home: "Back to Home",
    pending_title: "Order Submitted",
    pending_sub: "We've recorded your order and will verify your payment manually. You'll be notified by email once your course access is unlocked.",
    failed_title: "Payment Failed",
    failed_sub: "Something went wrong processing your payment. Please try again or choose a different method.",
    try_again: "Try Again",
    error_generic: "Something went wrong. Please try again.",
  },
  TH: {
    home: "หน้าหลัก", courses: "หลักสูตร", enroll: "สมัครเรียน", payment: "ชำระเงิน",
    title: "ทำการ", title_highlight: "ชำระเงินให้สมบูรณ์",
    sub: "ยืนยันคำสั่งซื้อและชำระเงินเพื่อปลดล็อกคอร์สเรียน",
    order_summary: "สรุปคำสั่งซื้อ",
    plan: "แผน", total: "ยอดรวม",
    method_title: "วิธีการชำระเงิน",
    methods: ["โอนผ่านธนาคาร", "บัตรเครดิต/เดบิต", "PromptPay QR", "ชำระผ่าน LINE"],
    bank_name: "ธนาคาร", bank_val: "ธนาคารกสิกรไทย",
    bank_acc: "เลขที่บัญชี", bank_acc_val: "123-4-56789-0",
    bank_holder: "ชื่อบัญชี", bank_holder_val: "บริษัท บีบีวาย อคาเดมี จำกัด",
    bank_note: "กรุณาโอนตามยอดที่ระบุและเก็บสลิปไว้ เราจะตรวจสอบและอีเมลแจ้งเมื่อยืนยันแล้ว",
    card_holder: "ชื่อผู้ถือบัตร", card_number: "หมายเลขบัตร", card_expiry: "วันหมดอายุ (MM/YY)", card_cvv: "CVV",
    qr_note: "สแกน QR โค้ดนี้ด้วยแอปธนาคารของคุณเพื่อชำระผ่าน PromptPay",
    qr_waiting: "กำลังรอการยืนยันการชำระเงิน…",
    line_note: "ส่งสลิปการชำระเงินมาที่ LINE ของเราเพื่อให้เราตรวจสอบ",
    line_id: "LINE ID: @bbyacademy",
    confirm_btn: "ยืนยันการชำระเงิน →",
    submit_order_btn: "ส่งคำสั่งซื้อ →",
    processing: "กำลังดำเนินการ...",
    success_title: "ชำระเงินสำเร็จ!",
    success_sub: "การสมัครเรียนของคุณได้รับการยืนยันแล้ว ตอนนี้คุณเข้าถึงคอร์สนี้ได้เต็มรูปแบบ",
    start_learning: "เริ่มเรียนเลย →",
    back_home: "กลับหน้าหลัก",
    pending_title: "ส่งคำสั่งซื้อแล้ว",
    pending_sub: "เราบันทึกคำสั่งซื้อของคุณแล้วและจะตรวจสอบการชำระเงินด้วยตนเอง คุณจะได้รับอีเมลแจ้งเมื่อปลดล็อกคอร์สแล้ว",
    failed_title: "การชำระเงินล้มเหลว",
    failed_sub: "เกิดข้อผิดพลาดระหว่างดำเนินการชำระเงิน กรุณาลองใหม่หรือเลือกวิธีอื่น",
    try_again: "ลองอีกครั้ง",
    error_generic: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  },
};

const METHOD_KEYS = ["bank_transfer", "card", "promptpay", "line"] as const;
type MethodKey = typeof METHOD_KEYS[number];
type Phase = "form" | "processing" | "qr_wait" | "success" | "pending_manual" | "failed";

interface EnrollState {
  planIdx: number;
  form: { name: string; email: string; phone: string; lineId: string; notes: string; payment: number; agree: boolean };
}

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLang();
  const tx = TEXT[lang];
  const { markEnrolledLocally } = useEnrollment();

  const course = ALL_COURSES.find(c => c.id === Number(id)) || ALL_COURSES[0];
  const state = location.state as EnrollState | null;

  useEffect(() => {
    if (!state) {
      navigate(`/courses/${course.id}/enroll`, { replace: true });
    }
  }, [state, course.id, navigate]);

  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [cardName, setCardName] = useState(state?.form.name ?? "");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  if (!state) return null;

  const plan = course.plans[state.planIdx] || course.plans[0];
  const method: MethodKey = METHOD_KEYS[state.form.payment] ?? "bank_transfer";

  const pollChargeStatus = (chargeId: string) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/charge-status?chargeId=${encodeURIComponent(chargeId)}`);
        const data = await res.json();
        if (data.status === "successful") {
          if (pollRef.current) clearInterval(pollRef.current);
          markEnrolledLocally(course.id);
          setPhase("success");
        } else if (data.status === "failed" || data.status === "expired" || data.status === "reversed") {
          if (pollRef.current) clearInterval(pollRef.current);
          setError(data.failureMessage ?? tx.failed_sub);
          setPhase("failed");
        }
      } catch {
        // transient network error while polling — keep waiting for the next tick
      }
    }, 3000);
  };

  const handleConfirm = async () => {
    setError(null);
    setPhase("processing");

    try {
      let cardToken: string | undefined;

      if (method === "card") {
        const [expMonthStr, expYearStr] = cardExpiry.split("/").map(s => s.trim());
        const expMonth = Number(expMonthStr);
        const expYear = Number(expYearStr);
        if (!cardName || !cardNumber || !expMonth || !expYear || !cardCvv) {
          setError(tx.error_generic);
          setPhase("form");
          return;
        }
        cardToken = await createCardToken({
          name: cardName,
          number: cardNumber,
          expirationMonth: expMonth,
          expirationYear: 2000 + expYear,
          cvv: cardCvv,
        });
      }

      const res = await fetch("/api/create-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.form.email,
          name: state.form.name,
          phone: state.form.phone,
          courseId: course.id,
          planName: plan.name,
          method,
          cardToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? tx.error_generic);
      }

      const data = await res.json();

      if (data.status === "pending_manual") {
        setPhase("pending_manual");
        return;
      }

      if (data.status === "successful") {
        markEnrolledLocally(course.id);
        setPhase("success");
        return;
      }

      if (data.status === "pending" && data.qrImage) {
        setQrImage(data.qrImage);
        setPhase("qr_wait");
        pollChargeStatus(data.chargeId);
        return;
      }

      setError(data.failureMessage ?? tx.failed_sub);
      setPhase("failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : tx.error_generic);
      setPhase("failed");
    }
  };

  if (phase === "success") {
    return (
      <div className="payment">
        <section className="pay-success">
          <div className="pay-success-icon"><IconConfetti size={44} /></div>
          <h1>{tx.success_title}</h1>
          <p>{tx.success_sub}</p>
          <div className="pay-success-btns">
            <Link to="/" className="btn-outline-pill">{tx.back_home}</Link>
            <Link to={`/courses/${course.id}/learn`} className="btn-gold">{tx.start_learning}</Link>
          </div>
        </section>
      </div>
    );
  }

  if (phase === "pending_manual") {
    return (
      <div className="payment">
        <section className="pay-success">
          <div className="pay-success-icon"><IconMailOpened size={44} /></div>
          <h1>{tx.pending_title}</h1>
          <p>{tx.pending_sub}</p>
          <div className="pay-success-btns">
            <Link to="/" className="btn-outline-pill">{tx.back_home}</Link>
            <Link to="/courses" className="btn-gold">{tx.courses}</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="payment">
      <section className="pay-hero">
        <div className="pay-hero-inner">
          <div className="pay-breadcrumb">
            <Link to="/">{tx.home}</Link> / <Link to="/courses">{tx.courses}</Link> / <Link to={`/courses/${course.id}`}>{course.title}</Link> / <Link to={`/courses/${course.id}/enroll`}>{tx.enroll}</Link> / <span>{tx.payment}</span>
          </div>
          <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
          <p>{tx.sub}</p>
        </div>
      </section>

      <section className="pay-main">
        <div className="pay-main-inner">
          <div className="pay-method-col">
            <div className="pay-card">
              <h2>{tx.method_title}</h2>
              <div className="pay-method-active">{tx.methods[state.form.payment]}</div>

              {phase === "failed" && <p className="pay-error">{error}</p>}

              {method === "bank_transfer" && (
                <div className="pay-bank-details">
                  <div className="pay-bank-row"><span>{tx.bank_name}</span><strong>{tx.bank_val}</strong></div>
                  <div className="pay-bank-row"><span>{tx.bank_acc}</span><strong>{tx.bank_acc_val}</strong></div>
                  <div className="pay-bank-row"><span>{tx.bank_holder}</span><strong>{tx.bank_holder_val}</strong></div>
                  <p className="pay-note">{tx.bank_note}</p>
                </div>
              )}

              {method === "card" && phase !== "qr_wait" && (
                <div className="pay-card-form">
                  <div className="pay-field"><label>{tx.card_holder}</label><input type="text" value={cardName} onChange={e => setCardName(e.target.value)} /></div>
                  <div className="pay-field"><label>{tx.card_number}</label><input type="text" placeholder="4242 4242 4242 4242" maxLength={19} value={cardNumber} onChange={e => setCardNumber(e.target.value)} /></div>
                  <div className="pay-row">
                    <div className="pay-field"><label>{tx.card_expiry}</label><input type="text" placeholder="MM/YY" maxLength={5} value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} /></div>
                    <div className="pay-field"><label>{tx.card_cvv}</label><input type="text" placeholder="123" maxLength={4} value={cardCvv} onChange={e => setCardCvv(e.target.value)} /></div>
                  </div>
                </div>
              )}

              {method === "promptpay" && phase === "qr_wait" && qrImage && (
                <div className="pay-qr-wrap">
                  <img src={qrImage} alt="PromptPay QR" className="pay-qr-image" />
                  <p className="pay-note">{tx.qr_waiting}</p>
                </div>
              )}
              {method === "promptpay" && phase !== "qr_wait" && (
                <div className="pay-qr-wrap">
                  <div className="pay-qr-box"><IconDeviceMobile size={40} /></div>
                  <p className="pay-note">{tx.qr_note}</p>
                </div>
              )}

              {method === "line" && (
                <div className="pay-line-wrap">
                  <p className="pay-note">{tx.line_note}</p>
                  <div className="pay-line-id">{tx.line_id}</div>
                </div>
              )}

              {phase !== "qr_wait" && (
                <button className="btn-gold pay-confirm-btn" onClick={handleConfirm} disabled={phase === "processing"}>
                  {phase === "processing" ? tx.processing : (method === "bank_transfer" || method === "line") ? tx.submit_order_btn : tx.confirm_btn}
                </button>
              )}
            </div>
          </div>

          <div className="pay-summary-col">
            <div className="pay-summary-card">
              <h3>{tx.order_summary}</h3>
              <img src={course.img} alt={course.title} className="pay-summary-img" />
              <div className="pay-summary-title">{course.title}</div>
              <hr className="pay-divider" />
              <div className="pay-summary-row"><span>{tx.plan}</span><strong>{plan.name}</strong></div>
              <hr className="pay-divider" />
              <div className="pay-summary-total"><span>{tx.total}</span><span className="pay-total-price">{plan.price}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
