import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // ── Orders ─────────────────────────────────────────────
    const existingOrders = await ctx.db.query("orders").collect();
    if (existingOrders.length === 0) {
      const orders = [
        { orderId: "#TM-1847", client: "SARL Benaissa", amount: "245 000", status: "completed" as const, city: "Alger", payment: "Virement", items: 14, dueDate: "20 Fev", owner: "Nadia B." },
        { orderId: "#TM-1846", client: "EURL Hadj Ali", amount: "128 500", status: "pending" as const, city: "Oran", payment: "Cheque", items: 8, dueDate: "22 Fev", owner: "Yacine K." },
        { orderId: "#TM-1845", client: "SPA Djezzy Dist.", amount: "890 000", status: "completed" as const, city: "Setif", payment: "Virement", items: 31, dueDate: "19 Fev", owner: "Sofia H." },
        { orderId: "#TM-1844", client: "SARL Filaha Plus", amount: "67 200", status: "processing" as const, city: "Blida", payment: "Especes", items: 5, dueDate: "24 Fev", owner: "Amine M." },
        { orderId: "#TM-1843", client: "EURL TechnoAlger", amount: "345 000", status: "completed" as const, city: "Constantine", payment: "Virement", items: 19, dueDate: "21 Fev", owner: "Lina R." },
      ];
      for (const o of orders) await ctx.db.insert("orders", { ...o, createdAt: Date.now() });
    }

    // ── Clients ────────────────────────────────────────────
    const existingClients = await ctx.db.query("clients").collect();
    if (existingClients.length === 0) {
      const clients = [
        { name: "SARL Benaissa", segment: "Distribution", mrr: "620k DZD", risk: "Faible" as const },
        { name: "SPA Djezzy Dist.", segment: "Telecom", mrr: "1.4M DZD", risk: "Moyen" as const },
        { name: "EURL TechnoAlger", segment: "Tech", mrr: "740k DZD", risk: "Faible" as const },
        { name: "SARL Filaha Plus", segment: "Agro", mrr: "280k DZD", risk: "Eleve" as const },
      ];
      for (const c of clients) await ctx.db.insert("clients", { ...c, createdAt: Date.now() });
    }

    // ── Stock ──────────────────────────────────────────────
    const existingStock = await ctx.db.query("stock").collect();
    if (existingStock.length === 0) {
      for (const s of [
        { category: "Matieres premieres", stock: 78, capacity: 100 },
        { category: "Produits finis", stock: 45, capacity: 80 },
        { category: "Emballage", stock: 92, capacity: 100 },
        { category: "Consommables", stock: 33, capacity: 60 },
        { category: "Pieces detachees", stock: 56, capacity: 70 },
      ]) await ctx.db.insert("stock", { ...s, updatedAt: Date.now() });
    }

    // ── Insights ───────────────────────────────────────────
    const existingInsights = await ctx.db.query("insights").collect();
    if (existingInsights.length === 0) {
      for (const i of [
        { type: "warning" as const, text: "Stock matieres premieres bas.", impact: "Risque de rupture 18%.", recommendation: "Lancer reapprovisionnement urgent." },
        { type: "success" as const, text: "Croissance CA +23%.", impact: "Marge projetee +2.1 pts.", recommendation: "Renforcer les campagnes performantes." },
        { type: "info" as const, text: "3 nouveaux prospects agro.", impact: "Pipeline potentiel 1.1M DZD.", recommendation: "Planifier demo sous 48h." },
      ]) await ctx.db.insert("insights", { ...i, createdAt: Date.now() });
    }

    // ── KPIs ───────────────────────────────────────────────
    const existingKpis = await ctx.db.query("kpis").collect();
    if (existingKpis.length === 0) {
      for (const k of [
        { kpiId: "revenue", label: "Chiffre d'affaires", value: "8.9M DZD", change: "+12.4%", positive: true, rows: [["Objectif", "7.5M DZD"], ["Realise", "8.9M DZD"], ["Ecart", "+1.4M DZD"]], note: "Performance au-dessus de la cible." },
        { kpiId: "growth", label: "Croissance", value: "+23%", change: "+5.2%", positive: true, rows: [["Nouveaux clients", "18"], ["Conversion", "14.6%"], ["Upsell", "27"]], note: "Tendance solide sur 30 jours." },
        { kpiId: "margin", label: "Marge nette", value: "18.2%", change: "-0.8%", positive: false, rows: [["Cout prod", "53%"], ["Cout log", "18%"], ["Cible", "19%"]], note: "Legere baisse due a la logistique." },
        { kpiId: "clients", label: "Clients actifs", value: "147", change: "+8", positive: true, rows: [["Retention", "93%"], ["Nouveaux", "12"], ["Inactifs 30j", "9"]], note: "Base clients stable avec hausse nette." },
      ]) await ctx.db.insert("kpis", { ...k, updatedAt: Date.now() });
    }

    // ── Employees ──────────────────────────────────────────
    const existingEmp = await ctx.db.query("employees").collect();
    let empIds: string[] = [];
    if (existingEmp.length === 0) {
      const emps = [
        { name: "Karim Bouzid", role: "Directeur Commercial", department: "Commercial", email: "k.bouzid@timd.dz", phone: "0550 123 456", salary: 180000, joinDate: "01 Jan 2022" },
        { name: "Nadia Benali", role: "Business Developer", department: "Commercial", email: "n.benali@timd.dz", phone: "0660 234 567", salary: 120000, joinDate: "15 Mar 2022" },
        { name: "Yacine Khelif", role: "Chef de Projet", department: "Technique", email: "y.khelif@timd.dz", phone: "0770 345 678", salary: 150000, joinDate: "01 Jun 2021" },
        { name: "Sofia Hamdi", role: "Comptable", department: "Finance", email: "s.hamdi@timd.dz", phone: "0550 456 789", salary: 110000, joinDate: "01 Sep 2022" },
        { name: "Amine Merzouk", role: "Ingenieur DevOps", department: "IT", email: "a.merzouk@timd.dz", phone: "0660 567 890", salary: 160000, joinDate: "15 Jan 2023" },
        { name: "Lina Rahmani", role: "RH Manager", department: "RH", email: "l.rahmani@timd.dz", phone: "0770 678 901", salary: 130000, joinDate: "01 Apr 2021" },
        { name: "Omar Touati", role: "Responsable Stock", department: "Logistique", email: "o.touati@timd.dz", phone: "0550 789 012", salary: 105000, joinDate: "01 Jul 2022" },
        { name: "Rania Ferhat", role: "Analyste BI", department: "IT", email: "r.ferhat@timd.dz", phone: "0660 890 123", salary: 145000, joinDate: "15 Oct 2022" },
      ];
      for (const e of emps) {
        const id = await ctx.db.insert("employees", { ...e, status: "active", createdAt: Date.now() });
        empIds.push(id);
      }
    } else {
      empIds = existingEmp.map((e) => e._id);
    }

    // ── Attendance (today) ─────────────────────────────────
    const today = new Date().toISOString().split("T")[0];
    const existingAtt = await ctx.db.query("attendance").withIndex("by_date", (q) => q.eq("date", today)).collect();
    const allEmps = await ctx.db.query("employees").collect();
    if (existingAtt.length === 0 && allEmps.length > 0) {
      const statuses = ["present", "present", "present", "late", "present", "half_day", "present", "absent"] as const;
      for (let i = 0; i < allEmps.length; i++) {
        const e = allEmps[i];
        await ctx.db.insert("attendance", {
          employeeId: e._id,
          employeeName: e.name,
          date: today,
          checkIn: statuses[i] !== "absent" ? "08:30" : undefined,
          checkOut: statuses[i] === "present" ? "17:30" : undefined,
          status: statuses[i % statuses.length],
          hoursWorked: statuses[i] === "present" ? 9 : statuses[i] === "half_day" ? 4.5 : 0,
        });
      }
    }

    // ── Leaves ─────────────────────────────────────────────
    const existingLeaves = await ctx.db.query("leaves").collect();
    const freshEmps = await ctx.db.query("employees").collect();
    if (existingLeaves.length === 0 && freshEmps.length >= 4) {
      const leaveData = [
        { idx: 0, type: "annual" as const, startDate: "2026-03-25", endDate: "2026-03-28", days: 4, reason: "Conges annuels planifies", status: "approved" as const },
        { idx: 1, type: "sick" as const, startDate: "2026-03-23", endDate: "2026-03-24", days: 2, reason: "Maladie", status: "approved" as const },
        { idx: 2, type: "annual" as const, startDate: "2026-04-01", endDate: "2026-04-05", days: 5, reason: "Vacances", status: "pending" as const },
        { idx: 3, type: "unpaid" as const, startDate: "2026-03-30", endDate: "2026-03-30", days: 1, reason: "Affaires personnelles", status: "pending" as const },
      ];
      for (const l of leaveData) {
        const emp = freshEmps[l.idx];
        if (emp) {
          await ctx.db.insert("leaves", {
            employeeId: emp._id,
            employeeName: emp.name,
            type: l.type,
            startDate: l.startDate,
            endDate: l.endDate,
            days: l.days,
            reason: l.reason,
            status: l.status,
            createdAt: Date.now(),
          });
        }
      }
    }

    // ── Invoices ───────────────────────────────────────────
    const existingInvoices = await ctx.db.query("invoices").collect();
    if (existingInvoices.length === 0) {
      for (const inv of [
        { invoiceNumber: "FAC-2026-047", clientName: "SARL Benaissa", amount: 200000, tax: 19000, total: 219000, status: "paid" as const, issueDate: "2026-03-01", dueDate: "2026-03-15" },
        { invoiceNumber: "FAC-2026-046", clientName: "SPA Djezzy Dist.", amount: 750000, tax: 71250, total: 821250, status: "unpaid" as const, issueDate: "2026-03-05", dueDate: "2026-03-25" },
        { invoiceNumber: "FAC-2026-045", clientName: "EURL TechnoAlger", amount: 300000, tax: 28500, total: 328500, status: "overdue" as const, issueDate: "2026-02-15", dueDate: "2026-03-01" },
        { invoiceNumber: "FAC-2026-044", clientName: "SARL Filaha Plus", amount: 55000, tax: 5225, total: 60225, status: "draft" as const, issueDate: "2026-03-20", dueDate: "2026-04-10" },
      ]) await ctx.db.insert("invoices", { ...inv, createdAt: Date.now() });
    }

    // ── Projects ───────────────────────────────────────────
    const existingProjects = await ctx.db.query("projects").collect();
    if (existingProjects.length === 0) {
      for (const p of [
        { name: "ERP Industrie Nationale", client: "SPA Djezzy Dist.", manager: "Yacine Khelif", budget: 2500000, startDate: "2026-01-15", endDate: "2026-06-30", progress: 42, status: "active" as const },
        { name: "Portail CRM Agro", client: "SARL Filaha Plus", manager: "Karim Bouzid", budget: 800000, startDate: "2026-02-01", endDate: "2026-05-15", progress: 68, status: "active" as const },
        { name: "Audit BI Finance", client: "EURL TechnoAlger", manager: "Rania Ferhat", budget: 350000, startDate: "2025-11-01", endDate: "2026-02-28", progress: 100, status: "completed" as const },
        { name: "Migration Cloud", client: "SARL Benaissa", manager: "Amine Merzouk", budget: 1200000, startDate: "2026-03-01", endDate: "2026-08-31", progress: 15, status: "active" as const },
      ]) await ctx.db.insert("projects", { ...p, createdAt: Date.now() });
    }

    // ── Expenses ───────────────────────────────────────────
    const existingExpenses = await ctx.db.query("expenses").collect();
    if (existingExpenses.length === 0) {
      for (const e of [
        { employeeName: "Karim Bouzid", category: "Transport", amount: 12000, description: "Deplacement client Oran", date: "2026-03-18", status: "approved" as const },
        { employeeName: "Nadia Benali", category: "Restauration", amount: 4500, description: "Dejeuner client", date: "2026-03-20", status: "pending" as const },
        { employeeName: "Yacine Khelif", category: "Materiel", amount: 35000, description: "Achat peripheriques bureau", date: "2026-03-15", status: "approved" as const },
        { employeeName: "Sofia Hamdi", category: "Formation", amount: 28000, description: "Certification comptable", date: "2026-03-10", status: "pending" as const },
      ]) await ctx.db.insert("expenses", { ...e, createdAt: Date.now() });
    }

    return { success: true };
  },
});
