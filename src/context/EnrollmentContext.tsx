import { createContext, useContext, useState, type ReactNode } from "react";

const EMAIL_KEY = "bby_email";

interface EnrollmentContextType {
  email: string;
  setEmail: (email: string) => void;
  checkEnrolled: (courseId: number) => Promise<boolean>;
  markEnrolledLocally: (courseId: number) => void;
  isEnrolledLocally: (courseId: number) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType>({
  email: "",
  setEmail: () => {},
  checkEnrolled: async () => false,
  markEnrolledLocally: () => {},
  isEnrolledLocally: () => false,
});

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState(() => localStorage.getItem(EMAIL_KEY) ?? "");
  const [localEnrollments, setLocalEnrollments] = useState<Set<number>>(new Set());

  const setEmail = (value: string) => {
    const normalized = value.trim().toLowerCase();
    setEmailState(normalized);
    localStorage.setItem(EMAIL_KEY, normalized);
  };

  const markEnrolledLocally = (courseId: number) => {
    setLocalEnrollments(prev => new Set(prev).add(courseId));
  };

  const isEnrolledLocally = (courseId: number) => localEnrollments.has(courseId);

  // Authoritative check against the server — the local flag above is only an
  // optimistic UX shortcut right after a successful payment, not a security boundary.
  const checkEnrolled = async (courseId: number): Promise<boolean> => {
    if (!email) return false;
    try {
      const res = await fetch(`/api/enrollment-status?email=${encodeURIComponent(email)}&courseId=${courseId}`);
      if (!res.ok) return false;
      const data = await res.json();
      return !!data.enrolled;
    } catch {
      return false;
    }
  };

  return (
    <EnrollmentContext.Provider value={{ email, setEmail, checkEnrolled, markEnrolledLocally, isEnrolledLocally }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  return useContext(EnrollmentContext);
}
