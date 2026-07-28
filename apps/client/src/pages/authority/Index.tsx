import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Award, BookOpen, Download, Globe, Lightbulb, Mail, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageSeo } from "@/components/seo/PageSeo";
import NotFound from "@/pages/not-found/Index";
import {
  AWARD_LABEL,
  AWARD_URL,
  bookAbout,
  bookDedication,
  bookClosing,
  bookFourteenFrameworks,
  bookFrameworkSpotlights,
  bookMetrics,
  bookNewsletter,
  bookPartDetails,
  bookPress,
  bookPrologue,
  bookPublisher,
  bookRoadmap,
  bookRoiMetrics,
  bookToc,
  bookWhyAudiences,
  chapters,
  clarityComponents,
  clarityFaqs,
  engagementRoadmap,
  frameworks,
  inquiryTypes,
  budgetOptions,
  launchArticles,
  leadMagnets,
  mediaReferences,
  recoveredAssets,
  routeMetadata,
  serviceRecords,
  siteIdentity,
  timelineOptions,
  type ArticleRecord,
  type ChapterRecord,
  type FrameworkRecord,
  type RouteMeta,
} from "@/content/site";

const verifiedProof = [
  { value: "$95M+", label: "Strategic initiatives delivered across the GCC" },
  { value: "22 years", label: "Across Fortune 500, government, and ventures" },
  { value: "5M+", label: "Citizens served through national platforms" },
  { value: "$80M", label: "Procurement portfolio with zero compliance breaches" },
] as const;

const authoritySequence = [
  { marker: "01", title: "Exile", copy: "Displacement from Kuwait made identity, continuity, and resilience lived questions before they became leadership language." },
  { marker: "02", title: "Operating discipline", copy: "Fortune 500 environments provided the structures, standards, and delivery discipline required to test ideas against consequence." },
  { marker: "03", title: "Institution building", copy: "Work across GCC markets exposed the distance between an installed system and the human conditions required to hold it." },
  { marker: "04", title: "ClarityOS", copy: "The methodology connects those experiences into a pre-governance operating system for consequential transformation." },
] as const;

const serviceByTitle = (title: string) => serviceRecords.find((service) => service.title === title) ?? serviceRecords[1];
const frameworkBySlug = (slug: string) => frameworks.find((framework) => framework.slug === slug);
const articleBySlug = (slug: string) => launchArticles.find((article) => article.slug === slug);
const chapterBySlug = (slug: string) => chapters.find((chapter) => chapter.slug === slug && chapter.public);
const leadMagnetBySlug = (slug?: string) => leadMagnets.find((leadMagnet) => leadMagnet.slug === slug);

/* @section: authority-page-shell */
type PageShellProps = {
  meta: RouteMeta;
  children: ReactNode;
  type?: "website" | "article";
};

function PageShell({ meta, children, type = "website" }: PageShellProps) {
  return (
    <div className="site-page">
      <PageSeo {...meta} type={type} />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

/* @section: authority-page-hero */
type EditorialHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  aside?: ReactNode;
  actions?: ReactNode;
  image?: { src: string; alt: string; caption: string };
};

function EditorialHero({ index, eyebrow, title, summary, aside, actions, image }: EditorialHeroProps) {
  return (
    <section className={`inner-hero${image ? " inner-hero-with-image" : ""}`} aria-labelledby="page-title">
      <div className="site-shell inner-hero-grid">
        <div className="inner-hero-copy">
          <p className="section-index">{index}</p>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          <p className="inner-hero-summary">{summary}</p>
          {actions ? <div className="inner-hero-actions">{actions}</div> : null}
        </div>
        {image ? (
          <figure className="inner-hero-image">
            <img src={image.src} alt={image.alt} width="900" height="1200" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ) : (
          <aside className="inner-hero-aside">{aside}</aside>
        )}
      </div>
    </section>
  );
}

/* @section: authority-section-heading */
type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
};

