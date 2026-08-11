import { useTranslation } from "react-i18next";
import { personalInfo } from "@/mocks/personal";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 md:py-12 bg-background-100 border-t border-background-200/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-heading font-bold text-foreground-100">
              Paulo<span className="text-primary-500">.</span>Henrique
            </p>
            <p className="text-sm text-foreground-600 mt-1">{t("footer.role")}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-background-200/60 text-foreground-400 hover:bg-primary-500 hover:text-foreground-950 transition-all"
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line text-base" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-background-200/60 text-foreground-400 hover:bg-primary-500 hover:text-foreground-950 transition-all"
              aria-label="E-mail"
            >
              <i className="ri-mail-line text-base" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-background-200/30 text-center">
          <p className="text-xs text-foreground-700">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}