import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./about.css";

function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function splitHeadline(headline = "") {
  const words = String(headline).trim().split(" ").filter(Boolean);
  if (words.length <= 1) return { first: headline, accent: "" };

  // Figma highlights "experiences" specifically in your copy.
  // We'll try to accent that word if present, else accent the 2nd word.
  const idx = words.findIndex((w) => w.toLowerCase().includes("experiences"));
  if (idx !== -1) {
    const first = words.slice(0, idx).join(" ");
    const accent = words[idx];
    const rest = words.slice(idx + 1).join(" ");
    return { first, accent, rest };
  }

  const accent = words[1];
  const first = words[0];
  const rest = words.slice(2).join(" ");
  return { first, accent, rest };
}

export default function AboutHero({ heroEntry }) {
  if (!heroEntry) return null;

  const hero = heroEntry.fields;
  const photoUrl = assetUrl(hero.photo);

  const { first, accent, rest } = splitHeadline(hero.headline || "");

  return (
    <section className="aboutHero section">
      {/* full bleed bg (same vibe as homepage) */}
      <div className="aboutHero__bg" aria-hidden="true">
        <div className="aboutHero__glow aboutHero__glow--left" />
        <div className="aboutHero__glow aboutHero__glow--right" />
        <div className="aboutHero__vignette" />
      </div>

      <div className="section-inner aboutHero__inner">
        <div className="aboutHero__grid">
          {/* LEFT IMAGE */}
          <div className="aboutHero__media">
            <div className="aboutHero__photoCard">
              {photoUrl ? (
                <img className="aboutHero__photo" src={photoUrl} alt="About visual" />
              ) : (
                <div className="aboutHero__photoPlaceholder" />
              )}

              {(hero.badgeValue || hero.badgeLabel) && (
                <div className="aboutHero__badge">
                  <div className="aboutHero__badgeValue">{hero.badgeValue}</div>
                  <div className="aboutHero__badgeLabel">{hero.badgeLabel}</div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="aboutHero__content">
            <div className="aboutHero__eyebrow">
              <span className="aboutHero__dash" />
              <span>{hero.eyebrow || "ABOUT ME"}</span>
            </div>

            <h1 className="aboutHero__title">
              <span>{first} </span>
              {accent ? <span className="aboutHero__titleAccent">{accent} </span> : null}
              {rest ? <span>{rest}</span> : null}
            </h1>

            {hero.bio ? (
              <div className="aboutHero__bio">
                {documentToReactComponents(hero.bio)}
              </div>
            ) : null}

            <div className="aboutHero__ctaRow">
              {hero.primaryButtonText && hero.primaryButtonUrl && (
                <a className="btn btn--primary" href={hero.primaryButtonUrl}>
                  {hero.primaryButtonText}
                </a>
              )}
              {hero.secondaryButtonText && hero.secondaryButtonUrl && (
                <a className="btn btn--ghost" href={hero.secondaryButtonUrl}>
                  {hero.secondaryButtonText}
                </a>
              )}
            </div>

            {/* Value cards */}
            {Array.isArray(hero.valueCards) && hero.valueCards.length > 0 && (
              <div className="aboutHero__values">
                {hero.valueCards
                  .slice()
                  .sort((a, b) => (a.fields?.order ?? 0) - (b.fields?.order ?? 0))
                  .map((card) => (
                    <div className="aboutHero__valueCard" key={card.sys.id}>
                      <div className="aboutHero__valueTitle">{card.fields?.title}</div>
                      <div className="aboutHero__valueDesc">{card.fields?.description}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}