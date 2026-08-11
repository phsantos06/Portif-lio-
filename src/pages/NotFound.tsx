import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-foreground-100/5 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground-200">{t("notFound.title")}</h1>
        <p className="mt-2 text-base text-foreground-500 font-mono">{location.pathname}</p>
        <p className="mt-4 text-lg md:text-xl text-foreground-600">{t("notFound.subtitle")}</p>
      </div>
    </div>
  );
}