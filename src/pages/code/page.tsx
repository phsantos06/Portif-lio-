import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectCode } from "@/mocks/code";
import type { CodeFile } from "@/mocks/code";

const LANGUAGE_LABELS: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx: "TSX",
  python: "Python",
  csharp: "C#",
  sql: "SQL",
};

const LANGUAGE_COLORS: Record<string, string> = {
  html: "bg-orange-500",
  css: "bg-sky-400",
  javascript: "bg-yellow-400",
  typescript: "bg-blue-400",
  tsx: "bg-cyan-400",
  python: "bg-green-400",
  csharp: "bg-violet-400",
  sql: "bg-rose-400",
};

function highlightCode(code: string, language: string): string {
  const keywords: Record<string, RegExp> = {
    javascript: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|async|await|try|catch|throw|new|this|typeof|instanceof|void|delete|in|of|switch|case|break|continue|do|yield|static|extends|super|get|set)\b/g,
    typescript: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|async|await|try|catch|throw|new|this|typeof|instanceof|void|delete|in|of|switch|case|break|continue|do|interface|type|enum|implements|extends|super|readonly|private|public|protected|static|get|set|as|is|keyof|infer|never|unknown|any|string|number|boolean|null|undefined)\b/g,
    tsx: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|async|await|try|catch|throw|new|this|typeof|instanceof|void|delete|switch|case|break|interface|type|enum|extends|readonly|private|public|protected|static|get|set|as|useState|useEffect|useRef|useCallback|useMemo|useContext)\b/g,
    python: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|raise|with|yield|lambda|pass|break|continue|and|or|not|in|is|None|True|False|self|async|await)\b/g,
    csharp: /\b(using|namespace|class|public|private|protected|internal|static|void|int|string|decimal|bool|double|float|long|var|new|return|if|else|for|foreach|while|do|switch|case|break|continue|try|catch|throw|async|await|get|set|value|where|select|from|in|orderby|List|Task|ActionResult|async|override|virtual|abstract|sealed|readonly|const|this|base|null)\b/g,
    sql: /\b(CREATE|ALTER|DROP|TABLE|INDEX|VIEW|PROCEDURE|SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|BETWEEN|LIKE|ORDER|BY|GROUP|HAVING|AS|SET|VALUES|INTO|DEFAULT|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CHECK|CONSTRAINT|IDENTITY|NVARCHAR|VARCHAR|INT|DECIMAL|BIT|DATETIME2|GETUTCDATE|ISNULL|COUNT|SUM|AVG|MAX|MIN|CASE|WHEN|THEN|ELSE|END|ASC|DESC|NULL|BEGIN|COMMIT|ROLLBACK|EXEC|GO|TOP|OFFSET|FETCH|NEXT|ROWS|ONLY|DISTINCT|EXISTS|UNION|ALL|ANY|SOME|CAST|COALESCE)\b/g,
    html: /\b(DOCTYPE|html|head|meta|title|link|body|header|main|section|div|span|p|h1|h2|h3|h4|h5|h6|a|img|button|form|input|select|option|textarea|label|ul|ol|li|table|tr|td|th|nav|footer|article|aside|script|style|svg|path)\b/gi,
    css: /\b(root|body|html|margin|padding|border|color|background|font|display|flex|grid|position|width|height|top|left|right|bottom|z-index|overflow|opacity|transition|transform|animation|box-shadow|text-align|align-items|justify-content|gap|border-radius|cursor|pointer|hover|focus|active|before|after|media|keyframes|import|var|linear-gradient|rgba|cubic-bezier)\b/g,
  };

  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (["javascript", "typescript", "tsx", "csharp"].includes(language)) {
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
  }
  if (["python"].includes(language)) {
    escaped = escaped.replace(/(#.*$)/gm, '<span class="code-comment">$1</span>');
    escaped = escaped.replace(/("""[\s\S]*?""")/g, '<span class="code-comment">$1</span>');
  }
  if (["sql"].includes(language)) {
    escaped = escaped.replace(/(--.*$)/gm, '<span class="code-comment">$1</span>');
  }
  if (["css"].includes(language)) {
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
  }

  escaped = escaped.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>');
  escaped = escaped.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>');
  escaped = escaped.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="code-string">$1</span>');

  const kwRegex = keywords[language];
  if (kwRegex) {
    escaped = escaped.replace(kwRegex, (match) => `<span class="code-keyword">${match}</span>`);
  }

  escaped = escaped.replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="code-number">$1</span>');

  if (!["html", "css", "sql"].includes(language)) {
    escaped = escaped.replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="code-function">$1</span>(');
  }

  return escaped;
}

export default function CodePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  const projectCode = slug ? getProjectCode(slug) : undefined;
  const projectTitle = slug ? t(`projects.items.${slug}.title`) : "";

  if (!projectCode) {
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

  const currentFile: CodeFile = projectCode.files[activeFile] || projectCode.files[0];
  const lines = currentFile.content.split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const fileCount = projectCode.files.length;
  const filesLabel = fileCount === 1 ? t("code.files") : t("code.filesPlural");

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-background-50/95 backdrop-blur-md border-b border-background-200/40">
        <div className="flex items-center justify-between h-12 md:h-14 px-4 md:px-6">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-background-200/50 hover:bg-background-300/50 text-foreground-400 hover:text-foreground-100 transition-colors flex-shrink-0 cursor-pointer"
              aria-label={t("project.back")}
            >
              <i className="ri-arrow-left-line" />
            </button>

            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-primary-500/10 flex-shrink-0">
                <i className="ri-code-s-slash-line text-primary-400 text-sm" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm md:text-base font-heading font-semibold text-foreground-100 truncate">
                  {projectTitle}
                </h1>
                <span className="text-[11px] md:text-xs text-foreground-500">
                  {t("code.title")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to={`/projeto/${projectCode.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground-500 hover:text-foreground-100 hover:bg-background-200/40 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-information-line" />
              <span className="hidden sm:inline">{t("projects.btnDetails")}</span>
            </Link>
            <Link
              to={`/demo/${projectCode.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-play-circle-line" />
              <span className="hidden sm:inline">{t("project.liveDemo")}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-background-100 border-b border-background-200/30">
        <div className="flex items-center px-4 md:px-6 overflow-x-auto">
          {projectCode.files.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(idx)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer ${
                idx === activeFile
                  ? "border-primary-500 text-foreground-100"
                  : "border-transparent text-foreground-500 hover:text-foreground-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${LANGUAGE_COLORS[file.language] || "bg-foreground-400"}`}
              />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-1.5 bg-background-200/20 border-b border-background-200/20">
        <div className="flex items-center gap-2 text-xs text-foreground-500">
          <span className="px-1.5 py-0.5 rounded bg-background-200/50">
            {LANGUAGE_LABELS[currentFile.language] || currentFile.language}
          </span>
          <span>{lines.length} {t("code.lines")}</span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-foreground-500 hover:text-foreground-100 hover:bg-background-200/40 rounded transition-colors cursor-pointer"
        >
          <i className={copied ? "ri-check-line text-green-400" : "ri-file-copy-line"} />
          <span className="hidden sm:inline">{copied ? t("code.copied") : t("code.copy")}</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-background-50">
        <div className="flex min-w-max">
          <div className="select-none pt-3 pb-8 pl-4 md:pl-6 pr-3 md:pr-4 text-right bg-background-100/30 border-r border-background-200/20">
            {lines.map((_, idx) => (
              <div
                key={idx}
                className="text-xs leading-6 text-foreground-700 font-mono"
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <div className="pt-3 pb-8 pl-3 md:pl-5 pr-4 md:pr-6 flex-1 min-w-0">
            <pre className="text-xs md:text-sm leading-6 font-mono text-foreground-300 m-0">
              <code>
                {lines.map((line, idx) => (
                  <div key={idx} className="min-h-[1.5rem]">
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          highlightCode(line, currentFile.language) || "&nbsp;",
                      }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="border-t border-background-200/40 bg-background-100/50">
        <div className="flex items-center justify-between px-4 md:px-6 py-2 md:py-2.5">
          <div className="flex items-center gap-3 md:gap-4 text-xs text-foreground-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              UTF-8
            </span>
            <span className="hidden sm:inline">LF</span>
            <span className="hidden sm:inline">
              {LANGUAGE_LABELS[currentFile.language] || currentFile.language}
            </span>
          </div>
          <span className="text-xs text-foreground-600">
            {fileCount} {filesLabel}
          </span>
        </div>
      </div>
    </div>
  );
}