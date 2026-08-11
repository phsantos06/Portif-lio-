import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "@/mocks/projects";

export default function DemoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

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
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 transition-colors rounded-md whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line" />
            {t("project.back")}
          </button>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...project.images];
  const currentImage = allImages[activeImage] || project.image;
  const projectTitle = t(`projects.items.${project.slug}.title`);
  const projectDesc = t(`projects.items.${project.slug}.description`);

  const goNext = () => {
    setActiveImage((prev) => (prev + 1) % allImages.length);
  };

  const goPrev = () => {
    setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-background-50/95 backdrop-blur-md border-b border-background-200/40">
        <div className="container-custom flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-md bg-background-200/50 hover:bg-background-300/50 text-foreground-400 hover:text-foreground-100 transition-colors cursor-pointer"
              aria-label={t("project.back")}
            >
              <i className="ri-arrow-left-line" />
            </button>
            <div>
              <h1 className="text-sm md:text-base font-heading font-semibold text-foreground-100">
                {projectTitle}
              </h1>
              <span className="text-xs text-foreground-500">
                {t("project.liveDemo")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/#projetos"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-background-200/50 hover:bg-background-300/50 text-foreground-400 hover:text-foreground-100 transition-colors rounded-md whitespace-nowrap cursor-pointer"
            >
              <i className="ri-folder-line" />
              <span className="hidden sm:inline">{t("project.backToProjects").replace("← ", "")}</span>
            </Link>
            <Link
              to={`/codigo/${project.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-background-200/50 hover:bg-background-300/50 text-foreground-400 hover:text-foreground-100 transition-colors rounded-md whitespace-nowrap cursor-pointer"
            >
              <i className="ri-code-s-slash-line" />
              <span className="hidden sm:inline">{t("project.sourceCode")}</span>
            </Link>
            <Link
              to={`/projeto/${project.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 transition-colors rounded-md whitespace-nowrap cursor-pointer"
            >
              <i className="ri-information-line" />
              <span className="hidden sm:inline">{t("projects.btnDetails")}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-4 md:p-8">
          <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
            <div className="bg-background-200/30 rounded-t-lg border border-background-200/40 border-b-0 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-3 md:mx-4 bg-background-100/50 rounded-md px-3 py-1 text-xs text-foreground-700 truncate">
                {project.slug}.vercel.app
              </div>
            </div>

            <div className="relative flex-1 bg-background-200/20 border border-background-200/40 border-t-0 rounded-b-lg overflow-hidden min-h-[300px] md:min-h-[400px]">
              <img
                src={currentImage}
                alt={`${projectTitle} - Screenshot ${activeImage + 1}`}
                className="w-full h-full object-contain"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-background-50/80 hover:bg-background-50 text-foreground-400 hover:text-foreground-100 transition-all backdrop-blur-sm cursor-pointer"
                    aria-label="Previous"
                  >
                    <i className="ri-arrow-left-s-line text-lg md:text-xl" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-background-50/80 hover:bg-background-50 text-foreground-400 hover:text-foreground-100 transition-all backdrop-blur-sm cursor-pointer"
                    aria-label="Next"
                  >
                    <i className="ri-arrow-right-s-line text-lg md:text-xl" />
                  </button>
                </>
              )}

              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background-50/80 backdrop-blur-sm text-xs text-foreground-500">
                  {activeImage + 1} / {allImages.length}
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-16 h-10 md:w-20 md:h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === activeImage
                        ? "border-primary-500 opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-background-200/40 bg-background-100/50">
          <div className="container-custom py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs md:text-sm text-foreground-400 leading-relaxed max-w-2xl">
                {projectDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techs.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-medium bg-accent-100/15 text-accent-400 rounded-md border border-accent-300/15 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
              {project.techs.length > 5 && (
                <span className="px-2 py-0.5 text-xs font-medium text-foreground-600 whitespace-nowrap">
                  +{project.techs.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}