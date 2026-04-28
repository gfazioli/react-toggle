import { useEffect, useState, type ReactNode } from "react";
import "./CopyButton.css";

interface Props {
  text: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  label?: string;
}

export function CopyButton({ text, children, variant = "secondary", className, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  const iconOnly = children === undefined;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn btn-${variant} copy-btn ${iconOnly ? "copy-btn-icon-only" : ""} ${className ?? ""}`}
      aria-label={iconOnly ? `${label}` : `${label}: ${text}`}
      title={iconOnly ? `${label}` : undefined}
    >
      {children}
      <span className="copy-btn-icon" aria-hidden="true">
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}
