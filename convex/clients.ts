import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    segment: v.string(),
    mrr: v.string(),
    risk: v.union(v.literal("Faible"), v.literal("Moyen"), v.literal("Eleve")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clients", { ...args, createdAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("clients") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
