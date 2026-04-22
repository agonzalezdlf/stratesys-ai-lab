import React, { useState } from 'react';
import { 
  MapPin, CheckCircle2, XCircle, Clock, Navigation, 
  Menu, Bell, ChevronRight, Phone, MessageSquare, AlertCircle, Edit3, BrainCircuit, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_DELIVERIES } from '../data';
import { cn } from '../lib/utils';
import { DeliveryStatus } from '../types';

export function DriverPreview() {
  const [stops, setStops] = useState(MOCK_DELIVERIES);
  const [activeStop, setActiveStop] = useState(stops[0]);
  const [showFailureReasons, setShowFailureReasons] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(activeStop.address);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const updateStatus = (id: string, status: DeliveryStatus) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    if (activeStop.id === id) {
      setActiveStop(prev => ({ ...prev, status }));
    }
    setShowFailureReasons(false);
  };

  const handleModifyAddress = () => {
    setActiveStop(prev => ({ ...prev, address: newAddress }));
    setIsEditingAddress(false);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-[20px] font-[700] text-[#1E293B]">Driver App Preview</h2>
        <p className="text-[13px] text-[#64748B]">Node Madrid-North • Route MAD-NORTH-04</p>
      </div>

      <div className="w-[300px] h-[600px] bg-white border-[10px] border-[#1E293B] rounded-[40px] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Dynamic Notch/Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1E293B] rounded-b-2xl z-20" />
        
        {/* Top App Bar */}
        <div className="pt-10 px-4 pb-3 border-b border-[#E2E8F0] flex items-center justify-between bg-white z-10 shrink-0">
           <button onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              {viewMode === 'list' ? <Navigation className="w-4 h-4 text-blue-600" /> : <Menu className="w-4 h-4 text-slate-400" />}
           </button>
           <div className="text-center">
              <h2 className="text-[12px] font-[800] text-[#1E293B] uppercase tracking-wider">{viewMode === 'map' ? 'Live Nav' : 'Active Stop'}</h2>
              <p className="text-[9px] font-bold text-blue-600">UNIT-142A</p>
           </div>
           <Bell className="w-4 h-4 text-slate-400" />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {viewMode === 'map' ? (
             <div className="h-full relative overflow-hidden bg-slate-100">
                <div className="absolute inset-0 opacity-20">
                   <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-pulse" />
                      <div className="absolute -top-12 -left-4 p-2 bg-white rounded-lg shadow-xl border border-blue-100 min-w-[80px]">
                         <div className="text-[8px] font-black text-blue-600 uppercase">You are here</div>
                         <div className="text-[10px] font-bold text-slate-700 leading-tight">M-30 North Exp.</div>
                      </div>
                   </div>
                </div>
                {/* Destination Node */}
                <div className="absolute top-20 right-10">
                   <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-white shadow-xl flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Navigation className="w-5 h-5" />
                   </div>
                   <div>
                      <div className="text-[11px] font-black text-slate-800 leading-none mb-1">0.8 km • 3 mins</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Next: Calle de Serrano 12</div>
                   </div>
                </div>
             </div>
          ) : (
             <div className="p-4 space-y-4">
            {/* Active Card */}
            <div className={cn(
              "bg-white border-2 rounded-[20px] p-5 shadow-sm space-y-4",
              activeStop.stopType === 'pickup' ? "border-amber-500" : "border-blue-600"
            )}>
              <div className="flex justify-between items-start">
                 <div className={cn(
                   "p-2 rounded-lg",
                   activeStop.stopType === 'pickup' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                 )}>
                    {activeStop.stopType === 'pickup' ? <ArrowRight className="w-4 h-4 -rotate-45" /> : <MapPin className="w-4 h-4" />}
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{activeStop.stopType === 'pickup' ? "Pickup Success" : "Success Intel"}</div>
                    <div className="text-[13px] font-black text-emerald-600">{Math.round(activeStop.predictedProbability * 100)}%</div>
                 </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[8px] font-black uppercase px-2 py-0.5 rounded-full",
                    activeStop.stopType === 'pickup' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {activeStop.stopType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">#{activeStop.id}</span>
                </div>
                {isEditingAddress ? (
                  <div className="space-y-2">
                    <input 
                      className="w-full text-[13px] p-2 border border-blue-100 rounded-lg outline-none focus:ring-2 ring-blue-100"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button onClick={handleModifyAddress} className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold">Save</button>
                      <button onClick={() => setIsEditingAddress(false)} className="flex-1 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-[15px] font-[800] text-[#1E293B] leading-tight mb-2">{activeStop.address}</h3>
                    <button 
                      onClick={() => setIsEditingAddress(true)}
                      className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 uppercase tracking-widest hover:opacity-70"
                    >
                      <Edit3 className="w-3 h-3" />
                      Modify Exact Address
                    </button>
                  </>
                )}
              </div>

              <div className="pt-3 border-t border-slate-50">
                 <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600">Expected: {activeStop.suggestedSlot}</span>
                 </div>
                 <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                       <BrainCircuit className="w-3 h-3 text-blue-500" />
                       Behavioral Insight
                    </p>
                    <p className="text-[10px] italic text-slate-600 leading-tight">"{activeStop.notes}"</p>
                 </div>
              </div>
            </div>

            {/* Stop List */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Next in Queue</h4>
              {stops.slice(1, 6).map((stop, idx) => (
                <div key={stop.id} className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between opacity-60">
                   <div className="flex items-center gap-3">
                      <div className="text-[11px] font-black text-slate-300">#0{idx + 2}</div>
                      <div className={cn("p-1.5 rounded-md", stop.stopType === 'pickup' ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500")}>
                        {stop.stopType === 'pickup' ? <ArrowRight className="w-3 h-3 -rotate-45" /> : <MapPin className="w-3 h-3" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-700 truncate w-32">{stop.address}</div>
                        <div className="text-[8px] font-bold text-slate-400 flex gap-2">
                           <span>{stop.suggestedSlot.split(' - ')[0]}</span>
                           <span className={stop.stopType === 'pickup' ? "text-amber-600" : "text-blue-600"}>{stop.stopType || 'delivery'}</span>
                        </div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-700">{Math.round(stop.predictedProbability * 100)}%</div>
                      <div className="w-8 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-slate-300" style={{ width: `${stop.predictedProbability * 100}%` }} />
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

        {/* Action Panel */}
        <div className="p-4 bg-white border-t border-[#E2E8F0] space-y-2 relative">
          <AnimatePresence>
            {showFailureReasons && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute left-0 right-0 bottom-full p-4 bg-white border-t border-[#E2E8F0] shadow-2xl space-y-2"
              >
                <p className="text-[10px] font-black text-[#1E293B] uppercase mb-2">Failure Reason Selection</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateStatus(activeStop.id, 'not-home')} className="p-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">Not Home</button>
                  <button onClick={() => updateStatus(activeStop.id, 'wrong-address')} className="p-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">Wrong Address</button>
                  <button onClick={() => updateStatus(activeStop.id, 'access-denied')} className="p-2 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">Access Denied</button>
                  <button onClick={() => setShowFailureReasons(false)} className="p-2 border border-slate-100 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-50">Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => updateStatus(activeStop.id, 'delivered')}
            className="w-full h-12 bg-blue-600 text-white rounded-2xl font-[800] text-[13px] shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete Delivery
          </button>
          <button 
            onClick={() => setShowFailureReasons(true)}
            className="w-full h-12 border-2 border-slate-100 rounded-2xl text-[12px] font-[800] text-slate-600 flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}
