import { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "./CodeBlock.css";

export type CodeLang = "tsx" | "jsx" | "ts" | "js" | "css" | "bash" | "text";

interface CodeBlockProps {
  code: string;
  lang?: CodeLang;
  className?: string;
}

const ALIASES: Record<CodeLang, string> = {
  tsx: "tsx",
  jsx: "jsx",
  ts: "typescript",
  js: "javascript",
  css: "css",
  bash: "bash",
  text: "text",
};

export function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
  const html = useMemo(() => {
    const grammarName = ALIASES[lang];
    const grammar = Prism.languages[grammarName];
    if (!grammar || lang === "text") {
      return escapeHtml(code);
    }
    return Prism.highlight(code, grammar, grammarName);
  }, [code, lang]);

  return (
    <pre className={`code-block ${className ?? ""}`.trim()} data-lang={lang}>
      <code
        className={`language-${ALIASES[lang]}`}
        // eslint-disable-next-line react/no-danger -- output produced by Prism is HTML-escaped
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
