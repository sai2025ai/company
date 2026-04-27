import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { mockGoals, mockAvatar, mockProjects, mockTeams, mockPendingHumanActions, mockPerformanceData, mockTokenUsage } from '../data/mockData';
import { Target, Activity, AlertCircle, Bot, Zap, Clock, Inbox, Flag, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { AgentAvatar } from '../components/ui/AgentAvatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Dashboard() {
  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const blockedProjects = mockProjects.filter(p => p.status === 'blocked');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">经营控制台</h1>
          <p className="text-[#94a3b8] mt-1">全局运转监控与高管视角的决策与追踪。</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 font-mono text-xs border-blue-500/30 text-blue-400">
          系统运转正常 • Uptime 99.9%
        </Badge>
      </div>

      {/* Global Data Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/20 border-white/5">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5"><Bot size={14} className="text-blue-400"/> 当前活跃 Agent</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-mono text-blue-400 font-bold leading-none">{mockTeams.reduce((acc, t) => acc + t.agents.filter(a => a.status === 'working').length, 0)}</span>
              <span className="text-sm font-mono text-[#94a3b8] mb-0.5">/ {mockTeams.reduce((acc, t) => acc + t.agents.length, 0)} 总计</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/5">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5"><Zap size={14} className="text-green-400"/> 今日自动流转任务</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-mono text-green-400 font-bold leading-none">{mockAvatar.delegatedToday}</span>
              <span className="text-sm font-mono text-[#94a3b8] mb-0.5 text-green-400/50">+12% 同比</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/5">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5"><Target size={14} className="text-slate-300"/> 正在推进项目</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-mono text-slate-200 font-bold leading-none">{activeProjects.length}</span>
              <span className="text-sm font-mono text-[#94a3b8] mb-0.5">/ {mockProjects.length} 核心池</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/5">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5"><AlertCircle size={14} className="text-orange-400"/> 待人工干预</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-mono text-orange-400 font-bold leading-none">{mockPendingHumanActions.length}</span>
              <span className="text-sm font-mono text-[#94a3b8] mb-0.5">项决策阻塞</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Row: Digital Avatar Hub && Pending Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-blue-500/20 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.05)] h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <AgentAvatar type="avatar" status="working" className="h-12 w-12" />
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  数字分身中枢 
                  <Badge variant="success" className="text-[10px] h-5">执行中</Badge>
                </CardTitle>
                <CardDescription>公司的唯一机器决策者与调度指挥官</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="focus">
              <TabsList>
                <TabsTrigger value="focus" className="flex items-center gap-2">
                  <Target size={14} /> 推进焦点
                </TabsTrigger>
                <TabsTrigger value="records" className="flex items-center gap-2">
                  <Activity size={14} /> 调度记录
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart2 size={14} /> 核心指标
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="focus" className="space-y-4 pt-4">
                <p className="text-sm leading-relaxed text-slate-200 bg-black/20 p-4 rounded-lg border border-white/5 font-mono">
                  {mockAvatar.currentFocus}
                </p>
                <div className="text-xs text-[#94a3b8]">
                  当前核心意图：根据人类的意图不断细化与拆解任务，并派发给对应职能的Agent执行。
                </div>
              </TabsContent>

              <TabsContent value="records" className="pt-4">
                <ul className="space-y-3 bg-black/20 p-4 rounded-lg border border-white/5">
                  {mockAvatar.recentActions.map((action, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-3">
                      <Zap size={14} className="mt-0.5 text-blue-500 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="stats" className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4 border border-white/5 flex flex-col justify-center">
                    <span className="text-sm text-[#94a3b8] mb-2">今日总委派事项</span>
                    <span className="text-3xl font-mono font-semibold text-blue-400 glow-text">{mockAvatar.delegatedToday}</span>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4 border border-white/5 flex flex-col justify-center">
                    <span className="text-sm text-[#94a3b8] mb-2">自动解除阻塞数</span>
                    <span className="text-3xl font-mono font-semibold text-green-400">{mockAvatar.blockersResolved}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Pending Human Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight mb-2 flex items-center justify-between glow-text text-orange-50">
            <span className="flex items-center gap-2">
              <Inbox size={18} className="text-orange-400" />
              待我处理
            </span>
            <Badge variant="warning" className="font-mono">{mockPendingHumanActions.length}</Badge>
          </h2>
          <div className="grid gap-4">
            {mockPendingHumanActions.map(action => (
              <Card key={action.id} className="border-orange-500/30 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5 mb-1.5">
                      <AlertCircle size={14} className="text-orange-400" />
                      {action.title}
                    </h4>
                    <p className="text-xs text-orange-100/70 leading-relaxed">{action.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-orange-500/10">
                    <span className="text-[10px] text-orange-200/50">{action.source}</span>
                    <button className="text-[10px] bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded hover:bg-orange-500/30 transition-colors uppercase font-bold tracking-wider border border-orange-500/20">
                      去处理
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="border-white/5 bg-black/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 size={16} className="text-blue-400" />
              数字分身处理趋势 (近7日)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="processed" name="总处理事项" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="autoResolved" name="机器自动解决" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="humansRequired" name="流转人类决策" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-black/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap size={16} className="text-purple-400" />
              Agent 每日 Token 消耗排行
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={mockTokenUsage}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val / 1000}k`} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    width={100} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number) => [`${value.toLocaleString()} Tokens`, '消耗量']}
                  />
                  <Bar dataKey="tokens" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 mt-8">
        {/* Goals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">公司级战略目标</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockGoals.map(goal => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base leading-snug">{goal.name}</CardTitle>
                    <Badge variant={goal.status === 'on_track' ? 'success' : 'warning'}>
                      {goal.status === 'on_track' ? '推进中' : '有风险'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-2 mt-2">
                    <span>进度: <span className="font-mono text-slate-200">{goal.progress}%</span></span>
                    <span className="flex items-center gap-1"><Clock size={12}/> 目标里程碑: {goal.targetDate}</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Projects Overview */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            主核心项目 
            <Badge variant="secondary" className="font-mono">{activeProjects.length}</Badge>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map(project => {
              const activeMilestone = project.milestones?.find(m => m.status === 'active') || project.milestones?.find(m => m.status === 'pending');
              return (
              <Card key={project.id} className="flex flex-col h-full">
                <CardContent className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{project.name}</h4>
                    <div className="text-xs text-[#94a3b8] flex flex-col gap-2 mt-2">
                        <span>承接团队: {mockTeams.find(t => t.id === project.teamId)?.name}</span>
                        {activeMilestone && (
                            <span className="inline-flex items-center w-max gap-1 text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                                <Flag size={10} />
                                当前里程碑: {activeMilestone.name}
                            </span>
                        )}
                    </div>
                  </div>
                  <div className="w-full mt-auto pt-2">
                    <div className="text-right text-xs font-mono mb-1 text-slate-200">{project.progress}%</div>
                    <Progress value={project.progress} />
                  </div>
                </CardContent>
              </Card>
            )})}
            
            {blockedProjects.map(project => (
              <Card key={project.id} className="border-red-500/30 bg-red-500/5 h-full">
                <CardContent className="p-4 flex flex-col items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-red-400 flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      [阻塞] {project.name}
                    </h4>
                    <p className="text-xs text-red-400/70">需要人类决策或外部介入</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Load Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">执行单元状态 (团队概览)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTeams.map(team => {
            const workingAgents = team.agents.filter(a => a.status === 'working').length;
            const utilization = Math.round((workingAgents / team.agents.length) * 100);
            
            return (
              <Card key={team.id}>
                <div className="p-4 pb-3 border-b border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm">{team.name}</h3>
                  </div>
                  <p className="text-xs text-[#94a3b8] line-clamp-1">{team.description}</p>
                </div>
                <CardContent className="p-4 pt-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94a3b8]">劳动力负载率</span>
                    <span className="font-mono font-medium text-slate-200">{utilization}%</span>
                  </div>
                  <Progress value={utilization} className="h-1.5" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      {team.agents.slice(0, 4).map(agent => (
                        <AgentAvatar key={agent.id} status={agent.status} className="h-6 w-6 border-2 border-[#080b12]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#94a3b8]">并发项目: {team.projects.length}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
