import { useTranslation } from "react-i18next";
import { education, courseCount, continuousLearning } from "@/mocks/education";

export default function Education() {
  const { t } = useTranslation();

  const courses = Array.from({ length: courseCount }, (_, i) =>
    t(`education.courses.${i}`)
  );

  return (
    <section id="educacao" className="py-20 md:py-28 bg-background-50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-medium text-primary-500 tracking-wider uppercase">
            {t("education.label")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mt-2">
            {t("education.title")}
          </h2>
          <p className="text-foreground-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            {t("education.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground-200 mb-6 pl-1">
              {t("education.academicTitle")}
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-background-300" />

              <div className="space-y-8">
                {education.map((item) => {
                  const degree = t(`education.items.${item.id - 1}.degree`);
                  const institution = t(`education.items.${item.id - 1}.institution`);
                  const description = t(`education.items.${item.id - 1}.description`);
                  const period = t(`education.items.${item.id - 1}.period`);
                  const statusKey = item.status === "Completo" ? "completed" : "ongoing";

                  return (
                    <div key={item.id} className="relative pl-12">
                      <div
                        className={`absolute left-2 top-1.5 w-5 h-5 rounded-full border-2 ${
                          item.status === "Completo"
                            ? "bg-primary-500 border-primary-500"
                            : "bg-background-50 border-accent-500"
                        }`}
                      />

                      <div className="bg-background-200/40 rounded-lg p-5 border border-background-200/30">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-md ${
                              item.status === "Completo"
                                ? "bg-primary-100/20 text-primary-400"
                                : "bg-accent-100/20 text-accent-400"
                            }`}
                          >
                            {t(`education.status.${statusKey}`)}
                          </span>
                          <span className="text-xs text-foreground-600">{period}</span>
                        </div>
                        <h4 className="text-base font-heading font-semibold text-foreground-100 mb-1">
                          {degree}
                        </h4>
                        <p className="text-sm text-primary-400 mb-2">{institution}</p>
                        <p className="text-sm text-foreground-600 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground-200 mb-6 pl-1">
              {t("education.coursesTitle")}
            </h3>
            <div className="bg-background-200/40 rounded-lg p-5 md:p-6 border border-background-200/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-3 p-3 bg-background-100/60 rounded-md"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/10 flex-shrink-0">
                      <i className="ri-check-line text-sm text-primary-400" />
                    </div>
                    <span className="text-sm text-foreground-400">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-background-200/40 rounded-lg p-5 md:p-6 border border-background-200/30">
              <h4 className="text-base font-heading font-semibold text-foreground-200 mb-4">
                {t("education.continuousTitle")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {continuousLearning.map((item) => {
                  const name = t(`education.continuous.${item.nameKey}`);
                  const statusLabel = t(`education.status.${item.statusKey}`);

                  return (
                    <div key={item.nameKey}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground-500">{name}</span>
                        <span className="text-xs text-accent-400 font-medium">
                          {statusLabel}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-background-300/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent-400 transition-all duration-700"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}