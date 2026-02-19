import { useEffect, useCallback } from "react";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_STORAGE_KEY = "timd-onboarding-complete";

const tourSteps: DriveStep[] = [
  {
    element: "#tour-sidebar",
    popover: {
      title: "Navigation Timd",
      description: "Accédez rapidement à tous vos modules : Commandes, Stock, Clients, Rapports et IA Insights.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#tour-kpis",
    popover: {
      title: "Indicateurs clés (KPIs)",
      description: "Visualisez en un coup d'œil votre chiffre d'affaires, croissance, marge nette et nombre de clients actifs.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-ai-insights",
    popover: {
      title: "Recommandations IA",
      description: "L'intelligence artificielle analyse vos données et vous propose des actions concrètes pour optimiser votre activité.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-revenue-chart",
    popover: {
      title: "Suivi du chiffre d'affaires",
      description: "Comparez votre CA réel à vos objectifs mois par mois. Identifiez les tendances et ajustez votre stratégie.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-department-chart",
    popover: {
      title: "Répartition par département",
      description: "Visualisez la contribution de chaque département (Ventes, Stock, RH, Finance) à votre activité globale.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#tour-stock",
    popover: {
      title: "Gestion du stock",
      description: "Surveillez vos niveaux de stock en temps réel. Les alertes orange signalent les stocks bas nécessitant un réapprovisionnement.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#tour-orders",
    popover: {
      title: "Commandes récentes",
      description: "Suivez l'état de vos dernières commandes : terminées, en attente ou en cours de traitement.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#tour-export",
    popover: {
      title: "Exporter vos données",
      description: "Exportez vos rapports en PDF ou CSV en un clic pour les partager avec votre équipe ou vos partenaires.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "#tour-activity",
    popover: {
      title: "Activité du jour",
      description: "Analysez le volume de commandes et retours heure par heure pour optimiser vos opérations quotidiennes.",
      side: "top",
      align: "center",
    },
  },
];

export const useOnboardingTour = () => {
  const startTour = useCallback(() => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      stagePadding: 8,
      stageRadius: 12,
      popoverClass: "timd-tour-popover",
      nextBtnText: "Suivant →",
      prevBtnText: "← Précédent",
      doneBtnText: "Terminé ✓",
      progressText: "{{current}} / {{total}}",
      steps: tourSteps,
      onDestroyed: () => {
        localStorage.setItem(TOUR_STORAGE_KEY, "true");
      },
    });
    driverObj.drive();
  }, []);

  const shouldShowTour = useCallback(() => {
    return !localStorage.getItem(TOUR_STORAGE_KEY);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
  }, []);

  return { startTour, shouldShowTour, resetTour };
};
