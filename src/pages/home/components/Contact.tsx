import { useState } from "react";
import { useTranslation } from "react-i18next";
import { personalInfo } from "@/mocks/personal";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = ((formData.get("website_alt") as string) || "").trim();
    if (honeypot) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch("https://readdy.ai/api/form/d9tgqc53pcjqs2fcse30", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      });

      const responseText = await response.text();
      let parsed: Record<string, unknown> | null = null;
      try {
        parsed = JSON.parse(responseText) as Record<string, unknown>;
      } catch {
        // not JSON
      }

      const code = parsed && typeof parsed.code === "string" ? parsed.code : "";
      const meta =
        parsed && typeof parsed.meta === "object" && parsed.meta !== null
          ? (parsed.meta as Record<string, string>)
          : {};
      const serverMsg = meta.message || meta.detail || "";

      if (response.ok && code === "OK") {
        setStatus("success");
        form.reset();
      } else {
        const rawHasSpam =
          responseText.toLowerCase().includes("spam") ||
          responseText.toLowerCase().includes("form data is spam");
        if (rawHasSpam) {
          setErrorMsg(t("contact.error"));
        } else {
          setErrorMsg(serverMsg || t("contact.error"));
        }
        setStatus("error");
      }
    } catch {
      setErrorMsg(t("contact.connectionError"));
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-background-100">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-medium text-primary-500 tracking-wider uppercase">
            {t("contact.label")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-100 mt-2">
            {t("contact.title")}
          </h2>
          <p className="text-foreground-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground-200 mb-6">
              {t("contact.infoTitle")}
            </h3>

            <div className="space-y-5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-background-200/40 rounded-lg border border-background-200/30 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/10 flex-shrink-0">
                  <i className="ri-mail-line text-xl text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-foreground-600 uppercase tracking-wider">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="text-sm text-foreground-200 mt-0.5">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-background-200/40 rounded-lg border border-background-200/30 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/10 flex-shrink-0">
                  <i className="ri-whatsapp-line text-xl text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-foreground-600 uppercase tracking-wider">
                    {t("contact.whatsappLabel")}
                  </p>
                  <p className="text-sm text-foreground-200 mt-0.5">+55 73 99174-4642</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-background-200/40 rounded-lg border border-background-200/30">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-500/10 flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-foreground-600 uppercase tracking-wider">
                    {t("contact.locationLabel")}
                  </p>
                  <p className="text-sm text-foreground-200 mt-0.5">{t("personal.location")}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground-200 mb-6">
              {t("contact.formTitle")}
            </h3>

            <form
              data-readdy-form="d9tgqc53pcjqs2fcse30"
              onSubmit={handleSubmit}
              className="bg-background-200/40 rounded-lg p-5 md:p-6 border border-background-200/30"
            >
              <input
                type="text"
                name="website_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
                className="hp-field"
              />

              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-foreground-400 mb-1.5">
                    {t("contact.nameLabel")}
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full px-3 py-2.5 text-sm bg-background-100/80 border border-background-300/50 rounded-md text-foreground-200 placeholder-foreground-700 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground-400 mb-1.5">
                    {t("contact.emailInputLabel")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full px-3 py-2.5 text-sm bg-background-100/80 border border-background-300/50 rounded-md text-foreground-200 placeholder-foreground-700 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-foreground-400 mb-1.5">
                    {t("contact.subjectLabel")}
                  </label>
                  <input
                    id="assunto"
                    name="assunto"
                    type="text"
                    required
                    placeholder={t("contact.subjectPlaceholder")}
                    className="w-full px-3 py-2.5 text-sm bg-background-100/80 border border-background-300/50 rounded-md text-foreground-200 placeholder-foreground-700 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-foreground-400 mb-1.5">
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    maxLength={500}
                    rows={5}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full px-3 py-2.5 text-sm bg-background-100/80 border border-background-300/50 rounded-md text-foreground-200 placeholder-foreground-700 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-colors resize-none"
                  />
                  <p className="text-xs text-foreground-700 mt-1">{t("contact.maxChars")}</p>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-6 py-3 text-sm font-medium bg-primary-500 text-foreground-950 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-md whitespace-nowrap"
                >
                  {status === "submitting" ? t("contact.submitting") : t("contact.submit")}
                </button>
              </div>

              {status === "success" && (
                <div className="mt-4 p-3 bg-primary-100/20 border border-primary-300/30 rounded-md">
                  <p className="text-sm text-primary-400 text-center">
                    <i className="ri-check-line mr-1" />
                    {t("contact.success")}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 p-3 bg-accent-100/20 border border-accent-300/30 rounded-md">
                  <p className="text-sm text-accent-400 text-center">
                    <i className="ri-error-warning-line mr-1" />
                    {errorMsg}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}