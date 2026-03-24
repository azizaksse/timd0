import { useState, useEffect, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import timdLogo from "@/assets/timd-logo.png";
import {
  LayoutDashboard, Users, Package, DollarSign, BarChart3, Brain,
  Bell, Settings, LogOut, ChevronRight, ChevronDown, TrendingUp, Activity,
  ShoppingCart, FileText, Briefcase, Calendar, Clock, UserCheck,
  Wallet, FolderKanban, Menu, X, Search, Plus, ArrowUpRight, ArrowDownRight,
  Building2, Cpu, CircleAlert, CircleCheck, Info, Trash2,
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Types ──────────────────────────────────────────────────────────────────
type Module =
  | "dashboard" | "employees" | "attendance" | "leaves" | "expenses" | "payroll" | "hiring"
  | "clients" | "orders" | "projects" | "invoices"
  | "stock" | "reports" | "insights";

interface SidebarGroup { label: string; items: { id: Module; icon: typeof Users; label: string }[] }

// ─── Sidebar config ──────────────────────────────────────────────────────────
const SIDEBAR: SidebarGroup[] = [
  { label: "", items: [{ id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" }] },
  {
    label: "Gestion RH",
    items: [
      { id: "employees", icon: Users, label: "Employes" },
      { id: "attendance", icon: UserCheck, label: "Presences" },
      { id: "leaves", icon: Calendar, label: "Conges" },
      { id: "expenses", icon: Wallet, label: "Depenses" },
      { id: "payroll", icon: DollarSign, label: "Paie" },
    ],
  },
  {
    label: "Commercial / CRM",
    items: [
      { id: "clients", icon: Building2, label: "Clients" },
      { id: "orders", icon: ShoppingCart, label: "Commandes" },
      { id: "projects", icon: FolderKanban, label: "Projets" },
      { id: "invoices", icon: FileText, label: "Factures" },
    ],
  },
  {
    label: "Operations",
    items: [{ id: "stock", icon: Package, label: "Stock" }],
  },
  {
    label: "Intelligence",
    items: [
      { id: "reports", icon: BarChart3, label: "Rapports" },
      { id: "insights", icon: Brain, label: "IA Insights" },
    ],
  },
];

// ─── Chart data (static KPIs for reports) ───────────────────────────────────
const revenueData = [
  { month: "Oct", ca: 4200, obj: 4000 }, { month: "Nov", ca: 5800, obj: 5200 },
  { month: "Dec", ca: 5200, obj: 5500 }, { month: "Jan", ca: 7100, obj: 6000 },
  { month: "Fev", ca: 6800, obj: 6500 }, { month: "Mar", ca: 8900, obj: 7000 },
];
const activityData = [
  { h: "8h", cmd: 12 }, { h: "10h", cmd: 28 }, { h: "12h", cmd: 35 },
  { h: "14h", cmd: 22 }, { h: "16h", cmd: 40 }, { h: "18h", cmd: 18 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const Badge = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>{label}</span>
);

const statusColors: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700", paid: "bg-emerald-100 text-emerald-700",
  approved: "bg-emerald-100 text-emerald-700", active: "bg-emerald-100 text-emerald-700",
  present: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700", unpaid: "bg-amber-100 text-amber-700",
  on_hold: "bg-amber-100 text-amber-700", half_day: "bg-amber-100 text-amber-700", late: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700", draft: "bg-slate-100 text-slate-600",
  overdue: "bg-red-100 text-red-700", rejected: "bg-red-100 text-red-700",
  inactive: "bg-slate-100 text-slate-500", on_leave: "bg-purple-100 text-purple-700",
  absent: "bg-red-100 text-red-700", cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  completed: "Terminé", paid: "Payé", approved: "Approuvé", active: "Actif", present: "Présent",
  pending: "En attente", unpaid: "Impayé", on_hold: "En pause", half_day: "Demi-journée", late: "En retard",
  processing: "En cours", draft: "Brouillon", overdue: "En retard", rejected: "Refusé",
  inactive: "Inactif", on_leave: "En congé", absent: "Absent", cancelled: "Annulé",
};

const Stat = ({ label, value, change, positive }: { label: string; value: string; change?: string; positive?: boolean }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && (
      <p className={`text-xs mt-1 flex items-center gap-1 ${positive ? "text-emerald-600" : "text-red-500"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </p>
    )}
  </div>
);

const TableWrap = ({ head, children }: { head: string[]; children: React.ReactNode }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>{head.map((h) => <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-gray-100">{children}</tbody>
    </table>
  </div>
);

const Row = ({ cols }: { cols: React.ReactNode[] }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    {cols.map((c, i) => <td key={i} className="px-4 py-3 text-gray-700">{c}</td>)}
  </tr>
);

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-5">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ─── Dashboard Main Component ────────────────────────────────────────────────
const Dashboard = () => {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Gestion RH": true, "Commercial / CRM": true, "Operations": true, "Intelligence": true,
  });
  const [seeded, setSeeded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [modals, setModals] = useState({ emp: false, order: false, client: false, inv: false, proj: false, exp: false });
  const closeModal = (key: keyof typeof modals) => setModals({ ...modals, [key]: false });

  // ── Queries ──
  const employees = useQuery(api.employees.list);
  const orders = useQuery(api.orders.list);
  const clients = useQuery(api.clients.list);
  const stockItems = useQuery(api.stock.list);
  const insights = useQuery(api.insights.list);
  const kpis = useQuery(api.kpis.list);
  const leaves = useQuery(api.leaves.list);
  const invoices = useQuery(api.invoices.list);
  const projects = useQuery(api.projects.list);
  const expensesList = useQuery(api.expensesFn.list);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayAttendance = useQuery(api.attendance.listByDate, { date: todayStr });

  // ── Mutations ──
  const seedAll = useMutation(api.seed.seedAll);
  
  const approveLeave = useMutation(api.leaves.updateStatus);
  const updateInvoiceStatus = useMutation(api.invoices.updateStatus);
  const updateOrderStatus = useMutation(api.orders.updateStatus);

  const createEmployee = useMutation(api.employees.create);
  const createOrder = useMutation(api.orders.create);
  const createClient = useMutation(api.clients.create);
  const createInvoice = useMutation(api.invoices.create);
  const createProject = useMutation(api.projects.create);
  const createExpense = useMutation(api.expensesFn.create);

  const removeEmployee = useMutation(api.employees.remove);
  const removeOrder = useMutation(api.orders.remove);
  const removeClient = useMutation(api.clients.remove);
  const removeInvoice = useMutation(api.invoices.remove);
  const removeProject = useMutation(api.projects.remove);
  const removeExpense = useMutation(api.expensesFn.remove);
  const removeAttendance = useMutation(api.attendance.remove);
  const removeLeave = useMutation(api.leaves.remove);

  // Auto-seed
  useEffect(() => {
    if (!seeded && employees !== undefined && employees.length === 0) {
      setSeeded(true);
      seedAll({}).catch(console.error);
    }
    if (employees !== undefined && employees.length > 0) setSeeded(true);
  }, [employees, seeded, seedAll]);

  const toggleGroup = (label: string) => setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  const go = (mod: Module) => { setActiveModule(mod); setSidebarOpen(false); };

  // Computed stats
  const presentToday = todayAttendance?.filter((a) => a.status === "present" || a.status === "late" || a.status === "half_day").length ?? 0;
  const totalEmp = employees?.length ?? 0;
  const attendanceRate = totalEmp > 0 ? Math.round((presentToday / totalEmp) * 100) : 0;
  const pendingLeaves = leaves?.filter((l) => l.status === "pending").length ?? 0;
  const totalRevenue = invoices?.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.total, 0) ?? 0;
  const unpaidInvoices = invoices?.filter((i) => i.status === "unpaid" || i.status === "overdue").length ?? 0;
  const activeProjects = projects?.filter((p) => p.status === "active").length ?? 0;
  const tooltipStyle = { backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: 11 };

  // ── Form Submit Handlers ──
  const handleCreateEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createEmployee({ name: fd.get("name") as string, role: fd.get("role") as string, department: fd.get("department") as string, email: fd.get("email") as string, phone: fd.get("phone") as string, salary: Number(fd.get("salary")), joinDate: todayStr });
    closeModal("emp");
  };

  const handleCreateOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createOrder({ orderId: `#TM-${Math.floor(Math.random() * 10000)}`, client: fd.get("client") as string, amount: fd.get("amount") as string, status: "pending", city: fd.get("city") as string, payment: fd.get("payment") as string, items: Number(fd.get("items")), dueDate: fd.get("dueDate") as string, owner: "Admin Timd" });
    closeModal("order");
  };

  const handleCreateClient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createClient({ name: fd.get("name") as string, segment: fd.get("segment") as string, mrr: fd.get("mrr") as string, risk: fd.get("risk") as any });
    closeModal("client");
  };

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createProject({ name: fd.get("name") as string, client: fd.get("client") as string, manager: "Admin Timd", budget: Number(fd.get("budget")), startDate: todayStr, endDate: fd.get("endDate") as string });
    closeModal("proj");
  };

  const handleCreateInvoice = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get("amount"));
    await createInvoice({ invoiceNumber: `FAC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`, clientName: fd.get("client") as string, amount, tax: amount * 0.19, total: amount * 1.19, status: "draft", issueDate: todayStr, dueDate: fd.get("dueDate") as string });
    closeModal("inv");
  };

  const handleCreateExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createExpense({ employeeName: "Admin Timd", category: fd.get("category") as string, amount: Number(fd.get("amount")), description: fd.get("description") as string, date: todayStr });
    closeModal("exp");
  };

  // ── Sidebar ──
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <img src={timdLogo} alt="Timd" className="w-8 h-8 rounded-lg object-cover" />
        <div><p className="text-sm font-bold text-gray-900">Timd</p><p className="text-[10px] text-indigo-500 font-medium">ERP • BI • IA</p></div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AD</div>
        <div className="min-w-0"><p className="text-xs font-semibold text-gray-800 truncate">Admin Timd</p><p className="text-[10px] text-gray-500 truncate">Directeur Général</p></div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {SIDEBAR.map((group) => (
          <div key={group.label || "__home"}>
            {group.label && (
              <button onClick={() => toggleGroup(group.label)} className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors">
                {group.label} <ChevronDown className={`w-3 h-3 transition-transform ${expandedGroups[group.label] ? "rotate-180" : ""}`} />
              </button>
            )}
            {(!group.label || expandedGroups[group.label]) && group.items.map((item) => (
              <button key={item.id} onClick={() => go(item.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${activeModule === item.id ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.id === "leaves" && pendingLeaves > 0 && <span className="ms-auto bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingLeaves}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-gray-100 px-2 py-2 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"><Settings className="w-4 h-4" /> Paramètres</button>
        <Link to="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"><LogOut className="w-4 h-4" /> Retour au site</Link>
      </div>
    </div>
  );

  // ── Renderers ──
  const renderDashboard = () => {
    const kpiMap = kpis?.reduce((acc, k) => { acc[k.kpiId] = k; return acc; }, {} as Record<string, typeof kpis[0]>) ?? {};
    return (
      <div className="space-y-6">
        <div><h1 className="text-xl font-bold text-gray-900">Bonjour, Admin 👋</h1><p className="text-sm text-gray-500 mt-0.5">Voici la performance de votre entreprise aujourd'hui.</p></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Chiffre d'affaires" value={kpiMap["revenue"]?.value ?? "—"} change={kpiMap["revenue"]?.change} positive={true} />
          <Stat label="Employes actifs" value={String(employees?.filter(e => e.status === "active").length ?? "—")} change={`${attendanceRate}% presents`} positive={attendanceRate >= 75} />
          <Stat label="Projets actifs" value={String(activeProjects)} change={`${projects?.filter(p => p.status === "completed").length ?? 0} terminés`} positive={true} />
          <Stat label="Factures impayées" value={String(unpaidInvoices)} change={unpaidInvoices > 0 ? "Action requise" : "Tout réglé"} positive={unpaidInvoices === 0} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold text-gray-900">Évolution du CA (DZD)</h3><span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">6 derniers mois</span></div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Area type="monotone" dataKey="ca" stroke="#6366f1" fill="url(#areaGrad)" strokeWidth={2} name="CA (k)" /></AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Activité du jour</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={activityData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="h" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="cmd" fill="#6366f1" radius={[3, 3, 0, 0]} name="Commandes" /></BarChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-gray-500"><span>Présences</span><span className="font-semibold text-gray-800">{presentToday}/{totalEmp}</span></div>
              <div className="flex justify-between text-xs text-gray-500"><span>Congés en attente</span><span className="font-semibold text-amber-600">{pendingLeaves}</span></div>
              <div className="flex justify-between text-xs text-gray-500"><span>Factures impayées</span><span className="font-semibold text-red-600">{unpaidInvoices}</span></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader title="Commandes récentes" action={<button onClick={() => go("orders")} className="text-xs text-indigo-600 hover:underline flex items-center">Voir <ChevronRight className="w-3" /></button>} />
            <TableWrap head={["N°", "Client", "Montant", "Statut", "Ville", "Action"]}>
              {orders?.slice(0, 5).map(o => <Row key={o._id} cols={[<span className="font-mono text-gray-400 text-xs">{o.orderId}</span>, o.client, `${o.amount} DZD`, <Badge label={statusLabels[o.status] ?? o.status} color={statusColors[o.status] ?? ""} />, o.city, <button onClick={() => removeOrder({id: o._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>]} />)}
            </TableWrap>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5">
            <div className="flex items-center gap-2 mb-4"><Brain className="w-4 h-4 text-indigo-600" /><h3 className="text-sm font-semibold text-indigo-800">IA Insights</h3></div>
            <div className="space-y-3">
              {insights?.slice(0, 3).map(ins => (
                <div key={ins._id} className="bg-white rounded-lg p-3 border border-indigo-100 flex items-start gap-2">
                  {ins.type === "warning" && <CircleAlert className="w-3.5 h-3.5 text-amber-500" />}{ins.type === "success" && <CircleCheck className="w-3.5 h-3.5 text-emerald-500" />}{ins.type === "info" && <Info className="w-3.5 h-3.5 text-blue-500" />}
                  <div><p className="text-xs font-medium text-gray-800">{ins.text}</p><p className="text-[10px] text-gray-500">{ins.recommendation}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmployees = () => (
    <div className="space-y-5">
      <SectionHeader title="Employés" subtitle={`${employees?.length ?? 0} collaborateurs`} action={
        <Dialog open={modals.emp} onOpenChange={(val) => setModals({ ...modals, emp: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Nouvel employé</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ajouter un employé</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nom complet</Label><Input required name="name" /></div>
                <div><Label>Rôle</Label><Input required name="role" /></div>
                <div><Label>Département</Label><Input required name="department" /></div>
                <div><Label>Email</Label><Input type="email" required name="email" /></div>
                <div><Label>Téléphone</Label><Input required name="phone" /></div>
                <div><Label>Salaire Mensuel (DZD)</Label><Input type="number" required name="salary" /></div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium">Créer employé</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <TableWrap head={["Nom", "Role", "Departement", "Email", "Salaire", "Statut", "Action"]}>
        {employees?.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase())).map((e) => (
          <Row key={e._id} cols={[
            <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">{e.name.slice(0, 2).toUpperCase()}</div><span className="font-medium text-gray-900">{e.name}</span></div>,
            e.role, <span className="text-xs text-gray-500">{e.department}</span>, <span className="text-xs text-gray-500">{e.email}</span>, <span className="font-medium">{e.salary.toLocaleString()} DZD</span>, <Badge label={statusLabels[e.status]} color={statusColors[e.status]} />,
            <button onClick={() => removeEmployee({ id: e._id })} className="text-gray-400 hover:text-red-500 p-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
          ]} />
        ))}
      </TableWrap>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-5">
      <SectionHeader title="Commandes" subtitle={`${orders?.length ?? 0} commandes`} action={
        <Dialog open={modals.order} onOpenChange={(val) => setModals({ ...modals, order: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Nouvelle commande</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouvelle commande</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Client (Nom)</Label><Input required name="client" /></div>
                <div><Label>Montant (DZD)</Label><Input required name="amount" /></div>
                <div><Label>Ville</Label><Input required name="city" /></div>
                <div><Label>Moyen Paiement</Label><Input required name="payment" placeholder="Virement, Chèque..." /></div>
                <div><Label>Nbre d'articles</Label><Input type="number" required name="items" /></div>
                <div><Label>Échéance de livraison</Label><Input type="date" required name="dueDate" /></div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm">Enregistrer commande</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <TableWrap head={["N°", "Client", "Montant", "Articles", "Ville", "Paiement", "Statut", "Action"]}>
        {orders?.map(o => <Row key={o._id} cols={[<span className="font-mono text-xs">{o.orderId}</span>, o.client, `${o.amount} DZD`, o.items, o.city, o.payment, <Badge label={statusLabels[o.status]} color={statusColors[o.status]} />, <div className="flex items-center gap-2">{o.status === "pending" && <button onClick={() => updateOrderStatus({ id: o._id, status: "processing" })} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Traiter</button>} <button onClick={() => removeOrder({id: o._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button></div>]} />)}
      </TableWrap>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-5">
      <SectionHeader title="Clients CRM" subtitle={`${clients?.length ?? 0} clients intégrés`} action={
        <Dialog open={modals.client} onOpenChange={(val) => setModals({ ...modals, client: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Nouveau client</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouveau Client</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Label>Nom Société</Label><Input required name="name" /></div>
                <div><Label>Secteur d'activité</Label><Input required name="segment" /></div>
                <div><Label>MRR Estimé (DZD)</Label><Input required name="mrr" placeholder="Ex: 500k DZD" /></div>
                <div className="col-span-2"><Label>Niveau de risque</Label>
                  <select name="risk" className="w-full border rounded-lg p-2 text-sm mt-1" required>
                    <option value="Faible">Faible</option><option value="Moyen">Moyen</option><option value="Eleve">Elevé</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm">Ajouter client</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <TableWrap head={["Client", "Secteur", "MRR (Rev Mensuel)", "Risque", "Action"]}>
        {clients?.map(c => <Row key={c._id} cols={[<span className="font-medium">{c.name}</span>, c.segment, <span className="font-semibold">{c.mrr}</span>, <Badge label={`Risque ${c.risk}`} color={c.risk === "Eleve" ? "bg-red-100 text-red-700" : c.risk === "Moyen" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"} />, <button onClick={() => removeClient({id: c._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>]} />)}
      </TableWrap>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-5">
      <SectionHeader title="Projets Actifs" action={
        <Dialog open={modals.proj} onOpenChange={(val) => setModals({ ...modals, proj: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Nouveau projet</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nouveau Projet</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Label>Nom du Projet</Label><Input required name="name" /></div>
                <div><Label>Client (Nom)</Label><Input required name="client" /></div>
                <div><Label>Budget Alloué (DZD)</Label><Input type="number" required name="budget" /></div>
                <div className="col-span-2"><Label>Date de fin estimée</Label><Input type="date" required name="endDate" /></div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm">Lancer le projet</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects?.map(p => (
          <div key={p._id} className="bg-white rounded-xl border border-gray-200 p-5 group relative">
            <button onClick={() => removeProject({ id: p._id })} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
            <div className="flex justify-between mb-3 w-[90%]"><div><p className="font-semibold text-gray-900">{p.name}</p><p className="text-xs text-gray-500">Client: {p.client}</p></div><Badge label={statusLabels[p.status]} color={statusColors[p.status]} /></div>
            <div className="flex justify-between text-xs text-gray-500 mb-2"><span>Avancement</span><span className="font-semibold">{p.progress}%</span></div>
            <div className="h-2 bg-gray-100 rounded-full mb-3"><div className={`h-full rounded-full ${p.progress === 100 ? "bg-emerald-500" : p.progress > 60 ? "bg-indigo-500" : "bg-amber-400"}`} style={{ width: `${p.progress}%` }} /></div>
            <p className="text-[11px] text-gray-400">{p.startDate} → {p.endDate} | Budget: {p.budget.toLocaleString()} DZD</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-5">
      <SectionHeader title="Factures Comptables" action={
        <Dialog open={modals.inv} onOpenChange={(val) => setModals({ ...modals, inv: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Générer facture</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Générer une facture</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Label>Client / Destinataire</Label><Input required name="client" /></div>
                <div><Label>Montant HT (DZD)</Label><Input type="number" required name="amount" /></div>
                <div><Label>Date d'échéance</Label><Input type="date" required name="dueDate" /></div>
              </div>
              <p className="text-[10px] text-gray-500">La TVA 19% sera automatiquement calculée.</p>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm">Générer facture brouillon</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <TableWrap head={["N° Facture", "Client", "HT", "TTC", "Echéance", "Statut", "Action"]}>
        {invoices?.map(i => <Row key={i._id} cols={[<span className="font-mono text-xs text-gray-400">{i.invoiceNumber}</span>, i.clientName, `${i.amount.toLocaleString()}`, <span className="font-bold">{i.total.toLocaleString()} DZD</span>, i.dueDate, <Badge label={statusLabels[i.status]} color={statusColors[i.status]} />, <div className="flex items-center gap-2">{i.status !== "paid" && <button onClick={() => updateInvoiceStatus({ id: i._id, status: "paid" })} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Régler</button>} <button onClick={() => removeInvoice({id: i._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button></div>]} />)}
      </TableWrap>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-5">
      <SectionHeader title="Notes de frais" action={
        <Dialog open={modals.exp} onOpenChange={(val) => setModals({ ...modals, exp: val })}>
          <DialogTrigger asChild><button className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" />Saisir dépense</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Saisir une note de frais</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Catégorie</Label><Input required name="category" placeholder="Déplacement, Achat..." /></div>
                <div><Label>Montant (DZD)</Label><Input type="number" required name="amount" /></div>
                <div className="col-span-2"><Label>Description / Motif</Label><Input required name="description" /></div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm">Soumettre</button>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <TableWrap head={["Dossier", "Catégorie", "Montant", "Motif", "Date", "Statut", "Action"]}>
        {expensesList?.map(e => <Row key={e._id} cols={[<span className="font-medium">{e.employeeName}</span>, e.category, <span className="font-semibold">{e.amount.toLocaleString()} DZD</span>, <span className="max-w-[150px] truncate block text-xs" title={e.description}>{e.description}</span>, e.date, <Badge label={statusLabels[e.status]} color={statusColors[e.status]} />, <button onClick={() => removeExpense({id: e._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>]} />)}
      </TableWrap>
    </div>
  );

  const renderAttendance = () => <div className="space-y-5"><SectionHeader title="Présences" subtitle="Pointage de la journée en cours" /><TableWrap head={["Collaborateur", "Arrivée", "Départ", "Statut", "Action"]}>{todayAttendance?.map(a => <Row key={a._id} cols={[<span className="font-medium">{a.employeeName}</span>, a.checkIn || "—", a.checkOut || "—", <Badge label={statusLabels[a.status]} color={statusColors[a.status]} />, <button onClick={() => removeAttendance({id: a._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>]} />)}</TableWrap></div>;
  const renderLeaves = () => <div className="space-y-5"><SectionHeader title="Congés" subtitle="Suivi des demandes" /><TableWrap head={["Collaborateur", "Motif", "Début", "Fin", "Jours", "Statut", "Action"]}>{leaves?.map(l => <Row key={l._id} cols={[l.employeeName, l.type, l.startDate, l.endDate, `${l.days} jours`, <Badge label={statusLabels[l.status]} color={statusColors[l.status]} />, <div className="flex items-center gap-2">{l.status === "pending" && <button onClick={() => approveLeave({ id: l._id, status: "approved" })} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Appr.</button>} <button onClick={() => removeLeave({id: l._id})} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button></div>]} />)}</TableWrap></div>;
  const renderPayroll = () => <div className="space-y-5"><SectionHeader title="Simulateur Paie" subtitle="Vue globale des rémunérations (Estimatif)" /><TableWrap head={["Collaborateur", "Base", "Primes", "Retenues", "Net (Estimatif)"]}>{employees?.map(e => <Row key={e._id} cols={[<span className="font-medium">{e.name}</span>, `${e.salary.toLocaleString()}`, <span className="text-emerald-600">+{(e.salary * 0.05).toLocaleString()}</span>, <span className="text-red-500">-{(e.salary * 0.09).toLocaleString()}</span>, <span className="font-bold">{Math.round(e.salary * 0.96).toLocaleString()} DZD</span>]} />)}</TableWrap></div>;
  const renderStock = () => <div className="space-y-5"><SectionHeader title="Niveaux de Stocks" /><div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">{stockItems?.map(s => { const pct = Math.round((s.stock / s.capacity) * 100); return <div key={s._id}><div className="flex justify-between mb-1.5"><span className="text-sm">{s.category}</span><span className="text-xs">{pct}% ({s.stock}/{s.capacity})</span></div><div className="h-2 bg-gray-100 rounded-full"><div className={`h-full rounded-full ${pct < 50 ? "bg-amber-400" : "bg-indigo-500"}`} style={{ width: `${pct}%` }} /></div></div>; })}</div></div>;
  const renderInsights = () => <div className="space-y-5"><SectionHeader title="Centre de décisions IA" /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{insights?.map(ins => <div key={ins._id} className="bg-white rounded-xl border border-gray-200 p-5"><div className="flex gap-2 items-center mb-2"><span className="text-xs uppercase font-bold text-indigo-600">{ins.type}</span></div><p className="font-semibold">{ins.text}</p><p className="text-xs text-gray-500 mt-2">Reco: {ins.recommendation}</p></div>)}</div></div>;
  const renderReports = () => <div className="space-y-5"><SectionHeader title="Rapports d'activité" /><div className="grid grid-cols-2 lg:grid-cols-4 gap-3"><Stat label="CA total" value="8.9M DZD" positive={true} change="+12.4%" /><Stat label="Croissance" value="+23%" positive={true} change="M-o-M" /></div></div>;

  const RENDER_MAP: Partial<Record<Module, () => React.ReactNode>> = {
    dashboard: renderDashboard, employees: renderEmployees, attendance: renderAttendance,
    leaves: renderLeaves, invoices: renderInvoices, projects: renderProjects,
    orders: renderOrders, clients: renderClients, stock: renderStock,
    expenses: renderExpenses, payroll: renderPayroll, insights: renderInsights, reports: renderReports,
  };

  const currentTitle = SIDEBAR.flatMap(g => g.items).find(i => i.id === activeModule)?.label ?? "Tableau de bord";

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <aside className="hidden lg:flex flex-col w-56 xl:w-60 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto"><SidebarContent /></aside>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-50 flex"><div className="w-60 bg-white border-r flex flex-col overflow-y-auto"><SidebarContent /></div><div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} /></div>}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <button className="lg:hidden text-gray-500 hover:text-gray-800" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <h1 className="text-sm font-semibold text-gray-800 hidden sm:block w-48">{currentTitle}</h1>
          <div className="flex-1 max-w-sm"><div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div></div>
          <div className="flex items-center gap-2 ms-auto">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live DB</span>
            <button className="relative w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"><Bell className="w-4 h-4" />{pendingLeaves > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{pendingLeaves}</span>}</button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">AD</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
          {seeded === false && employees?.length === 0 && <div className="text-center py-10"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-500">Initialisation...</p></div>}
          {RENDER_MAP[activeModule]?.()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
