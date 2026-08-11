import type { ProjectCode } from "./types";

export const portfolioCode: ProjectCode = {
  slug: "portfolio-responsivo",
  title: "Portfólio Responsivo",
  files: [
    {
      name: "Navbar.tsx",
      language: "tsx",
      content: `import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "nav.home", href: "#inicio" },
  { key: "nav.about", href: "#sobre" },
  { key: "nav.skills", href: "#habilidades" },
  { key: "nav.projects", href: "#projetos" },
  { key: "nav.education", href: "#educacao" },
  { key: "nav.contact", href: "#contato" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: href } });
    }
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
  };

  return (
    <nav
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled
          ? "bg-background-50/95 backdrop-blur-md border-b border-background-200/40"
          : "bg-transparent"
      }\`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#inicio")}
          className="text-lg md:text-xl font-heading font-bold text-foreground-100
                     hover:text-primary-400 transition-colors whitespace-nowrap cursor-pointer"
        >
          Paulo<span className="text-primary-500">.</span>Dev
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm font-medium text-foreground-500
                         hover:text-foreground-100 hover:bg-background-200/40
                         rounded-md transition-all whitespace-nowrap cursor-pointer"
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 text-xs font-semibold text-foreground-500
                       hover:text-foreground-100 bg-background-200/40
                       hover:bg-background-300/40 rounded-md transition-all cursor-pointer"
          >
            {i18n.language === "pt" ? "EN" : "PT"}
          </button>

          <button
            onClick={() => handleNavClick("#contato")}
            className="hidden md:inline-flex px-4 py-2 text-sm font-semibold
                       bg-primary-500 text-foreground-950 hover:bg-primary-600
                       rounded-md transition-all whitespace-nowrap cursor-pointer"
          >
            {t("nav.hire")}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center
                       text-foreground-400 hover:text-foreground-100 cursor-pointer"
          >
            <i className={
              mobileOpen ? "ri-close-line text-xl" : "ri-menu-line text-xl"
            } />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden bg-background-50/98 backdrop-blur-md
                        border-b border-background-200/40 px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-2.5 text-sm font-medium
                         text-foreground-500 hover:text-foreground-100
                         hover:bg-background-200/40 rounded-md transition-all cursor-pointer"
            >
              {t(link.key)}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contato")}
            className="mt-2 w-full px-4 py-2.5 text-sm font-semibold
                       bg-primary-500 text-foreground-950 hover:bg-primary-600
                       rounded-md transition-all cursor-pointer"
          >
            {t("nav.hire")}
          </button>
        </div>
      )}
    </nav>
  );
}`,
    },
    {
      name: "Hero.tsx",
      language: "tsx",
      content: `import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnimatedOrbs from "./AnimatedOrbs";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <AnimatedOrbs />
      <FloatingParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-background-50 via-background-50/95 to-background-50" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Availability badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary-400
                           bg-primary-500/10 rounded-full border border-primary-500/20 mb-6">
            {t("hero.available")}
          </span>

          {/* Main heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold
                         text-foreground-100 leading-tight mb-4">
            {t("hero.greeting")}{" "}
            <span className="text-primary-500">{t("hero.name")}</span>
          </h1>

          {/* Role */}
          <h2 className="text-lg md:text-xl lg:text-2xl text-foreground-400 font-medium mb-6">
            {t("hero.role")}
          </h2>

          {/* Bio */}
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed max-w-xl mb-8">
            {t("hero.bio")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#projetos"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold
                         bg-primary-500 text-foreground-950 hover:bg-primary-600
                         rounded-md transition-all whitespace-nowrap"
            >
              <i className="ri-folder-open-line" />
              {t("hero.ctaProjects")}
            </Link>
            <Link
              to="/#contato"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold
                         border border-background-300/50 text-foreground-400
                         hover:text-foreground-100 hover:border-primary-500/30
                         rounded-md transition-all whitespace-nowrap"
            >
              <i className="ri-mail-send-line" />
              {t("hero.ctaContact")}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-12 pt-8
                          border-t border-background-200/30">
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-foreground-100">
                6+
              </span>
              <span className="text-xs md:text-sm text-foreground-500">
                {t("hero.statProjects")}
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-foreground-100">
                8+
              </span>
              <span className="text-xs md:text-sm text-foreground-500">
                {t("hero.statTechnologies")}
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-heading font-bold text-foreground-100">
                1+
              </span>
              <span className="text-xs md:text-sm text-foreground-500">
                {t("hero.statExperience")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
    },
    {
      name: "useScrollAnimation.ts",
      language: "typescript",
      content: `import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export default useScrollAnimation;`,
    },
  ],
};