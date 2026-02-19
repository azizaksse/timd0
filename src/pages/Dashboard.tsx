import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  BarChart3,
  Brain,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import timdLogo from "@/assets/timd-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";
import { exportToCSV, exportElementToPDF, exportTableToPDF } from "@/lib/exportUtils";
import { useOnboardingTour } from "@/hooks/useOnboardingTour";

// --- Mock Data ---
const revenueData = [
  { month: "Jan", revenue: 4200, target: 4000 },
  { month: "Fév", revenue: 5800, target: 5200 },
  { month: "Mar", revenue: 5200, target: 5500 },
  { month: "Avr", revenue: 7100, target: 6000 },
  { month: "Mai", revenue: 6800, target: 6500 },
  { month: "Jun", revenue: 8900, target: 7000 },
  { month: "Jul", revenue: 9200, target: 7500 },
];

const departmentData = [
  { name: "Ventes", value: 42 },
  { name: "Stock", value: 28 },
  { name: "RH", value: 15 },
  { name: "Finance", value: 15 },
];

const pieColors = ["#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe"];

const stockData = [
  { category: "Matières premières", stock: 78, capacity: 100 },
  { category: "Produits finis", stock: 45, capacity: 80 },
  { category: "Emballage", stock: 92, capacity: 100 },
  { category: "Consommables", stock: 33, capacity: 60 },
  { category: "Pièces détachées", stock: 56, capacity: 70 },
];

const activityData = [
  { hour: "08h", orders: 12, returns: 2 },
  { hour: "10h", orders: 28, returns: 5 },
  { hour: "12h", orders: 35, returns: 3 },
  { hour: "14h", orders: 22, returns: 4 },
  { hour: "16h", orders: 40, returns: 6 },
  { hour: "18h", orders: 30, returns: 2 },
];

const recentOrders = [
  { id: "#TM-1847", client: "SARL Benaissa", amount: "245 000", status: "completed" },
  { id: "#TM-1846", client: "EURL Hadj Ali", amount: "128 500", status: "pending" },
  { id: "#TM-1845", client: "SPA Djezzy Dist.", amount: "890 000", status: "completed" },
  { id: "#TM-1844", client: "SARL Filaha Plus", amount: "67 200", status: "processing" },
  { id: "#TM-1843", client: "EURL TechnoAlger", amount: "345 000", status: "completed" },
];

const aiInsights = [
  { type: "warning", text: "Stock matières premières bas — réapprovisionnement recommandé sous 5 jours." },
  { type: "success", text: "Croissance CA +23% ce trimestre — objectif Q2 atteint avec 2 semaines d'avance." },
  { type: "info", text: "3 nouveaux prospects identifiés dans le secteur agroalimentaire." },
];

// --- Components ---

