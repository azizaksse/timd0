import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("kpis").collect();
  },
});

export const upsert = mutation({
  args: {
    kpiId: v.string(),
    label: v.string(),
    value: v.string(),
    change: v.string(),
    positive: v.boolean(),
    rows: v.array(v.array(v.string())),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("kpis")
      .withIndex("by_kpi_id", (q) => q.eq("kpiId", args.kpiId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("kpis", { ...args, updatedAt: Date.now() });
  },
});
