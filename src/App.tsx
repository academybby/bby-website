import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import EnrollPage from "./pages/EnrollPage";
import LearnPage from "./pages/LearnPage";
import ContactPage from "./pages/ContactPage";
import CoachingPage from "./pages/CoachingPage";
import CommunityPage from "./pages/CommunityPage";
import CertificationsPage from "./pages/CertificationsPage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/courses/:id/enroll" element={<EnrollPage />} />
          <Route path="/courses/:id/learn" element={<LearnPage />} />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
