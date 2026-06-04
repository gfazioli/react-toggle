import { SPONSORS, SPONSOR_URL } from "../data/sponsors";
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
        </div>
      </div>
    </section>
  );
}
