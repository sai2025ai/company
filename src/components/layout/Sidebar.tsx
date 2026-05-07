import React from 'react';
import { LayoutDashboard, Users, Target, Workflow, Settings, Activity, Briefcase, Bot, Building2, ChevronsUpDown, Database } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PageType } from '../../types';

interface SidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: '经营控制台', icon: <LayoutDashboard size={20} /> },
    { id: 'companies', label: '公司管理', icon: <Building2 size={20} /> },
    { id: 'board', label: '目标与计划看板', icon: <Target size={20} /> },
    { id: 'assets', label: '数字资产', icon: <Database size={20} /> },
    { id: 'agents', label: 'Agent', icon: <Bot size={20} /> },
    { id: 'teams', label: '履约团队', icon: <Users size={20} /> },
    { id: 'sops', label: '执行SOP库', icon: <Workflow size={20} /> },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 border-b border-white/5">
        <button 
          onClick={() => onNavigate('companies')}
          className="flex w-full items-center justify-between gap-2 rounded-lg p-2 hover:bg-white/5 transition-colors text-left"
        >
          <div className="flex items-center gap-2 font-bold tracking-tight text-slate-100 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-600 text-white font-bold">
              Ω
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm truncate">主星域科技</span>
              <span className="text-[10px] text-slate-400 font-normal truncate">一人公司经营系统</span>
            </div>
          </div>
          <ChevronsUpDown size={16} className="text-slate-500 shrink-0" />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                activePage === item.id
                  ? 'bg-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-white/10'
                  : 'text-[#94a3b8] hover:bg-white/5 hover:text-slate-200'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => onNavigate('team-management')}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            activePage === 'team-management'
              ? 'bg-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-white/10'
              : 'text-[#94a3b8] hover:bg-white/5 hover:text-slate-200'
          )}
        >
          <Settings size={20} />
          组织管理
        </button>
      </div>
    </div>
  );
}
