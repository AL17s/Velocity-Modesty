export type Priority = 'high' | 'med' | 'low';

export type TimeBlockType = 'meeting' | 'deep_work' | 'routine' | 'break' | 'client';

export interface TimeBlock {
  id: string;
  title: string;
  startTime: string; // e.g., "09:00 AM" or "09:00"
  endTime: string;   // e.g., "10:00 AM" or "10:00"
  durationText?: string; // e.g., "30m", "1h", "45m"
  type: TimeBlockType;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  locationOrLink?: string;
  hasMeetingLink?: boolean;
  meetingUrl?: string;
  attendees?: string[];
  isLocked?: boolean;
  notificationsPaused?: boolean;
  energyZone?: 'peak' | 'steady' | 'recharge' | 'creative';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueText: string;
  categoryTag?: string; // e.g., "#work", "#finance", "#planning"
  createdAt?: string;
}

export interface Habit {
  id: string;
  title: string;
  icon: string;
  currentCount: number;
  targetCount: number;
  unit: string;
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'calendar' | 'task' | 'streak' | 'system';
}

export interface UserPersonalization {
  name: string;
  dailyIntention: string;
  energyReadiness: number; // e.g. 91%
  chronotype: 'morning_lark' | 'steady_flow' | 'night_owl';
  aiBriefingEnabled: boolean;
  currentStreakDays: number;
}

export type ActiveNavTab = 'dashboard' | 'calendar' | 'tasks' | 'analytics' | 'settings';

