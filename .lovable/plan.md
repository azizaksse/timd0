
# Timd — Site Marketing SaaS

## Vue d'ensemble
Site vitrine moderne et premium pour **Timd**, plateforme ERP + BI + IA tout-en-un destinée aux entreprises algériennes. Une seule page landing avec un design dark, des gradients abstraits violet/bleu/vert, des cartes glassmorphism et des animations fluides. Tout le contenu sera en français.

---

## Sections à implémenter

### 1. Navbar sticky
- Logo "Timd" avec effet gradient
- Liens d'ancrage : Produit, Pour qui ?, Tarifs, Preuve marché, Vision
- Bouton CTA "Réserver une démo"
- Fond translucide avec blur, menu hamburger sur mobile

### 2. Hero Section
- Badge "ERP + BI + IA pour les entreprises algériennes"
- Titre accrocheur présentant Timd comme cockpit tout-en-un
- Sous-titre sur la centralisation des données et décisions data-driven
- Badge cible "Pour PME, CMI et grandes entreprises en Algérie"
- Deux CTA : "Réserver une démo" + "Voir un exemple de tableau de bord"
- Mockup dashboard (composant React/Tailwind) avec KPIs fictifs (CA en DZD, croissance, marge) et mini-graphiques via Recharts
- Fond avec gradients abstraits et formes flottantes animées

### 3. "Pour qui ?" — Segments clients
- 4 cartes glassmorphism avec icônes : PME & CMI, Startups en croissance, Entreprises avec difficultés d'analyse, Organisations voulant automatiser
- Chaque carte : phrase concrète sur le problème/besoin du segment

### 4. "Problèmes actuels" — Points de douleur
- Paragraphe d'intro basé sur l'étude de 19 entreprises
- 4 cartes problème avec icônes : stock complexe, rapports manuels/Excel, suivi rentabilité difficile, outils éparpillés

### 5. "La solution Timd" — Proposition de valeur
- Paragraphe expliquant la plateforme tout-en-un
- 6 bullet points avec icônes (centralisation, tableaux de bord auto, IA prédictive, simplicité, réduction coûts, décisions fiables)
- Mini-section "Pourquoi Timd se démarque" : flexibilité/coût + IA intégrée

### 6. "Preuve marché" — Validation terrain
- 3 grandes cartes métriques animées : 19 entreprises interrogées, 61% intéressées, 10 prêtes à tester
- Contexte : marché déjà conscient (ERP/Excel/CRM), opportunité Excel → Timd

### 7. "Accompagnement & support"
- 4 colonnes/cartes : intégration personnalisée, support technique continu, formation utilisateurs, mises à jour régulières

### 8. "Vision & conformité"
- Vision à 1 an : 10 entreprises, multi-secteurs, MVP → lancement
- Engagements : loi 18-07, cybersécurité cloud, paiement numérique

### 9. Tarifs (Pricing)
- Intro mentionnant les fourchettes budget (20 000 – 35 000 DA / +50 000 DA)
- 3 cartes côte à côte : Basic, Pro (mis en avant), Premium
- Chaque carte : nom, sous-titre, description, 3-5 features, prix placeholder "À partir de XX 000 DA/mois", CTA "Parler à un conseiller"

### 10. Footer
- Description courte de Timd
- Liens : Produit, Tarifs, Vision, Contact
- Mentions légales (loi 18-07, partenariats)
- Icônes sociales placeholder (Instagram, LinkedIn)

---

## Design & UX
- **Thème dark** avec gradients violet/bleu/vert en arrière-plan
- **Glassmorphism** : cartes semi-transparentes avec backdrop-blur et bordures subtiles
- **Animations** : fade-in au scroll via CSS/Intersection Observer, formes flottantes animées dans le hero
- **Typographie** : Inter, hiérarchie claire
- **Responsive** : mobile-first, grilles adaptatives
- **Graphiques** : Recharts pour le mockup dashboard du hero

## Structure technique
- Composants organisés par section dans `src/components/`
- Page unique `Index.tsx` assemblant toutes les sections
- Pas de backend nécessaire — site statique marketing
