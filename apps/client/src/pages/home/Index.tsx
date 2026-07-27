import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  bookParts,
  clarityComponents,
  engagementRoadmap,
  featuredFrameworks,
  launchInsights,
  recoveredAssets,
  services,
} from "@/content/site";

const Index = () => {
  return (
    <div className="site-page">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />

      <main id="main-content">
        {/* @section: homepage-hero */}
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">ClarityOS · Pre-Governance Operating System</p>
              <h1 id="hero-title">Transformation fails when the human layer underneath it cannot hold.</h1>
              <p className="hero-tagline">The Human OS before the System OS.</p>
              <p className="hero-summary">
                Zeeshan Sabri is the Crisis-to-Clarity Architect and founder of ClarityOS—a proprietary methodology for diagnosing and strengthening the human conditions beneath governance, technology, and transformation.
              </p>
              <div className="hero-actions" aria-label="Primary actions">
                <Link className="button button-primary" to="/clarityos">
                  Explore ClarityOS <ArrowRight aria-hidden="true" />
                </Link>
                <a
                  className="button button-quiet"
                  href="mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Personal%20Session"
                >
                  Request a $79 session
                </a>
              </div>
              <a className="hero-scroll" href="#premise">
                <ArrowDown aria-hidden="true" /> Read the premise
              </a>
            </div>

            <figure className="hero-portrait">
              <div className="portrait-frame">
                <img
                  src={recoveredAssets.hero}
                  alt="Zeeshan Sabri in a dark suit against a neutral architectural background"
                  width="900"
                  height="1600"
                  fetchPriority="high"
                />
                <span className="portrait-index" aria-hidden="true">01 / Architect</span>
              </div>
              <figcaption>
                <span>Zeeshan Sabri</span>
                <span>Crisis-to-Clarity Architect</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* @section: homepage-premise */}
        <section id="premise" className="premise-section">
          <div className="site-shell premise-grid">
            <p className="section-index on-dark">01 · The premise</p>
            <div>
              <p className="eyebrow on-dark">ClarityOS is the prerequisite, not the upgrade.</p>
              <h2>Systems do not fail in isolation.</h2>
              <p className="premise-lead">
                When decision authority is unclear, readiness trails ambition, and governance arrives before capacity, transformation becomes an installation exercise instead of an institutional capability.
              </p>
              <div className="premise-actions">
                <Link className="text-link on-dark" to="/clarityos">
                  Understand the methodology <ArrowRight aria-hidden="true" />
                </Link>
                <Link className="text-link on-dark" to="/insights">
                  Read the Investment Paradox <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* @section: eight-c-method */}
        <section className="section section-method" aria-labelledby="method-title">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-index">02 · The operating methodology</p>
                <p className="eyebrow">8C Crisis-to-Clarity Framework</p>
              </div>
              <div>
                <h2 id="method-title">Eight conditions for moving from crisis to governed clarity.</h2>
                <p>
                  ClarityOS organizes the human layer into an eight-part diagnostic and operating sequence. The components stay connected: no isolated technique can carry the system alone.
                </p>
              </div>
            </div>

            <ol className="method-grid">
              {clarityComponents.map((component) => (
                <li key={component.name} className="method-item">
                  <span className="method-number">{component.number}</span>
                  <h3>{component.name}</h3>
                  <p>{component.line}</p>
                </li>
              ))}
            </ol>

            <div className="method-visual-grid">
              <figure className="method-image">
                <img
                  src={recoveredAssets.compass}
                  alt="Recovered ClarityOS internal cognitive architecture diagram"
                  width="1200"
                  height="670"
                  loading="lazy"
                />
                <figcaption>Recovered ClarityOS visual · detailed model presentation follows rights and evidence review.</figcaption>
              </figure>
              <div className="method-note">
                <p className="eyebrow">Proprietary positioning</p>
                <blockquote>“You cannot install a First World governance system on a broken human operating system.”</blockquote>
                <p>The claim is presented as Zeeshan Sabri’s point of view—not as a universal statistical assertion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* @section: memoir-anchor */}
        <section className="section book-section" aria-labelledby="book-title">
          <div className="site-shell book-grid">
            <div className="book-art-wrap">
              <div className="book-art-field" aria-hidden="true"></div>
              <img
                className="book-cover"
                src={recoveredAssets.book}
                alt="Cover of From Exile to Transformation: A Memoir Beyond Techniques"
                width="1024"
                height="1536"
                loading="lazy"
              />
              <span className="book-status">Forthcoming</span>
            </div>

            <div className="book-copy">
              <p className="section-index">03 · The narrative anchor</p>
              <p className="eyebrow">From Exile to Transformation</p>
              <h2 id="book-title">A memoir beyond techniques.</h2>
              <p className="book-deck">
                The book connects lived resilience, Fortune 500 foundations, GCC institution-building, and the creation of ClarityOS. Its six parts become the platform’s editorial and search architecture.
              </p>
              <ol className="book-parts">
                {bookParts.map((part, index) => (
                  <li key={part}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{part}</strong>
                  </li>
                ))}
              </ol>
              <div className="book-actions">
                <Link className="button button-primary" to="/book">
                  Enter the book platform <ArrowRight aria-hidden="true" />
                </Link>
                <a className="text-link" href="mailto:zeeshan@global-mkts.com?subject=From%20Exile%20to%20Transformation%20waitlist">
                  Join the early interest list
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* @section: framework-library */}
        <section className="section framework-section" aria-labelledby="framework-title">
          <div className="site-shell">
            <div className="section-heading framework-heading">
              <div>
                <p className="section-index">04 · The framework library</p>
                <p className="eyebrow">Intellectual property made useful</p>
              </div>
              <div>
                <h2 id="framework-title">One methodology. Fourteen supporting pillars.</h2>
                <p>
                  Each framework will own a distinct search intent, practical tool, related chapter, and next-step path. These four are the homepage entry points.
                </p>
              </div>
              <Link className="text-link framework-all" to="/frameworks">
                View all frameworks <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="framework-list">
              {featuredFrameworks.map((framework) => (
                <Link className="framework-row" to="/frameworks" key={framework.title}>
                  <span className="framework-index">{framework.index}</span>
                  <h3>{framework.title}</h3>
                  <p>{framework.description}</p>
                  <span className="framework-bridge">{framework.bridge}</span>
                  <ArrowRight className="framework-arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* @section: engagement-roadmap */}
        <section className="section roadmap-section" aria-labelledby="roadmap-title">
          <div className="site-shell roadmap-grid">
            <div className="roadmap-intro">
              <p className="section-index on-dark">05 · From method to engagement</p>
              <p className="eyebrow on-dark">ClarityOS Engagement Roadmap</p>
              <h2 id="roadmap-title">Four stages for installing the operating conditions.</h2>
              <p>
                This engagement sequence is intentionally distinct from the five-level Pyramid Framework. It describes how the work progresses—not how transformation maturity is structured.
              </p>
            </div>
            <ol className="roadmap-list">
              {engagementRoadmap.map((stage) => (
                <li key={stage.name}>
                  <span>{stage.number}</span>
                  <div>
                    <h3>{stage.name}</h3>
                    <p>{stage.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* @section: founder-origin */}
        <section className="section origin-section" aria-labelledby="origin-title">
          <div className="site-shell origin-grid">
            <figure className="origin-image">
              <img
                src={recoveredAssets.origin}
                alt="Recovered portrait from the origin story of ClarityOS"
                width="629"
                height="1400"
                loading="lazy"
              />
              <figcaption>Recovered origin portrait · current-site source master preserved.</figcaption>
            </figure>
            <div className="origin-copy">
              <p className="section-index">06 · The architect</p>
              <p className="eyebrow">Lived experience before language</p>
              <h2 id="origin-title">The method began before it had a name.</h2>
              <p className="origin-lead">
                Kuwait exile shaped the first questions. Fortune 500 environments supplied operating discipline. GCC institution-building exposed the gap between installed systems and the human conditions required to hold them.
              </p>
              <div className="origin-timeline" aria-label="Founder narrative sequence">
                <span>Kuwait exile</span>
                <span>Fortune 500 foundations</span>
                <span>GCC institution-building</span>
                <span>ClarityOS</span>
              </div>
              <Link className="button button-outline" to="/the-architect">
                Meet the architect <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* @section: service-paths */}
        <section className="section services-section" aria-labelledby="services-title">
          <div className="site-shell">
            <div className="section-heading services-heading">
              <div>
                <p className="section-index">07 · Ways to engage</p>
                <p className="eyebrow">Choose by consequence, not package size</p>
              </div>
              <div>
                <h2 id="services-title">From a focused decision to institutional transformation.</h2>
                <p>Three clear entry points keep the commercial path legible without flattening every need into the same offer.</p>
              </div>
            </div>

            <div className="service-grid">
              {services.map((service, index) => (
                <article className={`service-card service-card-${index + 1}`} key={service.title}>
                  <p className="service-label">{service.label}</p>
                  <h3>{service.title}</h3>
                  <p className="service-meta">{service.meta}</p>
                  <p>{service.description}</p>
                  <a className="text-link" href={service.href}>
                    {service.cta} <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
            <p className="integration-note">
              Booking and payment activate when the verified service URL is supplied. Until then, session requests route to direct email.
            </p>
          </div>
        </section>

        {/* @section: speaking-proof */}
        <section className="media-band" aria-labelledby="media-title">
          <div className="site-shell media-grid">
            <figure className="media-image">
              <img
                src={recoveredAssets.stage}
                alt="Zeeshan Sabri delivering The Secret of Successful Transformation on stage"
                width="1400"
                height="931"
                loading="lazy"
              />
            </figure>
            <div className="media-copy">
              <p className="section-index on-dark">08 · In the field</p>
              <p className="eyebrow on-dark">Speaking, counsel, facilitation</p>
              <h2 id="media-title">Ideas designed to hold in the room.</h2>
              <p>
                The media system will use verified talks, workshops, public appearances, and approved evidence—never decorative authority signals.
              </p>
              <Link className="button button-light" to="/media">
                Explore verified media <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* @section: launch-insights */}
        <section className="section insights-section" aria-labelledby="insights-title">
          <div className="site-shell insights-grid">
            <div className="insights-intro">
              <p className="section-index">09 · Current thinking</p>
              <p className="eyebrow">The Clarity Dispatch</p>
              <h2 id="insights-title">One pattern. One decision. One next step.</h2>
              <p>Editorial work connects a live question to one framework, one useful tool, and one proportionate way to engage.</p>
              <Link className="button button-outline" to="/newsletter">
                Enter The Clarity Dispatch <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="insight-list">
              {launchInsights.map((insight) => (
                <Link className="insight-row" to="/insights" key={insight.number}>
                  <span>{insight.number}</span>
                  <div>
                    <p>{insight.category}</p>
                    <h3>{insight.title}</h3>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* @section: executive-profile-download */}
        <section className="profile-download-section">
          <div className="site-shell profile-download-grid">
            <div>
              <p className="eyebrow">Boardroom reference</p>
              <h2>Executive Advisory Profile — 2026 Edition</h2>
            </div>
            <p>
              The recovered 12-page profile is available as a direct source document while its rights, claims, and production use are reviewed for the new media system.
            </p>
            <a className="button button-primary" href={recoveredAssets.profile} download>
              Download profile <Download aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* @section: closing-conversion */}
        <section className="closing-section" aria-labelledby="closing-title">
          <div className="site-shell closing-grid">
            <p className="section-index on-dark">10 · Begin with clarity</p>
            <div>
              <h2 id="closing-title">Before changing the system, diagnose what the human layer can hold.</h2>
              <div className="closing-actions">
                <a
                  className="button button-copper"
                  href="mailto:zeeshan@global-mkts.com?subject=ClarityOS%20Personal%20Session"
                >
                  Request a Personal Session <ArrowRight aria-hidden="true" />
                </a>
                <Link className="text-link on-dark" to="/contact">Discuss an enterprise need</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
