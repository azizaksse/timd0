import { AreaChart, Area, BarChart, Bar, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl p-6 space-y-4 bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50">{t.dashboard.title}</p>
          <h3 className="text-sm font-semibold text-white">{t.dashboard.subtitle}</h3>
        </div>
        <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
          {t.dashboard.study}
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-[10px] text-white/50">{t.dashboard.caLabel}</p>
          <p className="text-lg font-bold text-white">8.9M <span className="text-xs text-white/50">DZD</span></p>
          <p className="text-[10px] text-emerald-400">+12.4%</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-[10px] text-white/50">{t.dashboard.growthLabel}</p>
          <p className="text-lg font-bold text-white">+23%</p>
          <p className="text-[10px] text-emerald-400">{t.dashboard.vsQuarter}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-[10px] text-white/50">{t.dashboard.marginLabel}</p>
          <p className="text-lg font-bold text-white">18.2%</p>
          <p className="text-[10px] text-purple-400">{t.dashboard.stable}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-[10px] text-white/50 mb-2">{t.dashboard.salesChart}</p>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#a78bfa" fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-[10px] text-white/50 mb-2">{t.dashboard.stockChart}</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={stockData}>
              <Bar dataKey="value" fill="#a78bfa" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
