import React from 'react';
import { LayoutDashboard, Send, Network, Smartphone, Settings, LogOut, ChevronRight, Truck, BellRing } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Fleet Executive View', icon: LayoutDashboard },
  { id: 'dispatch', label: 'Bulk Planner', icon: Send },
  { id: 'intelligence', label: 'Intelligence Hub', icon: Network },
  { id: 'mobile', label: 'Driver Operations', icon: Smartphone },
  { id: 'customer', label: 'Customer Pulse (Live)', icon: BellRing },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-[240px] h-screen bg-white border-r border-[#E2E8F0] flex flex-col fixed left-0 top-0">
      <div className="px-6 py-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" />
        <h1 className="text-[18px] font-[800] text-[#2563EB] tracking-[-0.5px]">DELIVER_AI</h1>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3 text-[14px] font-[500] transition-colors relative",
              activeTab === item.id 
                ? "text-[#2563EB] bg-[rgba(37,99,235,0.05)] border-r-[3px] border-[#2563EB]" 
                : "text-[#64748B] hover:bg-slate-50"
            )}
          >
            <item.icon className={cn("w-[18px] h-[18px]", activeTab === item.id ? "text-[#2563EB]" : "text-[#94A3B8]")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">SE</div>
            <div className="flex-1 overflow-hidden text-ellipsis">
              <p className="text-xs font-bold truncate">SEUR - Madrid Node</p>
              <p className="text-[10px] text-slate-500 truncate">Premium Provider</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[85%]" />
          </div>
          <p className="text-[9px] text-slate-500 mt-1.5 font-medium">85% Intelligence Sync</p>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 text-sm font-medium hover:text-red-700 transition-colors mt-1">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