function SectionHeading({ index, eyebrow, title, copy, dark = false }: SectionHeadingProps) {
  return (
    <div className="inner-section-heading">
      <div>
        <p className={`section-index${dark ? " on-dark" : ""}`}>{index}</p>
        <p className={`eyebrow${dark ? " on-dark" : ""}`}>{eyebrow}</p>
      </div>
      <div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}

/* @section: authority-related-rail */
type RelatedRailProps = {
  framework?: FrameworkRecord;
  article?: ArticleRecord;
  chapter?: ChapterRecord;
  serviceTitle: string;
};

function RelatedRail({ framework, article, chapter, serviceTitle }: RelatedRailProps) {
  const service = serviceByTitle(serviceTitle);
  return (
    <aside className="related-rail" aria-label="Continue the path">
      <p className="eyebrow">Continue the path</p>
      {framework ? <Link to={`/frameworks/${framework.slug}`}>Framework <strong>{framework.title}</strong><ArrowRight aria-hidden="true" /></Link> : null}
      {article ? <Link to={`/insights/${article.slug}`}>Insight <strong>{article.title}</strong><ArrowRight aria-hidden="true" /></Link> : null}
      {chapter?.slug ? <Link to={`/book/${chapter.slug}`}>Book chapter <strong>{chapter.title}</strong><ArrowRight aria-hidden="true" /></Link> : null}
      <a href={service.href}>Service <strong>{service.title}</strong><ArrowRight aria-hidden="true" /></a>
    </aside>
  );
}

/* @section: architect-page */
export function ArchitectPage() {
  return (
    <PageShell meta={routeMetadata["/the-architect"]}>
      <EditorialHero
        index="01 · The architect"
        eyebrow="Lived experience before language"
        title="The method began before it had a name."
        summary="Zeeshan Sabri’s path moves from Kuwait exile through Fortune 500 operating discipline and GCC institution-building to ClarityOS: a methodology shaped by the gap between installed systems and human readiness."
        image={{ src: recoveredAssets.origin, alt: "Recovered portrait of Zeeshan Sabri from the ClarityOS origin story", caption: "Recovered current-site portrait · source master preserved" }}
        actions={<><Link className="button button-primary" to="/clarityos">Explore the methodology <ArrowRight aria-hidden="true" /></Link><a className="button button-quiet" href={recoveredAssets.profile} download>Download executive profile <Download aria-hidden="true" /></a></>}
      />

      {/* @section: architect-origin-sequence */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="02 · Origin" eyebrow="Crisis to clarity" title="A narrative built around consequence." copy="The biography is not separate from the work. It explains why identity, culture, governance, capability, and continuity sit inside the same operating method." />
          <ol className="editorial-sequence">
            {authoritySequence.map((item) => <li key={item.marker}><span>{item.marker}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}
          </ol>
        </div>
      </section>

      {/* @section: architect-proof */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell">
          <SectionHeading index="03 · Evidence" eyebrow="Verified proof points" title="Authority made legible." copy="Selected facts preserved from the approved current-site inventory. Detailed case publication remains subject to client and rights approval." />
          <div className="proof-grid">
            {verifiedProof.map((proof) => <article key={proof.value}><strong>{proof.value}</strong><p>{proof.label}</p></article>)}
          </div>
          <div className="credential-note"><p>Chartered MCIPS · AI CERTs certified trainer</p><p>Winner, Entrepreneurial Excellence Award — Founders 2.0 Conference, Dubai, December 2025</p></div>
        </div>
      </section>

      {/* @section: architect-next-step */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell narrow-conversion">
          <p className="eyebrow on-dark">The work now</p>
          <h2>Strengthen the human layer before the next system asks it to carry more.</h2>
          <div className="inner-hero-actions"><Link className="button button-light" to="/services">Work with Zeeshan <ArrowRight aria-hidden="true" /></Link><Link className="text-link on-dark" to="/book">Enter the memoir platform</Link></div>
        </div>
      </section>
    </PageShell>
  );
}

/* @section: clarityos-page */
export function ClarityOsPage() {
  return (
    <PageShell meta={routeMetadata["/clarityos"]}>
      <EditorialHero
        index="01 · The system"
        eyebrow="The world’s first Pre-Governance Operating System"
        title="The human conditions beneath transformation can be diagnosed."
        summary="ClarityOS is Zeeshan Sabri’s proprietary methodology for strengthening decision clarity, readiness, capability, accountability, correction, and continuity before formal systems are expected to perform."
        image={{ src: recoveredAssets.compass, alt: "Recovered ClarityOS internal cognitive architecture diagram", caption: "Recovered ClarityOS visual · detailed model use remains evidence-led" }}
        actions={<><Link className="button button-primary" to="/services">Choose an engagement <ArrowRight aria-hidden="true" /></Link><Link className="button button-quiet" to="/frameworks">Explore 14 frameworks</Link></>}
      />

      {/* @section: clarityos-eight-c */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="02 · Operating methodology" eyebrow="8C Crisis-to-Clarity Framework" title="Eight connected conditions. One disciplined sequence." copy="Each component contributes a diagnostic question. Together they expose where an intended transformation is outrunning the conditions beneath it." />
          <ol className="diagnostic-grid">
            {clarityComponents.map((component) => <li key={component.name}><span>{component.number}</span><h3>{component.name}</h3><p>{component.line}</p><em>{component.diagnostic}</em></li>)}
          </ol>
        </div>
      </section>

      {/* @section: clarityos-engagement-roadmap */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell">
          <SectionHeading dark index="03 · Engagement architecture" eyebrow="ClarityOS Engagement Roadmap" title="Four stages for moving from diagnosis to integration." copy="The roadmap organizes the work. It remains intentionally distinct from the five-level Pyramid Framework, which diagnoses transformation maturity." />
          <ol className="roadmap-detail-grid">{engagementRoadmap.map((stage) => <li key={stage.name}><span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.line}</p></li>)}</ol>
        </div>
      </section>

      {/* @section: clarityos-faq */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell faq-layout">
          <SectionHeading index="04 · Questions" eyebrow="Methodology notes" title="What ClarityOS is—and is not." />
          <div className="faq-list">{clarityFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>
    </PageShell>
  );
}

/* @section: book-page */
export function BookPage() {
  return (
    <PageShell meta={routeMetadata["/book"]}>
      <EditorialHero
        index="01 · The book"
        eyebrow="From Exile to Transformation"
        title="A Memoir Beyond Techniques"
        summary="The complete story, from the night Iraq invaded Kuwait in 1990 to Fortune 500 transformation at Huawei and Motorola, and the birth of ClarityOS — captured in a memoir written for the next generation of leaders."
        image={{ src: recoveredAssets.book, alt: "Cover of From Exile to Transformation: A Memoir Beyond Techniques", caption: "Forthcoming · 15 chapters · 6 parts · 14 frameworks" }}
        actions={
          <>
            <a
              className="book-award-badge"
              href={AWARD_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Award size={14} />
              {AWARD_LABEL}
            </a>
            <div className="inner-hero-actions">
              <a className="button button-primary" href="#prologue">
                Read the Prologue <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="#contents">
                Explore the Book
              </a>
            </div>
          </>
        }
      />

      {/* @section: book-about */}
      <section className="inner-section">
        <div className="site-shell book-about-grid">
          <div>
            <p className="section-index">02 · About the book</p>
            <p className="eyebrow">A Story of Clarity Forged in Crisis</p>
            <h2>{bookAbout.headline}</h2>
            <p className="inner-hero-summary">{bookAbout.lead}</p>
            {bookAbout.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <blockquote>{bookAbout.quote}</blockquote>
          </div>
          <div className="book-metric-cards">
            <div><BookOpen aria-hidden="true" /><p>15 Chapters</p><p>Six transformative parts</p></div>
            <div><Lightbulb aria-hidden="true" /><p>14 Frameworks</p><p>Battle-tested methodologies</p></div>
            <div><Globe aria-hidden="true" /><p>4 Continents</p><p>Cross-cultural leadership</p></div>
            <div><Award aria-hidden="true" /><p>Award-Winning</p><p>Founders 2.0, Dubai 2025</p></div>
          </div>
        </div>
      </section>

      {/* @section: book-press */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell max-w-4xl mx-auto text-center">
          <p className="eyebrow">{bookPress.eyebrow}</p>
          <blockquote className="book-press-quote">“{bookPress.quote}”</blockquote>
          <p className="text-xs uppercase tracking-wider text-copper-dark mt-4">— {bookPress.attribution}</p>
          <p className="mt-6 max-w-3xl mx-auto">{bookPress.description}</p>
          <a className="button button-outline mt-6" href={AWARD_URL} target="_blank" rel="noreferrer">
            {bookPress.cta} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* @section: book-prologue */}
      <section id="prologue" className="inner-section inner-section-navy">
        <div className="site-shell max-w-3xl mx-auto">
          <p className="section-index on-dark">03 · From the book</p>
          <p className="eyebrow on-dark">The Prologue</p>
          <h2 className="on-dark">The Night Everything Changed</h2>
          <div className="book-prose on-dark">
            {bookPrologue.map((paragraph, index) => {
              if (index === 2) return <blockquote key={index} className="on-dark">“{paragraph}”</blockquote>;
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </div>
      </section>

      {/* @section: book-narrative */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="04 · The narrative" eyebrow="A story of crisis, clarity, and transformation" title="Six parts, fifteen chapters, and an epilogue that reveals why it was never fourteen separate frameworks." />
          <div className="book-part-grid">
            {bookPartDetails.map((part) => (
              <article key={part.part}>
                <p className="eyebrow">{part.part}</p>
                <p className="text-xs uppercase tracking-wider text-mist mt-1 mb-4">{part.era}</p>
                <p className="flex-1">{part.body}</p>
                <blockquote>“{part.quote}”</blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* @section: book-contents */}
      <section id="contents" className="inner-section inner-section-stone">
        <div className="site-shell">
          <SectionHeading index="05 · Contents" eyebrow="The Journey in Six Parts" title="Fifteen chapters plus epilogue and appendix." />
          <div className="book-toc">
            {bookToc.map((part, pi) => (
              <div key={part.num} className="book-toc-part">
                <div className="book-toc-heading">
                  <span>{part.num}</span>
                  <h3>{part.title}</h3>
                </div>
                <ol>
                  {part.chapters.map((chapter, ci) => {
                    const chapterNum = bookToc.slice(0, pi).reduce((acc, p) => acc + p.chapters.length, 0) + ci + 1;
                    return <li key={chapter}><span>{String(chapterNum).padStart(2, "0")}</span>{chapter}</li>;
                  })}
                </ol>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-mist italic mt-10">Plus: Epilogue — Beyond Techniques · Appendix — The 14 Frameworks Quick Reference</p>
        </div>
      </section>

      {/* @section: book-proof */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="06 · The proof" eyebrow="Frameworks tested on real crises, real teams, real institutions" title="Authority made legible." />
          <div className="proof-grid">
            {bookMetrics.map((m) => <article key={m.d}><strong>{m.n}</strong><p>{m.d}</p></article>)}
          </div>
        </div>
      </section>

      {/* @section: book-roadmap */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell">
          <SectionHeading dark index="07 · Implementation" eyebrow="A four-phase roadmap, not a random toolkit" title="The 14 frameworks are sequenced so that each phase builds on the one before it." />
          <ol className="roadmap-detail-grid">
            {bookRoadmap.map((r, i) => (
              <li key={r.phase}>
                <span>Phase {i + 1}</span>
                <h3>{r.phase}</h3>
                <p>{r.goal}</p>
                <p className="text-xs mt-4 text-dawn/70"><strong className="text-gold/80 uppercase tracking-wider">Frameworks:</strong> {r.frameworks}</p>
              </li>
            ))}
          </ol>
          <div className="proof-grid mt-10">
            {bookRoiMetrics.map((m) => <article key={m.d}><strong>{m.n}</strong><p>{m.d}</p></article>)}
          </div>
        </div>
      </section>

      {/* @section: book-framework-spotlights */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell">
          <SectionHeading dark index="08 · Framework spotlight" eyebrow="Six frameworks, field-tested before they reached the boardroom" title="Each one was born in a moment of displacement, constraint, or crisis, and tested on a friend or family member first." />
          <div className="magnet-grid">
            {bookFrameworkSpotlights.map((fw) => (
              <article key={fw.name}>
                <h3>{fw.name}</h3>
                <blockquote>“{fw.quote}”</blockquote>
                <p className="text-xs mt-4"><strong className="text-gold/80 uppercase tracking-wider">Parameters:</strong> {fw.params}</p>
                <p className="text-xs mt-2"><strong className="text-gold/80 uppercase tracking-wider">Impact:</strong> {fw.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* @section: book-fourteen-frameworks */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="09 · The frameworks" eyebrow="Fourteen frameworks, born in exile and constraint" title="Every framework in this book was field-tested first — on a friend, a family member, or the author himself — before it reached a boardroom." />
          <div className="book-framework-grid">
            {bookFourteenFrameworks.map((f) => (
              <article key={f.t}>
                <h3>{f.t}</h3>
                <p>“{f.q}”</p>
              </article>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center mt-10">
            <p>For years these fourteen frameworks operated as separate instruments. The epilogue reveals what connects them: you cannot install a first-world governance system on a broken human operating system. That recognition became ClarityOS, and its 8C Crisis-to-Clarity sequence is how the fourteen frameworks convert into a program you can install today.</p>
            <div className="inner-hero-actions justify-center mt-6">
              <Link className="text-link" to="/clarityos">See the 8C Methodology <ArrowRight aria-hidden="true" /></Link>
              <Link className="text-link" to="/frameworks">Explore the Full Framework Library <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* @section: book-dedication */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell detail-end-grid">
          <div>
            <p className="eyebrow">Beyond Techniques</p>
            <h2>Why fourteen frameworks became one operating system</h2>
            <p>The fourteen frameworks in this book are not intellectual exercises. They are codified experiences, each born in a moment of displacement, constraint, or crisis, and tested on a friend or family member before it was deployed in a corporate context.</p>
            <p>ClarityOS is not a fifteenth framework layered on top. It is the operating system that connects the other fourteen — the Pre-Governance methodology that addresses the human foundation before any technical, structural, or strategic system is installed.</p>
            <blockquote>“{bookClosing.thesis}”</blockquote>
          </div>
          <div className="book-dedication-card">
            <p className="eyebrow">Dedication</p>
            <p className="font-serif text-lg italic leading-relaxed">“{bookDedication}”</p>
            <p className="eyebrow mt-8">Why I Wrote This</p>
            <ul>
              {bookWhyAudiences.map((a) => <li key={a}><span />{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* @section: book-publisher */}
      <section className="inner-section">
        <div className="site-shell max-w-3xl mx-auto text-center">
          <p className="eyebrow">Publisher Inquiries</p>
          <h2>{bookPublisher.headline}</h2>
          <p className="mt-4">{bookPublisher.body}</p>
          <div className="inner-hero-actions justify-center mt-8">
            <a className="button button-primary" href={`mailto:${siteIdentity.email}`}>
              <Mail aria-hidden="true" /> {bookPublisher.cta}
            </a>
            <a className="button button-quiet" href={siteIdentity.canonicalOrigin} target="_blank" rel="noreferrer">
              Visit the Main Website <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <p className="mt-10 text-sm text-mist italic">First Draft Manuscript — March 2026</p>
        </div>
      </section>

      {/* @section: book-newsletter */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell max-w-2xl mx-auto text-center">
          <p className="eyebrow on-dark">Pre-order and Updates</p>
          <h2 className="on-dark">{bookNewsletter.headline}</h2>
          <p className="mt-4 on-dark">{bookNewsletter.body}</p>
          <a className="button button-copper mt-6" href={`mailto:${siteIdentity.email}?subject=From%20Exile%20to%20Transformation%20waitlist`}>
            <Mail aria-hidden="true" /> {bookNewsletter.cta}
          </a>
          <p className="mt-4 text-xs text-dawn/70">{bookNewsletter.privacy}</p>
        </div>
      </section>

      {/* @section: book-closing */}
      <section className="closing-section">
        <div className="site-shell closing-grid">
          <p className="section-index on-dark">10 · The frameworks work today</p>
          <div>
            <h2 className="on-dark">Experience the methodology live.</h2>
            <p className="on-dark">A focused ClarityOS session for one decision, or the 90-day installation for a leadership team.</p>
            <div className="closing-actions">
              <a className="button button-copper" href={serviceRecords[0].href}>
                Request a Personal Session <ArrowRight aria-hidden="true" />
              </a>
              <a className="text-link on-dark" href={serviceRecords[1].href}>
                Discuss the 90-Day Program
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* @section: frameworks-hub */
export function FrameworksPage() {
  return (
    <PageShell meta={routeMetadata["/frameworks"]}>
      <EditorialHero index="01 · Framework library" eyebrow="ClarityOS in application" title="Fourteen pillars for consequential work." summary="Each framework owns a distinct problem, search intent, practical application, related insight, and path to engagement. Together they extend the 8C operating methodology without collapsing into one generic model." aside={<><span className="aside-number">14</span><p>Standalone framework pillars</p><Link className="text-link" to="/clarityos">See the core methodology <ArrowRight aria-hidden="true" /></Link></>} />

      {/* @section: framework-directory */}
      <section className="inner-section">
        <div className="site-shell">
          <div className="directory-list">{frameworks.map((framework) => <Link key={framework.slug} to={`/frameworks/${framework.slug}`}><span>{framework.index}</span><div><p>{framework.category}</p><h2>{framework.title}</h2><small>{framework.summary}</small></div><ArrowRight aria-hidden="true" /></Link>)}</div>
        </div>
      </section>

      {/* @section: framework-lead-magnets */}
      <section className="inner-section inner-section-navy">
        <div className="site-shell">
          <SectionHeading dark index="02 · Practical resources" eyebrow="Six launch concepts" title="Tools become available only when the source files and delivery workflow are approved." copy="The first build names the approved resource concepts without pretending that an ungated download or email automation is already live." />
          <div className="magnet-grid">{leadMagnets.map((magnet) => <article key={magnet.slug}><p>{magnet.format}</p><h3>{magnet.title}</h3><Link className="text-link on-dark" to={`/frameworks/${magnet.frameworkSlug}`}>View related framework <ArrowRight aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>
    </PageShell>
  );
}

/* @section: framework-detail-template */
export function FrameworkDetailPage({ slug }: { slug: string }) {
  const framework = frameworkBySlug(slug);
  if (!framework) return <NotFound />;
  const article = articleBySlug(framework.relatedArticleSlug);
  const chapter = framework.relatedChapterSlug ? chapterBySlug(framework.relatedChapterSlug) : undefined;
  const leadMagnet = leadMagnetBySlug(framework.leadMagnetSlug);
  const meta = { title: `${framework.title} | ClarityOS Framework`, description: framework.summary, path: `/frameworks/${framework.slug}` };
  return (
    <PageShell meta={meta}>
      <EditorialHero index={`${framework.index} · Framework pillar`} eyebrow={framework.category} title={framework.title} summary={framework.summary} aside={<><p className="eyebrow">Definition</p><p>{framework.definition}</p></>} actions={<><a className="button button-primary" href={serviceByTitle(framework.serviceTitle).href}>Discuss this framework <ArrowRight aria-hidden="true" /></a><Link className="button button-quiet" to="/frameworks">All frameworks</Link></>} />

      {/* @section: framework-operating-model */}
      <section className="inner-section">
        <div className="site-shell framework-operating-grid">
          <div><p className="eyebrow">Parameters</p><ol className="numbered-list">{framework.parameters.map((parameter, index) => <li key={parameter}><span>{String(index + 1).padStart(2, "0")}</span>{parameter}</li>)}</ol></div>
          <div><p className="eyebrow">Application sequence</p><ol className="numbered-list">{framework.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
        </div>
      </section>

      {/* @section: framework-use-and-impact */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell use-impact-grid">
          <div><p className="eyebrow">Useful when</p><ul>{framework.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul></div>
          <blockquote><p>{framework.impact}</p><cite>Intended application · not a universal performance guarantee</cite></blockquote>
        </div>
      </section>

      {/* @section: framework-resource-status */}
      {leadMagnet ? <section className="resource-status"><div className="site-shell resource-status-grid"><div><p className="eyebrow">Practical resource</p><h2>{leadMagnet.title}</h2></div><p>The resource concept is approved. Download and email-gating remain pending until the final source file, consent language, and delivery integration are supplied.</p><a className="button button-primary" href={`mailto:${siteIdentity.email}?subject=${encodeURIComponent(leadMagnet.title)}`}>Register interest <Mail aria-hidden="true" /></a></div></section> : null}

      {/* @section: framework-faq-and-links */}
      <section className="inner-section"><div className="site-shell detail-end-grid"><div className="faq-list">{framework.faqs.map((faq) => <details key={faq.question} open><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div><RelatedRail framework={undefined} article={article} chapter={chapter} serviceTitle={framework.serviceTitle} /></div></section>
    </PageShell>
  );
}

/* @section: services-page */
export function ServicesPage() {
  return (
    <PageShell meta={routeMetadata["/services"]}>
      <EditorialHero index="01 · Ways to engage" eyebrow="Choose by consequence" title="A clear entry point for each level of responsibility." summary="Begin with one decision, a structured 90-day institutional engagement, independent board counsel, or a speaking format designed for the room. Pricing is explicit where the scope is fixed and proposal-based where consequence defines the work." aside={<><p className="eyebrow">Direct route</p><p>Verified booking and payment links are not yet supplied. Every active conversion therefore routes honestly to direct email.</p><a className="text-link" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email} <ArrowRight aria-hidden="true" /></a></>} />

      {/* @section: service-directory */}
      <section className="inner-section"><div className="site-shell service-directory">{serviceRecords.map((service, index) => <article key={service.slug} className={index === 1 ? "is-featured" : ""}><div><p className="section-index">{String(index + 1).padStart(2, "0")} · {service.label}</p><h2>{service.title}</h2><p className="service-price">{service.meta}</p><p>{service.description}</p></div><div><p className="eyebrow">A strong fit when</p><ul>{service.fit.map((fit) => <li key={fit}>{fit}</li>)}</ul><p className="service-outcome"><strong>Outcome</strong>{service.outcome}</p><a className={`button ${index === 1 ? "button-light" : "button-primary"}`} href={service.href}>{service.cta} <ArrowRight aria-hidden="true" /></a></div></article>)}</div></section>

      {/* @section: services-roadmap */}
      <section className="inner-section inner-section-navy"><div className="site-shell"><SectionHeading dark index="02 · Enterprise sequence" eyebrow="ClarityOS Engagement Roadmap" title="The engagement advances through four defined stages." copy="Foundation, Operational, Transformation, and Integration describe the progression of the work—not the five levels of the Pyramid Framework." /><ol className="roadmap-detail-grid">{engagementRoadmap.map((stage) => <li key={stage.name}><span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.line}</p></li>)}</ol></div></section>
    </PageShell>
  );
}

/* @section: insights-hub */
export function InsightsPage() {
  return (
    <PageShell meta={routeMetadata["/insights"]}>
      <EditorialHero index="01 · Insights" eyebrow="Launch essay collection" title="Field notes for the human layer." summary="Six launch essays connect transformation investment, AI adoption, maturity sequencing, crisis, GCC leadership, and governance to a practical ClarityOS framework and a proportionate next step." aside={<><span className="aside-number">06</span><p>Source-backed launch essays</p><Link className="text-link" to="/newsletter">The Clarity Dispatch <ArrowRight aria-hidden="true" /></Link></>} />

      {/* @section: insights-directory */}
      <section className="inner-section"><div className="site-shell insight-directory">{launchArticles.map((article) => <Link key={article.slug} to={`/insights/${article.slug}`}><span>{article.number}</span><div><p>{article.category} · {article.publishedLabel}</p><h2>{article.title}</h2><small>{article.dek}</small></div><ArrowRight aria-hidden="true" /></Link>)}</div></section>
    </PageShell>
  );
}

/* @section: insight-detail-template */
export function InsightDetailPage({ slug }: { slug: string }) {
  const article = articleBySlug(slug);
  if (!article) return <NotFound />;
  const framework = frameworkBySlug(article.relatedFrameworkSlug);
  const chapter = article.relatedChapterSlug ? chapterBySlug(article.relatedChapterSlug) : undefined;
  const meta = { title: `${article.title} | ClarityOS`, description: article.dek, path: `/insights/${article.slug}` };
  return (
    <PageShell meta={meta} type="article">
      <EditorialHero index={`${article.number} · ${article.publishedLabel}`} eyebrow={article.category} title={article.title} summary={article.dek} aside={<><p className="eyebrow">Reading path</p><p>This essay connects one operating pattern to a related framework and service path.</p>{framework ? <Link className="text-link" to={`/frameworks/${framework.slug}`}>{framework.title} <ArrowRight aria-hidden="true" /></Link> : null}</>} />

      {/* @section: insight-article-body */}
      <article className="article-body"><div className="site-shell article-layout"><div className="article-prose">{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><RelatedRail framework={framework} chapter={chapter} serviceTitle={article.serviceTitle} /></div></article>
    </PageShell>
  );
}

/* @section: book-chapter-detail-template */
export function ChapterDetailPage({ slug }: { slug: string }) {
  const chapter = chapterBySlug(slug);
  if (!chapter || !chapter.slug || !chapter.title || !chapter.summary || !chapter.keyLesson) return <NotFound />;
  const framework = chapter.relatedFrameworkSlug ? frameworkBySlug(chapter.relatedFrameworkSlug) : undefined;
  const article = chapter.relatedArticleSlug ? articleBySlug(chapter.relatedArticleSlug) : undefined;
  const meta = { title: `${chapter.title} | From Exile to Transformation`, description: chapter.summary, path: `/book/${chapter.slug}` };
  return (
    <PageShell meta={meta} type="article">
      <EditorialHero index={`Chapter ${String(chapter.number).padStart(2, "0")} · Confirmed`} eyebrow="From Exile to Transformation" title={chapter.title} summary={chapter.summary} aside={<><p className="eyebrow">Key lesson</p><blockquote>{chapter.keyLesson}</blockquote></>} actions={<><a className="button button-primary" href={`mailto:${siteIdentity.email}?subject=From%20Exile%20to%20Transformation%20waitlist`}>Join the book list <Mail aria-hidden="true" /></a><Link className="button button-quiet" to="/book">Return to the book</Link></>} />

      {/* @section: book-chapter-context */}
      <section className="inner-section inner-section-stone"><div className="site-shell chapter-context"><div><p className="eyebrow">Publication status</p><h2>A confirmed public chapter record—not a substitute for the manuscript.</h2><p>The first build publishes the approved title, summary, and key lesson only. Full chapter text remains in the manuscript workflow and will not be invented or reconstructed here.</p></div><RelatedRail framework={framework} article={article} serviceTitle="ClarityOS Personal Session" /></div></section>
    </PageShell>
  );
}

/* @section: media-page */
export function MediaPage() {
  return (
    <PageShell meta={routeMetadata["/media"]}>
      <EditorialHero index="01 · Media" eyebrow="Verified evidence only" title="Ideas designed to hold in the room." summary="The first media system uses only recovered speaking evidence, verified owned channels, and the current executive profile. Additional press, reels, appearances, and testimonials remain unpublished until their sources and rights are confirmed." image={{ src: recoveredAssets.stage, alt: "Zeeshan Sabri delivering The Secret of Successful Transformation on stage", caption: "Recovered speaking image · conservative first-build use" }} actions={<a className="button button-primary" href={`mailto:${siteIdentity.email}?subject=Speaking%20Inquiry`}>Discuss a speaking brief <ArrowRight aria-hidden="true" /></a>} />

      {/* @section: media-reference-directory */}
      <section className="inner-section"><div className="site-shell"><SectionHeading index="02 · Reference library" eyebrow="Approved first-build records" title="Every public item has a traceable source." copy="No media appearance, testimonial, audience figure, or client endorsement is inferred from imagery alone." /><div className="media-reference-grid">{mediaReferences.map((item) => <article key={item.title}><p>{item.type}</p><h3>{item.title}</h3><small>{item.description}</small>{item.href ? item.href.startsWith("/") ? <a className="text-link" href={item.href} download>Open source document <Download aria-hidden="true" /></a> : <a className="text-link" href={item.href} target="_blank" rel="noreferrer">Open verified channel <MoveUpRight aria-hidden="true" /></a> : <span className="status-pill">Rights confirmation pending</span>}</article>)}</div></div></section>
    </PageShell>
  );
}

/* @section: newsletter-page */
export function NewsletterPage() {
  return (
    <PageShell meta={routeMetadata["/newsletter"]}>
      <EditorialHero index="01 · The Clarity Dispatch" eyebrow="Weekly executive brief" title="One pattern. One decision. One next step." summary="The Clarity Dispatch connects leadership, governance, crisis, AI readiness, and transformation to one practical framework at a time. Archive and signup synchronization will activate when the approved email platform and Sanity records are connected." aside={<><p className="eyebrow">Integration status</p><span className="status-pill">Email platform pending</span><p>No address entered here is stored or submitted in this first build.</p></>} />

      {/* @section: newsletter-interest */}
      <section className="inner-section inner-section-navy"><div className="site-shell newsletter-panel"><div><p className="section-index on-dark">02 · Early interest</p><h2>Join through the honest fallback.</h2><p>Until the verified newsletter endpoint and consent language are supplied, early-interest requests open a pre-addressed email to Zeeshan Sabri.</p></div><a className="button button-copper" href={`mailto:${siteIdentity.email}?subject=The%20Clarity%20Dispatch%20signup%20request`}>Request Dispatch access <Mail aria-hidden="true" /></a></div></section>

      {/* @section: newsletter-launch-archive */}
      <section className="inner-section"><div className="site-shell"><SectionHeading index="03 · Launch archive" eyebrow="Field notes" title="Begin with the six launch essays." copy="Future newsletter issues will appear here when approved records are published from Sanity." /><div className="insight-directory compact">{launchArticles.slice(0, 3).map((article) => <Link key={article.slug} to={`/insights/${article.slug}`}><span>{article.number}</span><div><p>{article.category}</p><h2>{article.title}</h2></div><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>
    </PageShell>
  );
}

/* @section: contact-email-composer */
type ContactDraft = { name: string; organization: string; role: string; engagement: string; budget: string; timeline: string; message: string };
const initialContactDraft: ContactDraft = { name: "", organization: "", role: "", engagement: inquiryTypes[0], budget: budgetOptions[4], timeline: timelineOptions[4], message: "" };

function ContactEmailComposer() {
  const [draft, setDraft] = useState<ContactDraft>(initialContactDraft);
  const [prepared, setPrepared] = useState(false);
  const mailtoHref = useMemo(() => {
    const subject = `${draft.engagement} — ${draft.organization || draft.name || "qualified inquiry"}`;
    const body = [`Name: ${draft.name}`, `Organization: ${draft.organization}`, `Role: ${draft.role}`, `Engagement: ${draft.engagement}`, `Budget: ${draft.budget}`, `Timeline: ${draft.timeline}`, "", draft.message].join("\n");
    return `mailto:${siteIdentity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [draft]);
  const updateDraft = (field: keyof ContactDraft, value: string) => setDraft((current) => ({ ...current, [field]: value }));
  const prepareEmail = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setPrepared(true); };

  return (
    <form className="contact-form" onSubmit={prepareEmail}>
      <div className="form-grid">
        <label>Name<input required value={draft.name} onChange={(event) => updateDraft("name", event.currentTarget.value)} /></label>
        <label>Organization<input required value={draft.organization} onChange={(event) => updateDraft("organization", event.currentTarget.value)} /></label>
        <label>Role<input required value={draft.role} onChange={(event) => updateDraft("role", event.currentTarget.value)} /></label>
        <label>Engagement type<select value={draft.engagement} onChange={(event) => updateDraft("engagement", event.currentTarget.value)}>{inquiryTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Budget signal<select value={draft.budget} onChange={(event) => updateDraft("budget", event.currentTarget.value)}>{budgetOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Timeline<select value={draft.timeline} onChange={(event) => updateDraft("timeline", event.currentTarget.value)}>{timelineOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label>Context and intended outcome<textarea required rows={7} value={draft.message} onChange={(event) => updateDraft("message", event.currentTarget.value)} /></label>
      <div className="form-action-row"><button className="button button-primary" type="submit">Prepare inquiry email <Mail aria-hidden="true" /></button><p>This form does not submit or store data. It prepares a message for your email client.</p></div>
      {prepared ? <div className="prepared-email" role="status"><p>Your inquiry is prepared. Review and send it from your email application.</p><a className="button button-copper" href={mailtoHref}>Open email draft <ArrowRight aria-hidden="true" /></a></div> : null}
    </form>
  );
}

/* @section: contact-page */
export function ContactPage() {
  return (
    <PageShell meta={routeMetadata["/contact"]}>
      <EditorialHero index="01 · Contact" eyebrow="Qualified inquiry" title="Begin with the decision, consequence, and timeline." summary="Use the structured composer to prepare a complete inquiry, or contact Zeeshan Sabri directly. No submission is simulated: the first build opens your email application until a verified form endpoint is connected." aside={<><p className="eyebrow">Direct</p><a className="direct-email" href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a><p>Booking, payment, CRM, and newsletter integrations are pending verified endpoints.</p></>} />

      {/* @section: contact-qualifying-form */}
      <section className="inner-section"><div className="site-shell contact-layout"><div><p className="section-index">02 · Inquiry brief</p><h2>Give the conversation enough structure to begin well.</h2><p>Required fields stay in your browser until you choose to open the prepared email draft.</p></div><ContactEmailComposer /></div></section>
    </PageShell>
  );
}
