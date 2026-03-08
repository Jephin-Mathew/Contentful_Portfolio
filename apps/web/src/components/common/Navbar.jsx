import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

function assetUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

export default function Navbar({ siteSettings }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const settings = siteSettings?.fields ?? {};
  const logoUrl = assetUrl(settings.logo);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header className="siteHeader">
      <div className="section-inner siteHeader__inner">
        <Link to="/" className="siteHeader__brand" onClick={closeMenu}>
          {logoUrl ? (
            <img
              className="siteHeader__logoImg"
              src={logoUrl}
              alt={settings.siteName || "Logo"}
            />
          ) : (
            <div className="siteHeader__logoFallback">{`</>`}</div>
          )}
          <span className="siteHeader__brandText">
            {settings.siteName || "Jephin."}
          </span>
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
            onClick={closeMenu}
          >
            {settings.primaryCtaText || "Hire Me"}
          </Link>

          <button
            type="button"
            className={`siteHeader__menuBtn ${menuOpen ? "siteHeader__menuBtn--open" : ""}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`siteHeader__mobilePanel ${menuOpen ? "siteHeader__mobilePanel--open" : ""}`}>
        <div className="section-inner siteHeader__mobileInner">
          <MobileNavItem to="/" onClick={closeMenu}>
            Home
          </MobileNavItem>
          <MobileNavItem to="/projects" onClick={closeMenu}>
            Projects
          </MobileNavItem>
          <MobileNavItem to="/about" onClick={closeMenu}>
            About
          </MobileNavItem>
          <MobileNavItem to="/contact" onClick={closeMenu}>
            Contact
          </MobileNavItem>
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

function MobileNavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? "siteHeader__mobileLink siteHeader__mobileLink--active"
          : "siteHeader__mobileLink"
      }
    >
      {children}
    </NavLink>
  );
}