import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

export default function Navbar({ siteSettings }) {
  const settings = siteSettings?.fields ?? {};
  const logoUrl = assetUrl(settings.logo);

  return (
    <header className="siteHeader">
      <div className="section-inner siteHeader__inner">
        <Link to="/" className="siteHeader__brand">
          {logoUrl ? (
            <img className="siteHeader__logoImg" src={logoUrl} alt={settings.siteName || "Logo"} />
          ) : (
            <div className="siteHeader__logoFallback">{`</>`}</div>
          )}
          <span className="siteHeader__brandText">{settings.siteName || "Jephin."}</span>
        </Link>

        <nav className="siteHeader__nav">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <div className="siteHeader__actions">
          <Link
            to="/contact"
            className="siteHeader__hireBtn"
          >
            {settings.primaryCtaText || "Hire Me"}
          </Link>

          <button type="button" className="siteHeader__menuBtn" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        isActive ? "siteHeader__navLink siteHeader__navLink--active" : "siteHeader__navLink"
      }
    >
      {children}
    </NavLink>
  );
}