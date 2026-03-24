import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("employees").withIndex("by_created_at").order("desc").take(100);
  },
});

export const listByDepartment = query({
  args: { department: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("employees").withIndex("by_department", (q) => q.eq("department", args.department)).collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    department: v.string(),
    email: v.string(),
    phone: v.string(),
    salary: v.number(),
    joinDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("employees", {
      ...args,
      status: "active",
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("employees"), status: v.union(v.literal("active"), v.literal("inactive"), v.literal("on_leave")) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
