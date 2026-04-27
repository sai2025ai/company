import React, { useState } from 'react';
import { Target, Plus, AlertCircle, CheckCircle2, Clock, Play, CircleDashed, MoreHorizontal, X, ArrowRight, Briefcase, ListTodo, Zap, Workflow } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { AgentAvatar } from '../components/ui/AgentAvatar';

const boardColumns = [
  { id: 'todo', title: '未开始', icon: <CircleDashed size={14} className="text-slate-400" /> },
  { id: 'in_progress', title: '进行中', icon: <Play size={14} className="text-blue-400" /> },
  { id: 'blocked', title: '存在风险 / 阻塞', icon: <AlertCircle size={14} className="text-orange-400" /> },
  { id: 'completed', title: '已达成', icon: <CheckCircle2 size={14} className="text-green-400" /> },
];

const mockGoals = [
  {
    id: 'g0',
    type: 'goal',
    companyName: '主星域科技',
    title: 'Q3 市场大盘调研',
    description: '完成海外市场竞品分析与出海策略评估。',
    progress: 0,
    status: 'todo',
    deadline: '2026-09-30',
    tasksCount: 2,
  },
  {
    id: 'g1',
    type: 'goal',
    companyName: '主星域科技',
    title: '2026年 Q2 营收目标',
    description: '实现季度经常性收入 50万人民币。',
    progress: 75,
    status: 'in_progress',
    deadline: '2026-06-30',
    tasksCount: 5,
  },
  {
    id: 'g2',
    type: 'goal',
    companyName: '无限创想设计',
    title: '扩大自媒体渠道获客',
    description: '在小红书/抖音等平台建立自动化分发矩阵。',
    progress: 35,
    status: 'blocked',
    deadline: '2026-08-15',
    tasksCount: 3,
  },
  {
    id: 'g3',
    type: 'goal',
    companyName: '云轨数据',
    title: '新产品 MVP 上线',
    description: '完成首个版本的数据抓取 API 并发布。',
    progress: 100,
    status: 'completed',
    deadline: '2026-04-10',
    tasksCount: 8,
  }
];

const mockProjects = [
  {
    id: 'p1',
    type: 'project',
    parentGoal: '2026年 Q2 营收目标',
    title: '销售管线自动化升级',
    description: '引入 AI 销售助理，自动化线索清洗和首轮跟进。',
    progress: 60,
    status: 'in_progress',
    team: '增长引擎小组',
    deadline: '2026-05-15'
  },
  {
    id: 'p2',
    type: 'project',
    parentGoal: '扩大自媒体渠道获客',
    title: '小红书爆款图文生成矩阵',
    description: '通过爬虫+生成模型每天自动出 10 篇有效图文。',
    progress: 20,
    status: 'blocked',
    team: '内容分发调度组',
    deadline: '2026-07-01'
  },
  {
    id: 'p3',
    type: 'project',
    parentGoal: '新产品 MVP 上线',
    title: '云轨基础架构搭建',
    description: '分布式数据抓取节点配置与限流应对策略。',
    progress: 100,
    status: 'completed',
    team: '核心研发组',
    deadline: '2026-03-25'
  },
];

const mockTasks = [
  {
    id: 't1',
    type: 'task',
    parentProject: '销售管线自动化升级',
    title: '清洗历史 10,000 条废弃线索',
    description: '调用大模型批量提取需求和跟进节点，尝试唤醒。',
    status: 'in_progress',
    assignee: '线索清洗 Agent',
    taskType: 'sop_pipeline'
  },
  {
    id: 't2',
    type: 'task',
    parentProject: '销售管线自动化升级',
    title: '对接企业微信会话存档 API',
    description: '在无人工干预的情况下提取所有对公聊天中的关键业务指标。',
    status: 'blocked',
    assignee: '微信对接 Agent',
    taskType: 'direct_dispatch'
  },
  {
    id: 't3',
    type: 'task',
    parentProject: '小红书爆款图文生成矩阵',
    title: '小红书反爬规则更新对齐',
    description: '更新头部请求参数，应对最新一轮的登录墙限制。',
    status: 'todo',
    assignee: '安全绕过 Agent',
    taskType: 'direct_dispatch'
  },
  {
    id: 't4',
    type: 'task',
    parentProject: '云轨基础架构搭建',
    title: '完成 Redis 代理集群压测',
    description: '压测目标需要达到 20k QPS，并生成延迟监控大盘。',
    status: 'completed',
    assignee: '后端基建 Agent',
    taskType: 'sop_pipeline'
  }
];