const KpiCard = ({
  icon: Icon,
  label,
  value,
  change,
  positive,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-600" : "text-red-500"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const labels: Record<string, string> = {
    completed: "Terminé",
    pending: "En attente",
    processing: "En cours",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const sidebarItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", active: true },
  { icon: ShoppingCart, label: "Commandes", active: false },
  { icon: Package, label: "Stock", active: false },
  { icon: Users, label: "Clients", active: false },
  { icon: BarChart3, label: "Rapports", active: false },
  { icon: Brain, label: "IA Insights", active: false },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lang } = useLanguage();

  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const { startTour, shouldShowTour, resetTour } = useOnboardingTour();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShowTour()) {
        startTour();
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleExportCSV = () => {
    // Export KPIs
    exportToCSV("timd-kpis", ["Indicateur", "Valeur", "Variation"], [
      ["Chiffre d'affaires", "8.9M DZD", "+12.4%"],
      ["Croissance", "+23%", "+5.2%"],
      ["Marge nette", "18.2%", "-0.8%"],
      ["Clients actifs", "147", "+8"],
    ]);
  };

  const handleExportRevenueCSV = () => {
    exportToCSV("timd-revenue", ["Mois", "CA (k DZD)", "Objectif (k DZD)"],
      revenueData.map(r => [r.month, String(r.revenue), String(r.target)])
    );
  };

  const handleExportOrdersCSV = () => {
    exportToCSV("timd-commandes", ["ID", "Client", "Montant (DZD)", "Statut"],
      recentOrders.map(o => [o.id, o.client, o.amount, o.status])
    );
  };

  const handleExportOrdersPDF = () => {
    exportTableToPDF("timd-commandes", "Commandes récentes — Timd",
      ["ID", "Client", "Montant (DZD)", "Statut"],
      recentOrders.map(o => [o.id, o.client, o.amount, o.status])
    );
  };

  const handleExportDashboardPDF = () => {
    exportElementToPDF("dashboard-content", "timd-tableau-de-bord");
  };

  const handleExportStockCSV = () => {
    exportToCSV("timd-stock", ["Catégorie", "Stock", "Capacité", "Taux (%)"],
      stockData.map(s => [s.category, String(s.stock), String(s.capacity), String(Math.round((s.stock / s.capacity) * 100))])
    );
  };

  const customTooltipStyle = {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    color: "#1f2937",
    fontSize: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex" dir={lang === "ar" ? "rtl" : "ltr"}>

      {/* Sidebar - Desktop */}
      <aside id="tour-sidebar" className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white p-5 relative z-10">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-gray-200" />
          <span className="text-lg font-bold text-gray-900">Timd</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-200 pt-4 space-y-1">
          <button
            onClick={() => { resetTour(); startTour(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-purple-500 hover:text-purple-700 hover:bg-purple-50 transition-all"
          >
            <ChevronRight className="w-4.5 h-4.5" />
            Relancer le tour
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
            <Settings className="w-4.5 h-4.5" />
            Paramètres
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
            <LogOut className="w-4.5 h-4.5" />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 h-full bg-white border-r border-gray-200 p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-3">
                <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-gray-200" />
                <span className="text-lg font-bold text-gray-900">Timd</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    item.active
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4.5 h-4.5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Tableau de bord
                </h1>
                <p className="text-xs text-gray-400">Vue d'ensemble · Mis à jour il y a 2 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div id="tour-export" className="relative">
                <button
                  onClick={() => setExportMenuOpen(!exportMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exporter
                </button>
                {exportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30">
                    <button onClick={() => { handleExportDashboardPDF(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileText className="w-3.5 h-3.5 text-red-500" /> Dashboard complet (PDF)
                    </button>
                    <button onClick={() => { handleExportCSV(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> KPIs (CSV)
                    </button>
                    <button onClick={() => { handleExportRevenueCSV(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Chiffre d'affaires (CSV)
                    </button>
                    <button onClick={() => { handleExportStockCSV(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Stock (CSV)
                    </button>
                    <button onClick={() => { handleExportOrdersCSV(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Commandes (CSV)
                    </button>
                    <button onClick={() => { handleExportOrdersPDF(); setExportMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50">
                      <FileText className="w-3.5 h-3.5 text-red-500" /> Commandes (PDF)
                    </button>
                  </div>
                )}
              </div>
              <LanguageSwitcher />
              <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
            </div>
          </div>
        </header>

        <div id="dashboard-content" className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* KPI Row */}
          <div id="tour-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={DollarSign} label="Chiffre d'affaires" value="8.9M DZD" change="+12.4%" positive />
            <KpiCard icon={TrendingUp} label="Croissance" value="+23%" change="+5.2%" positive />
            <KpiCard icon={Activity} label="Marge nette" value="18.2%" change="-0.8%" positive={false} />
            <KpiCard icon={Users} label="Clients actifs" value="147" change="+8" positive />
          </div>

          {/* AI Insights */}
          <div id="tour-ai-insights" className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-700">Recommandations IA</h3>
            </div>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                    insight.type === "warning" ? "bg-amber-500" : insight.type === "success" ? "bg-emerald-500" : "bg-blue-500"
                  }`} />
                  {insight.text}
                </div>
              ))}
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue chart - 2 cols */}
            <div id="tour-revenue-chart" className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-gray-900">Chiffre d'affaires vs Objectif</h3>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">7 derniers mois</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#revGrad)" strokeWidth={2} name="CA (k DZD)" />
                  <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Objectif" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Department pie */}
            <div id="tour-department-chart" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-5">Répartition par département</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {departmentData.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {departmentData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                    {d.name} ({d.value}%)
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stock levels */}
            <div id="tour-stock" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-5">Niveaux de stock</h3>
              <div className="space-y-4">
                {stockData.map((item) => {
                  const pct = Math.round((item.stock / item.capacity) * 100);
                  const isLow = pct < 50;
                  return (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-500">{item.category}</span>
                        <span className={`text-xs font-medium ${isLow ? "text-amber-600" : "text-emerald-600"}`}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isLow ? "bg-amber-400" : "bg-purple-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent orders */}
            <div id="tour-orders" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-gray-900">Commandes récentes</h3>
                <button className="text-[10px] text-purple-600 hover:text-purple-500 flex items-center gap-1 transition-colors">
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-gray-700 mt-0.5 truncate">{order.client}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 ms-4">{order.amount} <span className="text-[10px] text-gray-400">DZD</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity chart */}
          <div id="tour-activity" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Activité du jour</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Commandes" />
                <Bar dataKey="returns" fill="#f87171" radius={[4, 4, 0, 0]} name="Retours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
