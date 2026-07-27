import { ArrowLeft, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const routeCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/the-architect": {
    eyebrow: "The Architect · Next build gate",
    title: "The method began before it had a name.",
    description: "The full founder narrative, verified chronology, credentials, and book bridge will be built after the homepage and global layout are approved.",
  },
  "/clarityos": {
    eyebrow: "ClarityOS · Next build gate",
    title: "The prerequisite, not the upgrade.",
    description: "The full methodology page will expand the 8C model, diagnostic logic, ClarityOS Engagement Roadmap, use cases, and service paths after homepage approval.",
  },
  "/book": {
    eyebrow: "From Exile to Transformation · Next build gate",
    title: "A memoir beyond techniques.",
    description: "The book platform will connect six editorial pillars, approved chapter records, framework relationships, and the early-interest flow after homepage approval.",
  },
  "/frameworks": {
    eyebrow: "Framework library · Next build gate",
    title: "One methodology. Fourteen supporting pillars.",
    description: "The searchable framework library and its individual pillar pages will be built in the next implementation stage.",
  },
  "/services": {
    eyebrow: "Services · Next build gate",
    title: "Choose by consequence, not package size.",
    description: "Detailed personal, enterprise, board advisory, speaking, and approved training paths will follow the homepage review.",
  },
  "/insights": {
    eyebrow: "Insights · Next build gate",
    title: "Ideas connected to practical next steps.",
    description: "The editorial hub and exactly six launch articles will be seeded after the homepage and global system are approved.",
  },
  "/media": {
    eyebrow: "Media · Next build gate",
    title: "Verified presence, not decorative authority.",
    description: "The evidence-led media hub will use recovered and rights-approved talks, field images, press references, and the Executive Advisory Profile.",
  },
  "/newsletter": {
    eyebrow: "The Clarity Dispatch · Next build gate",
    title: "One pattern. One decision. One next step.",
    description: "The archive, subscription flow, and approved issue records will be connected after the newsletter platform and consent requirements are confirmed.",
  },
  "/contact": {
    eyebrow: "Contact · Integration pending",
    title: "Begin with a qualified conversation.",
    description: "The full server-validated inquiry form awaits the approved delivery destination. Direct email remains available now.",
  },
};

export default function StagingPage() {
  const location = useLocation();
  const page = routeCopy[location.pathname] ?? routeCopy["/insights"];

  return (
    <div className="site-page">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      {/* @section: staged-inner-page */}
      <main id="main-content" className="gate-page">
        <div className="site-shell gate-grid">
          <p className="section-index">Approved route · staged honestly</p>
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="gate-copy">{page.description}</p>
            <div className="gate-actions">
              <Link className="button button-primary" to="/">
                <ArrowLeft aria-hidden="true" /> Return to homepage
              </Link>
              <a className="button button-outline" href="mailto:zeeshan@global-mkts.com">
                Email Zeeshan <Mail aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
