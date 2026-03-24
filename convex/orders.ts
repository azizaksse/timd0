import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    orderId: v.string(),
    client: v.string(),
    amount: v.string(),
    status: v.union(v.literal("completed"), v.literal("pending"), v.literal("processing")),
    city: v.string(),
    payment: v.string(),
    items: v.number(),
    dueDate: v.string(),
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", { ...args, createdAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("orders"), status: v.union(v.literal("completed"), v.literal("pending"), v.literal("processing")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
