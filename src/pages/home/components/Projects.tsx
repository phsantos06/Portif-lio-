import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { projects } from "@/mocks/projects";

const techIcons: Record<string, string> = {
  "HTML5": "ri-html5-line",
  "CSS3": "ri-css3-line",
  "JavaScript": "ri-javascript-line",
  "TypeScript": "ri-code-s-slash-line",
  "React": "ri-reactjs-line",
  "Tailwind CSS": "ri-windy-line",
  "Python": "ri-code-s-line",
  "Flask": "ri-flask-line",
  "SQL": "ri-database-2-line",
  "SQL Server": "ri-database-2-line",
  "C#": "ri-code-box-line",
  ".NET": "ri-microsoft-line",
  "Node.js": "ri-server-line",
  "JWT": "ri-key-2-line",
  "Pydantic": "ri-shield-check-line",
  "Chart.js": "ri-bar-chart-line",
  "i18next": "ri-global-line",
  "Vite": "ri-rocket-line",
  "Local Storage": "ri-hard-drive-3-line",
};

export default function Projects() {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterCategories = [
    { key: "all", label: t("projects.categories.all") },
    { key: "web", label: t("projects.categories.web") },
    { key: "backend", label: t("projects.categories.backend") },
    { key: "fullstack", label: t("projects.categories.fullstack") },
  ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projetos" className="py-20 md:py-28 bg-background-100">
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-sm font-medium text-primary-500 tracking-wider uppercase">
            {t("projects.label")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mt-2">
            {t("projects.title")}
          </h2>
          <p className="text-foreground-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeFilter === cat.key
                  ? "bg-primary-500 text-foreground-950"
                  : "bg-background-200/50 text-foreground-500 hover:text-foreground-300 border border-background-200/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((project) => {
            const projectTitle = t(`projects.items.${project.slug}.title`);
            const projectDesc = t(`projects.items.${project.slug}.description`);
            const categoryLabel = t(`projects.categories.${project.category}`, project.category);

            return (
              <div
                key={project.id}
                className="group relative bg-background-200/30 rounded-lg overflow-hidden border border-background-200/20 transition-all duration-400 hover:border-primary-500/20 hover:bg-background-200/50 hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={projectTitle}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-50/95 via-background-50/30 to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium bg-background-50/80 backdrop-blur-sm text-foreground-400 rounded-full uppercase tracking-wider">
                    {categoryLabel}
                  </span>

                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
                      hoveredId === project.id
                        ? "opacity-100 bg-background-50/70 backdrop-blur-[2px]"
                        : "opacity-0"
                    }`}
                  >
                    {project.demoLink && (
                      <Link
                        to={project.demoLink}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 text-xs font-semibold bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap flex items-center gap-1.5"
                      >
                        <i className="ri-play-circle-line" />
                        {t("projects.btnDemo")}
                      </Link>
                    )}
                    <Link
                      to={`/codigo/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 text-xs font-semibold bg-background-300/80 text-foreground-100 hover:bg-background-400/80 transition-colors rounded-md whitespace-nowrap flex items-center gap-1.5"
                    >
                      <i className="ri-code-s-slash-line" />
                      {t("projects.btnCode")}
                    </Link>
                  </div>
                </div>

                <Link to={`/projeto/${project.slug}`} className="block p-5">
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground-100 mb-2 group-hover:text-primary-400 transition-colors line-clamp-1">
                    {projectTitle}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4 line-clamp-2">
                    {projectDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techs.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium bg-accent-100/10 text-accent-400 rounded-md whitespace-nowrap flex items-center gap-1"
                      >
                        {techIcons[tech] && (
                          <i className={`${techIcons[tech]} text-[10px]`} />
                        )}
                        {tech}
                      </span>
                    ))}
                    {project.techs.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-medium text-foreground-700 whitespace-nowrap">
                        +{project.techs.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-400 group-hover:gap-2 transition-all">
                    {t("projects.btnDetails")}
                    <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}