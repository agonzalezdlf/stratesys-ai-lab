import React, { useState, useEffect } from 'react';
import { Network, Globe2, ShieldCheck, Database, Zap, Share2, Users, ArrowUpRight, Activity, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { cn } from '../lib/utils';

const syncData = [
  { day: 'D1', confidence: 62, savings: 3200 },
  { day: 'D2', confidence: 65, savings: 3400 },
  { day: 'D3', confidence: 64, savings: 3100 },
  { day: 'D4', confidence: 72, savings: 3800 },
  { day: 'D5', confidence: 78, savings: 4200 },
  { day: 'D6', confidence: 85, savings: 4700 },
  { day: 'D7', confidence: 92, savings: 5100 },
];

export function IntelligenceHub() {
  const [activeSimulation, setActiveSimulation] = useState(false);
  const [nodeWeight, setNodeWeight] = useState(74);
  const [activeTab, setActiveTab] = useState<'network' | 'workbench'>('network');
  const [simulationYield, setSimulationYield] = useState(4.7);

  // Simulate dynamic yield updates when parameters change
  useEffect(() => {
    const base = 4.0;
    const weightFactor = (nodeWeight / 100) * 0.8;
    const simulationFactor = activeSimulation ? 1.2 : 1.0;
    setSimulationYield(parseFloat((base + weightFactor + (simulationFactor - 1)).toFixed(1)));
  }, [nodeWeight, activeSimulation]);

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-200">
      <header className="h-[72px] px-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-[18px] font-black text-white tracking-tight uppercase">Operational Intelligence Hub</h1>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Node Madrid-North Cluster: Live Telemetry</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />
          
          <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl">
             <button 
              onClick={() => setActiveTab('network')}
              className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'network' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-slate-300")}
             >
                Network Map
             </button>
             <button 
              onClick={() => setActiveTab('workbench')}
              className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'workbench' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-slate-300")}
             >
                Sim-Workbench
             </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Sync:</span>
              <span className="text-[10px] font-black text-emerald-400 uppercase">Synchronized</span>
           </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 max-w-[1600px] mx-auto w-full">
        {activeTab === 'network' ? (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
              {/* Left Column: Aggregated Metrics */}
              <div className="lg:col-span-3 space-y-6">
                 <div className="grid grid-cols-1 gap-4">
                    <MetricCard title="Anonymized Data Ingestion" value="1.4M" subValue="Points per 24h" trend="+12%" icon={Database} color="blue" />
                    <MetricCard title="Predictive Accuracy" value="92.4%" subValue="Global Confidence" trend="+4.1%" icon={Zap} color="amber" />
                    <MetricCard title="Daily Recapture Yield" value={`€${simulationYield}k`} subValue="Failed Ops Avoided" trend="Live" icon={TrendingUp} color="emerald" />
                 </div>

                 <div className="p-6 bg-slate-900 rounded-[28px] border border-white/5 space-y-4">
                    <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Cluster Health: Madrid-North</h3>
                    <div className="space-y-3">
                       <HealthIndicator label="Node MAD-A1" value={98} />
                       <HealthIndicator label="Node MAD-A2" value={84} />
                       <HealthIndicator label="Node MAD-B1" value={92} />
                       <HealthIndicator label="Node MAD-C1" value={76} />
                    </div>
                 </div>
              </div>

              {/* Center Column: Charts & Analysis */}
              <div className="lg:col-span-6 space-y-6">
                 <div className="bg-slate-900 rounded-[32px] border border-white/5 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                       <Network className="w-48 h-48" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between mb-8">
                       <div>
                          <h2 className="text-[20px] font-black text-white tracking-tight uppercase italic">Historical Sync Efficiency</h2>
                          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Confidence Score vs Yield Recovery</p>
                       </div>
                       <div className="flex gap-2">
                          <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black uppercase text-slate-400">7D Perspective</div>
                       </div>
                    </div>
                    <div className="h-[280px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={syncData}>
                           <defs>
                             <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                             </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 'bold' }} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                           />
                           <Area type="monotone" dataKey="confidence" stroke="#2563EB" strokeWidth={4} fill="url(#yieldGrad)" />
                           <Area type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} fill="transparent" />
                         </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-900 rounded-[32px] border border-white/5 p-6 h-48">
                       <div className="flex items-center justify-between mb-4">
                          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Network Congestion</h4>
                          <Filter className="w-3 h-3 text-slate-600" />
                       </div>
                       <div className="h-full pb-8">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={syncData.slice(-5)}>
                                <Bar dataKey="confidence" fill="#334155" radius={[4, 4, 0, 0]} />
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                    <div className="bg-slate-900 rounded-[32px] border border-white/5 p-6 h-48 flex flex-col items-center justify-center gap-4 text-center">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20">
                          <ShieldCheck className="w-6 h-6" />
                       </div>
                       <div>
                          <div className="text-[14px] font-black text-white italic tracking-tight">Enterprise Protocol v4.2</div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Anonymized GDPR Secure Data Layer</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column: Live Alerts & Feed */}
              <div className="lg:col-span-3 space-y-6">
                 <div className="bg-slate-900 rounded-[28px] border border-white/5 h-full flex flex-col p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-[13px] font-black text-white uppercase tracking-widest italic">Live Intelligence Feed</h3>
                       <div className="px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[8px] font-black uppercase">3 Active Risks</div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                       <AlertItem type="risk" label="Node MAD-C1 Congestion" detail="Queue processing delay: +14 mins" time="2m ago" />
                       <AlertItem type="sync" label="Neighbor Pulse Sync" detail="Vector updated for 12,042 units" time="5m ago" />
                       <AlertItem type="alert" label="Anomaly Detected" detail="Unpredictable closure in User-ID: 421" time="12m ago" />
                       <AlertItem type="success" label="Yield Recovery Boost" detail="€420 recovered by Node-Sync B" time="24m ago" />
                       <AlertItem type="sync" label="Consolidation Event" detail="3 shipments merged for MAD-A2" time="45m ago" />
                    </div>

                    <button className="w-full mt-6 py-4 bg-slate-800 text-slate-300 rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors border border-white/5">
                       View Audit Trails
                    </button>
                 </div>
              </div>
           </div>
        ) : (
           /* Workbench Tab: The Functional Simulator */
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-slate-900 rounded-[40px] p-8 border border-white/5 space-y-8">
                    <div className="space-y-2">
                       <h2 className="text-[20px] font-black text-white tracking-tight italic uppercase">Optimization Workbench</h2>
                       <p className="text-[12px] text-slate-400 font-medium italic">Simulate alternative operational weights for Node Madrid-North.</p>
                    </div>

                    <div className="space-y-10">
                       <WorkbenchSlider label="Node Ingestion Weight" value={nodeWeight} setValue={setNodeWeight} min={0} max={100} icon={Zap} />
                       
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Active Recapture Engines</h4>
                          <div className="space-y-4 pt-2">
                             <SimulationControl label="Neighborhood Absence Sync" active={true} description="Uses cross-provider failed delivery data" />
                             <SimulationControl label="Behavioral Vector Prediction" active={true} description="AI models individual user habits" />
                             <SimulationControl label="Proximity Multi-Sync" active={activeSimulation} setActive={setActiveSimulation} description="Consolidates stops in congested windows" />
                             <SimulationControl label="iCal Preference ingestion" active={true} description="Integrates customer availability matrix" />
                          </div>
                       </div>
                    </div>
                    
                    <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] text-[13px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/20 active:scale-95">
                       Apply Strategy to Cluster
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-8 space-y-6 h-full flex flex-col">
                 <div className="bg-slate-900 rounded-[40px] p-10 border border-white/5 flex-1 flex flex-col items-center justify-center relative overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                    
                    <div className="relative z-10 max-w-xl mx-auto space-y-12">
                       <div className="space-y-4">
                          <div className="flex justify-center">
                             <div className="w-20 h-20 bg-blue-500/10 rounded-[32px] flex items-center justify-center text-blue-400 border border-blue-500/20 animate-pulse">
                                <Activity className="w-10 h-10" />
                             </div>
                          </div>
                          <h2 className="text-[42px] font-black text-white tracking-widest uppercase italic leading-none">Simulation Yield</h2>
                          <div className="text-[64px] font-black text-emerald-500 tabular-nums tracking-tighter">
                             +€{simulationYield.toFixed(1)}k <span className="text-[24px] text-slate-500">/ Day</span>
                          </div>
                          <p className="text-[14px] text-slate-400 font-medium italic max-w-md mx-auto">
                             Based on current Cluster weights, these settings would recapture approximately <strong>{((simulationYield/10)*100).toFixed(1)}%</strong> of current operational waste.
                          </p>
                       </div>

                       <div className="grid grid-cols-3 gap-6">
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                             <div className="text-[11px] font-black text-blue-400 uppercase mb-2">Failure Avoidance</div>
                             <div className="text-[20px] font-black text-white">92.4%</div>
                          </div>
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                             <div className="text-[11px] font-black text-amber-500 uppercase mb-2">Route Optimization</div>
                             <div className="text-[20px] font-black text-white">+14.2%</div>
                          </div>
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                             <div className="text-[11px] font-black text-emerald-500 uppercase mb-2">Confidence Delta</div>
                             <div className="text-[20px] font-black text-white">+8.1%</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subValue, trend, icon: Icon, color }: any) {
   const colors: any = {
      blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
   };
   return (
      <div className="bg-slate-900 p-6 rounded-[28px] border border-white/5 relative overflow-hidden group">
         <div className="flex items-center justify-between mb-4">
            <div className={cn("p-2.5 rounded-xl border", colors[color])}>
               <Icon className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-black text-slate-500 bg-white/5 px-2 py-1 rounded-lg uppercase">{trend}</div>
         </div>
         <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-[24px] font-black text-white italic tracking-tight">{value}</div>
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter mt-1">{subValue}</div>
         </div>
      </div>
   );
}

