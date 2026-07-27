import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation, type NavLinkRenderProps } from "react-router-dom";

const primaryLinks = [
  { label: "The Architect", href: "/the-architect" },
  { label: "ClarityOS", href: "/clarityos" },
  { label: "Book", href: "/book" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Insights", href: "/insights" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* @section: global-header */}
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link className="wordmark" to="/" aria-label="Zeeshan Sabri home">
            <span className="wordmark-name">Zeeshan Sabri</span>
            <span className="wordmark-role">Crisis-to-Clarity Architect</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }: NavLinkRenderProps) => `nav-link${isActive ? " is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            className="header-cta"
            href="mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Personal%20Session"
          >
            Book a $79 Session
          </a>

          <button
            className="menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-nav-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="site-shell mobile-nav" aria-label="Mobile navigation">
          {primaryLinks.map((item, index) => (
            <NavLink
              key={item.href}
              to={item.href}
              tabIndex={open ? 0 : -1}
              className={({ isActive }: NavLinkRenderProps) => `mobile-nav-link${isActive ? " is-active" : ""}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-nav-footer">
            <Link to="/newsletter" tabIndex={open ? 0 : -1}>The Clarity Dispatch</Link>
            <Link to="/contact" tabIndex={open ? 0 : -1}>Contact</Link>
            <a
              href="mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Personal%20Session"
              tabIndex={open ? 0 : -1}
            >
              Request a Personal Session
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
