import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import timdLogo from "@/assets/timd-logo.png";

const navLinks = [
  { label: "Produit", href: "#solution" },
  { label: "Pour qui ?", href: "#pour-qui" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Clients", href: "#clients" },
  { label: "Preuve marché", href: "#preuve" },
  { label: "Vision", href: "#vision" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <nav
        className={`transition-all duration-300 rounded-full px-6 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border border-border shadow-lg shadow-foreground/5"
            : "bg-background/70 backdrop-blur-lg border border-border/50 shadow-md shadow-foreground/5"
        }`}
      >
        <div className="flex items-center justify-between h-14">
          <a
            href="#"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={timdLogo} alt="Timd" className="h-12" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
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
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
              Réserver une démo
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl rounded-2xl mt-2 border border-border shadow-lg p-4">
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
              Réserver une démo
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
