import React, { useState } from 'react';
import { Building2, Plus, ArrowUpRight, Target, Briefcase, ListTodo, Users, Bot, Database, Globe, Palette, CloudFog, ArrowLeft, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

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
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  if (selectedCompany) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <button 
          onClick={() => setSelectedCompany(null)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> 返回公司列表
        </button>

        <Card className="border-white/5 bg-black/20 shadow-xl overflow-hidden p-6 relative">
          <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${selectedCompany.color} rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none opacity-20`}></div>
           
           <div className="relative z-10">
             <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/[0.05]">
               <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-black/40 border border-white/[0.1] rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedCompany.color} opacity-20`}></div>
                    <div className="relative z-10 scale-125">{selectedCompany.icon}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h1 className="text-2xl font-bold tracking-tight text-slate-100">{selectedCompany.name}</h1>
                      <Badge 
                        variant={selectedCompany.status === 'active' ? 'success' : 'default'} 
                        className={`font-medium text-[11px] px-2.5 py-0.5 border ${selectedCompany.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}
                      >
                        {selectedCompany.status === 'active' ? '运营中' : '孵化中'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{selectedCompany.industry} <span className="mx-1.5 opacity-30">•</span> {selectedCompany.desc}</p>
                  </div>
               </div>
             </div>

             <Tabs defaultValue="overview">
                <TabsList className="bg-black/40 border border-white/5 mb-6">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                     总览大盘
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="flex items-center gap-2">
                    <Target size={14} /> 目标 ({selectedCompany.stats.goals})
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center gap-2">
                    <Briefcase size={14} /> 项目 ({selectedCompany.stats.projects})
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="flex items-center gap-2">
                    <ListTodo size={14} /> 任务 ({selectedCompany.stats.tasks})
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="flex items-center gap-2">
                    <Users size={14} /> 履约团队 ({selectedCompany.stats.teams})
                  </TabsTrigger>
                  <TabsTrigger value="assets" className="flex items-center gap-2">
                    <Database size={14} /> 数字资产 ({selectedCompany.stats.assets})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="h-64 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Activity size={40} className="mb-4 opacity-50 text-blue-400" />
                    <p className="text-sm font-medium">公司级经营数据透视</p>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm text-center leading-relaxed">此处将加载基于财务、人力、项目推进的三维数据报表与核心经营指标。</p>
                  </div>
                </TabsContent>

                <TabsContent value="goals">
                  <div className="h-48 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Target size={32} className="mb-3 opacity-50 text-blue-400" />
                    <p className="text-sm">目标管理</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects">
                  <div className="h-48 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Briefcase size={32} className="mb-3 opacity-50 text-purple-400" />
                    <p className="text-sm">项目列表</p>
                  </div>
                </TabsContent>

                <TabsContent value="tasks">
                  <div className="h-48 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <ListTodo size={32} className="mb-3 opacity-50 text-indigo-400" />
                    <p className="text-sm">任务大盘</p>
                  </div>
                </TabsContent>

                <TabsContent value="teams">
                  <div className="h-48 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Users size={32} className="mb-3 opacity-50 text-emerald-400" />
                    <p className="text-sm">承接业务的履约团队与组织架构</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="assets">
                  <div className="h-48 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Database size={32} className="mb-3 opacity-50 text-cyan-400" />
                    <p className="text-sm">知识图谱与数字化资产聚合库</p>
                  </div>
                </TabsContent>

             </Tabs>
           </div>
        </Card>
      </div>
    );
  }

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
                <button 
                  onClick={() => setSelectedCompany(company)}
                  className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-slate-300 bg-white/[0.03] hover:bg-blue-500/10 hover:text-blue-400 transition-colors border border-white/[0.05] hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <span className="relative z-10 flex items-center gap-2">公司运营台 <ArrowUpRight size={16} /></span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
