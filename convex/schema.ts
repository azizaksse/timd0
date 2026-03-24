import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Existing ──────────────────────────────────
  tasks: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  orders: defineTable({
    orderId: v.string(),
    client: v.string(),
    amount: v.string(),
    status: v.union(v.literal("completed"), v.literal("pending"), v.literal("processing")),
    city: v.string(),
    payment: v.string(),
    items: v.number(),
    dueDate: v.string(),
    owner: v.string(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  clients: defineTable({
    name: v.string(),
    segment: v.string(),
    mrr: v.string(),
    risk: v.union(v.literal("Faible"), v.literal("Moyen"), v.literal("Eleve")),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  stock: defineTable({
    category: v.string(),
    stock: v.number(),
    capacity: v.number(),
    updatedAt: v.number(),
  }),

  insights: defineTable({
    type: v.union(v.literal("warning"), v.literal("success"), v.literal("info")),
    text: v.string(),
    impact: v.string(),
    recommendation: v.string(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  kpis: defineTable({
    kpiId: v.string(),
    label: v.string(),
    value: v.string(),
    change: v.string(),
    positive: v.boolean(),
    rows: v.array(v.array(v.string())),
    note: v.string(),
    updatedAt: v.number(),
  }).index("by_kpi_id", ["kpiId"]),

  // ── ERP: Human Resources ──────────────────────
  employees: defineTable({
    name: v.string(),
    role: v.string(),
    department: v.string(),
    email: v.string(),
    phone: v.string(),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("on_leave")),
    joinDate: v.string(),
    salary: v.number(),
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_department", ["department"])
    .index("by_created_at", ["createdAt"]),

  attendance: defineTable({
    employeeId: v.id("employees"),
    employeeName: v.string(),
    date: v.string(),
    checkIn: v.optional(v.string()),
    checkOut: v.optional(v.string()),
    status: v.union(v.literal("present"), v.literal("absent"), v.literal("late"), v.literal("half_day")),
    hoursWorked: v.optional(v.number()),
  }).index("by_employee", ["employeeId"])
    .index("by_date", ["date"]),

  leaves: defineTable({
    employeeId: v.id("employees"),
    employeeName: v.string(),
    type: v.union(v.literal("annual"), v.literal("sick"), v.literal("maternity"), v.literal("unpaid")),
    startDate: v.string(),
    endDate: v.string(),
    days: v.number(),
    status: v.union(v.literal("approved"), v.literal("pending"), v.literal("rejected")),
    reason: v.string(),
    createdAt: v.number(),
  }).index("by_employee", ["employeeId"])
    .index("by_created_at", ["createdAt"]),

  // ── ERP: Finance ──────────────────────────────
  invoices: defineTable({
    invoiceNumber: v.string(),
    clientName: v.string(),
    amount: v.number(),
    tax: v.number(),
    total: v.number(),
    status: v.union(v.literal("paid"), v.literal("unpaid"), v.literal("overdue"), v.literal("draft")),
    dueDate: v.string(),
    issueDate: v.string(),
    createdAt: v.number(),
  }).index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  expenses: defineTable({
    employeeId: v.optional(v.id("employees")),
    employeeName: v.string(),
    category: v.string(),
    amount: v.number(),
    description: v.string(),
    date: v.string(),
    status: v.union(v.literal("approved"), v.literal("pending"), v.literal("rejected")),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  // ── ERP: Projects / CRM ───────────────────────
  projects: defineTable({
    name: v.string(),
    client: v.string(),
    manager: v.string(),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold"), v.literal("cancelled")),
    progress: v.number(),
    budget: v.number(),
    startDate: v.string(),
    endDate: v.string(),
    createdAt: v.number(),
  }).index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  // ── ERP: Payroll ──────────────────────────────
  payroll: defineTable({
    employeeId: v.id("employees"),
    employeeName: v.string(),
    month: v.string(),
    baseSalary: v.number(),
    bonuses: v.number(),
    deductions: v.number(),
    netSalary: v.number(),
    status: v.union(v.literal("paid"), v.literal("pending")),
    paidAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_month", ["month"])
    .index("by_employee", ["employeeId"]),
});
