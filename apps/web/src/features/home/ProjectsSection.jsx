import "./projects.css";

function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function splitLastWord(text = "") {
  const parts = String(text).trim().split(" ").filter(Boolean);
  if (parts.length <= 1) return { first: text, last: "" };
  const last = parts.pop();
  return { first: parts.join(" "), last };
}

function normalizeTechList(fields) {
  // Try multiple common Contentful field names safely
  const candidates = [
    fields?.techStack,
    fields?.stack,
    fields?.tags,
    fields?.technologies,
  ];

  const list = candidates.find((x) => Array.isArray(x) && x.length);
  if (!list) return [];

  // Allow list items to be strings or objects { fields: { title/name } }
  return list
    .map((t) => {
      if (!t) return null;
      if (typeof t === "string") return t;
      return t?.fields?.title || t?.fields?.name || null;
    })
    .filter(Boolean)
    .slice(0, 6);
}

function ExternalIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
}

export default function ProjectsSection({
  title = "Featured Projects",
  data = [],
  eyebrow = "WORK",
  onViewAllHref = "#projects", // change later to /projects when you create that page
}) {
  const { first, last } = splitLastWord(title);
  const items = Array.isArray(data) ? data : [];

  return (
    <div className="projects" id="projects">
      <header className="projects__header">
        <div className="projects__headerLeft">
          <div className="projects__eyebrow">
            <span className="projects__eyebrowLine" />
            <span className="projects__eyebrowText">{eyebrow}</span>
          </div>

          <h2 className="projects__title">
            <span className="projects__titleFirst">{first}</span>{" "}
            {last ? <span className="projects__titleAccent">{last}</span> : null}
          </h2>
        </div>

        <a className="projects__viewAll" href={onViewAllHref}>
          View All <span className="projects__viewAllArrow">→</span>
        </a>
      </header>

      {!items.length ? (
        <p className="projects__empty">No featured projects yet.</p>
      ) : (
        <div className="projects__grid">
          {items.map((p) => {
            const f = p?.fields ?? {};

            // Image field possibilities (supports different Contentful schemas)
            const cover =
              assetUrl(f.coverImage) ||
              assetUrl(f.thumbnail) ||
              assetUrl(f.image) ||
              assetUrl(f.heroImage);

            const category =
              (f.categoryLabel || f.projectType || f.clientOrCategory || "PROJECT")
                .toString()
                .toUpperCase();

            const tech = normalizeTechList(f);

            return (
              <article className="projectCard" key={p?.sys?.id ?? f.title}>
                <div className="projectCard__media">
                  {cover ? (
                    <img
                      className="projectCard__img"
                      src={cover}
                      alt={f.title ? `${f.title} preview` : "Project preview"}
                      loading="lazy"
                    />
                  ) : (
                    <div className="projectCard__imgFallback" aria-hidden="true" />
                  )}

                  {/* soft fade like design */}
                  <div className="projectCard__mediaFade" aria-hidden="true" />
                </div>

                <div className="projectCard__body">
                  <div className="projectCard__category">{category}</div>

                  <h3 className="projectCard__title">{f.title}</h3>

                  {tech.length ? (
                    <div className="projectCard__chips" aria-label="Tech stack">
                      {tech.map((t) => (
                        <span className="projectChip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {f.websiteUrl ? (
                    <a
                      className="projectCard__link"
                      href={f.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Website <ExternalIcon className="projectCard__linkIcon" />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}