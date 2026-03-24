import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    client: v.string(),
    manager: v.string(),
    budget: v.number(),
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", { ...args, status: "active", progress: 0, createdAt: Date.now() });
  },
});

export const updateProgress = mutation({
  args: { id: v.id("projects"), progress: v.number(), status: v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold"), v.literal("cancelled")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { progress: args.progress, status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