function HealthIndicator({ label, value }: { label: string, value: number }) {
   return (
      <div className="space-y-1.5">
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <span className={cn("text-[9px] font-black uppercase", value > 90 ? "text-emerald-500" : value > 80 ? "text-blue-400" : "text-amber-500")}>{value}%</span>
         </div>
         <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
               className={cn("h-full transition-all duration-1000", value > 90 ? "bg-emerald-500" : value > 80 ? "bg-blue-600" : "bg-amber-500")} 
               style={{ width: `${value}%` }} 
            />
         </div>
      </div>
   );
}

function AlertItem({ type, label, detail, time }: any) {
   const icons: any = {
      risk: <AlertCircle className="w-4 h-4 text-rose-500" />,
      sync: <Network className="w-4 h-4 text-blue-400" />,
      alert: <Zap className="w-4 h-4 text-amber-500" />,
      success: <TrendingUp className="w-4 h-4 text-emerald-500" />
   };
   return (
      <div className="flex gap-4 group cursor-pointer">
         <div className="mt-1 transition-transform group-hover:scale-110">{icons[type]}</div>
         <div className="flex-1 border-b border-white/5 pb-3">
            <div className="flex items-center justify-between mb-0.5">
               <div className="text-[11px] font-black text-slate-200 tracking-tight uppercase italic">{label}</div>
               <span className="text-[9px] font-bold text-slate-600 uppercase italic">{time}</span>
            </div>
            <div className="text-[9px] text-slate-500 font-bold leading-tight">{detail}</div>
         </div>
      </div>
   );
}

function WorkbenchSlider({ label, value, setValue, min, max, icon: Icon }: any) {
   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Icon className="w-4 h-4 text-blue-400" />
               <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[14px] font-black text-white italic">{value}%</span>
         </div>
         <input 
            type="range" 
            min={min} max={max} 
            value={value} 
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
         />
      </div>
   );
}

function SimulationControl({ label, active, setActive, description }: any) {
   const [internalOn, setInternalOn] = useState(active);
   const isOn = setActive ? active : internalOn;
   const toggle = () => (setActive ? setActive(!active) : setInternalOn(!internalOn));

   return (
      <div className="flex gap-4 group">
         <button 
           onClick={toggle}
           className={cn("w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center border transition-all", isOn ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20" : "bg-slate-950 border-white/10 text-slate-600")}
         >
            {isOn ? <ShieldCheck className="w-5 h-5" /> : <Database className="w-5 h-5" />}
         </button>
         <div className="flex-1">
            <div className={cn("text-[11px] font-black uppercase transition-colors italic", isOn ? "text-white" : "text-slate-500")}>{label}</div>
            <div className="text-[9px] text-slate-600 font-bold italic mt-0.5">{description}</div>
         </div>
      </div>
   );
}

