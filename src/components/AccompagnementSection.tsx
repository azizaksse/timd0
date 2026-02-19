import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Settings, Headphones, GraduationCap, RefreshCw } from "lucide-react";

const items = [
  {
    icon: Settings,
    title: "Intégration personnalisée",
    desc: "Accompagnement complet pour connecter vos outils existants (ERP, Excel, CRM) à Timd.",
  },
  {
    icon: Headphones,
    title: "Support technique continu",
    desc: "Une équipe dédiée pour répondre à vos questions et résoudre vos problèmes rapidement.",
  },
  {
    icon: GraduationCap,
    title: "Formation des utilisateurs",
    desc: "Sessions de formation pour que chaque membre de votre équipe maîtrise la plateforme.",
  },
  {
    icon: RefreshCw,
    title: "Mises à jour régulières",
    desc: "Nouvelles fonctionnalités et améliorations basées sur les retours de nos clients.",
  },
];

const AccompagnementSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Un accompagnement complet, du setup au quotidien
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass-card p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccompagnementSection;
