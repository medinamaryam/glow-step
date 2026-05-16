import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, ArrowDownRight, PieChart, Activity, ChevronLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminDashboardProps {
  onBack: () => void;
}

const CHURN_DATA = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 2.3 },
  { month: 'Mar', rate: 1.9 },
  { month: 'Apr', rate: 1.8 },
  { month: 'Mei', rate: 1.5 },
];

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const activeUsers = 2000;
  const pricePerMonth = 15000;
  const estimatedRevenue = activeUsers * pricePerMonth;
  const currentChurn = 1.5;

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-3 bg-gray-100 rounded-2xl text-brand-ink"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display font-bold text-2xl text-brand-ink">Admin Dashboard</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Simulation & Analytics</p>
          </div>
        </div>
        <div className="bg-brand-sage/20 text-brand-sage px-4 py-2 rounded-xl text-[10px] font-bold uppercase border border-brand-sage/30">
          Live Status
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-ink text-white p-6 rounded-[32px] shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <DollarSign className="w-6 h-6 text-brand-peach mb-4" />
            <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest leading-none mb-1">Monthly Revenue</p>
            <h3 className="text-xl font-black font-display">Rp{(estimatedRevenue / 1000000).toFixed(1)}jt</h3>
          </div>
          <Activity className="absolute -right-4 -bottom-4 w-20 h-20 text-white/5 rotate-12" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm"
        >
          <Users className="w-6 h-6 text-brand-sage mb-4" />
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Premium Users</p>
          <h3 className="text-xl font-black font-display text-brand-ink">{activeUsers.toLocaleString('id-ID')}</h3>
        </motion.div>
      </div>

      {/* Churn Rate & Detailed Stats */}
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-brand-ink">Churn Rate Analysis</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Customer Retention</p>
            </div>
            <div className="flex items-center gap-2 text-green-500 font-bold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
              <ArrowDownRight className="w-4 h-4" />
              {currentChurn}%
            </div>
          </div>

          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHURN_DATA}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86efac" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '10px', color: '#111827' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
             <span>Churn Menurun 20% bulan ini</span>
             <span className="text-brand-ink">Target: 1.0%</span>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100">
          <h4 className="font-bold text-brand-ink mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-peach" />
            Estimasi Laporan Mendalam
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-xs text-gray-500">Gross Monthly Revenue</span>
              <span className="text-sm font-bold text-brand-ink">Rp{estimatedRevenue.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-xs text-gray-500">Processing Fees (3%)</span>
              <span className="text-sm font-bold text-red-400">-Rp{(estimatedRevenue * 0.03).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-xs font-bold text-brand-ink">Net Revenue</span>
              <span className="text-sm font-black text-brand-sage">Rp{(estimatedRevenue * 0.97).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-12 pb-12">
        Admin Simulation Mode • Confidental
      </p>
    </div>
  );
}
