import { TimeBlock, Task, Habit, NotificationItem } from '../types';

export const INITIAL_TIME_BLOCKS: TimeBlock[] = [
  {
    id: 'tb-1',
    title: 'Morning Routine & Planning',
    startTime: '08:00 AM',
    endTime: '08:30 AM',
    durationText: '30m',
    type: 'routine',
    completed: true,
    description: 'Review top priorities for the day, check urgent Slack pings, prepare coffee and workspace.'
  },
  {
    id: 'tb-2',
    title: 'Team Sync & Standup',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    durationText: '1h',
    type: 'meeting',
    completed: false,
    priority: 'high',
    hasMeetingLink: true,
    meetingUrl: 'https://meet.google.com/abc-velocity-sync',
    description: "Daily alignment with engineering and product squads. Reviewing yesterday's blockers and sprint progress.",
    attendees: ['Alex Vance (You)', 'Sarah Connor', 'David Chen', 'Elena Rostova', 'Marcus Brody']
  },
  {
    id: 'tb-3',
    title: 'Deep Work: Architecture Design',
    startTime: '10:30 AM',
    endTime: '12:30 PM',
    durationText: '2h',
    type: 'deep_work',
    completed: false,
    priority: 'high',
    notificationsPaused: true,
    description: 'Drafting system specs for the upcoming authentication service migration and distributed token caching.'
  },
  {
    id: 'tb-4',
    title: 'Lunch Break & Walk',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    durationText: '1h',
    type: 'break',
    completed: false,
    description: 'Away from keyboard. Healthy meal & outdoor walk to recharge.'
  },
  {
    id: 'tb-5',
    title: 'Client Consultation: Acme Corp',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    durationText: '1h 30m',
    type: 'client',
    completed: false,
    priority: 'high',
    hasMeetingLink: true,
    meetingUrl: 'https://meet.google.com/acme-milestone-review',
    description: 'Review final milestone deliverables and roadmap extensions with the Acme executive sponsor team.',
    attendees: ['Alex Vance', 'Claire Jenkins (Acme)', 'Robert Taylor (Acme VP)']
  },
  {
    id: 'tb-6',
    title: 'Inbox Zero & Email Catchup',
    startTime: '04:00 PM',
    endTime: '04:45 PM',
    durationText: '45m',
    type: 'routine',
    completed: false,
    description: 'Process inbox, clear customer inquiries, review PR review requests.'
  },
  {
    id: 'tb-7',
    title: "Daily Wrap-up & Tomorrow's Plan",
    startTime: '05:00 PM',
    endTime: '05:30 PM',
    durationText: '30m',
    type: 'routine',
    completed: false,
    description: 'Log accomplishments, clean up open scratch tabs, prepare tomorrow morning priorities.'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review PR #412 for Auth Service',
    completed: true,
    priority: 'high',
    dueText: 'Done',
    categoryTag: '#work'
  },
  {
    id: 'task-2',
    title: 'Finalize Q4 Budget Spreadsheet',
    completed: false,
    priority: 'high',
    dueText: 'Due in 2 hours',
    categoryTag: '#finance'
  },
  {
    id: 'task-3',
    title: 'Update Jira ticket statuses',
    completed: false,
    priority: 'med',
    dueText: 'Due 4:00 PM',
    categoryTag: '#work'
  },
  {
    id: 'task-4',
    title: 'Schedule 1-on-1s with direct reports',
    completed: false,
    priority: 'low',
    dueText: 'Due Tomorrow',
    categoryTag: '#management'
  },
  {
    id: 'task-5',
    title: 'Prepare slides for Sprint Demo',
    completed: true,
    priority: 'high',
    dueText: 'Done',
    categoryTag: '#work'
  },
  {
    id: 'task-6',
    title: 'Review database read-replica benchmarks',
    completed: true,
    priority: 'med',
    dueText: 'Done',
    categoryTag: '#tech'
  },
  {
    id: 'task-7',
    title: 'Respond to Design Team feedback on Figma specs',
    completed: true,
    priority: 'med',
    dueText: 'Done',
    categoryTag: '#design'
  },
  {
    id: 'task-8',
    title: 'Submit monthly expense receipts',
    completed: true,
    priority: 'low',
    dueText: 'Done',
    categoryTag: '#admin'
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Water',
    icon: 'water_drop',
    currentCount: 6,
    targetCount: 8,
    unit: 'glasses',
    completed: true
  },
  {
    id: 'habit-2',
    title: 'Meditation',
    icon: 'self_improvement',
    currentCount: 1,
    targetCount: 1,
    unit: 'sessions',
    completed: true
  },
  {
    id: 'habit-3',
    title: 'Reading',
    icon: 'menu_book',
    currentCount: 25,
    targetCount: 20,
    unit: 'pages',
    completed: true
  },
  {
    id: 'habit-4',
    title: 'Workout',
    icon: 'fitness_center',
    currentCount: 0,
    targetCount: 1,
    unit: 'session',
    completed: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Meeting starting soon',
    description: 'Team Sync & Standup starts in 10 minutes.',
    time: '8:50 AM',
    read: false,
    type: 'calendar'
  },
  {
    id: 'notif-2',
    title: 'Task deadline warning',
    description: 'Finalize Q4 Budget Spreadsheet is due in 2 hours.',
    time: '9:15 AM',
    read: false,
    type: 'task'
  },
  {
    id: 'notif-3',
    title: 'Streak maintained!',
    description: 'You completed your morning meditation habit 5 days in a row.',
    time: '8:30 AM',
    read: true,
    type: 'streak'
  }
];
