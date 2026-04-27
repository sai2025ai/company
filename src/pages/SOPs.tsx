import React from 'react';
import { mockTeams } from '../data/mockData';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Workflow, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export function SOPs() {
  const allSops = mockTeams.flatMap(team => team.sops.map(sop => ({ ...sop, teamName: team.name })));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight glow-text">执行 SOP 库 (流水线)</h1>
        <p className="text-[#94a3b8] mt-1">
          团队的标准化执行流程。只有跨角色协作的完整事项，才需要进入 SOP 流水线处理。
          零碎需求由数字分身或人类直接委派。
        </p>
      </div>

      <div className="grid gap-6">
        {allSops.map(sop => (
          <Card key={sop.id}>
            <CardHeader className="border-b border-white/5 bg-black/20">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Workflow size={20} className="text-blue-400" />
                    <CardTitle>{sop.name}</CardTitle>
                  </div>
                  <CardDescription className="max-w-3xl leading-relaxed">{sop.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8] mb-1">所属团队</div>
                  <Badge variant="outline">{sop.teamName}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8] mb-4">标准化执行环节 (Stages)</h4>
              <div className="flex flex-wrap items-center gap-2">
                {sop.stages.map((stage, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-white/5 bg-white/5 text-sm font-medium text-slate-200">
                      {stage}
                    </div>
                    {index < sop.stages.length - 1 && (
                      <ArrowRight size={16} className="text-white/20" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-sm text-[#94a3b8]">
                <span>该 SOP 累计调用执行 {sop.usageCount} 次</span>
                <span className="flex items-center gap-1">仅适用于：复杂系统性开发、标准宣发项目等</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
