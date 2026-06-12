import { DONATE_URL, SPONSORS, SPONSOR_URL } from "../data/sponsors";
import "./Sponsors.css";

export function Sponsors() {
  return (
    <section className="section sponsors" id="sponsors">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Support the project</span>
          <h2>
            <span className="sponsors-title">SPONSORS</span>
          </h2>
          <p>
            If my open-source work saves you or your team time, consider sponsoring its development. Sponsors get their
            name or logo featured here and across all my projects' documentation sites.
          </p>
        </div>

        <div className="sponsors-wall">
          {SPONSORS.map(s => (
            <a
              key={s.key}
              className="sponsor-card"
              href={s.href ?? `https://github.com/${s.github}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="sponsor-avatar"
                src={`https://github.com/${s.github}.png`}
                alt={s.name}
                width={72}
                height={72}
                loading="lazy"
              />
              <span className="sponsor-name">{s.name}</span>
            </a>
          ))}

          <a className="sponsor-card sponsor-slot" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <span className="sponsor-slot-mark" aria-hidden="true">
              +
            </span>
            <span className="sponsor-name">Your logo here</span>
          </a>
        </div>

        <div className="sponsors-cta">
          <a className="btn sponsors-btn" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <span aria-hidden="true">❤</span> Become a sponsor
          </a>
          <a className="btn coffee-btn" href={DONATE_URL} target="_blank" rel="noreferrer noopener">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
              <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5" />
              <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
            </svg>
            Buy me a coffee
          </a>
        </div>
      </div>
    </section>
  );
}
