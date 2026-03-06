import "./footer.css";

function normalizeSocialLinks(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean);
}

export default function Footer({ siteSettings }) {
  const settings = siteSettings?.fields ?? {};
  const socialLinks = normalizeSocialLinks(settings.socialLinks);

  return (
    <footer className="siteFooter">
      <div className="section-inner siteFooter__inner">
        <div className="siteFooter__left">
          <div className="siteFooter__name">{settings.siteName || "Jephin Mathew"}</div>
          <div className="siteFooter__text">
            {settings.footerText || "Full Stack Software Developer · Building the web, one line at a time."}
          </div>
        </div>

        <div className="siteFooter__socials">
          {socialLinks.length > 0 ? (
            socialLinks.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="siteFooter__socialBtn"
                aria-label={item.label}
                title={item.label}
              >
                {getSocialShortLabel(item.label)}
              </a>
            ))
          ) : (
            <>
              <a href="#" className="siteFooter__socialBtn" aria-label="GitHub">Gh</a>
              <a href="#" className="siteFooter__socialBtn" aria-label="LinkedIn">In</a>
              <a href="#" className="siteFooter__socialBtn" aria-label="Twitter">Tw</a>
            </>
          )}
        </div>

        <div className="siteFooter__right">
          © 2024 Jephin Mathew · Crafted with ♥
        </div>
      </div>
    </footer>
  );
}

function getSocialShortLabel(label = "") {
  const lower = label.toLowerCase();

  if (lower.includes("github")) return "Gh";
  if (lower.includes("linkedin")) return "In";
  if (lower.includes("twitter") || lower.includes("x")) return "Tw";
  if (lower.includes("instagram")) return "Ig";

  return label.slice(0, 2);
}