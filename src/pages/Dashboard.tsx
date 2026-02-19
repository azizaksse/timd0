import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts";
import {
  LayoutDashboard,
  TrendingUp,
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
import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import timdLogo from "@/assets/timd-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

type SidebarSection = "overview" | "orders" | "stock" | "clients" | "reports" | "insights";
type DetailMode = "kpi" | "order" | "insight" | "task";
type KpiId = "revenue" | "growth" | "margin" | "clients";
type OrderStatus = "completed" | "pending" | "processing";

const revenueData = [
  { month: "Jan", revenue: 4200, target: 4000 },
  { month: "Fev", revenue: 5800, target: 5200 },
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

const pieColors = ["#3b82f6", "#6366f1", "#0ea5e9", "#2563eb"];

const stockData = [
  { category: "Matieres premieres", stock: 78, capacity: 100 },
  { category: "Produits finis", stock: 45, capacity: 80 },
  { category: "Emballage", stock: 92, capacity: 100 },
  { category: "Consommables", stock: 33, capacity: 60 },
  { category: "Pieces detachees", stock: 56, capacity: 70 },
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
  { id: "#TM-1847", client: "SARL Benaissa", amount: "245 000", status: "completed" as OrderStatus, city: "Alger", payment: "Virement", items: 14, dueDate: "20 Feb", owner: "Nadia B." },
  { id: "#TM-1846", client: "EURL Hadj Ali", amount: "128 500", status: "pending" as OrderStatus, city: "Oran", payment: "Cheque", items: 8, dueDate: "22 Feb", owner: "Yacine K." },
  { id: "#TM-1845", client: "SPA Djezzy Dist.", amount: "890 000", status: "completed" as OrderStatus, city: "Setif", payment: "Virement", items: 31, dueDate: "19 Feb", owner: "Sofia H." },
  { id: "#TM-1844", client: "SARL Filaha Plus", amount: "67 200", status: "processing" as OrderStatus, city: "Blida", payment: "Especes", items: 5, dueDate: "24 Feb", owner: "Amine M." },
  { id: "#TM-1843", client: "EURL TechnoAlger", amount: "345 000", status: "completed" as OrderStatus, city: "Constantine", payment: "Virement", items: 19, dueDate: "21 Feb", owner: "Lina R." },
];

const aiInsights = [
  { type: "warning" as const, text: "Stock matieres premieres bas.", impact: "Risque de rupture 18%.", recommendation: "Lancer reapprovisionnement urgent." },
  { type: "success" as const, text: "Croissance CA +23%.", impact: "Marge projetee +2.1 pts.", recommendation: "Renforcer les campagnes performantes." },
  { type: "info" as const, text: "3 nouveaux prospects agro.", impact: "Pipeline potentiel 1.1M DZD.", recommendation: "Planifier demo sous 48h." },
];

const clientHighlights = [
  { name: "SARL Benaissa", segment: "Distribution", mrr: "620k DZD", risk: "Faible" },
  { name: "SPA Djezzy Dist.", segment: "Telecom", mrr: "1.4M DZD", risk: "Moyen" },
  { name: "EURL TechnoAlger", segment: "Tech", mrr: "740k DZD", risk: "Faible" },
  { name: "SARL Filaha Plus", segment: "Agro", mrr: "280k DZD", risk: "Eleve" },
];

const kpiCards = [
  { id: "revenue" as KpiId, icon: DollarSign, label: "Chiffre d'affaires", value: "8.9M DZD", change: "+12.4%", positive: true, rows: [["Objectif", "7.5M DZD"], ["Realise", "8.9M DZD"], ["Ecart", "+1.4M DZD"]], note: "Performance au-dessus de la cible." },
  { id: "growth" as KpiId, icon: TrendingUp, label: "Croissance", value: "+23%", change: "+5.2%", positive: true, rows: [["Nouveaux clients", "18"], ["Conversion", "14.6%"], ["Upsell", "27"]], note: "Tendance solide sur 30 jours." },
  { id: "margin" as KpiId, icon: Activity, label: "Marge nette", value: "18.2%", change: "-0.8%", positive: false, rows: [["Cout prod", "53%"], ["Cout log", "18%"], ["Cible", "19%"]], note: "Legere baisse due a la logistique." },
  { id: "clients" as KpiId, icon: Users, label: "Clients actifs", value: "147", change: "+8", positive: true, rows: [["Retention", "93%"], ["Nouveaux", "12"], ["Inactifs 30j", "9"]], note: "Base clients stable avec hausse nette." },
];

const sidebarItems = [
  { id: "overview" as SidebarSection, icon: LayoutDashboard, label: "Tableau de bord" },
  { id: "orders" as SidebarSection, icon: ShoppingCart, label: "Commandes" },
  { id: "stock" as SidebarSection, icon: Package, label: "Stock" },
  { id: "clients" as SidebarSection, icon: Users, label: "Clients" },
  { id: "reports" as SidebarSection, icon: BarChart3, label: "Rapports" },
  { id: "insights" as SidebarSection, icon: Brain, label: "IA Insights" },
];

const detailModeLabels: Record<DetailMode, string> = {
  kpi: "Detail KPI",
  order: "Detail commande",
  insight: "Detail insight",
  task: "Detail tache",
};
const insightDotStyles = { warning: "bg-amber-500", success: "bg-emerald-500", info: "bg-blue-500" };

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const styles = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
  };
  const labels = { completed: "Termine", pending: "En attente", processing: "En cours" };
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}>{labels[status]}</span>;
};

