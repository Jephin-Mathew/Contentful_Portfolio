import "./about.css";

function sortByOrder(a, b) {
  return (a?.fields?.order ?? 0) - (b?.fields?.order ?? 0);
}

export default function AboutGridSection({
  educationTitle = "Education",
  educationItems = [],
  languagesTitle = "Languages",
  languages = [],
  highlightNote = "",
}) {
  const edu = Array.isArray(educationItems) ? educationItems.slice().sort(sortByOrder) : [];
  const langs = Array.isArray(languages) ? languages.slice().sort(sortByOrder) : [];

  return (
    <section className="aboutGrid section">
      <div className="section-inner">
        <div className="aboutGrid__grid">
          {/* Education */}
          <div className="aboutGrid__card">
            <div className="aboutGrid__cardHead">
              <div className="aboutGrid__icon aboutGrid__icon--purple" />
              <div className="aboutGrid__cardTitle">{educationTitle}</div>
            </div>

            <div className="aboutGrid__stack">
              {edu.map((e) => {
                const f = e.fields ?? {};
                return (
                  <div className="eduCard" key={e.sys.id}>
                    <div className="eduCard__top">
                      <div className="eduCard__degree">{f.degree}</div>
                      {(f.fromYear || f.toYear) && (
                        <div className="eduCard__years">
                          {f.fromYear} — {f.toYear}
                        </div>
                      )}
                    </div>

                    {f.institution ? <div className="eduCard__inst">{f.institution}</div> : null}
                    {f.description ? <div className="eduCard__desc">{f.description}</div> : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="aboutGrid__card">
            <div className="aboutGrid__cardHead">
              <div className="aboutGrid__icon aboutGrid__icon--green" />
              <div className="aboutGrid__cardTitle">{languagesTitle}</div>
            </div>

            <div className="aboutGrid__stack">
              {langs.map((l) => {
                const f = l.fields ?? {};
                return (
                  <div className="langRow" key={l.sys.id}>
                    <div className="langRow__left">
                      <div className="langRow__name">{f.name}</div>
                      {f.level ? <div className="langRow__level">{f.level}</div> : null}
                    </div>

                    {f.badgeText ? <div className="langRow__badge">{f.badgeText}</div> : null}
                  </div>
                );
              })}

              {highlightNote ? <div className="aboutGrid__note">{highlightNote}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}