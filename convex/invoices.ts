import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("invoices").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    invoiceNumber: v.string(),
    clientName: v.string(),
    amount: v.number(),
    tax: v.number(),
    total: v.number(),
    status: v.union(v.literal("paid"), v.literal("unpaid"), v.literal("overdue"), v.literal("draft")),
    dueDate: v.string(),
    issueDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("invoices", { ...args, createdAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("invoices"), status: v.union(v.literal("paid"), v.literal("unpaid"), v.literal("overdue"), v.literal("draft")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("invoices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
