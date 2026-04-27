import React from 'react';
import { Bot, Plus, Activity, Zap, ShieldAlert, Cpu, Network, Sparkles, BrainCircuit } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AgentAvatar } from '../components/ui/AgentAvatar';
import { mockTeams } from '../data/mockData';

export function Agents() {
  // Flatten all agents from teams
  const allAgents = mockTeams.flatMap(team => 
    team.agents.map(agent => ({ ...agent, teamName: team.name }))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight glow-text flex items-center gap-2">
          <Bot className="text-blue-400" />
          智能 Agent 矩阵
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <Plus size={16} />
          招募新 Agent
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allAgents.map((agent, index) => {
          // Generate a pseudo-random color based on the index or name for the glow
          const colorVariants = ['from-blue-500/20', 'from-purple-500/20', 'from-cyan-500/20', 'from-emerald-500/20'];
          const colorClass = colorVariants[index % colorVariants.length];
          const isWorking = agent.status === 'working';

          return (
          <Card key={agent.id} className="relative overflow-hidden border-white/[0.08] bg-[#09090b] hover:bg-[#0c0d12] hover:border-white/[0.15] transition-all duration-300 flex flex-col group rounded-2xl shadow-xl">
            {/* Ambient background glow */}
            <div className={`absolute -top-20 -left-20 w-52 h-52 bg-gradient-to-br ${colorClass} to-transparent rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full p-5">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <AgentAvatar type="agent" status={agent.status} className="h-12 w-12 border-2 border-white/10 shadow-lg" />
                    {isWorking && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#09090b] rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                      {agent.name}
                      {isWorking && <Activity size={12} className="text-green-400" />}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{agent.role}</p>
                  </div>
                </div>
                <Badge variant={isWorking ? 'success' : 'secondary'} className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border ${isWorking ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                  {isWorking ? '执行中' : '空闲'}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 flex justify-between items-center group-hover:bg-white/[0.04] transition-colors">
                  <span className="text-xs text-slate-500 font-medium">所属团队</span>
                  <span className="text-sm text-slate-200 font-medium">{agent.teamName}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                    <BrainCircuit size={12} /> 能力模型
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">GPT-4o</span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Functions</span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Memory</span>
                  </div>
                </div>
              </div>

              {agent.currentTask && (
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500 rounded-r-lg p-3 mt-auto mb-4 relative overflow-hidden">
                   <Sparkles size={60} className="absolute -right-2 -top-4 text-blue-500/10 rotate-12" />
                   <div className="relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-blue-400 mb-1.5">
                      <Zap size={10} className="fill-blue-500 text-blue-500" /> 当前执行任务
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed line-clamp-2" title={agent.currentTask}>
                      {agent.currentTask}
                    </p>
                   </div>
                </div>
              )}
              
              {!agent.currentTask && (
                 <div className="mt-auto mb-4 h-[76px]">
                   {/* Placeholder to keep cards same height */}
                 </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-auto border-t border-white/[0.05] pt-4">
                 <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-1.5 text-slate-500">
                     <Cpu size={12} />
                     <span className="text-[10px] font-medium uppercase tracking-wider">成功率</span>
                   </div>
                   <div className="font-mono text-sm text-green-400 font-semibold">98.5%</div>
                 </div>
                 <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-1.5 text-slate-500">
                     <Network size={12} />
                     <span className="text-[10px] font-medium uppercase tracking-wider">昨日消耗</span>
                   </div>
                   <div className="font-mono text-sm text-red-400 font-semibold">$1.24</div>
                 </div>
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
