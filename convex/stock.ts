import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("stock").collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("stock"),
    stock: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { stock: args.stock, updatedAt: Date.now() });
    return args.id;
  },
});

export const upsertByCategory = mutation({
  args: {
    category: v.string(),
    stock: v.number(),
    capacity: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("stock").collect();
    const found = existing.find((s) => s.category === args.category);
    if (found) {
      await ctx.db.patch(found._id, { stock: args.stock, capacity: args.capacity, updatedAt: Date.now() });
      return found._id;
    }
    return await ctx.db.insert("stock", { ...args, updatedAt: Date.now() });
  },
});
