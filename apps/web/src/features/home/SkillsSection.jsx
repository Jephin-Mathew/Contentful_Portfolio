import "./skills.css";

function splitTitle(title = "") {
  const parts = title.trim().split(" ").filter(Boolean);
  if (parts.length <= 1) return { first: title, last: "" };
  const last = parts.pop();
  return { first: parts.join(" "), last };
}

function normalizeSkillGroup(entry) {
  const f = entry?.fields ?? {};

  const title = f.category || ""; // ✅ matches migration: category
  const order = typeof f.order === "number" ? f.order : 999; // ✅ matches migration: order

  // ✅ matches migration: skills is Array<Symbol>
  const items = Array.isArray(f.skills) ? f.skills.filter(Boolean) : [];

  return {
    id: entry?.sys?.id || `${title}-${order}`,
    title,
    order,
    items,
  };
}

export default function SkillsSection({ title = "Technical Expertise", data = [] }) {
  const { first, last } = splitTitle(title);

  const groups = Array.isArray(data)
    ? data
        .map(normalizeSkillGroup)
        .filter((g) => g.title) // remove empty
        .sort((a, b) => a.order - b.order)
    : [];

  const isEmpty = !groups.length || groups.every((g) => g.items.length === 0);

  return (
    <section className="skills section">
      <div className="section-inner">
        <div className="skills__header">
          <div className="skills__eyebrow">
            <span className="skills__dash" />
            <span>SKILLS</span>
          </div>

          <h2 className="skills__title">
            <span>{first} </span>
            {last ? <span className="skills__titleGradient">{last}</span> : null}
          </h2>
        </div>

        <div className="skills__table">
          {groups.map((g, idx) => (
            <div className="skills__row" key={g.id}>
              <div className="skills__label">{g.title}</div>

              <div className="skills__chips">
                {g.items.map((chip) => (
                  <span
                    key={`${g.id}-${chip}`}
                    className={`skills__chip ${
                      idx % 2 === 0 ? "skills__chip--purple" : "skills__chip--green"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {isEmpty && (
          <div className="skills__empty">
            Skill groups loaded, but no skills found.
            <br />
            Check Contentful → Skill Group entries → fill the <b>skills</b> array and publish.
          </div>
        )}
      </div>
    </section>
  );
}