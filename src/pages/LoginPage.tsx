import "../styles/auth.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconMail, IconLock } from "@tabler/icons-react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const TEXT = {
  EN: {
    title: "Welcome", title_highlight: "Back",
    sub: "Log in to access your courses",
    email: "Email", email_ph: "your@email.com",
    password: "Password", password_ph: "Your password",
    forgot: "Forgot password?",
    login_btn: "Log In",
    no_account: "Don't have an account?",
    signup_link: "Sign up",
    reset_title: "Reset Password",
    reset_sub: "Enter your email and we'll send you a reset link",
    reset_btn: "Send Reset Link",
    back_to_login: "Back to login",
    reset_sent: "Check your email for a password reset link.",
  },
  TH: {
    title: "ยินดีต้อนรับ", title_highlight: "กลับมา",
    sub: "เข้าสู่ระบบเพื่อเข้าถึงคอร์สของคุณ",
    email: "อีเมล", email_ph: "your@email.com",
    password: "รหัสผ่าน", password_ph: "รหัสผ่านของคุณ",
    forgot: "ลืมรหัสผ่าน?",
    login_btn: "เข้าสู่ระบบ",
    no_account: "ยังไม่มีบัญชี?",
    signup_link: "สมัครสมาชิก",
    reset_title: "รีเซ็ตรหัสผ่าน",
    reset_sub: "กรอกอีเมลของคุณ เราจะส่งลิงก์รีเซ็ตให้",
    reset_btn: "ส่งลิงก์รีเซ็ต",
    back_to_login: "กลับไปหน้าเข้าสู่ระบบ",
    reset_sent: "ตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน",
  },
};

export default function LoginPage() {
  const { lang } = useLang();
  const tx = TEXT[lang];
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/my-courses";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        {mode === "login" ? (
          <>
            <h1>{tx.title} <span className="gold">{tx.title_highlight}</span></h1>
            <p className="auth-sub">{tx.sub}</p>
            {error && <p className="auth-error">{error}</p>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field">
                <label><IconMail size={14} /> {tx.email}</label>
                <input type="email" placeholder={tx.email_ph} required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="auth-field">
                <label><IconLock size={14} /> {tx.password}</label>
                <input type="password" placeholder={tx.password_ph} required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="button" className="auth-link-btn" onClick={() => { setMode("forgot"); setError(null); }}>{tx.forgot}</button>
              <button type="submit" className="btn-gold auth-submit" disabled={loading}>{tx.login_btn}</button>
            </form>
            <p className="auth-footer">{tx.no_account} <Link to="/signup">{tx.signup_link}</Link></p>
          </>
        ) : (
          <>
            <h1>{tx.reset_title}</h1>
            <p className="auth-sub">{tx.reset_sub}</p>
            {error && <p className="auth-error">{error}</p>}
            {resetSent ? (
              <p className="auth-success">{tx.reset_sent}</p>
            ) : (
              <form className="auth-form" onSubmit={handleReset}>
                <div className="auth-field">
                  <label><IconMail size={14} /> {tx.email}</label>
                  <input type="email" placeholder={tx.email_ph} required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn-gold auth-submit" disabled={loading}>{tx.reset_btn}</button>
              </form>
            )}
            <button type="button" className="auth-link-btn" onClick={() => { setMode("login"); setError(null); setResetSent(false); }}>{tx.back_to_login}</button>
          </>
        )}
      </div>
    </div>
  );
}
