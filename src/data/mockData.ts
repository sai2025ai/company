import { CompanyGoal, Team, Project, AvatarState, HumanAction } from '../types';

export const mockPendingHumanActions: HumanAction[] = [
  {
    id: 'ha1',
    title: '提供 CI/CD 云资源授权',
    description: '系统检测缺少 AWS 生产环境资源部署权限，无法执行自动部署。',
    type: 'credential',
    source: '项目: 独立开发产品V1',
    time: '10 分钟前'
  },
  {
    id: 'ha2',
    title: '法人实体实名认证：上传企业执照',
    description: 'Stripe 企业级支付网关申请已通过风控预审。需要您本人的终端操作，上传最新的企业实体营业执照彩色扫描件。',
    type: 'credential',
    source: '网关合规审计',
    time: '1 小时前'
  }
];

export const mockPerformanceData = [
  { date: '08-01', processed: 45, autoResolved: 32, humansRequired: 13 },
  { date: '08-02', processed: 52, autoResolved: 41, humansRequired: 11 },
  { date: '08-03', processed: 38, autoResolved: 29, humansRequired: 9 },
  { date: '08-04', processed: 65, autoResolved: 55, humansRequired: 10 },
  { date: '08-05', processed: 48, autoResolved: 40, humansRequired: 8 },
  { date: '08-06', processed: 71, autoResolved: 63, humansRequired: 8 },
  { date: '08-07', processed: 86, autoResolved: 79, humansRequired: 7 }
];

export const mockTokenUsage = [
  { name: 'Agent: 研发专家', tokens: 1250000 },
  { name: 'Agent: 产品构架', tokens: 850000 },
  { name: 'Agent: 运维专家', tokens: 620000 },
  { name: 'Agent: 数据分析', tokens: 410000 },
  { name: 'Agent: 文案师', tokens: 205000 }
];

export const mockGoals: CompanyGoal[] = [
  { id: 'g1', name: 'Q3 全新SaaS产品发布并获取首批付费用户', progress: 65, status: 'on_track', targetDate: '2026-09-30' },
  { id: 'g2', name: '探索并建立海外营销自动化增长渠道', progress: 30, status: 'at_risk', targetDate: '2026-10-15' }
];

export const mockAvatar: AvatarState = {
  currentFocus: '正在推进「核心交易模块」的Code Review验收，并尝试解除「官网部署」的权限阻塞。',
  delegatedToday: 34,
  blockersResolved: 2,
  systemStatus: 'optimal',
  recentActions: [
    '将 "更新首页文案" 直接派发给 Agent: 文案师',
    '批准 "支付网关重构" 进入 [日常开发流水线] SOP',
    '检测到服务器负载畸高，已自动扩容并指派运维排查分析',
    '基于人类审美的“高转化极简风”偏好，已自动补配“美化按钮”的具体样式参数并由设计Agent执行'
  ]
};

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: '软件工程与研发部',
    description: '负责公司所有软件资产的构建、维护与技术架构迭代。',
    manager: 'digital_avatar',
    projects: ['p1', 'p3'],
    agents: [
      { id: 'a1', name: '架构师 01', role: '系统设计与Code Review', status: 'working', currentTask: '支付模块架构设计' },
      { id: 'a2', name: '全栈工程师 01', role: '前/后端全栈开发', status: 'working', currentTask: 'Dashboard组件优化' },
      { id: 'a3', name: '测试专员 01', role: '自动化测试与回归', status: 'idle' }
    ],
    sops: [
      {
        id: 'sop1',
        teamId: 't1',
        name: '日常开发流水线',
        description: '跨角色的标准研发项目，包含设计、开发、测试到部署的完整闭环。',
        usageCount: 142,
        stages: ['需求澄清', '技术设计', '编码与单元测试', 'Code Review', '自动化测试', '阶段发布']
      },
      {
        id: 'sop2',
        teamId: 't1',
        name: '紧急线上修复 (Hotfix)',
        description: '最高优先级的线上故障消除流程，绕过常规排期。',
        usageCount: 8,
        stages: ['故障定位', '修复验证', '紧急部署']
      }
    ]
  },
  {
    id: 't2',
    name: '市场与内容运营部',
    description: '承接所有前端获客、物料生成、社交媒体自动化运营。',
    manager: 'digital_avatar',
    projects: ['p2'],
    agents: [
      { id: 'a4', name: 'SEO优化师', role: '关键词策略与站点SEO', status: 'working', currentTask: '官网元数据分析' },
      { id: 'a5', name: '爆款文案写手', role: '社交媒体文案批量生成', status: 'idle' }
    ],
    sops: [
      {
        id: 'sop3',
        teamId: 't2',
        name: '独立站内容分发与SEO矩阵构建',
        description: '将核心议题转化为多渠道内容并自动化分发。',
        usageCount: 45,
        stages: ['选题分析', '素材生成', '多语言转译', '渠道定时分发', '数据监测']
      }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    goalId: 'g1',
    teamId: 't1',
    name: 'V2.0 SaaS主体产品研发 (Alpha阶段)',
    description: '重构并上线带有完整计费墙和核心业务逻辑的系统版本。',
    progress: 78,
    status: 'active',
    milestones: [
      { id: 'p1_m1', name: '需求与架构冻结', status: 'completed', targetDate: '2026-08-01' },
      { id: 'p1_m2', name: '核心主流程跑通', status: 'active', targetDate: '2026-08-20' },
      { id: 'p1_m3', name: '首测与性能验收', status: 'pending', targetDate: '2026-09-10' }
    ],
    tasks: [
      {
        id: 'task1',
        name: '核心支付网关对接 (Stripe)',
        type: 'sop_pipeline',
        sopId: 'sop1',
        stage: '编码与单元测试',
        status: 'in_progress',
        assignee: mockTeams[0].agents[1]
      },
      {
        id: 'task2',
        name: '修改首页Hero文案中的一处语病',
        type: 'direct_dispatch',
        status: 'completed',
        assignee: mockTeams[1].agents[1] // Cross team direct dispatch by avatar
      }
    ]
  },
  {
    id: 'p2',
    goalId: 'g2',
    teamId: 't2',
    name: 'Product Hunt首发预热项目',
    description: '在发布前两周内积累早期种子用户邮箱名录，构建社区期待感。',
    progress: 45,
    status: 'active',
    milestones: [
      { id: 'p2_m1', name: '社交裂变诱饵设计完稿', status: 'completed', targetDate: '2026-08-05' },
      { id: 'p2_m2', name: '投放与预热页面上线', status: 'active', targetDate: '2026-08-15' }
    ],
    tasks: [
      {
        id: 'task3',
        name: '整理并生成首批15套宣发素材',
        type: 'sop_pipeline',
        sopId: 'sop3',
        stage: '素材生成',
        status: 'in_progress',
        assignee: mockTeams[1].agents[1]
      }
    ]
  },
  {
    id: 'p3',
    goalId: 'g1',
    teamId: 't1',
    name: '自动化部署基础设施搭建',
    description: '确保代码提交后无需人工介入即可进入云端预览环境。',
    progress: 10,
    status: 'blocked',
    milestones: [
      { id: 'p3_m1', name: '云平台基础网络建设', status: 'completed', targetDate: '2026-07-20' },
      { id: 'p3_m2', name: '自动化流水线配置与授权', status: 'active', targetDate: '2026-08-01' }
    ],
    tasks: [
      {
        id: 'task4',
        name: '配置 CI/CD 云资源权限',
        type: 'direct_dispatch',
        status: 'blocked',
        assignee: null // Waiting for avatar or human intervention
      }
    ]
  }
]
