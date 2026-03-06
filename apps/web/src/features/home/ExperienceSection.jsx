import "./experience.css";

function splitTitle(title = "") {
  const parts = title.trim().split(" ").filter(Boolean);
  if (parts.length <= 1) return { first: title, last: "" };
  const last = parts.pop();
  return { first: parts.join(" "), last };
}

function formatYear(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return String(d.getFullYear());
}

function normalizeExperience(entry) {
  const f = entry?.fields ?? {};

  const jobTitle = f.jobTitle || "";
  const company = f.company || "";
  const employmentType = f.employmentType || "";
  const description = f.description || "";

  const startYear = formatYear(f.startDate);
  const endYear = f.isCurrent ? "Present" : formatYear(f.endDate);

  const period = startYear ? `${startYear} – ${endYear || ""}`.trim() : "";

  const order = typeof f.order === "number" ? f.order : 999;

  return {
    id: entry?.sys?.id || `${jobTitle}-${company}-${order}`,
    order,
    jobTitle,
    company,
    employmentType,
    description,
    period,
  };
}

export default function ExperienceSection({ title = "Work Experience", data = [] }) {
  const { first, last } = splitTitle(title);

  const items = Array.isArray(data)
    ? data
        .map(normalizeExperience)
        .filter((x) => x.jobTitle || x.company)
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <section className="exp section">
      <div className="section-inner">
        <div className="exp__header">
          <div className="exp__eyebrow">
            <span className="exp__dash" />
            <span>CAREER</span>
          </div>

          <h2 className="exp__title">
            <span>{first} </span>
            {last ? <span className="exp__titleGradient">{last}</span> : null}
          </h2>
        </div>

        <div className="exp__layout">
          {/* timeline rail */}
          <div className="exp__rail" aria-hidden="true">
            <span className="exp__dot exp__dot--top" />
            <span className="exp__line" />
            <span className="exp__dot exp__dot--bottom" />
          </div>

          {/* cards */}
          <div className="exp__cards">
            {items.map((it) => (
              <article className="exp__card" key={it.id}>
                <div className="exp__cardTop">
                  <div className="exp__left">
                    <div className="exp__job">{it.jobTitle}</div>
                    <div className="exp__companyRow">
                      <span className="exp__companyIcon" aria-hidden="true">🏢</span>
                      <span className="exp__company">{it.company}</span>
                    </div>
                  </div>

                  <div className="exp__badges">
                    {it.period ? <span className="exp__badge exp__badge--muted">{it.period}</span> : null}
                    {it.employmentType ? <span className="exp__badge exp__badge--green">{it.employmentType}</span> : null}
                  </div>
                </div>

                {it.description ? <p className="exp__desc">{it.description}</p> : null}
              </article>
            ))}

            <a className="exp__ctaBtn" href="/about">
              More About Me <span className="exp__ctaArrow" aria-hidden="true">→</span>
            </a>

            {!items.length && (
              <div className="exp__empty">
                No experiences found. Link entries to <b>HomePage → experiences</b> and publish.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}