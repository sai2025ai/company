import React from 'react';
import { Building2, Plus, ArrowUpRight, Target, Briefcase, ListTodo, Users, Bot, Database, Globe, Palette, CloudFog } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const companiesData = [
  { 
    id: 'c1', 
    name: '主星域科技', 
    desc: 'B2B AI SaaS 工具',
    industry: 'SaaS',
    status: 'active', 
    icon: <Globe size={24} className="text-blue-400" />,
    stats: {
      goals: 2,
      projects: 5,
      tasks: 24,
      teams: 3,
      agents: 12,
      assets: 156
    },
    color: 'from-blue-600/20 to-transparent border-blue-500/30'
  },
  { 
    id: 'c2', 
    name: '无限创想设计', 
    desc: '生成式设计服务',
    industry: '设计服务',
    status: 'active', 
    icon: <Palette size={24} className="text-purple-400" />,
    stats: {
      goals: 1,
      projects: 3,
      tasks: 12,
      teams: 1,
      agents: 5,
      assets: 84
    },
    color: 'from-purple-600/20 to-transparent border-purple-500/30'
  },
  { 
    id: 'c3', 
    name: '云轨数据', 
    desc: '数据采集与 API 售卖',
    industry: '数据服务',
    status: 'incubating', 
    icon: <CloudFog size={24} className="text-orange-400" />,
    stats: {
      goals: 1,
      projects: 2,
      tasks: 8,
      teams: 1,
      agents: 3,
      assets: 23
    },
    color: 'from-orange-600/20 to-transparent border-orange-500/30'
  },
];

export function Companies() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight glow-text flex items-center gap-2">
          <Building2 className="text-blue-400" />
          公司管理
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-nowrap">
          <Plus size={16} />
          新建公司
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {companiesData.map(company => (
          <Card key={company.id} className="relative overflow-hidden border-white/[0.08] bg-[#09090b] hover:bg-[#0c0d12] hover:border-white/[0.15] transition-all duration-300 flex flex-col group rounded-2xl shadow-xl">
            {/* Background ambient glow based on company color */}
            <div className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br ${company.color} rounded-full blur-[80px] opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="p-6 border-b border-white/[0.05]">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.1] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-20`}></div>
                    <div className="relative z-10">{company.icon}</div>
                  </div>
                  <Badge 
                    variant={company.status === 'active' ? 'success' : 'default'} 
                    className={`font-medium text-[11px] px-2.5 py-0.5 border ${company.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}
                  >
                    {company.status === 'active' ? '运营中' : '孵化中'}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-100 mb-1">{company.name}</h3>
                  <p className="text-sm text-slate-500">{company.industry} <span className="mx-1.5 opacity-30">•</span> {company.desc}</p>
                </div>
              </div>
              
              <div className="px-6 py-6 flex-1">
                <div className="grid grid-cols-3 gap-y-7 gap-x-4">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <Target size={14} className="text-blue-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">目标</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.goals}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <Briefcase size={14} className="text-purple-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">项目</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.projects}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <ListTodo size={14} className="text-indigo-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">任务</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.tasks}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <Users size={14} className="text-emerald-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">团队</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.teams}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <Bot size={14} className="text-amber-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">Agents</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.agents}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                      <Database size={14} className="text-cyan-400/70" />
                      <span className="text-[10px] uppercase tracking-wider font-medium">资产</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-slate-200">{company.stats.assets}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 mt-auto border-t border-white/[0.05] bg-black/20">
                <button className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-300 bg-white/[0.03] hover:bg-blue-500/10 hover:text-blue-400 transition-colors border border-white/[0.05] hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <span className="relative z-10 flex items-center gap-2">进入公司看板 <ArrowUpRight size={16} /></span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
