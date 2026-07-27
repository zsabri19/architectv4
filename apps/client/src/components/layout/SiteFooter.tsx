import { Link } from "react-router-dom";

const footerLinks = [
  { label: "The Architect", href: "/the-architect" },
  { label: "ClarityOS", href: "/clarityos" },
  { label: "Book", href: "/book" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Media", href: "/media" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <>
      {/* @section: global-footer */}
      <footer className="site-footer">
        <div className="site-shell footer-grid">
          <div className="footer-intro">
            <p className="eyebrow on-dark">Clarity before installation</p>
            <h2>The Human OS before the System OS.</h2>
            <p>
              Zeeshan Sabri is the Crisis-to-Clarity Architect and founder of ClarityOS.
            </p>
          </div>

          <div className="footer-links" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <Link key={item.href} to={item.href}>{item.label}</Link>
            ))}
          </div>

          <div className="footer-contact">
            <p className="footer-label">Direct</p>
            <a href="mailto:zeeshan@global-mkts.com">zeeshan@global-mkts.com</a>
            <p className="footer-label footer-label-spaced">Verified channels</p>
            <a href="https://www.youtube.com/@ZeeshanSabri83" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.instagram.com/zsabri/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="site-shell footer-base">
          <p>© {new Date().getFullYear()} Zeeshan Sabri. All rights reserved.</p>
          <p>ClarityOS is proprietary positioning and methodology.</p>
        </div>
      </footer>
    </>
  );
}
