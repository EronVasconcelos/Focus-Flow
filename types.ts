
export type Page = 
  | 'dashboard' 
  | 'tasks' 
  | 'habits' 
  | 'health' 
  | 'calendar' 
  | 'resources' 
  | 'goals' 
  | 'analytics' 
  | 'settings'
  | 'workspace-config';

export interface Task {
  id: string;
  title: string;
  category: 'Trabalho' | 'Saúde' | 'Família' | 'Pessoal' | 'Casa' | 'Inbox' | string;
  workspace: string;
  tags: string[];
  status: 'inbox' | 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  dueTime?: string;
  subtasks?: string;
  description?: string;
}

export interface Habit {
  id: string;
  title: string;
  category: string;
  streak: number;
  completedDays: boolean[]; // 7 days
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'pdf' | 'note' | 'video' | 'link' | 'folder' | 'image';
  category: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline: string;
  steps: { title: string; completed: boolean }[];
}