const KpiCard = ({
  icon: Icon,
  label,
  value,
  change,
  positive,
  active,
  onClick,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left bg-white border rounded-2xl p-5 transition-all duration-300 group shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${active ? "border-blue-400 shadow-blue-100" : "border-slate-200 hover:border-blue-300"}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
    <p className="text-xs text-slate-500 mt-1">{label}</p>
    <p className="text-[10px] text-blue-600 mt-3">Cliquer pour voir les details</p>
  </button>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SidebarSection>("overview");
  const [selectedKpi, setSelectedKpi] = useState<KpiId>("revenue");
  const [selectedOrderId, setSelectedOrderId] = useState(recentOrders[0].id);
  const [selectedInsightIndex, setSelectedInsightIndex] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<Id<"tasks"> | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [creatingTask, setCreatingTask] = useState(false);
  const [togglingTaskId, setTogglingTaskId] = useState<Id<"tasks"> | null>(null);
  const [detailMode, setDetailMode] = useState<DetailMode>("kpi");
  const { lang } = useLanguage();
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);

  const selectedKpiItem = kpiCards.find((item) => item.id === selectedKpi) ?? kpiCards[0];
  const selectedOrder = recentOrders.find((order) => order.id === selectedOrderId) ?? recentOrders[0];
  const selectedInsight = aiInsights[selectedInsightIndex] ?? aiInsights[0];
  const selectedTask = tasks?.find((task) => task._id === selectedTaskId) ?? null;
  const completedTasks = tasks?.filter((task) => task.completed).length ?? 0;
  const pendingTasks = (tasks?.length ?? 0) - completedTasks;

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setSelectedTaskId(null);
      return;
    }
    if (!selectedTaskId || !tasks.some((task) => task._id === selectedTaskId)) {
      setSelectedTaskId(tasks[0]._id);
    }
  }, [tasks, selectedTaskId]);

  const customTooltipStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    borderRadius: "12px",
    color: "#0f172a",
    fontSize: "12px",
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
  };

  const goToSection = (section: SidebarSection) => {
    setActiveSection(section);
    setSidebarOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openKpiDetails = (id: KpiId) => {
    setSelectedKpi(id);
    setDetailMode("kpi");
    setActiveSection("overview");
  };

  const openOrderDetails = (id: string) => {
    setSelectedOrderId(id);
    setDetailMode("order");
    setActiveSection("orders");
  };

  const openInsightDetails = (index: number) => {
    setSelectedInsightIndex(index);
    setDetailMode("insight");
    setActiveSection("insights");
  };

  const openTaskDetails = (taskId: Id<"tasks">) => {
    setSelectedTaskId(taskId);
    setDetailMode("task");
    setActiveSection("overview");
  };

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = newTaskText.trim();
    if (!text) return;
    try {
      setCreatingTask(true);
      await createTask({ text });
      setNewTaskText("");
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setCreatingTask(false);
    }
  };

  const handleToggleTask = async (taskId: Id<"tasks">) => {
    try {
      setTogglingTaskId(taskId);
      await toggleTask({ id: taskId });
      openTaskDetails(taskId);
    } catch (error) {
      console.error("Failed to toggle task", error);
    } finally {
      setTogglingTaskId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-200/30 rounded-full blur-[100px]" />
      </div>

      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white/90 backdrop-blur-sm p-5 relative z-10">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-slate-200" />
          <span className="text-lg font-bold text-slate-900">Timd</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-200 pt-4 space-y-1">
          <button type="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
            <Settings className="w-4 h-4" />
            Parametres
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
            <LogOut className="w-4 h-4" />
            Retour au site
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 h-full bg-white border-r border-slate-200 p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-3">
                <img src={timdLogo} alt="Timd" className="h-9 w-9 rounded-full object-cover border border-slate-200" />
                <span className="text-lg font-bold text-slate-900">Timd</span>
              </Link>
              <button type="button" onClick={() => setSidebarOpen(false)} className="text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <main className="flex-1 overflow-y-auto relative z-10">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button type="button" className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Tableau de bord
                </h1>
                <p className="text-xs text-slate-500">Vue d'ensemble interactive</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex text-[10px] font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                {detailModeLabels[detailMode]}
              </span>
              <LanguageSwitcher />
              <button type="button" className="relative w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <section id="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((item) => (
                <KpiCard
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  change={item.change}
                  positive={item.positive}
                  active={detailMode === "kpi" && selectedKpi === item.id}
                  onClick={() => openKpiDetails(item.id)}
                />
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Details dynamiques</h3>
                  <p className="text-xs text-slate-500">Clique sur un KPI, une commande, un insight ou une tache pour mettre a jour ce bloc.</p>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full">
                  {detailModeLabels[detailMode]}
                </span>
              </div>

              {detailMode === "kpi" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xl font-bold text-slate-900">{selectedKpiItem.value}</p>
                    <p className="text-sm text-slate-600 mt-2">{selectedKpiItem.note}</p>
                  </div>
                  <div className="space-y-2">
                    {selectedKpiItem.rows.map((row) => (
                      <div key={row[0]} className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                        <span className="text-xs text-slate-500">{row[0]}</span>
                        <span className="text-xs font-semibold text-slate-900">{row[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailMode === "order" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{selectedOrder.id}</p>
                      <StatusBadge status={selectedOrder.status} />
                    </div>
                    <p className="text-sm text-slate-700">{selectedOrder.client}</p>
                    <p className="text-xs text-slate-500">{selectedOrder.city}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-500">Montant</span><span className="text-xs font-semibold text-slate-900">{selectedOrder.amount} DZD</span></div>
                    <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-500">Paiement</span><span className="text-xs font-semibold text-slate-900">{selectedOrder.payment}</span></div>
                    <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-500">Articles</span><span className="text-xs font-semibold text-slate-900">{selectedOrder.items}</span></div>
                    <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-500">Charge</span><span className="text-xs font-semibold text-slate-900">{selectedOrder.owner}</span></div>
                    <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-500">Echeance</span><span className="text-xs font-semibold text-slate-900">{selectedOrder.dueDate}</span></div>
                  </div>
                </div>
              )}

              {detailMode === "insight" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${insightDotStyles[selectedInsight.type]}`} />
                      <p className="text-xs uppercase tracking-wider text-slate-500">{selectedInsight.type}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-900">{selectedInsight.text}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="border border-slate-200 rounded-xl px-3 py-2"><p className="text-[11px] text-slate-500">Impact</p><p className="text-xs font-medium text-slate-900 mt-1">{selectedInsight.impact}</p></div>
                    <div className="border border-slate-200 rounded-xl px-3 py-2"><p className="text-[11px] text-slate-500">Action recommandee</p><p className="text-xs font-medium text-slate-900 mt-1">{selectedInsight.recommendation}</p></div>
                  </div>
                </div>
              )}

              {detailMode === "task" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTask ? (
                    <>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Tache Convex</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${selectedTask.completed ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                            {selectedTask.completed ? "Terminee" : "A faire"}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900">{selectedTask.text}</p>
                        <p className="text-xs text-slate-500">
                          Creee le {new Date(selectedTask.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                          <span className="text-xs text-slate-500">Total</span>
                          <span className="text-xs font-semibold text-slate-900">{tasks?.length ?? 0}</span>
                        </div>
                        <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                          <span className="text-xs text-slate-500">Terminees</span>
                          <span className="text-xs font-semibold text-emerald-700">{completedTasks}</span>
                        </div>
                        <div className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                          <span className="text-xs text-slate-500">En attente</span>
                          <span className="text-xs font-semibold text-amber-700">{pendingTasks}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleTask(selectedTask._id)}
                          disabled={togglingTaskId === selectedTask._id}
                          className="w-full text-xs rounded-xl border border-blue-200 bg-blue-50 text-blue-700 px-3 py-2 hover:bg-blue-100 disabled:opacity-60"
                        >
                          {togglingTaskId === selectedTask._id ? "Mise a jour..." : selectedTask.completed ? "Marquer a faire" : "Marquer terminee"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Aucune tache selectionnee.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Taches equipe (Convex live)</h3>
                  <p className="text-xs text-slate-500">Donnees temps reel depuis Convex pour suivi operationnel.</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full">
                  {tasks === undefined ? "Sync..." : `${completedTasks}/${tasks.length} terminees`}
                </span>
              </div>

              <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(event) => setNewTaskText(event.target.value)}
                  placeholder="Ajouter une tache equipe..."
                  className="flex-1 h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <button
                  type="submit"
                  disabled={creatingTask || !newTaskText.trim()}
                  className="h-10 rounded-xl px-4 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {creatingTask ? "Ajout..." : "Ajouter"}
                </button>
              </form>

              <div className="mt-4 space-y-2">
                {tasks === undefined && <p className="text-xs text-slate-500">Chargement des taches...</p>}
                {tasks !== undefined && tasks.length === 0 && (
                  <p className="text-xs text-slate-500">Aucune tache pour le moment. Creez-en une.</p>
                )}
                {tasks?.map((task) => (
                  <div
                    key={task._id}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 transition-colors ${
                      detailMode === "task" && selectedTaskId === task._id ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => openTaskDetails(task._id)}
                      className="flex-1 text-left"
                    >
                      <p className={`text-sm ${task.completed ? "text-slate-500 line-through" : "text-slate-900"}`}>{task.text}</p>
                      <p className="text-[11px] text-slate-500">Mis a jour en direct</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task._id)}
                      disabled={togglingTaskId === task._id}
                      className="text-[11px] rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                    >
                      {togglingTaskId === task._id ? "..." : task.completed ? "Reouvrir" : "Terminer"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="insights" className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-semibold text-blue-700">Recommandations IA</h3>
            </div>
            <div className="space-y-2">
              {aiInsights.map((insight, index) => (
                <button
                  key={insight.text}
                  type="button"
                  onClick={() => openInsightDetails(index)}
                  className={`w-full text-left flex items-start gap-3 text-xs leading-relaxed px-2 py-2 rounded-xl transition-colors ${
                    detailMode === "insight" && selectedInsightIndex === index ? "bg-white text-slate-800 border border-blue-200" : "text-slate-600 hover:bg-white/70"
                  }`}
                >
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${insightDotStyles[insight.type]}`} />
                  {insight.text}
                </button>
              ))}
            </div>
          </section>

          <section id="reports" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-slate-900">Chiffre d'affaires vs Objectif</h3>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">7 derniers mois</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(71,85,105,0.9)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(71,85,105,0.9)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revGrad)" strokeWidth={2} name="CA (k DZD)" />
                  <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Objectif" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">Repartition departements</h3>
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
                  <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                    {d.name} ({d.value}%)
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section id="stock" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">Niveaux de stock</h3>
              <div className="space-y-4">
                {stockData.map((item) => {
                  const pct = Math.round((item.stock / item.capacity) * 100);
                  const isLow = pct < 50;
                  return (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-600">{item.category}</span>
                        <span className={`text-xs font-medium ${isLow ? "text-amber-600" : "text-emerald-600"}`}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${isLow ? "bg-amber-500" : "bg-blue-600"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section id="orders" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-slate-900">Commandes recentes</h3>
                <button type="button" onClick={() => goToSection("orders")} className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => openOrderDetails(order.id)}
                    className={`w-full text-left flex items-center justify-between py-2 px-2 rounded-xl border transition-all ${
                      detailMode === "order" && selectedOrderId === order.id ? "border-blue-200 bg-blue-50" : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-slate-700 mt-0.5 truncate">{order.client}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 ms-4">
                      {order.amount} <span className="text-[10px] text-slate-400">DZD</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section id="clients" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Details clients</h3>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Top comptes du mois</span>
            </div>
            <div className="space-y-2">
              {clientHighlights.map((client) => (
                <div key={client.name} className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{client.name}</p>
                    <p className="text-xs text-slate-500">{client.segment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-900">{client.mrr}</p>
                    <p className={`text-[11px] ${client.risk === "Eleve" ? "text-red-600" : client.risk === "Moyen" ? "text-amber-600" : "text-emerald-600"}`}>
                      Risque {client.risk}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-5">Activite du jour</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "rgba(71,85,105,0.9)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "rgba(71,85,105,0.9)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Commandes" />
                <Bar dataKey="returns" fill="#ef4444" radius={[4, 4, 0, 0]} name="Retours" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
