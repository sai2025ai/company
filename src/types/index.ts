export type PageType = 'dashboard' | 'teams' | 'board' | 'sops' | 'team-management' | 'agents' | 'companies' | 'assets';

export interface CompanyGoal {
  id: string;
  name: string;
  progress: number;
  status: 'on_track' | 'at_risk' | 'delayed';
  targetDate: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'offline';
  currentTask?: string;
}

export interface SOP {
  id: string;
  teamId: string;
  name: string;
  description: string;
  usageCount: number;
  stages: string[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  manager: 'digital_avatar' | 'human';
  agents: Agent[];
  projects: string[]; // Project IDs
  sops: SOP[];
}

export interface Task {
  id: string;
  name: string;
  type: 'sop_pipeline' | 'direct_dispatch';
  sopId?: string; // If sop_pipeline
  stage?: string; // Current SOP stage
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'blocked';
  assignee: Agent | null; // Null if waiting for avatar to assign
}

export interface Milestone {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  targetDate: string;
}

export interface Project {
  id: string;
  goalId: string;
  teamId: string;
  name: string;
  description: string;
  progress: number;
  status: 'planning' | 'active' | 'blocked' | 'completed';
  tasks: Task[];
  milestones?: Milestone[];
}

export interface HumanAction {
  id: string;
  title: string;
  description: string;
  type: 'approval' | 'credential' | 'decision';
  source: string;
  time: string;
}

// Global Avatar State
export interface AvatarState {
  currentFocus: string;
  delegatedToday: number;
  blockersResolved: number;
  systemStatus: 'optimal' | 'high_load' | 'attention_required';
  recentActions: string[];
}
