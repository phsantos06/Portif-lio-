import { useTranslation } from "react-i18next";
import { personalInfo } from "@/mocks/personal";
import { personalSkillsCount, languages } from "@/mocks/skills";

export default function About() {
  const { t } = useTranslation();

  const personalSkills = Array.from({ length: personalSkillsCount }, (_, i) =>
    t(`personal.personalSkills.${i}`)
  );

  return (
    <section id="sobre" className="py-20 md:py-28 bg-background-100">
      <div className="container-custom">
        <div className="mb-10 md:mb-14">
          <span className="text-sm font-medium text-primary-500 tracking-wider uppercase">
            {t("about.label")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mt-2">
            {t("about.title")}
            <br />
            <span className="text-primary-400">{t("about.subtitle")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
          <div className="bg-background-200/60 rounded-lg p-4 md:p-5 text-center border border-background-200/30">
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary-400">3+</p>
            <p className="text-xs md:text-sm text-foreground-600 mt-1">{t("about.stats.years")}</p>
          </div>
          <div className="bg-background-200/60 rounded-lg p-4 md:p-5 text-center border border-background-200/30">
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary-400">6+</p>
            <p className="text-xs md:text-sm text-foreground-600 mt-1">{t("about.stats.projects")}</p>
          </div>
          <div className="bg-background-200/60 rounded-lg p-4 md:p-5 text-center border border-background-200/30">
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary-400">15+</p>
            <p className="text-xs md:text-sm text-foreground-600 mt-1">{t("about.stats.techs")}</p>
          </div>
          <div className="bg-background-200/60 rounded-lg p-4 md:p-5 text-center border border-background-200/30">
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary-400">2</p>
            <p className="text-xs md:text-sm text-foreground-600 mt-1">{t("about.stats.languages")}</p>
          </div>
        </div>

        <div className="max-w-4xl">
          <p className="text-foreground-500 leading-relaxed mb-6 text-sm md:text-base">
            {t("personal.bio")} {t("about.bioExtra")}
          </p>

          <p className="text-foreground-500 leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
            {t("personal.objective")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h3 className="text-base font-heading font-semibold text-foreground-200 mb-4">
                {t("about.softSkillsTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-secondary-100/40 text-secondary-700 rounded-md whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-heading font-semibold text-foreground-200 mb-4">
                {t("about.languagesTitle")}
              </h3>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang) => (
                  <div key={lang.nameKey} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-sm text-foreground-400">
                      {t(`personal.languages.${lang.nameKey}`)} —{" "}
                      <span className="text-foreground-300">
                        {t(`personal.languageLevels.${lang.levelKey}`)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}