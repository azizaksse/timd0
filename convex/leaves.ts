import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leaves").withIndex("by_created_at").order("desc").take(50);
  },
});

export const create = mutation({
  args: {
    employeeId: v.id("employees"),
    employeeName: v.string(),
    type: v.union(v.literal("annual"), v.literal("sick"), v.literal("maternity"), v.literal("unpaid")),
    startDate: v.string(),
    endDate: v.string(),
    days: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leaves", { ...args, status: "pending", createdAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("leaves"), status: v.union(v.literal("approved"), v.literal("pending"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("leaves") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
