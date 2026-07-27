import { useMemo, useState } from "react";
import { BarChart3, CheckCircle2, Edit3, Globe2, Plus, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type CrmReferenceRow = {
  cells: string[];
  status: string;
};

type CrmReferenceTab = {
  id: string;
  label: string;
  heading: string;
  description: string;
  action: string;
  actions?: string[];
  columns: string[];
  rows: CrmReferenceRow[];
};

type CrmReferenceMetric = {
  label: string;
  value: string;
  source: string;
};

type CrmReferenceSite = {
  id: string;
  label: string;
  caption: string;
  badge?: string;
  metrics: CrmReferenceMetric[];
  tabs: CrmReferenceTab[];
};

export type CrmReferenceFixture = {
  eyebrow: string;
  title: string;
  description: string;
  tabs: CrmReferenceTab[];
  sites?: CrmReferenceSite[];
};

export function CrmScenarioReference({ fixture }: { fixture: CrmReferenceFixture }) {
  const defaultTab = fixture.tabs[0]?.id;
  const sites = fixture.sites?.length ? fixture.sites : [fallbackSite(fixture)];
  const [siteID, setSiteID] = useState(sites[0].id);
  const activeSite = useMemo(() => sites.find((site) => site.id === siteID) ?? sites[0], [siteID, sites]);

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 py-5 text-foreground sm:px-7 sm:py-7 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-5 rounded-lg bg-[#040817] px-5 py-4 text-white shadow-lg sm:px-8">
          <h1 className="text-2xl font-semibold">CRM</h1>
        </header>

        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-4 flex h-auto w-full max-w-full justify-start gap-2 overflow-x-auto rounded-lg bg-[#040817] p-1 text-slate-300">
            {fixture.tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-9 shrink-0 gap-2 px-3 text-sm text-slate-300 data-[state=active]:bg-white data-[state=active]:text-slate-950 sm:px-4"
              >
                <BarChart3 className="size-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Website selector">
            {sites.map((site) => {
              const selected = site.id === activeSite.id;
              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => setSiteID(site.id)}
                  className={[
                    "min-h-20 rounded-lg border bg-background px-4 py-3 text-left shadow-sm transition",
                    selected ? "border-rose-400 ring-2 ring-rose-400/35" : "border-border hover:border-slate-400",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">{site.label}</span>
                    {site.badge ? <Badge variant="secondary">{site.badge}</Badge> : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{site.caption}</p>
                </button>
              );
            })}
          </div>

          {fixture.tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <SiteTabContent site={activeSite} tab={resolveSiteTab(activeSite, tab)} />

              {tab.id !== "overview" ? (
                <div className="mt-4 rounded-lg border border-dashed bg-background/70 p-4 text-sm text-muted-foreground">
                  <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                    <ShieldAlert className="size-4" /> Generated implementation requirements
                  </div>
                  Create and edit actions open labelled forms. Archive, cancel, revoke, close, or no-show actions ask for confirmation.
                  Buttons are scoped to the selected site and row, impossible actions are disabled, mutation errors remain visible, and successful mutations
                  refresh the affected website tab with the exact saved values.
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}

function SiteTabContent({ site, tab }: { site: CrmReferenceSite; tab: CrmReferenceTab }) {
  if (tab.id === "overview") {
    return (
      <div className="space-y-5">
        <section className="grid gap-4 md:grid-cols-3">
          {site.metrics.map((metric) => (
            <Card key={metric.label} className="rounded-lg shadow-none">
              <CardHeader className="pb-2">
                <CardDescription className="font-medium uppercase tracking-[0.18em] text-orange-600">{metric.source}</CardDescription>
                <CardTitle className="text-lg">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </section>
        <ReferenceTable site={site} tab={tab} />
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <Card className="rounded-lg shadow-none">
        <CardHeader>
          <CardDescription className="font-medium uppercase tracking-[0.18em] text-orange-600">{site.label}</CardDescription>
          <CardTitle className="text-lg">{tab.action}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {tab.columns.slice(0, 4).map((column, index) => (
              <div key={column} className="space-y-2">
                <Label htmlFor={`${site.id}-${tab.id}-${index}`}>{column}</Label>
                <Input id={`${site.id}-${tab.id}-${index}`} value={tab.rows[0]?.cells[index] ?? ""} readOnly />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${site.id}-${tab.id}-note`}>Operator note</Label>
            <Textarea id={`${site.id}-${tab.id}-note`} value={`Apply this change only to ${site.label}.`} readOnly rows={3} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary"><CheckCircle2 className="mr-1 size-3" /> loading</Badge>
            <Badge variant="secondary"><CheckCircle2 className="mr-1 size-3" /> error</Badge>
            <Badge variant="secondary"><CheckCircle2 className="mr-1 size-3" /> refresh</Badge>
          </div>
          <Button size="sm"><Plus /> {tab.action}</Button>
        </CardContent>
      </Card>
      <ReferenceTable site={site} tab={tab} />
    </div>
  );
}

function ReferenceTable({ site, tab }: { site: CrmReferenceSite; tab: CrmReferenceTab }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg py-0 shadow-none">
      <CardHeader className="gap-4 border-b px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-orange-600">
              <Globe2 className="size-4" /> {site.label}
            </div>
            <CardTitle className="text-lg">{tab.heading}</CardTitle>
            <CardDescription className="mt-1.5">{tab.description}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm"><Plus /> {tab.action}</Button>
            {tab.id !== "overview" ? (
              <Button size="sm" variant="outline"><Edit3 /> Edit selected</Button>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader className="bg-muted/35">
            <TableRow>
              {tab.columns.map((column) => <TableHead key={column}>{column}</TableHead>)}
              <TableHead>Status</TableHead>
              <TableHead>Row actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tab.rows.map((row) => (
              <TableRow key={row.cells[0]}>
                {row.cells.map((cell) => <TableCell key={cell}>{cell}</TableCell>)}
                <TableCell><Badge variant="secondary">{row.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {(tab.actions ?? [tab.action]).slice(0, 3).map((action) => (
                      <Button key={action} size="sm" variant={/archive|cancel|revoke|close|no-show/i.test(action) ? "outline" : "secondary"}>
                        {action}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function resolveSiteTab(site: CrmReferenceSite, baseTab: CrmReferenceTab) {
  return site.tabs.find((tab) => tab.id === baseTab.id) ?? baseTab;
}

function fallbackSite(fixture: CrmReferenceFixture): CrmReferenceSite {
  return {
    id: "all",
    label: "All websites",
    caption: "Aggregated CRM view for every connected website.",
    badge: "Total",
    metrics: fixture.tabs[0]?.rows.map((row) => ({ label: row.cells[0], value: row.cells[1] ?? "-", source: row.cells[2] ?? "CRM" })) ?? [],
    tabs: fixture.tabs,
  };
}
