import { ConvexReactClient } from "convex/react";

const fromCloudEnv = import.meta.env.VITE_CONVEX_URL?.trim();
const fromSiteEnv = import.meta.env.VITE_CONVEX_SITE_URL?.trim();

const normalizeConvexUrl = (url: string) => {
  // Allow users to provide either .convex.cloud or .convex.site and normalize for React client usage.
  return url.replace(/\.convex\.site(?=\/?$)/, ".convex.cloud");
};

export const convexUrl = fromCloudEnv
  ? normalizeConvexUrl(fromCloudEnv)
  : fromSiteEnv
    ? normalizeConvexUrl(fromSiteEnv)
    : null;

export const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

