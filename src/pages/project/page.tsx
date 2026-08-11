import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/mocks/projects";
import Navbar from "@/pages/home/components/Navbar";
import Footer from "@/pages/home/components/Footer";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-background-200/60">
            <i className="ri-error-warning-line text-3xl text-foreground-500" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground-100 mb-3">
            {t("project.notFound")}
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" />
            {t("project.back")}
          </Link>
        </div>
      </div>
    );
  }

  const projectTitle = t(`projects.items.${project.slug}.title`);
  const projectLongDesc = t(`projects.items.${project.slug}.longDescription`);
  const projectFeatures = Array.from({ length: 8 }, (_, i) => {
    const key = `projects.items.${project.slug}.features.${i}`;
    const result = t(key);
    return result === key ? null : result;
  }).filter(Boolean) as string[];
  const categoryLabel = t(`projects.categories.${project.category}`, project.category);

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />

      <section className="relative pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container-custom">
          <Link
            to="/#projetos"
            className="inline-flex items-center gap-2 text-sm text-foreground-500 hover:text-primary-400 transition-colors mb-6 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" />
            {t("project.backToProjects")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-background-200/30">
              <img
                src={project.image}
                alt={projectTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-50/30 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-2">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mb-4">
                {projectTitle}
              </h1>
              <p className="text-sm md:text-base text-foreground-500 leading-relaxed mb-6">
                {projectLongDesc}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.demoLink && (
                  <Link
                    to={project.demoLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap"
                  >
                    <i className="ri-play-circle-line" />
                    {t("project.liveDemo")}
                  </Link>
                )}
                <Link
                  to={`/codigo/${project.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-background-200/60 text-foreground-100 hover:bg-background-300/60 transition-colors rounded-md whitespace-nowrap"
                >
                  <i className="ri-code-s-slash-line" />
                  {t("project.sourceCode")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background-100">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-100 mb-8">
            {t("project.features")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-background-200/40 rounded-lg border border-background-200/30"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/10 flex-shrink-0 mt-0.5">
                  <i className="ri-check-line text-primary-400" />
                </div>
                <span className="text-sm text-foreground-400 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background-50">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-100 mb-8">
            {t("project.techStack")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium bg-accent-100/20 text-accent-400 rounded-lg border border-accent-300/20 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background-100">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-100 mb-8">
            {t("project.gallery")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[16/10] rounded-lg overflow-hidden border border-background-200/30 group"
              >
                <img
                  src={img}
                  alt={`${projectTitle} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-50/40 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background-50">
        <div className="container-custom text-center">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-100 mb-4">
            {t("project.interested")}
          </h2>
          <p className="text-sm md:text-base text-foreground-500 max-w-xl mx-auto mb-6">
            {t("project.interestedDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {project.demoLink && (
              <Link
                to={project.demoLink}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap"
              >
                <i className="ri-play-circle-line" />
                {t("project.liveDemo")}
              </Link>
            )}
            <Link
              to={`/codigo/${project.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-background-200/60 text-foreground-100 hover:bg-background-300/60 transition-colors rounded-md whitespace-nowrap"
            >
              <i className="ri-code-s-slash-line" />
              {t("project.sourceCode")}
            </Link>
            <button
              onClick={() => navigate("/", { state: { scrollTo: "#contato" } })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-background-300/50 text-foreground-400 hover:text-foreground-100 hover:border-primary-500/30 transition-colors rounded-md whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-send-line" />
              {t("project.hireMe")}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}