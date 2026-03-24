import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("insights").withIndex("by_created_at").order("desc").take(20);
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal("warning"), v.literal("success"), v.literal("info")),
    text: v.string(),
    impact: v.string(),
    recommendation: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("insights", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
