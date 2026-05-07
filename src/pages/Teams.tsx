import React, { useState } from 'react';
import { mockTeams } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AgentAvatar } from '../components/ui/AgentAvatar';
import { Workflow, Target, Boxes, Activity, Users, Database, ArrowLeft, ArrowRight, Eye, Bot, Briefcase } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

export function Teams() {
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  if (selectedTeam) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <button 
          onClick={() => setSelectedTeam(null)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> 返回团队列表
        </button>

        <Card className="border-white/5 bg-black/20 shadow-xl overflow-hidden p-6 relative">
           {/* Ambient background glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
           
           <div className="relative z-10">
             <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/[0.05]">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black/40 border border-white/[0.1] rounded-2xl flex items-center justify-center shadow-inner">
                    <Boxes size={28} className="text-blue-400/80" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100 mb-1">{selectedTeam.name}</h1>
                    <p className="text-sm text-slate-400">{selectedTeam.description}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="bg-black/30 border border-white/[0.05] rounded-xl px-4 py-2 flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">总调用</span>
                    <span className="text-lg font-mono font-bold text-blue-400">{selectedTeam.sops.reduce((acc: number, sop: any) => acc + (sop.usageCount || 0), 0)}</span>
                  </div>
               </div>
             </div>

             <Tabs defaultValue="overview">
                <TabsList className="bg-black/40 border border-white/5 mb-6">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Target size={14} /> 运行总览
                  </TabsTrigger>
                  <TabsTrigger value="agents" className="flex items-center gap-2">
                    <Users size={14} /> 劳动力矩阵 ({selectedTeam.agents.length})
                  </TabsTrigger>
                  <TabsTrigger value="sops" className="flex items-center gap-2">
                    <Workflow size={14} /> SOP资产库 ({selectedTeam.sops.length})
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center gap-2">
                    <Activity size={14} /> 表现指标
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2 mt-2 text-slate-200">
                    <Target size={18} className="text-blue-400" /> 
                    当前推进的项目与职责
                  </h3>
                  {selectedTeam.projects.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedTeam.projects.map((projectId: string, idx: number) => (
                        <div key={idx} className="border border-white/10 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-200">项目指引 REF</span>
                              <Badge variant="outline" className="font-mono text-[10px] text-blue-300 border-blue-500/30 bg-blue-500/10 px-2 py-0.5">{projectId}</Badge>
                            </div>
                            <div className="text-xs text-slate-400 leading-relaxed">
                              本部门通过标准化流水线承接该项目的核心落地任务，直接受数字分身战略排期约束。
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500 italic py-4 bg-black/20 rounded-lg text-center border border-dashed border-white/[0.05]">暂无接入项目</div>
                  )}
                </TabsContent>

                <TabsContent value="agents">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {selectedTeam.agents.map((agent: any) => (
                      <div key={agent.id} className="flex flex-col gap-3 p-5 rounded-2xl bg-[#09090b] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-colors shadow-lg relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-1 h-full ${agent.status === 'working' ? 'bg-green-500' : 'bg-slate-500'} opacity-50`}></div>
                        <div className="flex items-center gap-3 border-b border-white/[0.05] pb-3">
                          <div className="relative">
                            <AgentAvatar type="agent" status={agent.status} className="w-10 h-10 border border-white/10 shadow-sm" />
                            {agent.status === 'working' && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#09090b] rounded-full animate-pulse"></span>}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100">{agent.name}</h4>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${agent.status === 'working' ? 'text-green-400' : 'text-slate-500'}`}>
                              {agent.status === 'working' ? '执行中...' : '待派发 (Idle)'}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 flex-1 pt-1">
                          <div>
                            <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-medium">能力特征</div>
                            <p className="text-xs text-slate-300 font-medium">{agent.role}</p>
                          </div>
                          {agent.currentTask && (
                            <div className="mt-3 bg-gradient-to-r from-green-500/10 to-transparent border-l-2 border-green-500 rounded-r-lg p-3 text-slate-300 relative overflow-hidden">
                              <Activity size={32} className="absolute -right-2 -top-2 text-green-500/10" />
                              <div className="relative z-10">
                                <div className="text-[9px] text-green-400/80 mb-1.5 uppercase font-bold tracking-wider flex items-center gap-1"><Activity size={10} /> 执行焦点</div>
                                <div className="text-xs font-mono font-medium line-clamp-2" title={agent.currentTask}>
                                  {agent.currentTask}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sops">
                  <div className="space-y-4 mt-2">
                    {selectedTeam.sops.map((sop: any) => (
                      <div key={sop.id} className="p-5 rounded-2xl bg-black/20 border border-white/[0.08] hover:bg-white/[0.02] hover:border-white/[0.12] transition-colors relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/5 rounded-full blur-[40px] group-hover:bg-purple-500/10 transition-colors"></div>
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-1.5">
                                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                                  <Database size={14} />
                                </div>
                                {sop.name}
                              </h4>
                              <p className="text-xs text-slate-400">{sop.description}</p>
                            </div>
                            <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.05] text-[10px] font-mono flex flex-col items-end shadow-inner">
                              <span className="text-slate-500 uppercase tracking-widest mb-0.5">调用次数</span>
                              <span className="text-lg text-blue-400 font-bold leading-none">{sop.usageCount}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/[0.05]">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                              <Workflow size={12} className="text-slate-400" /> 流水线节点 (Pipeline Nodes)
                            </div>
                            <div className="flex flex-wrap gap-2 items-center">
                              {sop.stages.map((stage: string, i: number) => (
                                <React.Fragment key={i}>
                                  <Badge variant="outline" className="text-xs font-medium border-slate-700 bg-white/[0.03] text-slate-300 px-3 py-1">
                                    {stage}
                                  </Badge>
                                  {i < sop.stages.length - 1 && <span className="text-slate-600 text-xs">→</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <div className="h-64 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                    <Activity size={40} className="mb-4 opacity-50 text-blue-400" />
                    <p className="text-sm font-medium">性能数据模块 (Performance Metrics)</p>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm text-center leading-relaxed">需挂载历史产出分析与流转耗时监控大盘，当前仅提供数据占位符展示。</p>
                  </div>
                </TabsContent>
             </Tabs>
           </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text flex items-center gap-3">
            <Users size={28} className="text-blue-400" /> 履约团队管理
          </h1>
          <p className="text-slate-400 mt-1.5 text-sm">稳定存在的专业执行单元。执行具体SOP与零碎事项的劳动力矩阵。</p>
        </div>
      </div>

      <div className="bg-black/20 border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-500 uppercase tracking-widest bg-black/40 border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">团队信息</th>
                <th className="px-6 py-4 font-medium text-center">劳动力节点 (Agents)</th>
                <th className="px-6 py-4 font-medium text-center">绑定 SOP(s)</th>
                <th className="px-6 py-4 font-medium text-center">支持项目</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {mockTeams.map((team) => (
                <tr key={team.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Boxes size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 text-base mb-0.5">{team.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 max-w-sm">{team.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="font-mono bg-white/[0.03] border-white/10 px-2.5 py-0.5 text-slate-300">
                        <Bot size={12} className="mr-1" /> {team.agents.length}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                       <Badge variant="outline" className="font-mono bg-purple-500/10 border-purple-500/20 px-2.5 py-0.5 text-purple-300">
                        <Database size={12} className="mr-1" /> {team.sops.length}
                       </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                       <Briefcase size={14} className="opacity-70" /> {team.projects.length}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTeam(team)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 transition-all border border-transparent hover:border-blue-500/30"
                    >
                      <Eye size={14} /> 查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

