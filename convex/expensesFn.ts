import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("expenses").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    employeeName: v.string(),
    category: v.string(),
    amount: v.number(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("expenses", { ...args, status: "pending", createdAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("expenses"), status: v.union(v.literal("approved"), v.literal("pending"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
