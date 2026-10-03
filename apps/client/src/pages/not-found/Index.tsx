import { ArrowLeft, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageSeo } from "@/components/seo/PageSeo";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="site-page">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      {/* @section: not-found */}
      <PageSeo
        title="This page is outside the current architecture."
        description="No page exists at this address."
        path={location.pathname}
      />
      <main id="main-content" className="gate-page">
        <div className="site-shell gate-grid">
          <p className="section-index">404 · Route not found</p>
          <div>
            <p className="eyebrow">The map ends here</p>
            <h1>This page is outside the current architecture.</h1>
            <p className="gate-copy">
              No page exists at <strong>{location.pathname}</strong>. Return to the authority platform or continue with the ClarityOS methodology.
            </p>
            <div className="gate-actions">
              <Link className="button button-primary" to="/">
                <ArrowLeft aria-hidden="true" /> Return home
              </Link>
              <Link className="button button-outline" to="/clarityos">
                Explore ClarityOS <Compass aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
