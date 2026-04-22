/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BulkPlanner } from './components/DispatchPlanning';
import { IntelligenceHub } from './components/IntelligenceHub';
import { DriverPreview } from './components/DriverPreview';
import { CustomerSimulator } from './components/CustomerSimulator';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'dispatch':
        return <BulkPlanner />;
      case 'intelligence':
        return <IntelligenceHub />;
      case 'mobile':
        return <DriverPreview />;
      case 'customer':
        return <CustomerSimulator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop Only for now */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quick Mobile Navigation Mask (Demo purposes) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-4 z-50">
         <MobileNavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="📊" />
         <MobileNavItem active={activeTab === 'dispatch'} onClick={() => setActiveTab('dispatch')} icon="📋" />
         <MobileNavItem active={activeTab === 'intelligence'} onClick={() => setActiveTab('intelligence')} icon="🧠" />
         <MobileNavItem active={activeTab === 'mobile'} onClick={() => setActiveTab('mobile')} icon="📱" />
      </div>
    </div>
  );
}

function MobileNavItem({ active, onClick, icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110' : 'text-slate-400'}`}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );
}

