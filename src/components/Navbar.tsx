import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import timdLogo from "@/assets/timd-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.produit, href: "#solution" },
    { label: t.nav.pourQui, href: "#pour-qui" },
    { label: t.nav.tarifs, href: "#tarifs" },
    { label: t.nav.clients, href: "#clients" },
    { label: t.nav.preuve, href: "#preuve" },
    { label: t.nav.vision, href: "#vision" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[95%] max-w-5xl">
      <nav
        className={`transition-all duration-300 rounded-full px-4 sm:px-6 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border border-border shadow-lg shadow-foreground/5"
            : "bg-background/70 backdrop-blur-lg border border-border/50 shadow-md shadow-foreground/5"
        }`}
      >
        <div className="flex items-center justify-between h-12 sm:h-14">
          <a
            href="#"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={timdLogo} alt="Timd" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-border/50" />
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`text-sm transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
              {t.nav.demo}
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-background backdrop-blur-xl rounded-2xl border border-border shadow-2xl shadow-black/20 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`block py-2 text-sm transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="mt-2 w-full bg-primary hover:bg-primary/90 rounded-full">
              {t.nav.demo}
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
