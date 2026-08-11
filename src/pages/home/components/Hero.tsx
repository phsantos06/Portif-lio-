import { useTranslation } from "react-i18next";
import { personalInfo } from "@/mocks/personal";
import AnimatedOrbs from "./AnimatedOrbs";

export default function Hero() {
  const { t } = useTranslation();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={personalInfo.heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-50/80 via-background-50/60 to-background-50/90" />
      </div>

      <AnimatedOrbs />

      <div className="relative z-10 container-custom flex flex-col items-center text-center py-24 md:py-32">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-500 mb-6 md:mb-8 ring-4 ring-primary-500/20">
          <img
            src={personalInfo.avatar}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground-100 mb-3 md:mb-4">
          {personalInfo.name}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl font-body text-primary-400 mb-4 md:mb-6">
          {t("hero.title")}
        </p>

        <p className="max-w-2xl text-sm md:text-base text-foreground-500 leading-relaxed mb-8 md:mb-10">
          {t("personal.bio")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#projetos"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("#projetos");
            }}
            className="px-6 py-3 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap"
          >
            {t("hero.btnProjects")}
          </a>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("#contato");
            }}
            className="px-6 py-3 text-sm font-medium bg-background-200 text-foreground-100 hover:bg-background-300 transition-colors rounded-md whitespace-nowrap"
          >
            {t("hero.btnContact")}
          </a>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-200/60 text-foreground-400 hover:bg-primary-500 hover:text-foreground-950 transition-all"
            aria-label="WhatsApp"
          >
            <i className="ri-whatsapp-line text-lg" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-200/60 text-foreground-400 hover:bg-primary-500 hover:text-foreground-950 transition-all"
            aria-label="E-mail"
          >
            <i className="ri-mail-line text-lg" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-600">
        <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
        <div className="w-5 h-8 rounded-full border-2 border-foreground-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-foreground-600 animate-bounce" />
        </div>
      </div>
    </section>
  );
}