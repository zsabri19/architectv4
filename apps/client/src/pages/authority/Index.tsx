import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Download, Mail, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageSeo } from "@/components/seo/PageSeo";
import NotFound from "@/pages/not-found/Index";
import {
  bookPartRecords,
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
  const confirmedChapters = chapters.filter((chapter) => chapter.public && chapter.slug);
  return (
    <PageShell meta={routeMetadata["/book"]}>
      <EditorialHero
        index="01 · The book"
        eyebrow="From Exile to Transformation"
        title="A memoir beyond techniques."
        summary="Fifteen chapters across six parts connect lived resilience, Fortune 500 foundations, GCC institution-building, practical frameworks, movement building, and the character required to carry authority. Forthcoming in 2026."
        image={{ src: recoveredAssets.book, alt: "Cover of From Exile to Transformation: A Memoir Beyond Techniques", caption: "Forthcoming · 15 chapters · 6 parts · 14 frameworks" }}
        actions={<><a className="button button-primary" href={`mailto:${siteIdentity.email}?subject=From%20Exile%20to%20Transformation%20waitlist`}>Join the early interest list <Mail aria-hidden="true" /></a><Link className="button button-quiet" to="/frameworks">Explore the framework library</Link></>}
      />

      {/* @section: book-parts */}
      <section className="inner-section">
        <div className="site-shell">
          <SectionHeading index="02 · Editorial architecture" eyebrow="Six content pillars" title="The memoir is the platform’s narrative and search anchor." copy="Each part becomes a coherent subject territory that connects chapter lessons to a relevant framework, practical resource, and service path." />
          <div className="book-part-grid">{bookPartRecords.map((part) => <article key={part.number}><span>{part.number}</span><h3>{part.title}</h3><p>{part.purpose}</p></article>)}</div>
        </div>
      </section>

      {/* @section: confirmed-book-chapters */}
      <section className="inner-section inner-section-stone">
        <div className="site-shell">
          <SectionHeading index="03 · Chapter index" eyebrow="Confirmed public records" title="Publish only what the manuscript confirms." copy="Two chapter titles are confirmed and public in the first build. The remaining thirteen stay private and unlinked until manuscript records are approved in Sanity." />
          <div className="chapter-list">{confirmedChapters.map((chapter) => <Link key={chapter.slug} to={`/book/${chapter.slug}`}><span>{String(chapter.number).padStart(2, "0")}</span><div><p>Confirmed chapter</p><h3>{chapter.title}</h3><small>{chapter.summary}</small></div><ArrowRight aria-hidden="true" /></Link>)}</div>
          <p className="status-note">13 chapter records remain pending manuscript approval. They have no public URLs and are excluded from the sitemap.</p>
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
