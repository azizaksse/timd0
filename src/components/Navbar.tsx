import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import timdLogo from "@/assets/timd-logo.png";

const navLinks = [
  { label: "Produit", href: "#solution" },
  { label: "Pour qui ?", href: "#pour-qui" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Preuve marché", href: "#preuve" },
  { label: "Vision", href: "#vision" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#" className="flex items-center">
          <img src={timdLogo} alt="Timd" className="h-12" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
