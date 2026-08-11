import { useTranslation } from "react-i18next";
import { skills } from "@/mocks/skills";

function SkillBar({ name, level, icon }: { name: string; level: number; icon: string }) {
  return (
    <div className="bg-background-200/50 rounded-lg p-4 md:p-5 transition-all hover:bg-background-200/80 border border-background-200/30 hover:border-primary-500/20">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-primary-500/10 text-primary-400">
          <i className={`${icon} text-lg`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground-200">{name}</p>
        </div>
        <span className="text-sm font-semibold text-primary-400">{level}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-background-300/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const categories = ["Frontend", "Backend", "Tools"];

  return (
    <section id="habilidades" className="py-20 md:py-28 bg-background-50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-medium text-primary-500 tracking-wider uppercase">
            {t("skills.label")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mt-2">
            {t("skills.title")}
          </h2>
          <p className="text-foreground-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            {t("skills.subtitle")}
          </p>
        </div>

        {categories.map((category) => {
          const catSkills = skills.filter((s) => s.category === category);
          return (
            <div key={category} className="mb-10 last:mb-0">
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground-300 mb-5 pl-1">
                {t(`skills.categories.${category}`)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}