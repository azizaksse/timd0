import { Instagram, Linkedin } from "lucide-react";
import timdLogo from "@/assets/timd-logo.png";
import footerVideo from "@/assets/footer-video.mp4";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src={footerVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          {/* CTA banner */}
          <div className="text-center mb-14">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              {t.footer.ctaTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
              {t.footer.ctaSubtitle}
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t.footer.ctaButton}
            </a>
          </div>

          <div className="border-t border-foreground/10 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <img src={timdLogo} alt="Timd" className="h-10 w-10 rounded-full object-cover border border-border/50 mb-3" />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {t.footer.brandDesc}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3">{t.footer.navTitle}</h4>
              <div className="space-y-2">
                <a href="#solution" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.navLinks.produit}</a>
                <a href="#tarifs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.navLinks.tarifs}</a>
                <a href="#vision" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.navLinks.vision}</a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.navLinks.contact}</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-3">{t.footer.complianceTitle}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.footer.complianceText}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {t.footer.partnersText}
              </p>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold mb-3">{t.footer.socialTitle}</h4>
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
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
