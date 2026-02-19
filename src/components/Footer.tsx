import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold gradient-text">Timd</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Plateforme tout-en-un ERP + BI + IA pour les entreprises algériennes.
              Centralisez vos données, automatisez vos décisions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Navigation</h4>
            <div className="space-y-2">
              <a href="#solution" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Produit</a>
              <a href="#tarifs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Tarifs</a>
              <a href="#vision" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Vision</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Conformité</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conforme à la loi 18-07 sur la protection des données personnelles.
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Partenariats avec cabinets comptables, experts et espaces de coworking.
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Suivez-nous</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Timd. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
