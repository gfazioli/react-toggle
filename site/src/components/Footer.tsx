import { Logo } from "./Logo";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={20} />
          <span>react-toggle-component</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="https://www.npmjs.com/package/react-toggle-component" target="_blank" rel="noreferrer noopener">
            npm
          </a>
          <a href="https://github.com/gfazioli/react-toggle" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="#upgrade">v3 → v4 guide</a>
          <a href="https://github.com/sponsors/gfazioli" target="_blank" rel="noreferrer noopener">
            Sponsor
          </a>
          <a
            href="https://github.com/gfazioli/react-toggle/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer noopener"
          >
            MIT License
          </a>
        </nav>
        <p className="footer-credit">
          Built with care by{" "}
          <a href="https://gfazioli.github.io" target="_blank" rel="noreferrer noopener">
            @undolog
          </a>
        </p>
      </div>
    </footer>
  );
}
