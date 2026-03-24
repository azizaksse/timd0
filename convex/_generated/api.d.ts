/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as attendance from "../attendance.js";
import type * as clients from "../clients.js";
import type * as employees from "../employees.js";
import type * as expensesFn from "../expensesFn.js";
import type * as insights from "../insights.js";
import type * as invoices from "../invoices.js";
import type * as kpis from "../kpis.js";
import type * as leaves from "../leaves.js";
import type * as orders from "../orders.js";
import type * as payroll from "../payroll.js";
import type * as projects from "../projects.js";
import type * as seed from "../seed.js";
import type * as stock from "../stock.js";
import type * as tasks from "../tasks.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  attendance: typeof attendance;
  clients: typeof clients;
  employees: typeof employees;
  expensesFn: typeof expensesFn;
  insights: typeof insights;
  invoices: typeof invoices;
  kpis: typeof kpis;
  leaves: typeof leaves;
  orders: typeof orders;
  payroll: typeof payroll;
  projects: typeof projects;
  seed: typeof seed;
  stock: typeof stock;
  tasks: typeof tasks;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
