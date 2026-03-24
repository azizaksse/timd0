import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("attendance").withIndex("by_date", (q) => q.eq("date", args.date)).collect();
  },
});

export const listByEmployee = query({
  args: { employeeId: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.query("attendance").withIndex("by_employee", (q) => q.eq("employeeId", args.employeeId)).order("desc").take(30);
  },
});

export const upsert = mutation({
  args: {
    employeeId: v.id("employees"),
    employeeName: v.string(),
    date: v.string(),
    checkIn: v.optional(v.string()),
    checkOut: v.optional(v.string()),
    status: v.union(v.literal("present"), v.literal("absent"), v.literal("late"), v.literal("half_day")),
    hoursWorked: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("attendance")
      .withIndex("by_employee", (q) => q.eq("employeeId", args.employeeId))
      .filter((q) => q.eq(q.field("date"), args.date))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("attendance", args);
  },
});

export const remove = mutation({
  args: { id: v.id("attendance") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
