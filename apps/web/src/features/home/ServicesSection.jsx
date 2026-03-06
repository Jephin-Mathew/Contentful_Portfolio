import "./services.css";

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

function getIconFromService(service) {
  const f = service?.fields ?? {};

  const iconAssetUrl = assetUrl(f.icon);
  if (iconAssetUrl) return { type: "img", value: iconAssetUrl };

  if (f.iconEmoji) return { type: "emoji", value: f.iconEmoji };

  if (f.iconUrl) return { type: "img", value: f.iconUrl };

  return { type: "fallback", value: null };
}

export default function ServicesSection({
  title = "What I Do",
  data = [],
  eyebrow = "SERVICES",
}) {
  const { first, last } = splitLastWord(title);
  const items = Array.isArray(data) ? data : [];

  return (
    <div className="services">
      <header className="services__header">
        <div className="services__eyebrow">
          <span className="services__eyebrowLine" />
          <span className="services__eyebrowText">{eyebrow}</span>
          <span className="services__eyebrowLine" />
        </div>

        <h2 className="services__title">
          <span className="services__titleFirst">{first}</span>{" "}
          {last ? <span className="services__titleAccent">{last}</span> : null}
        </h2>
      </header>

      <div className="services__grid">
        {items.map((service) => {
          const f = service?.fields ?? {};
          const icon = getIconFromService(service);

          return (
            <article className="serviceCard" key={service.sys?.id ?? f.title}>
              <div className="serviceCard__iconWrap" aria-hidden="true">
                {icon.type === "img" ? (
                  <img className="serviceCard__iconImg" src={icon.value} alt="" />
                ) : icon.type === "emoji" ? (
                  <span className="serviceCard__iconEmoji">{icon.value}</span>
                ) : (
                  <span className="serviceCard__iconFallback" />
                )}
              </div>

              <h3 className="serviceCard__title">{f.title}</h3>

              {f.description ? (
                <p className="serviceCard__desc">{f.description}</p>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}