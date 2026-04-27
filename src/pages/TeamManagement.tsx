import React from 'react';
import { mockTeams } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PlusCircle, Settings, Users } from 'lucide-react';

export function TeamManagement() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">组织与团队管理</h1>
          <p className="text-[#94a3b8] mt-1">手动划分履行专业职能的经营矩阵。团队是长期存在的，不是临时会话组。</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600/30 transition-all border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <PlusCircle size={18} />
          新建履约团队
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockTeams.map(team => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2 border-b border-white/5 bg-black/20">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  {team.name}
                  {team.id === 't1' && (
                    <Badge variant="secondary" className="ml-2 text-[9px] font-bold uppercase tracking-wider text-[#94a3b8]">系统默认设立</Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1">{team.description}</CardDescription>
              </div>
              <button className="p-2 text-[#94a3b8] hover:text-blue-400 transition-colors">
                <Settings size={18} />
              </button>
            </CardHeader>
            <CardContent className="pt-4 divide-y divide-white/5">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-slate-200">负责人 (Manager)</span>
                <span className="text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">
                  {team.manager === 'digital_avatar' ? 'Digital Avatar (数字分身)' : 'Human (人类)'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-slate-200">编内节点 (Agents)</span>
                <span className="text-sm font-mono text-slate-300">{team.agents.length} <span className="font-sans text-[#94a3b8]">个执行智能体</span></span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-slate-200">持有 SOP</span>
                <span className="text-sm font-mono text-slate-300">{team.sops.length} <span className="font-sans text-[#94a3b8]">套标准流程</span></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