export function Board() {
  const [viewType, setViewType] = useState<string>('goals');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const getItemsByStatus = (status: string) => {
    switch (viewType) {
      case 'goals': return mockGoals.filter(i => i.status === status);
      case 'projects': return mockProjects.filter(i => i.status === status);
      case 'tasks': return mockTasks.filter(i => i.status === status);
      default: return [];
    }
  };

  const renderCard = (item: any) => {
    if (viewType === 'goals') {
      return (
        <Card 
          key={item.id} 
          className="border border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
          onClick={() => setSelectedItem(item)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-[9px] border-white/10 text-slate-400 font-normal px-1.5 py-0 h-5">
                {item.companyName}
              </Badge>
              <Target size={12} className="text-blue-400/50" />
            </div>
            <h4 className="text-sm font-medium text-slate-200 leading-snug group-hover:text-blue-400 transition-colors">
              {item.title}
            </h4>
            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Progress value={item.progress} className="w-16 h-1 bg-white/10" indicatorClassName={item.status === 'completed' ? 'bg-green-500' : item.status === 'blocked' ? 'bg-orange-500' : 'bg-blue-500'} />
                <span className="font-mono">{item.progress}%</span>
              </div>
              <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                <Clock size={10} /> {item.deadline}
              </span>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (viewType === 'projects') {
      return (
        <Card 
          key={item.id} 
          className="border border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
          onClick={() => setSelectedItem(item)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-[9px] border-white/10 text-slate-400 font-normal px-1.5 py-0 h-5 truncate max-w-[120px]">
                {item.parentGoal}
              </Badge>
              <Briefcase size={12} className="text-purple-400/50 shrink-0" />
            </div>
            <h4 className="text-sm font-medium text-slate-200 leading-snug group-hover:text-purple-400 transition-colors">
              {item.title}
            </h4>
            <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400">
              <span>团队: {item.team}</span>
              <span className="font-mono">{item.progress}%</span>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (viewType === 'tasks') {
      return (
        <Card 
          key={item.id} 
          className="border border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
          onClick={() => setSelectedItem(item)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-[9px] border-white/10 text-slate-400 font-normal px-1.5 py-0 h-5 truncate max-w-[140px]">
                {item.parentProject}
              </Badge>
              <ListTodo size={12} className="text-indigo-400/50 shrink-0" />
            </div>
            <h4 className="text-sm font-medium text-slate-200 leading-snug group-hover:text-indigo-400 transition-colors">
              {item.title}
            </h4>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 rounded-full pr-2 pl-1 py-0.5">
                <AgentAvatar type="agent" className="h-4 w-4" />
                <span className="text-[9px] text-slate-300 font-medium">{item.assignee}</span>
              </div>
              {item.taskType === 'sop_pipeline' ? (
                <Workflow size={12} className="text-slate-500" />
              ) : (
                <Zap size={12} className="text-blue-500" />
              )}
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  const getModalTitle = (item: any) => {
    switch (item.type) {
      case 'goal': return '公司目标详情';
      case 'project': return '项目执行详情';
      case 'task': return '任务分解详情';
      default: return '详情';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold tracking-tight glow-text flex items-center gap-2">
            <Target className="text-blue-400" />
            目标与计划看板
          </h1>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <Tabs value={viewType} onValueChange={setViewType} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/5 rounded-lg p-1">
              <TabsTrigger value="goals" className="rounded-md text-xs py-1 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">目标</TabsTrigger>
              <TabsTrigger value="projects" className="rounded-md text-xs py-1 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">项目</TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-md text-xs py-1 data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400">任务</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-nowrap">
          <Plus size={16} />
          新建{viewType === 'goals' ? '目标' : viewType === 'projects' ? '项目' : '任务'}
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
        <div className="flex h-full gap-4 items-start min-w-max">
          {boardColumns.map(column => {
            const items = getItemsByStatus(column.id);
            return (
              <div key={column.id} className="w-80 flex flex-col h-full max-h-full bg-black/20 border border-white/5 rounded-xl overflow-hidden shrink-0">
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-black/40 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/10">
                      {column.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{column.title}</span>
                    <Badge variant="secondary" className="bg-white/5 border-white/10 text-xs text-slate-400 px-1.5 py-0">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <button className="p-1 hover:bg-white/10 rounded transition-colors"><Plus size={14} /></button>
                    <button className="p-1 hover:bg-white/10 rounded transition-colors"><MoreHorizontal size={14} /></button>
                  </div>
                </div>

                <div className="p-3 flex-1 overflow-y-auto custom-scrollbar space-y-3">
                  {items.length === 0 ? (
                    <div className="h-24 flex items-center justify-center text-sm text-slate-600 select-none">
                      暂无内容
                    </div>
                  ) : (
                    items.map(item => renderCard(item))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-start justify-between bg-black/20 shrink-0">
              <div>
                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400 font-normal mb-2">
                  {getModalTitle(selectedItem)}
                </Badge>
                <h2 className="text-xl font-bold text-slate-100">{selectedItem.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">详细描述</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                  {selectedItem.description}
                </p>
              </section>

              {selectedItem.type === 'goal' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">目标进度</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-mono font-bold text-slate-200">{selectedItem.progress}%</span>
                    </div>
                    <Progress value={selectedItem.progress} className="h-1.5 bg-white/10" indicatorClassName={selectedItem.status === 'completed' ? 'bg-green-500' : selectedItem.status === 'blocked' ? 'bg-orange-500' : 'bg-blue-500'} />
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">所属实体及截止期</div>
                    <div className="mt-2 space-y-1">
                      <div className="text-sm font-medium text-slate-300">{selectedItem.companyName}</div>
                      <div className="text-xs font-mono text-slate-500">{selectedItem.deadline}</div>
                    </div>
                  </div>
                </div>
              )}

              {(selectedItem.type === 'project' || selectedItem.type === 'task') && (
                <div className="bg-black/30 p-4 rounded-lg border border-white/5 flex flex-col gap-3 text-sm">
                   <div className="flex justify-between">
                     <span className="text-slate-500">从属节点</span>
                     <span className="text-slate-200">{selectedItem.parentGoal || selectedItem.parentProject}</span>
                   </div>
                   {selectedItem.team && (
                     <div className="flex justify-between">
                       <span className="text-slate-500">承接组织</span>
                       <span className="text-slate-200">{selectedItem.team}</span>
                     </div>
                   )}
                   {selectedItem.assignee && (
                     <div className="flex justify-between items-center">
                       <span className="text-slate-500">执行者</span>
                       <span className="text-slate-200 flex items-center gap-1.5">
                         <AgentAvatar type="agent" className="w-4 h-4" />
                         {selectedItem.assignee}
                       </span>
                     </div>
                   )}
                   {selectedItem.deadline && (
                     <div className="flex justify-between">
                       <span className="text-slate-500">截止日期</span>
                       <span className="text-slate-200 font-mono">{selectedItem.deadline}</span>
                     </div>
                   )}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-white/10"
              >
                关闭
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                编辑详情 <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
