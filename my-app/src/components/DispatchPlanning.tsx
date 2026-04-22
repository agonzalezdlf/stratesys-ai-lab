import React, { useState } from 'react';
import { 
  Check, X, Clock, HelpCircle, ArrowRight, Filter, Search, 
  Settings2, MapPin, BrainCircuit, ShieldCheck, AlertTriangle, Users,
  ArrowDownLeft, ArrowUpRight, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_DELIVERIES } from '../data';
import { cn } from '../lib/utils';
import { Delivery } from '../types';

export function BulkPlanner() {
  const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedZone, setSelectedZone] = useState('MAD-NORTH-A1');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const entries = [...deliveries, ...deliveries, ...deliveries].filter(d => 
    (d.stopType === activeTab) &&
    (d.assignedRoute === selectedZone || selectedZone === 'ALL') &&
    (d.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
     d.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAction = (id: string, action: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === id) {
        if (action === 'priority') return { ...d, priority: !d.priority };
        if (action === 'move') return { ...d, suggestedSlot: 'Adjusted...' };
      }
      return d;
    }));
  };

  const getColorByProb = (prob: number) => {
    if (prob > 0.85) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (prob > 0.6) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <header className="h-[72px] px-8 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
        <div>
          <h1 className="text-[20px] font-black text-[#1E293B]">Bulk Dispatch Planner</h1>
          <p className="text-[13px] text-[#64748B] font-medium uppercase tracking-tight opacity-70 italic">Massive Sequence Optimization Control</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[11px] font-bold border border-amber-100 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            14 Massive Conflicts Detected
          </div>
          <button className="bg-white border border-[#E2E8F0] text-[#1E293B] px-4 py-2 rounded-lg text-[13px] font-[600] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            Batch Redirect
            <MapPin className="w-3.5 h-3.5" />
          </button>
          <button className="bg-[#2563EB] text-white px-5 py-2 rounded-lg text-[13px] font-[600] hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
            Apply AI Bulk Polish
            <BrainCircuit className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 max-w-[1280px] mx-auto w-full">
        {/* Bulk Dispatch Tabs & Zone Select */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
             <button 
               onClick={() => setActiveTab('delivery')}
               className={cn(
                 "px-6 py-2 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                 activeTab === 'delivery' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
               )}
             >
                <ArrowUpRight className="w-4 h-4" />
                Delivery Units
             </button>
             <button 
               onClick={() => setActiveTab('pickup')}
               className={cn(
                 "px-6 py-2 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                 activeTab === 'pickup' ? "bg-white text-amber-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
               )}
             >
                <ArrowDownLeft className="w-4 h-4" />
                Pickup Units
             </button>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Operational Zone:</span>
             <select 
               value={selectedZone}
               onChange={(e) => setSelectedZone(e.target.value)}
               className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[12px] font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-[180px]"
             >
                <option value="ALL">All Zones (Madrid Cluster)</option>
                <option value="MAD-NORTH-A1">Madrid-North (A1)</option>
                <option value="MAD-NORTH-A2">Madrid-North (A2)</option>
                <option value="MAD-CENTRAL-B2">Madrid-Central (B2)</option>
                <option value="MAD-EAST-C4">Madrid-East (C4)</option>
                <option value="MAD-WEST-E1">Madrid-West (E1)</option>
             </select>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="panel-header flex justify-between items-center bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="text-[15px] font-[900] uppercase tracking-tighter text-slate-800">Operational Ledger: {selectedZone}</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-[#2563EB] rounded text-[10px] font-black uppercase">{entries.length} Load Nodes</span>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-black uppercase">14 Risks Detected</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#94A3B8]" />
              <input 
                type="text" 
                placeholder="Global Vector Filter..." 
                className="bg-transparent border-none text-[13px] focus:ring-0 outline-none w-48 text-right font-black uppercase placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20">
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Node ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Traversal Address</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Vector Confidence</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Optimized Slot</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Priority Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entries.length > 0 ? entries.map((delivery, idx) => (
                  <React.Fragment key={`${delivery.id}-${idx}`}>
                    <tr 
                      className={cn(
                        "hover:bg-slate-50 transition-all cursor-pointer group",
                        expandedId === `${delivery.id}-${idx}` ? "bg-blue-50/50" : "bg-white"
                      )}
                      onClick={() => setExpandedId(expandedId === `${delivery.id}-${idx}` ? null : `${delivery.id}-${idx}`)}
                    >
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className={cn(
                            "text-[14px] font-[900] tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic",
                            expandedId === `${delivery.id}-${idx}` ? "text-blue-600" : "text-slate-800"
                          )}>{delivery.id}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{delivery.assignedRoute}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col truncate max-w-full">
                          <span className="text-[14px] font-[700] text-slate-600 truncate uppercase italic tracking-tight">{delivery.address}</span>
                          {delivery.priority && (
                            <span className="text-[9px] font-black text-rose-600 flex items-center gap-1.5 mt-1.5 uppercase tracking-widest animate-pulse">
                               <AlertTriangle className="w-3 h-3" /> Priority Exception Node
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-5">
                          <div className="flex flex-col items-end">
                            <span className="text-[18px] font-black text-slate-900 tracking-tighter leading-none">
                              {Math.round(delivery.predictedProbability * 100)}%
                            </span>
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter mt-1">Reliability Vector</span>
                          </div>
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                            <div className={cn("h-full transition-all duration-1000 shadow-sm", delivery.predictedProbability > 0.8 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${delivery.predictedProbability * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm">
                           <Clock className="w-4 h-4" />
                           <span className="text-[13px] font-black italic tracking-tighter">{delivery.suggestedSlot}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <ChevronLeft className={cn("w-5 h-5 text-slate-300 transition-all", expandedId === `${delivery.id}-${idx}` ? "rotate-90 text-blue-500 scale-125" : "-rotate-90")} />
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedId === `${delivery.id}-${idx}` && (
                        <tr>
                           <td colSpan={5} className="p-0 border-none">
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50/50"
                              >
                                 <div className="p-10 grid grid-cols-4 gap-12 border-y border-slate-100">
                                    <div className="space-y-4">
                                       <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-200 pb-2">Unit Intelligence</h6>
                                       <div className="space-y-3 pt-2">
                                          <div>
                                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Success Propensity</div>
                                             <div className="text-[16px] font-black text-slate-900 tracking-tighter">High Confidence</div>
                                          </div>
                                          <div>
                                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Historical Accuracy</div>
                                             <div className="text-[16px] font-black text-slate-900 tracking-tighter">{delivery.historyCount} Orders Analyzed</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="space-y-4">
                                       <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-200 pb-2">Node Scheduling</h6>
                                       <div className="space-y-3 pt-2">
                                          <div>
                                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Predicted Arrival</div>
                                             <div className="text-[16px] font-black text-blue-600 tracking-tighter uppercase">{delivery.predictedArrival}</div>
                                          </div>
                                          <div>
                                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Variance Guard</div>
                                             <div className="text-[16px] font-black text-slate-900 tracking-tighter">± 4.2 mins</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="space-y-4">
                                       <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-200 pb-2">Relational Metadata</h6>
                                       <div className="space-y-3 pt-2">
                                          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Route</div>
                                             <div className="text-[13px] font-black text-slate-900 uppercase">HUB-SYNC-{delivery.assignedRoute}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-3">
                                       <button className="w-full py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                                          Direct Node Override
                                       </button>
                                       <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                                          View Full Ledger
                                       </button>
                                    </div>
                                 </div>
                              </motion.div>
                           </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                       <div className="text-slate-400 font-black uppercase tracking-[0.2em] italic">No Traversal Nodes Detected in Zone</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
             <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">AI Vector Optimized Ledger v2.4</div>
             <div className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{entries.length} Total Units Projected</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, description, action, variant, icon: Icon }: any) {
  const styles = {
    warning: "bg-amber-50 border-amber-100 text-amber-900",
    info: "bg-blue-50 border-blue-100 text-blue-900",
    neutral: "bg-slate-50 border-slate-200 text-slate-900"
  };

  return (
    <div className={cn("p-4 rounded-2xl border flex items-start gap-4 shadow-sm", styles[variant as keyof typeof styles])}>
      <div className={cn(
        "p-2 rounded-xl bg-white/80 shrink-0",
        variant === 'warning' ? "text-amber-600" : variant === 'info' ? "text-blue-600" : "text-slate-600"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold mb-1">{title}</h4>
        <p className="text-[11px] opacity-80 leading-relaxed mb-3">{description}</p>
        <button className="text-[11px] font-bold border-b border-current hover:opacity-100 opacity-70 transition-opacity">
          {action}
        </button>
      </div>
    </div>
  );
}
