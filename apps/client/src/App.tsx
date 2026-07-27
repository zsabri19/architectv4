import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Index from "./pages/home/Index";
import NotFound from "./pages/not-found/Index";
import {
  ArchitectPage,
  BookPage,
  ChapterDetailPage,
  ClarityOsPage,
  ContactPage,
  FrameworkDetailPage,
  FrameworksPage,
  InsightDetailPage,
  InsightsPage,
  MediaPage,
  NewsletterPage,
  ServicesPage,
} from "./pages/authority/Index";

const queryClient = new QueryClient();

/* @section: reusable-detail-route-adapters */
const FrameworkDetailRoute = () => <FrameworkDetailPage slug={useParams<{ slug: string }>().slug ?? ""} />;
const InsightDetailRoute = () => <InsightDetailPage slug={useParams<{ slug: string }>().slug ?? ""} />;
const ChapterDetailRoute = () => <ChapterDetailPage slug={useParams<{ slug: string }>().slug ?? ""} />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* @section: canonical-authority-routes */}
          <Route path="/the-architect" element={<ArchitectPage />} />
          <Route path="/clarityos" element={<ClarityOsPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book/:slug" element={<ChapterDetailRoute />} />
          <Route path="/frameworks" element={<FrameworksPage />} />
          <Route path="/frameworks/:slug" element={<FrameworkDetailRoute />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetailRoute />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* @section: legacy-route-redirects */}
          <Route path="/architect" element={<Navigate to="/the-architect" replace />} />
          <Route path="/memoir" element={<Navigate to="/book" replace />} />
          <Route path="/advisory" element={<Navigate to="/services" replace />} />
          <Route path="/dispatch" element={<Navigate to="/newsletter" replace />} />
          <Route path="/connect" element={<Navigate to="/contact" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
