import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";
import FloatingParticles from "./components/FloatingParticles";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const el = document.querySelector(state.scrollTo!);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background-50 relative">
      <FloatingParticles />
      <div className="relative z-10">
        <Navbar />
        <Hero />

        <AnimatedSection>
          <About />
        </AnimatedSection>

        <AnimatedSection>
          <Skills />
        </AnimatedSection>

        <AnimatedSection>
          <Projects />
        </AnimatedSection>

        <AnimatedSection>
          <Education />
        </AnimatedSection>

        <AnimatedSection>
          <Contact />
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
}