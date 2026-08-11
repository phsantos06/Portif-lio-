import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LANGUAGES = [
  { code: "pt", label: "lang.pt" },
  { code: "en", label: "lang.en" },
  { code: "es", label: "lang.es" },
  { code: "fr", label: "lang.fr" },
  { code: "de", label: "lang.de" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLangOpen(false);
  }, [i18n.language]);

  const goToSection = (hash: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: hash } });
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[1];

  const navLinks = [
    { label: t("nav.home"), hash: "#inicio" },
    { label: t("nav.about"), hash: "#sobre" },
    { label: t("nav.skills"), hash: "#habilidades" },
    { label: t("nav.projects"), hash: "#projetos" },
    { label: t("nav.education"), hash: "#educacao" },
    { label: t("nav.contact"), hash: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background-50/95 backdrop-blur-md border-b border-background-200/40"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => goToSection("#inicio")}
          className="text-lg md:text-xl font-heading font-bold text-foreground-100 whitespace-nowrap cursor-pointer"
        >
          Paulo<span className="text-primary-500">.</span>Henrique
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.hash}
              onClick={() => goToSection(link.hash)}
              className="px-3 py-2 text-sm font-medium text-foreground-400 hover:text-foreground-100 transition-colors rounded-md whitespace-nowrap cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Language dropdown */}
          <div className="ml-3 relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground-400 hover:text-foreground-100 bg-background-200/50 hover:bg-background-200/80 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-global-line text-sm" />
              <span>{t(currentLang.label)}</span>
              <i className={`ri-arrow-down-s-line text-xs transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full mt-1 right-0 bg-background-50 border border-background-200/40 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      i18n.language === lang.code
                        ? "text-primary-400 bg-primary-500/10"
                        : "text-foreground-400 hover:text-foreground-100 hover:bg-background-200/40"
                    }`}
                  >
                    {t(lang.label)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => goToSection("#contato")}
            className="ml-2 px-4 py-2 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap cursor-pointer"
          >
            {t("nav.hire")}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-foreground-200 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <i className={`ri-${mobileOpen ? "close" : "menu"}-line text-xl`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background-50/95 backdrop-blur-md border-t border-background-200/40 px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.hash}
              onClick={() => goToSection(link.hash)}
              className="block w-full text-left py-3 text-sm font-medium text-foreground-400 hover:text-foreground-100 border-b border-background-200/30 cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile language selector */}
          <div className="mt-3 mb-2">
            <p className="text-xs text-foreground-600 mb-2">
              <i className="ri-global-line mr-1" />
              {t("contact.languageLabel", "Idioma")}
            </p>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setMobileOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    i18n.language === lang.code
                      ? "bg-primary-500 text-foreground-950"
                      : "bg-background-200/50 text-foreground-500 hover:text-foreground-300"
                  }`}
                >
                  {t(lang.label)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => goToSection("#contato")}
            className="block w-full mt-3 px-4 py-2 text-center text-sm font-medium bg-primary-500 text-foreground-950 rounded-md whitespace-nowrap cursor-pointer"
          >
            {t("nav.hire")}
          </button>
        </div>
      )}
    </header>
  );
}