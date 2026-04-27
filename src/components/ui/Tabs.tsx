import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({ activeTab: '', setActiveTab: () => {} });

export function Tabs({ defaultValue, children, className = '' }: { defaultValue: string, children: React.ReactNode, className?: string }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex items-center gap-2 border-b border-white/10 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '' }: { value: string, children: React.ReactNode, className?: string }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2.5 text-sm transition-colors border-b-2 font-medium -mb-[1px] ${
        isActive 
          ? 'border-blue-500 text-blue-400' 
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-white/20'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: { value: string, children: React.ReactNode, className?: string }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={`pt-4 animate-in fade-in duration-300 ${className}`}>
      {children}
    </div>
  );
}
