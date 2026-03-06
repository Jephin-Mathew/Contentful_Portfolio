import { useMemo, useState } from "react";
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

function normalizeProject(entry) {
  const f = entry?.fields ?? {};
  return {
    id: entry?.sys?.id || f.title,
    title: f.title || "",
    clientOrCategory: f.clientOrCategory || "",
    thumbnailUrl: assetUrl(f.thumbnail),
    techStack: Array.isArray(f.techStack) ? f.techStack.filter(Boolean) : [],
    websiteUrl: f.websiteUrl || "",
    featured: !!f.featured,
    order: typeof f.order === "number" ? f.order : 9999,
  };
}

export default function ProjectsSection({
  title = "All Projects",
  subtitle = "",
  projects = [],
  filterOptions = ["All"],
  loading = false,
}) {
  const { first, last } = splitLastWord(title);
  const [active, setActive] = useState("All");

  const items = useMemo(() => {
    const normalized = projects.map(normalizeProject);

    // sort: featured first (optional), then order
    normalized.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (a.order ?? 9999) - (b.order ?? 9999);
    });

    if (!active || active === "All") return normalized;

    return normalized.filter((p) => p.techStack.includes(active));
  }, [projects, active]);

  return (
    <section className="projectsPage section">
      <div className="projectsPage__bg" aria-hidden="true">
        <div className="projectsPage__glow projectsPage__glow--left" />
        <div className="projectsPage__glow projectsPage__glow--right" />
        <div className="projectsPage__vignette" />
      </div>

      <div className="section-inner projectsPage__inner">
        <header className="projectsPage__header">
          <div className="projectsPage__eyebrow">
            <span className="projectsPage__dash" />
            <span>PORTFOLIO</span>
          </div>

          <h1 className="projectsPage__title">
            <span>{first} </span>
            {last ? <span className="projectsPage__titleAccent">{last}</span> : null}
          </h1>

          {subtitle ? <p className="projectsPage__subtitle">{subtitle}</p> : null}

          <div className="projectsPage__filters">
            {filterOptions.map((f) => (
              <button
                key={f}
                className={`projectsPage__filter ${active === f ? "is-active" : ""}`}
                onClick={() => setActive(f)}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <div className="projectsGrid">
          {loading ? (
            <div className="projectsPage__empty">Loading projects…</div>
          ) : items.length === 0 ? (
            <div className="projectsPage__empty">No projects found.</div>
          ) : (
            items.map((p) => (
              <article className="projectCard" key={p.id}>
                {p.featured ? <div className="projectCard__badge">FEATURED</div> : null}

                <div className="projectCard__thumb">
                  {p.thumbnailUrl ? (
                    <img src={p.thumbnailUrl} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="projectCard__thumbPlaceholder" />
                  )}
                </div>

                <div className="projectCard__body">
                  <h3 className="projectCard__title">{p.title}</h3>

                  {p.clientOrCategory ? (
                    <div className="projectCard__meta">{p.clientOrCategory}</div>
                  ) : null}

                  <div className="projectCard__chips">
                    {p.techStack.map((t) => (
                      <span className="projectChip" key={`${p.id}-${t}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="projectCard__actions">
                    {p.websiteUrl ? (
                      <a className="projectBtn" href={p.websiteUrl} target="_blank" rel="noreferrer">
                        Live Site <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <button className="projectBtn projectBtn--disabled" type="button" disabled>
                        Live Site
                      </button>
                    )}

                    <button className="projectIconBtn" type="button" aria-label="Details">
                      ⓘ
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}