import { createRoot } from "react-dom/client";
import { ConvexProvider } from "convex/react";
import App from "./App.tsx";
import "./index.css";
import { convexClient } from "@/lib/convex";

if (!convexClient && import.meta.env.DEV) {
  console.warn("Convex is not configured. Set VITE_CONVEX_URL (or VITE_CONVEX_SITE_URL) in your .env.local file.");
}

createRoot(document.getElementById("root")!).render(
  convexClient ? (
    <ConvexProvider client={convexClient}>
      <App />
    </ConvexProvider>
  ) : (
    <App />
  ),
);
