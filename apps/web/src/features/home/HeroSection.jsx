import "./hero.css";

function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function splitHeadline(headline = "") {
  const parts = headline.trim().split(" ").filter(Boolean);
  if (parts.length <= 1) return { first: headline, last: "" };
  const last = parts.pop();
  return { first: parts.join(" "), last };
}

export default function HeroSection({ heroEntry, siteSettings }) {
  if (!heroEntry) return null;

  const hero = heroEntry.fields;
  const settings = siteSettings?.fields ?? {};

  const { first, last } = splitHeadline(hero.headline || "");
  const heroVisualUrl = assetUrl(hero.heroVisual);

  return (
    <section className="hero section">
      {/* ✅ Full background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--left" />
        <div className="hero__glow hero__glow--right" />
        <div className="hero__vignette" />
      </div>

      {/* ✅ Content aligned with Figma spacing */}
      <div className="section-inner hero__container">
        <div className="hero__grid">
          {/* LEFT */}
          <div className="hero__left">
            {settings.availabilityLabel && (
              <div className="hero__pill">
                <span className="hero__dot" />
                <span className="hero__pillText">
                  {settings.availabilityLabel}
                </span>
              </div>
            )}

            <h1 className="hero__title">
              <span className="hero__titleFirst">{first}</span>
              {last ? (
                <>
                  <br />
                  <span className="hero__titleGradient">{last}</span>
                </>
              ) : null}
            </h1>

            {hero.subHeadline && <div className="hero__role">{hero.subHeadline}</div>}

            {hero.description && <p className="hero__desc">{hero.description}</p>}

            <div className="hero__ctaRow">
              {hero.primaryButtonText && hero.primaryButtonUrl && (
                <a className="btn btn--primary" href={hero.primaryButtonUrl}>
                  {hero.primaryButtonText}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}

              {hero.secondaryButtonText && hero.secondaryButtonUrl && (
                <a className="btn btn--ghost" href={hero.secondaryButtonUrl}>
                  {hero.secondaryButtonText}
                </a>
              )}
            </div>

            {Array.isArray(hero.stats) && hero.stats.length > 0 && (
              <div className="hero__stats">
                {hero.stats.map((stat) => {
                  const s = stat.fields;
                  return (
                    <div className="hero__stat" key={stat.sys.id}>
                      <div className="hero__statValue">
                        {s.value}
                        {s.suffix ?? ""}
                      </div>
                      <div className="hero__statLabel">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hero__right">
            <div className="hero__visualCard">
              <div className="hero__chip hero__chip--topRight">
                <div className="hero__chipTitle">Status</div>
                <div className="hero__chipValue hero__chipValue--status">
                  Open to Work
                </div>
              </div>

              <div className="hero__chip hero__chip--bottomLeft">
                <div className="hero__chipTitle">Stack</div>
                <div className="hero__chipValue">Laravel + React</div>
              </div>

              {heroVisualUrl ? (
                <img className="hero__visualImg" src={heroVisualUrl} alt="Hero visual" />
              ) : (
                <div className="hero__visualPlaceholder">
                  <div className="hero__sphere" />
                  <div className="hero__ring" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}