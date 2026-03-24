import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByMonth = query({
  args: { month: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("payroll").withIndex("by_month", (q) => q.eq("month", args.month)).collect();
  },
});

export const create = mutation({
  args: {
    employeeId: v.id("employees"),
    employeeName: v.string(),
    month: v.string(),
    baseSalary: v.number(),
    bonuses: v.number(),
    deductions: v.number(),
    netSalary: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payroll", { ...args, status: "pending", createdAt: Date.now() });
  },
});

export const markPaid = mutation({
  args: { id: v.id("payroll") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "paid", paidAt: Date.now() });
  },
});
