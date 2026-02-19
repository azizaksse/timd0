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
} from "lucide-react";
import { useState } from "react";
import timdLogo from "@/assets/timd-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

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

const pieColors = ["#a78bfa", "#7c3aed", "#c4b5fd", "#5b21b6"];

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
  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-white/40 mt-1">{label}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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

  const customTooltipStyle = {
    backgroundColor: "rgba(15, 10, 30, 0.95)",
    border: "1px solid rgba(167, 139, 250, 0.2)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
  };

  return (
    <div className="min-h-screen bg-[#0a0814] text-white flex" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/6 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 relative z-10">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-white/10" />
          <span className="text-lg font-bold text-white">Timd</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                item.active
                  ? "bg-purple-500/10 text-purple-300 font-medium"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/[0.06] pt-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
            <Settings className="w-4.5 h-4.5" />
            Paramètres
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
            <LogOut className="w-4.5 h-4.5" />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 h-full bg-[#0a0814] border-r border-white/[0.06] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-3">
                <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-white/10" />
                <span className="text-lg font-bold text-white">Timd</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-white/40">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    item.active
                      ? "bg-purple-500/10 text-purple-300 font-medium"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
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
        <header className="sticky top-0 z-20 bg-[#0a0814]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Tableau de bord
                </h1>
                <p className="text-xs text-white/40">Vue d'ensemble · Mis à jour il y a 2 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={DollarSign} label="Chiffre d'affaires" value="8.9M DZD" change="+12.4%" positive />
            <KpiCard icon={TrendingUp} label="Croissance" value="+23%" change="+5.2%" positive />
            <KpiCard icon={Activity} label="Marge nette" value="18.2%" change="-0.8%" positive={false} />
            <KpiCard icon={Users} label="Clients actifs" value="147" change="+8" positive />
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-500/[0.08] to-violet-500/[0.04] border border-purple-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-purple-300">Recommandations IA</h3>
            </div>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-white/60 leading-relaxed">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                    insight.type === "warning" ? "bg-amber-400" : insight.type === "success" ? "bg-emerald-400" : "bg-blue-400"
                  }`} />
                  {insight.text}
                </div>
              ))}
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue chart - 2 cols */}
            <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white">Chiffre d'affaires vs Objectif</h3>
                <span className="text-[10px] text-white/30 bg-white/[0.06] px-2 py-0.5 rounded-full">7 derniers mois</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Area type="monotone" dataKey="revenue" stroke="#a78bfa" fill="url(#revGrad)" strokeWidth={2} name="CA (k DZD)" />
                  <Line type="monotone" dataKey="target" stroke="#4ade80" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Objectif" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Department pie */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-5">Répartition par département</h3>
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
                  <div key={d.name} className="flex items-center gap-2 text-xs text-white/50">
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
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-5">Niveaux de stock</h3>
              <div className="space-y-4">
                {stockData.map((item) => {
                  const pct = Math.round((item.stock / item.capacity) * 100);
                  const isLow = pct < 50;
                  return (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-white/50">{item.category}</span>
                        <span className={`text-xs font-medium ${isLow ? "text-amber-400" : "text-emerald-400"}`}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
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
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white">Commandes récentes</h3>
                <button className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white/30">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-white/70 mt-0.5 truncate">{order.client}</p>
                    </div>
                    <span className="text-sm font-semibold text-white ms-4">{order.amount} <span className="text-[10px] text-white/30">DZD</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity chart */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-5">Activité du jour</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="orders" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Commandes" />
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
