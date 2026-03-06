import "./about.css";

function normalizeItem(entry) {
  const f = entry?.fields ?? {};
  return {
    id: entry?.sys?.id || f.label,
    label: f.label || "",
    percentage: Number.isFinite(f.percentage) ? f.percentage : Number(f.percentage || 0),
    colorKey: f.colorKey || "",
    order: f.order ?? 0,
  };
}

export default function ProficiencySection({ title = "Technical Proficiency", items = [] }) {
  const rows = Array.isArray(items)
    ? items.map(normalizeItem).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  return (
    <section className="proficiency section">
      <div className="section-inner">
        <div className="proficiency__eyebrow">
          <span className="proficiency__dash" />
          <span>SKILLS</span>
        </div>

        <h2 className="proficiency__title">{title}</h2>

        <div className="proficiency__list">
          {rows.map((r) => (
            <div className="proficiency__row" key={r.id}>
              <div className="proficiency__label">{r.label}</div>
              <div className="proficiency__bar">
                <div
                  className={`proficiency__fill ${r.colorKey ? `proficiency__fill--${r.colorKey}` : ""}`}
                  style={{ width: `${Math.max(0, Math.min(100, r.percentage))}%` }}
                />
              </div>
              <div className="proficiency__pct">{r.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}