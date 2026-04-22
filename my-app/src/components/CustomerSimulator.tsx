import React, { useState } from 'react';
import { Smartphone, Bell, ChevronLeft, MapPin, Clock, Calendar, Check, X, RefreshCw, BrainCircuit, ArrowRight, ShieldCheck, Truck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function CustomerSimulator() {
  const [step, setStep] = useState(0);
  const [window, setWindow] = useState('11:45 - 12:30');

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <header className="h-[72px] px-8 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
        <div>
          <h1 className="text-[20px] font-black text-[#1E293B]">Customer Pulse Simulator</h1>
          <p className="text-[13px] text-[#64748B] font-medium uppercase tracking-tight opacity-70 italic">Automated Engagement & Node-Sync Web Portal</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
           <div>
              <h2 className="text-[24px] font-black text-[#1E293B] mb-4 tracking-tighter italic lowercase first-letter:uppercase">The Automated Journey</h2>
              <p className="text-[14px] text-[#64748B] mb-8 leading-relaxed italic">
                As soon as a shipment is <strong>assigned to the Node</strong>, the platform automatically triggers the "Intelligence Sync" notification. The customer interacts with a live mobile-web portal—no app download required.
              </p>
              
              <div className="space-y-8">
                 <div className="flex items-center gap-5">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[15px] font-black transition-all", step >= 1 ? "bg-blue-600 scale-110 shadow-xl shadow-blue-200" : "bg-slate-100 text-slate-400 border border-slate-200")}>
                     {step >= 1 ? <Check className="w-6 h-6" /> : 1}
                   </div>
                   <div className="flex-1">
                     <p className={cn("text-[16px] font-black tracking-tight uppercase italic", step >= 1 ? "text-[#1E293B]" : "text-slate-300")}>System Assignment (Auto-SMS)</p>
                     <p className="text-[12px] text-[#64748B] font-medium">Order #MAD-9842 successfully assigned. Automated link sent via SMS.</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-5">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[15px] font-black transition-all", step >= 2 ? "bg-slate-900 scale-110 shadow-xl shadow-slate-400/20" : "bg-slate-100 text-slate-400 border border-slate-200")}>
                     {step >= 2 ? <Check className="w-6 h-6" /> : 2}
                   </div>
                   <div className="flex-1">
                     <p className={cn("text-[16px] font-black tracking-tight uppercase italic", step >= 2 ? "text-[#1E293B]" : "text-slate-300")}>Live Web Portal Interaction</p>
                     <p className="text-[12px] text-[#64748B] font-medium">Customer views real-time arrival & personal vector preferences.</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-5">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[15px] font-black transition-all", step >= 3 ? "bg-emerald-600 scale-110 shadow-xl shadow-emerald-200" : "bg-slate-100 text-slate-400 border border-slate-200")}>
                     {step >= 3 ? <Check className="w-6 h-6" /> : 3}
                   </div>
                   <div className="flex-1">
                     <p className={cn("text-[16px] font-black tracking-tight uppercase italic", step >= 3 ? "text-[#1E293B]" : "text-slate-300")}>Global ID Vector Sync</p>
                     <p className="text-[12px] text-[#64748B] font-medium">Preferences saved globally. AI recalculates dispatch nodes automatically.</p>
                   </div>
                 </div>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                 <button 
                   onClick={() => setStep(prev => prev === 3 ? 0 : prev + 1)}
                   className="px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black text-[15px] shadow-2xl shadow-blue-500/20 flex items-center gap-4 hover:bg-blue-500 transition-all active:scale-95 group"
                 >
                   {step === 0 ? "Assign Node Order (Auto-SMS)" : step === 3 ? "Reset Simulation Pipeline" : "Simulate Customer Interaction"}
                   <RefreshCw className="w-5 h-5 group-active:rotate-180 transition-transform" />
                 </button>
                 {step === 0 && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                       <ShieldAlert className="w-5 h-5 text-amber-600" />
                       <span className="text-[12px] text-amber-700 font-black uppercase tracking-tight italic">Awaiting Automated Node Signal...</span>
                    </div>
                 )}
              </div>
           </div>

           {/* Phone Preview */}
           <div className="flex justify-center">
              <div className="w-[340px] h-[720px] bg-slate-950 border-[14px] border-slate-900 rounded-[64px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-900 rounded-b-[24px] z-20" />
                 
                 <div className="flex-1 bg-[#F8FAFC] relative overflow-hidden flex flex-col">
                    {/* Browser Chrome */}
                    <div className="bg-white px-6 py-6 border-b border-[#E2E8F0] pt-10">
                       <div className="bg-[#F1F5F9] w-full py-3 rounded-2xl flex items-center px-4 gap-3 border border-slate-200/50">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span className="text-[11px] text-slate-500 font-mono italic truncate lowercase">node.seur.com/track/mad-9842</span>
                       </div>
                    </div>

                    {/* Lock Screen Notification */}
                    <AnimatePresence>
                      {step === 1 && (
                        <motion.div 
                          initial={{ y: -120, opacity: 0 }}
                          animate={{ y: 20, opacity: 1 }}
                          exit={{ y: -120, opacity: 0 }}
                          className="absolute top-4 left-4 right-4 p-5 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-30"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center text-white text-[10px] font-black italic">S</div>
                            <span className="text-[11px] font-black text-[#1E293B] uppercase tracking-widest">SEUR SYNC</span>
                            <span className="ml-auto text-[9px] text-slate-400 font-black">NOW</span>
                          </div>
                          <p className="text-[13px] text-[#1E293B] leading-tight font-black tracking-tight">Assignment confirmed! Order #MAD-9842 is live. Tap to sync your availability.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Main Web App Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-10 space-y-6">
                        {step >= 1 ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                          >
                              <div className="flex items-center justify-between">
                                 <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">TRACKING: MAD-9842</div>
                                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                              </div>

                              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-2xl relative overflow-hidden">
                                 <p className="text-[11px] font-black text-slate-400 uppercase mb-4 tracking-widest leading-none italic">Predicted Vector Arrival</p>
                                 <h3 className="text-[36px] font-black text-slate-900 mb-6 tracking-tighter leading-none italic">{window}</h3>
                                 <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                                       <motion.div 
                                         className="h-full bg-blue-600" 
                                         animate={{ x: ['-100%', '100%'] }} 
                                         transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                       />
                                    </div>
                                    <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest">Live Syncing...</span>
                                 </div>
                              </div>

                              {/* Manual Availability Matrix */}
                              <div className="p-6 bg-slate-900 rounded-[40px] text-white shadow-2xl space-y-6 border border-white/5">
                                 <div className="flex items-center justify-between">
                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-blue-400 italic">Global ID availability</h4>
                                    <div className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] font-black rounded-full border border-blue-500/30 uppercase italic">ID: 9842-AX</div>
                                 </div>

                                 <div className="grid grid-cols-8 gap-1.5">
                                    <div className="col-span-1" />
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                       <div key={i} className="text-[9px] font-black text-slate-600 text-center">{d}</div>
                                    ))}
                                    {[9, 13, 17, 21].map(hour => (
                                       <React.Fragment key={hour}>
                                          <div className="text-[9px] font-black text-slate-600 flex items-center pr-2 italic">{hour}h</div>
                                          {[0, 1, 2, 3, 4, 5, 6].map(day => {
                                             const isSelected = (hour === 13 && day < 5) || (hour >= 17 && day >= 5);
                                             return (
                                                <div 
                                                   key={day} 
                                                   className={cn(
                                                      "aspect-square rounded-lg border transition-all cursor-pointer",
                                                      isSelected 
                                                         ? "bg-blue-600 border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
                                                         : "bg-white/5 border-white/10 hover:bg-white/10"
                                                   )}
                                                />
                                             );
                                          })}
                                       </React.Fragment>
                                    ))}
                                 </div>

                                 <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-[9px] text-slate-400 font-bold italic leading-tight max-w-[140px]">
                                       Preferences are saved globally for all future deliveries.
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                       Save Matrix
                                    </button>
                                 </div>
                              </div>

                              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-lg space-y-4">
                                 <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-blue-500" /> Interaction Overrides
                                 </div>
                                 <div className="grid grid-cols-2 gap-3">
                                    <button className="py-4 bg-slate-50 border border-slate-200 rounded-[24px] text-[10px] font-black text-slate-600 flex flex-col items-center gap-2 hover:border-blue-300 transition-colors">
                                       <MapPin className="w-4 h-4 text-slate-400" /> Collection Pt
                                    </button>
                                    <button className="py-4 bg-slate-50 border border-slate-200 rounded-[24px] text-[10px] font-black text-slate-600 flex flex-col items-center gap-2 hover:border-blue-300 transition-colors">
                                       <Smartphone className="w-4 h-4 text-slate-400" /> New Neighbor
                                    </button>
                                 </div>
                              </div>
                          </motion.div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-10 py-40">
                             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                                <BrainCircuit className="w-20 h-20 mb-8" />
                             </motion.div>
                             <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 leading-relaxed italic">Awaiting Automated<br />Intelligence Sync</p>
                          </div>
                        )}
                    </div>

                    <div className="h-12 bg-white mt-auto p-4 flex items-center justify-center border-t border-slate-50">
                        <div className="w-20 h-2 bg-slate-100 rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
