import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';
import { 
  ShieldAlert, Truck, Target, ChevronLeft, HelpCircle, ArrowRight, Search,
  ArrowDownLeft, ArrowUpRight, MapPin, LayoutGrid, Map as MapIcon, RotateCw, CheckCircle,
  Network, X, Check, BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';
import { ROUTE_SUMMARIES, MOCK_DELIVERIES } from '../data';
import { cn } from '../lib/utils';

const trendData = [
  { name: 'Mon', success: 82, failures: 12, accuracy: 88, recovered: 450 },
  { name: 'Tue', success: 85, failures: 10, accuracy: 90, recovered: 520 },
  { name: 'Wed', success: 81, failures: 15, accuracy: 85, recovered: 480 },
  { name: 'Thu', success: 88, failures: 8, accuracy: 92, recovered: 610 },
  { name: 'Fri', success: 91, failures: 5, accuracy: 94, recovered: 740 },
  { name: 'Sat', success: 94, failures: 4, accuracy: 96, recovered: 820 },
  { name: 'Sun', success: 93, failures: 4, accuracy: 95, recovered: 780 },
];

export function Dashboard() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'delivery' | 'pickup'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'live' | 'programmed'>('all');
  const [filterDay, setFilterDay] = useState('Today');

  const filteredTrucks = (zoneId: string) => {
    // Generate some mock trucks for the zone
    const trucks = [1, 2, 3, 4, 5, 6].map(i => ({
      id: `TR-${zoneId.slice(-3)}-L${i}`,
      isPickup: i % 2 === 0,
      status: i < 5 ? 'live' : 'programmed',
      health: 90 + i
    }));

    return trucks.filter(t => {
      if (filterType !== 'all' && (t.isPickup ? 'pickup' : 'delivery') !== filterType) return false;
      if (filterStatus !== 'all' && t.status !== filterStatus) return false;
      if (searchQuery && !t.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <header className="h-[72px] px-8 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[20px] font-black text-[#1E293B]">Node Operations View</h1>
            <p className="text-[13px] text-[#64748B] font-medium uppercase tracking-tight opacity-70 italic">Madrid-North Area Control</p>
          </div>
          {selectedZone && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg ml-6">
               <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest">Zone:</span>
               <span className="text-[12px] font-black text-blue-600">{selectedZone}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg mr-4">
             <button 
              onClick={() => setViewMode('list')}
              className={cn("px-4 py-1.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all", viewMode === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
             >
               <LayoutGrid className="w-3.5 h-3.5" />
               List
             </button>
             <button 
              onClick={() => setViewMode('map')}
              className={cn("px-4 py-1.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all", viewMode === 'map' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500")}
             >
               <MapIcon className="w-3.5 h-3.5" />
               Spatial
             </button>
          </div>
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 font-black text-[12px]">AG</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-6 gap-4">
            <KPICard title="First-Attempt Success" value="91.4%" trend="↑ 2.4%" up={true} />
            <KPICard title="Avg Time Window" value="42 min" trend="Narrowed from 4h" up={true} accent="emerald" />
            <KPICard title="Failed Ops Avoided" value="2,142" trend="Redirected" up={true} />
            <KPICard title="On-Time Rate" value="97.8%" trend="Live Sync" up={true} />
            <KPICard title="Optimized Savings" value="€142,400" trend="Est. Monthly" up={true} accent="emerald" />
            <KPICard title="Fleet Utilization" value="98.2%" trend="Optimal" up={true} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="panel overflow-hidden">
                <div className="panel-header flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedZone && (
                      <button 
                        onClick={() => {
                          if (selectedTruck) setSelectedTruck(null);
                          else setSelectedZone(null);
                        }}
                        className="p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-600" />
                      </button>
                    )}
                    <h3 className="text-[16px] font-black text-slate-900 tracking-tight lowercase first-letter:uppercase">
                      {!selectedZone ? "Operational Districts" : 
                       !selectedTruck ? `Fleet Units in ${selectedZone}` : 
                       `Execution Record: ${selectedTruck}`}
                    </h3>
                  </div>
                  
                  {selectedZone && !selectedTruck && (
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Unit ID..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold focus:outline-none focus:border-blue-300 w-32"
                          />
                       </div>
                       <select 
                         value={filterType}
                         onChange={(e: any) => setFilterType(e.target.value)}
                         className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-tight"
                       >
                          <option value="all">Any Service</option>
                          <option value="delivery">Delivery Only</option>
                          <option value="pickup">Pickup Only</option>
                       </select>
                    </div>
                  )}
                </div>

                <div className="min-h-[550px] bg-white flex flex-col">
                  {viewMode === 'map' ? (
                       selectedTruck ? (
                        <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden p-8">
                           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
                           <div className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-[48px] border border-white shadow-2xl flex flex-col items-center gap-8 max-w-lg text-center relative">
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
                                 <Truck className="w-12 h-12" />
                              </div>
                              <div className="pt-8">
                                 <h4 className="text-[20px] font-black text-slate-900 tracking-tighter uppercase mb-2">Spatial Route Vector: {selectedTruck}</h4>
                                 <p className="text-[12px] text-slate-500 italic font-medium leading-relaxed">
                                    The individual unit map view is rendering live telemetry. In this simulation, the truck is currently traversing the <strong>{selectedZone}</strong> node cluster.
                                 </p>
                              </div>
                              
                              <div className="flex flex-col gap-3 w-full">
                                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100"><Check className="w-5 h-5" /></div>
                                       <div className="text-left"><div className="text-[11px] font-black uppercase text-slate-400">Completed</div><div className="text-[14px] font-black text-slate-800">42 Nodes</div></div>
                                    </div>
                                    <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                                       <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 italic font-black">78</div>
                                       <div className="text-left"><div className="text-[11px] font-black uppercase text-slate-400">Potential</div><div className="text-[14px] font-black text-slate-800">Queue Remaining</div></div>
                                    </div>
                                 </div>
                              </div>

                              <div className="w-full flex items-center gap-3 pt-4">
                                 <button onClick={() => setViewMode('list')} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest">Return to Ledger</button>
                                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Expand Spatial</button>
                              </div>
                           </div>
                           
                           {/* Decorative Route Line */}
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                              <svg width="800" height="400" viewBox="0 0 800 400" className="w-full h-full max-w-4xl px-20">
                                 <motion.path 
                                    d="M 50 200 Q 200 50 400 200 T 750 200" 
                                    fill="none" 
                                    stroke="#2563EB" 
                                    strokeWidth="4" 
                                    strokeDasharray="12 12"
                                    initial={{ strokeDashoffset: 100 }}
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                 />
                                 <circle cx="50" cy="200" r="8" fill="#10B981" />
                                 <circle cx="200" cy="115" r="8" fill="#10B981" />
                                 <circle cx="400" cy="200" r="8" fill="#2563EB" className="animate-pulse" />
                                 <circle cx="600" cy="285" r="8" fill="#F59E0B" />
                                 <circle cx="750" cy="200" r="8" fill="#94A3B8" />
                              </svg>
                           </div>
                        </div>
                       ) : (
                        <div className="flex-1 bg-slate-50/50 p-12 grid grid-cols-3 gap-12 relative overflow-hidden">
                           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                           {ROUTE_SUMMARIES.map((route) => (
                             <motion.div 
                               key={route.routeId}
                               onClick={() => setSelectedZone(route.routeId)}
                               className="flex flex-col items-center gap-4 group cursor-pointer"
                               whileHover={{ y: -5 }}
                             >
                                <div className={cn(
                                  "w-24 h-24 rounded-[32px] bg-white shadow-xl flex items-center justify-center border-4 group-hover:border-blue-500 transition-all duration-300",
                                  route.health > 85 ? "border-emerald-500" : "border-amber-500"
                                )}>
                                   <Network className={cn("w-10 h-10", route.health > 85 ? "text-emerald-600" : "text-amber-600")} />
                                </div>
                                <div className="text-center">
                                   <div className="text-[12px] font-black text-slate-800 tracking-tighter uppercase">{route.routeId}</div>
                                   <div className="text-[10px] font-bold text-slate-400 italic">{route.health}% Node Health</div>
                                </div>
                             </motion.div>
                           ))}
                        </div>
                       )
                  ) : (
                    <div className="flex-1 overflow-y-auto">
                       {selectedTruck ? (
                         <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-5">
                                 <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-[20px] shadow-xl shadow-blue-200">
                                    {selectedTruck.split('-').pop()?.slice(-2)}
                                 </div>
                                 <div>
                                    <div className="text-[18px] font-black text-slate-900 tracking-tighter uppercase mb-1">{selectedTruck}</div>
                                    <div className="flex items-center gap-3 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                       <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /> Live Sync Active</span>
                                       <span className="text-slate-300">|</span>
                                       <span className="text-slate-400 italic capitalize">{selectedZone}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-8 text-right border-l border-slate-100 pl-8">
                                 <div>
                                    <div className="text-[16px] font-black text-slate-900">124 Stops</div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Total Unit Load</div>
                                 </div>
                                 <div>
                                    <div className="text-[16px] font-black text-emerald-600 flex items-center gap-1 justify-end">98.4% <CheckCircle className="w-4 h-4" /></div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1 text-right">Node Confidence</div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 space-y-10">
                              <div className="space-y-4">
                                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Execution Record (Completed)</h5>
                                 {ROUTE_SUMMARIES.find(r => r.routeId === selectedZone)?.completedStops?.map(stop => (
                                   <div key={stop.id} className="flex items-center gap-5 p-4 bg-slate-50 border border-slate-100 rounded-[24px] opacity-70">
                                      <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center border text-[11px] font-black",
                                        stop.status === 'success' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                      )}>
                                         {stop.status === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                      </div>
                                      <div className="flex-1 truncate">
                                         <div className="text-[14px] font-black text-slate-600 truncate uppercase italic">{stop.address}</div>
                                         <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{stop.status} @ {stop.time}</div>
                                      </div>
                                   </div>
                                 ))}
                              </div>

                              <div className="space-y-4">
                                 <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 italic">Live Traversal Queue (Pending)</h5>
                                 {MOCK_DELIVERIES
                                   .filter(d => d.assignedRoute === selectedZone || !selectedZone)
                                   .map((d, i) => (
                                     <motion.div 
                                       key={d.id}
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: i * 0.05 }}
                                       className="p-6 bg-white border border-slate-100 rounded-[32px] shadow-sm flex items-center gap-6 hover:border-blue-300 transition-all group"
                                     >
                                        <div className={cn(
                                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-110 transition-all",
                                          d.stopType === 'pickup' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                        )}>
                                           {d.stopType === 'pickup' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                           <div className="text-[16px] font-black text-slate-900 group-hover:text-blue-600 font-black uppercase tracking-tighter transition-colors mb-1 truncate">{d.address}</div>
                                           <div className="flex items-center gap-4 text-[10px] font-black text-slate-400">
                                              <span className="uppercase tracking-widest">{d.suggestedSlot}</span>
                                              <span className="text-slate-300">|</span>
                                              <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5" /> Based on <strong>{d.historyCount} orders</strong></span>
                                           </div>
                                        </div>
                                        <div className="text-right border-l border-slate-100 pl-8">
                                           <div className="text-[20px] font-black text-slate-900 leading-none">{Math.round(d.predictedProbability * 100)}%</div>
                                           <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Confidence</div>
                                        </div>
                                     </motion.div>
                                   ))}
                              </div>
                           </div>
                         </div>
                       ) : !selectedZone ? (
                          <div className="p-8 space-y-4">
                             {ROUTE_SUMMARIES.map(route => (
                               <div 
                                 key={route.routeId}
                                 onClick={() => setSelectedZone(route.routeId)}
                                 className="flex items-center gap-6 p-6 bg-white hover:bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer rounded-[24px] transition-all group shadow-sm"
                               >
                                  <div className="w-32 shrink-0">
                                     <div className="text-[14px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{route.routeId}</div>
                                     <div className="text-[10px] font-bold text-slate-400 italic">Madrid Node Region</div>
                                  </div>
                                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative shadow-inner">
                                     <div className={cn("h-full transition-all duration-1000", route.health > 85 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${route.health}%` }} />
                                  </div>
                                  <div className="w-40 flex items-center justify-end gap-6 border-l border-slate-100 pl-6 text-right">
                                     <div className="text-center">
                                        <div className="text-[13px] font-black text-slate-700">{route.totalStops}</div>
                                        <div className="text-[8px] font-black text-slate-400 uppercase leading-none">Units</div>
                                     </div>
                                     <div className="text-center">
                                        <div className="text-[13px] font-black text-blue-600">{route.aiInterventions}</div>
                                        <div className="text-[8px] font-black text-slate-400 uppercase leading-none">AI Ops</div>
                                     </div>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all translate-x-0 group-hover:translate-x-1" />
                               </div>
                             ))}
                          </div>
                       ) : (
                          <div className="p-8 space-y-6">
                             <div className="flex items-center justify-between px-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] italic">
                                Live In-Flight Fleet ({selectedZone})
                                <div className="flex items-center gap-4 text-slate-400">
                                   <span className="flex items-center gap-1.5"><ArrowUpRight className="w-3.5 h-3.5 text-blue-600" /> Outbound</span>
                                   <span className="flex items-center gap-1.5"><ArrowDownLeft className="w-3.5 h-3.5 text-amber-500" /> Inbound</span>
                                </div>
                             </div>
                             <div className="grid grid-cols-1 gap-4">
                                {filteredTrucks(selectedZone).map(t => (
                                  <div 
                                    key={t.id}
                                    onClick={() => setSelectedTruck(t.id)}
                                    className="flex items-center gap-6 p-5 bg-white border border-slate-200 rounded-[24px] cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all group"
                                  >
                                     <div className={cn(
                                       "w-12 h-12 rounded-xl flex items-center justify-center border transition-colors",
                                       t.isPickup ? "bg-amber-50 text-amber-500 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                     )}>
                                        {t.isPickup ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                     </div>
                                     <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                           <div className="text-[16px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">{t.id}</div>
                                           <span className={cn(
                                             "text-[9px] font-black uppercase px-2 py-0.5 rounded-full border",
                                             t.status === 'live' ? "bg-blue-50 text-blue-600 border-blue-100 animate-pulse" : "bg-slate-50 text-slate-400 border-slate-200"
                                           )}>
                                             {t.status}
                                           </span>
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 uppercase italic">Operational Sync: Active • Madrid-North A1 Hub</div>
                                     </div>
                                     <div className="text-right border-l border-slate-100 pl-6 w-32">
                                        <div className="text-[16px] font-black text-slate-900 leading-none">{t.health}%</div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Health</div>
                                     </div>
                                     <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all" />
                                  </div>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <div className="panel bg-[#FDFEFF] border-emerald-100 overflow-hidden">
                  <div className="panel-header border-b border-emerald-50 flex items-center justify-between">
                     <h3 className="text-[13px] font-black text-emerald-800 uppercase tracking-widest italic">Node Savings Yield</h3>
                     <RotateCw className="w-3.5 h-3.5 text-emerald-400 animate-[spin_3s_linear_infinite]" />
                  </div>
                  <div className="p-8 flex flex-col">
                     <div className="h-40 w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={trendData}>
                           <Bar dataKey="recovered" radius={[4, 4, 0, 0]}>
                             {trendData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={index === trendData.length - 1 ? '#10B981' : '#D1FAE5'} />
                             ))}
                           </Bar>
                         </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="text-center space-y-3">
                        <div className="text-[32px] font-black text-emerald-600 leading-none tracking-tighter">€142,400</div>
                        <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Monthly Recovered Value</div>
                        <p className="text-[11px] text-slate-500 italic leading-relaxed pt-4 border-t border-slate-100 mt-4">
                           Automated AI overrides preventing 2k+ delivery failures this month at Node: Madrid.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="panel bg-slate-900 border-none p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                        <BrainCircuit className="w-4 h-4" /> Optimization Hub
                     </div>
                     <h4 className="text-[18px] font-black leading-tight italic tracking-tighter">Adjust Node AI Constraints</h4>
                     <p className="text-[11px] text-slate-400 italic leading-relaxed border-l-2 border-blue-500 pl-3">
                        Simulate alternative recovery strategies for Madrid North.
                     </p>

                     <div className="space-y-6 pt-4">
                        <div className="space-y-2.5">
                           <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <span>Route Density Bias</span>
                              <span className="text-blue-400">+42%</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[42%]" />
                           </div>
                        </div>
                        <div className="space-y-2.5">
                           <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <span>Recovery Sensitivity</span>
                              <span className="text-emerald-400">High</span>
                           </div>
                           <div className="grid grid-cols-3 gap-1">
                              <div className="h-1.5 bg-emerald-500 rounded-full" />
                              <div className="h-1.5 bg-emerald-500 rounded-full" />
                              <div className="h-1.5 bg-slate-800 rounded-full" />
                           </div>
                        </div>
                     </div>

                     <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700/50">
                        <div className="text-[12px] font-bold text-blue-400 mb-1 leading-none">Simulation Yield</div>
                        <div className="text-[15px] font-black tracking-tight text-white italic">+€4.2k Extra Savings</div>
                     </div>

                     <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-blue-500/20">
                        Apply Simulation
                     </button>
                  </div>
                  <Target className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 pointer-events-none" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, up, accent }: any) {
  return (
    <div className="p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm hover:shadow-md transition-all group">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors">{title}</p>
      <div className="text-[26px] font-black text-slate-900 tracking-tighter mb-2">{value}</div>
      <div className={cn(
        "text-[11px] font-black uppercase tracking-widest italic flex items-center gap-2",
        accent === 'emerald' ? "text-emerald-600" : up ? "text-blue-600" : "text-rose-600"
      )}>
        {trend}
      </div>
    </div>
  );
}
