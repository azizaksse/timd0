import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { convexClient } from "@/lib/convex";

const queryClient = new QueryClient();

const DashboardUnavailable = () => (
  <main className="min-h-screen bg-slate-50 px-6 py-16">
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">Dashboard indisponible</h1>
      <p className="mt-2 text-sm text-slate-600">
        Convex n&apos;est pas configure. Ajoute <code className="font-mono">VITE_CONVEX_URL</code> (ou{" "}
        <code className="font-mono">VITE_CONVEX_SITE_URL</code>) dans les variables d&apos;environnement Vercel, puis redeploie.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-800 hover:bg-slate-200"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  </main>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={convexClient ? <Dashboard /> : <DashboardUnavailable />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
