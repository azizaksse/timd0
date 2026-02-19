import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center gap-1.5 h-8 px-3 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300 group"
      aria-label="Switch language"
    >
      <Globe className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          {lang === "fr" ? "عر" : "FR"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default LanguageSwitcher;
