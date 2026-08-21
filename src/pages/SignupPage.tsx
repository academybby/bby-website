import "../styles/auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconUser, IconMail, IconLock } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const TEXT = {
  EN: {
    title: "Create Your", title_highlight: "Account",
    sub: "Sign up to track your courses in one place",
    name: "Full Name", name_ph: "Your full name",
    email: "Email", email_ph: "your@email.com",
    password: "Password", password_ph: "At least 6 characters",
    signup_btn: "Sign Up",
    has_account: "Already have an account?",
    login_link: "Log in",
    confirm_title: "Check Your Email",
    confirm_sub: "We've sent a confirmation link to your email. Click it to activate your account, then log in.",
    go_login: "Go to Login →",
  },
  TH: {
    title: "สร้าง", title_highlight: "บัญชีของคุณ",
    sub: "สมัครสมาชิกเพื่อดูคอร์สของคุณในที่เดียว",
    name: "ชื่อ-นามสกุล", name_ph: "ชื่อของคุณ",
    email: "อีเมล", email_ph: "your@email.com",
    password: "รหัสผ่าน", password_ph: "อย่างน้อย 6 ตัวอักษร",
    signup_btn: "สมัครสมาชิก",
    has_account: "มีบัญชีอยู่แล้ว?",
    login_link: "เข้าสู่ระบบ",
    confirm_title: "ตรวจสอบอีเมลของคุณ",
    confirm_sub: "เราส่งลิงก์ยืนยันไปที่อีเมลของคุณแล้ว คลิกเพื่อเปิดใช้งานบัญชี แล้วเข้าสู่ระบบ",
    go_login: "ไปหน้าเข้าสู่ระบบ →",
  },
};

export default function SignupPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signUp(name, email, password);
      if (result.needsConfirmation) {
        setNeedsConfirmation(true);
      } else {
        navigate("/my-courses", { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (needsConfirmation) {
    return (
      <div className="auth">
        <div className="auth-card">
          <h1>{tx.confirm_title}</h1>
          <p className="auth-sub">{tx.confirm_sub}</p>
          <Link to="/login" className="btn-gold auth-submit" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>{tx.go_login}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
        <p className="auth-sub">{tx.sub}</p>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label><IconUser size={14} /> {tx.name}</label>
            <input type="text" placeholder={tx.name_ph} required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="auth-field">
            <label><IconMail size={14} /> {tx.email}</label>
            <input type="email" placeholder={tx.email_ph} required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="auth-field">
            <label><IconLock size={14} /> {tx.password}</label>
            <input type="password" placeholder={tx.password_ph} required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-gold auth-submit" disabled={loading}>{tx.signup_btn}</button>
        </form>
        <p className="auth-footer">{tx.has_account} <Link to="/login">{tx.login_link}</Link></p>
      </div>
    </div>
  );
}
