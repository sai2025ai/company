import React from 'react';
import { mockTeams } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AgentAvatar } from '../components/ui/AgentAvatar';
import { Workflow, Target, Boxes, Activity, Users, Database } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

export function Teams() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight glow-text">履约团队</h1>
        <p className="text-[#94a3b8] mt-1">稳定存在的专业执行单元。执行具体SOP与零碎事项的劳动力矩阵。</p>
      </div>

      <div className="grid gap-8">
        {mockTeams.map(team => (
          <Card key={team.id} className="overflow-hidden border-white/5 bg-black/20 shadow-xl">
            <div className="md:flex">
              {/* Left Column: Team Identity */}
              <div className="md:w-1/4 bg-black/40 p-6 border-r border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Boxes size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold glow-text">{team.name}</h2>
                    <div className="text-xs text-[#94a3b8] flex items-center gap-1 mt-0.5">
                      负责人: 数字分身直接调度
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-6 font-mono opacity-80 leading-relaxed">
                  {team.description}
                </p>
                
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#94a3b8]">总调用次数</span>
                    <span className="font-mono text-blue-400 font-semibold">{team.sops.reduce((acc, sop) => acc + (sop.usageCount || 0), 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#94a3b8]">Agent 数量</span>
                    <span className="font-mono text-slate-200">{team.agents.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#94a3b8]">管理项目流</span>
                    <span className="font-mono text-slate-200">{team.projects.length}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Tabs */}
              <div className="md:w-3/4 p-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <Target size={14} /> 运行总览
                    </TabsTrigger>
                    <TabsTrigger value="agents" className="flex items-center gap-2">
                      <Users size={14} /> 劳动力矩阵
                    </TabsTrigger>
                    <TabsTrigger value="sops" className="flex items-center gap-2">
                      <Workflow size={14} /> SOP资产库
                    </TabsTrigger>
                    <TabsTrigger value="metrics" className="flex items-center gap-2">
                      <Activity size={14} /> 表现指标
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2 mt-2">
                      <Target size={18} className="text-blue-400" /> 
                      当前推进的项目与职责
                    </h3>
                    {team.projects.length > 0 ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {team.projects.map((projectId, idx) => (
                          <div key={idx} className="border border-white/10 rounded-lg p-4 bg-white/5 shadow-inner">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-slate-200">项目指引 REF</span>
                              <Badge variant="outline" className="font-mono text-[10px] text-blue-300 border-blue-500/30 bg-blue-500/10">{projectId}</Badge>
                            </div>
                            <div className="text-xs text-[#94a3b8] leading-relaxed">
                              本部门通过标准化流水线承接该项目的核心落地任务，直接受数字分身战略排期约束。
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 italic py-4">暂无接入项目</div>
                    )}
                  </TabsContent>

                  <TabsContent value="agents">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                      {team.agents.map(agent => (
                        <div key={agent.id} className="flex flex-col gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                            <AgentAvatar type="agent" status={agent.status} />
                            <div>
                              <h4 className="text-sm font-bold text-slate-100">{agent.name}</h4>
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${agent.status === 'working' ? 'text-blue-400' : 'text-slate-500'}`}>
                                {agent.status === 'working' ? '执行中...' : '待派发 (Idle)'}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 flex-1">
                            <div>
                              <div className="text-[10px] text-slate-500 mb-1">能力特征</div>
                              <p className="text-xs text-[#94a3b8]">{agent.role}</p>
                            </div>
                            {agent.currentTask && (
                              <div className="mt-2 bg-blue-500/5 border border-blue-500/20 rounded p-2 text-slate-300">
                                <div className="text-[9px] text-blue-400/80 mb-1 uppercase font-bold tracking-wider">执行焦点</div>
                                <div className="text-xs font-mono line-clamp-2" title={agent.currentTask}>
                                  &gt; {agent.currentTask}
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
                      {team.sops.map(sop => (
                        <div key={sop.id} className="p-4 rounded-lg bg-black/20 border border-white/10">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                <Database size={14} className="text-purple-400" />
                                {sop.name}
                              </h4>
                              <p className="text-xs text-[#94a3b8] mt-1">{sop.description}</p>
                            </div>
                            <div className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 flex flex-col items-end">
                              <span className="text-[#94a3b8]">流转次数</span>
                              <span className="text-blue-400 font-bold">{sop.usageCount}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-white/5">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">流水线节点 (Pipeline Nodes)</div>
                            <div className="flex flex-wrap gap-2">
                              {sop.stages.map((stage, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[11px] font-normal border-slate-700 bg-black/40 text-slate-300">
                                    {stage}
                                  </Badge>
                                  {i < sop.stages.length - 1 && <span className="text-slate-600 text-[10px]">→</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics">
                    <div className="h-48 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400 bg-white/[0.02]">
                      <Activity size={32} className="mb-2 opacity-50 text-blue-400" />
                      <p className="text-sm">性能数据模块 (Performance Metrics)</p>
                      <p className="text-xs text-slate-500 mt-1">需挂载历史产出分析与流转耗时监控大盘</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
