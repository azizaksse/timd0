import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const salesData = [
  { month: "Jan", value: 4200 },
  { month: "Fév", value: 5800 },
  { month: "Mar", value: 5200 },
  { month: "Avr", value: 7100 },
  { month: "Mai", value: 6800 },
  { month: "Jun", value: 8900 },
];

const stockData = [
  { name: "A", value: 65 },
  { name: "B", value: 42 },
  { name: "C", value: 78 },
  { name: "D", value: 55 },
  { name: "E", value: 88 },
];

const DashboardMockup = () => {
  return (
    <div className="glass-card p-6 space-y-4 shadow-lg border-border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tableau de bord</p>
          <h3 className="text-sm font-semibold text-foreground">Vue d'ensemble</h3>
        </div>
        <span className="text-[10px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">
          Étude sur 19 entreprises
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-secondary/40 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground">CA mensuel</p>
          <p className="text-lg font-bold text-foreground">8.9M <span className="text-xs text-muted-foreground">DZD</span></p>
          <p className="text-[10px] text-accent">+12.4%</p>
        </div>
        <div className="bg-secondary/40 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground">Croissance</p>
          <p className="text-lg font-bold text-foreground">+23%</p>
          <p className="text-[10px] text-accent">vs trimestre</p>
        </div>
        <div className="bg-secondary/40 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground">Marge nette</p>
          <p className="text-lg font-bold text-foreground">18.2%</p>
          <p className="text-[10px] text-primary">stable</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-2">Ventes (M DZD)</p>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(258 70% 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(258 70% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="hsl(258 70% 60%)" fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-secondary/30 rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-2">Stock par catégorie</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={stockData}>
              <Bar dataKey="value" fill="hsl(175 60% 45%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
