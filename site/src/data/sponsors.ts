export interface Sponsor {
  /** Stable React key. */
  key: string;
  /** Display name shown under the avatar. */
  name: string;
  /** GitHub username — used for the avatar (`https://github.com/<github>.png`). */
  github: string;
  /** Optional override for the profile link (defaults to `https://github.com/<github>`). */
  href?: string;
}

export const SPONSORS: Sponsor[] = [{ key: "kastov", name: "kastov", github: "kastov" }];

export const SPONSOR_URL = "https://github.com/sponsors/gfazioli";
