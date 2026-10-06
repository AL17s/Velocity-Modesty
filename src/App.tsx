import React, { useState, useEffect } from 'react';
import { ActiveNavTab, TimeBlock, Task, Habit, NotificationItem, UserPersonalization } from './types';
import {
  INITIAL_TIME_BLOCKS,
  INITIAL_TASKS,
  INITIAL_HABITS,
  INITIAL_NOTIFICATIONS
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TopSummaryBanner } from './components/TopSummaryBanner';
import { TimelineView } from './components/TimelineView';
import { TasksAndHabitsPanel } from './components/TasksAndHabitsPanel';
import { CalendarView } from './components/CalendarView';
import { TasksView } from './components/TasksView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { JoinMeetModal } from './components/Modals/JoinMeetModal';
import { FocusModeModal } from './components/Modals/FocusModeModal';
import { RescheduleModal } from './components/Modals/RescheduleModal';
import { NewTimeBlockModal } from './components/Modals/NewTimeBlockModal';
import { TimeBlockDetailModal } from './components/Modals/TimeBlockDetailModal';
import { AiDefragModal } from './components/Modals/AiDefragModal';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Selected calendar day (Default: current date, or October 2026 / October 24)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 9, 5));

  // User Personalization State
  const [personalization, setPersonalization] = useState<UserPersonalization>(() => {
    try {
      const saved = localStorage.getItem('velocity_personalization');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Alex',
            dailyIntention: 'Ship Auth Service architecture specs & unblock Sprint 4 roadmap',
            energyReadiness: 94,
            chronotype: 'morning_lark',
            aiBriefingEnabled: true,
            currentStreakDays: 14
          };
    } catch {
      return {
        name: 'Alex',
        dailyIntention: 'Ship Auth Service architecture specs & unblock Sprint 4 roadmap',
        energyReadiness: 94,
        chronotype: 'morning_lark',
        aiBriefingEnabled: true,
        currentStreakDays: 14
      };
    }
  });

  // Core Data with LocalStorage persistence
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(() => {
    try {
      const saved = localStorage.getItem('velocity_time_blocks');
      return saved ? JSON.parse(saved) : INITIAL_TIME_BLOCKS;
    } catch {
      return INITIAL_TIME_BLOCKS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('velocity_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem('velocity_habits');
      return saved ? JSON.parse(saved) : INITIAL_HABITS;
    } catch {
      return INITIAL_HABITS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('velocity_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modals state
  const [showNewTimeBlockModal, setShowNewTimeBlockModal] = useState(false);
  const [showAiDefragModal, setShowAiDefragModal] = useState(false);
  const [activeMeetingBlock, setActiveMeetingBlock] = useState<TimeBlock | null>(null);
  const [activeFocusBlock, setActiveFocusBlock] = useState<TimeBlock | null>(null);
  const [activeRescheduleBlock, setActiveRescheduleBlock] = useState<TimeBlock | null>(null);
  const [activeDetailBlock, setActiveDetailBlock] = useState<TimeBlock | null>(null);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('velocity_personalization', JSON.stringify(personalization));
  }, [personalization]);

  useEffect(() => {
    localStorage.setItem('velocity_time_blocks', JSON.stringify(timeBlocks));
  }, [timeBlocks]);

  useEffect(() => {
    localStorage.setItem('velocity_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('velocity_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('velocity_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Update personalization
  const handleUpdatePersonalization = (updated: Partial<UserPersonalization>) => {
    setPersonalization((prev) => ({ ...prev, ...updated }));
  };

  // AI Schedule Defrag optimization
  const handleApplyAiDefrag = () => {
    setTimeBlocks((prev) =>
      prev.map((b) => {
        if (b.id === 'tb-3') {
          return {
            ...b,
            startTime: '10:30 AM',
            endTime: '12:30 PM',
            durationText: '2h (Shielded)'
          };
        }
        if (b.id === 'tb-6') {
          return {
            ...b,
            startTime: '04:15 PM',
            endTime: '05:00 PM',
            durationText: '45m'
          };
        }
        return b;
      })
    );

    // Add smart notification
    const newNotif: NotificationItem = {
      id: 'notif-defrag-' + Date.now(),
      title: 'Schedule Defragmented ✨',
      description: 'Focus Shield locked a 2-hour uninterrupted block for your architecture specs.',
      time: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handlers for Tasks
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isNowCompleted = !t.completed;
          return {
            ...t,
            completed: isNowCompleted,
            dueText: isNowCompleted ? 'Done' : t.dueText === 'Done' ? 'Due Today' : t.dueText
          };
        }
        return t;
      })
    );
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers for Habits
  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const isDone = !h.completed;
          return {
            ...h,
            completed: isDone,
            currentCount: isDone ? h.targetCount : 0
          };
        }
        return h;
      })
    );
  };

  // Handlers for Time Blocks
  const handleAddTimeBlock = (newBlock: TimeBlock) => {
    setTimeBlocks((prev) => [...prev, newBlock]);
  };

  const handleUpdateBlock = (updated: TimeBlock) => {
    setTimeBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleDeleteBlock = (id: string) => {
    setTimeBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleCompleteBlock = (id: string) => {
    setTimeBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  };

  // Handlers for Notifications
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Reset to original mockup data
  const handleResetDemoData = () => {
    setTimeBlocks(INITIAL_TIME_BLOCKS);
    setTasks(INITIAL_TASKS);
    setHabits(INITIAL_HABITS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedDate(new Date(2026, 9, 5));
    setPersonalization({
      name: 'Alex',
      dailyIntention: 'Ship Auth Service architecture specs & unblock Sprint 4 roadmap',
      energyReadiness: 94,
      chronotype: 'morning_lark',
      aiBriefingEnabled: true,
      currentStreakDays: 14
    });
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        pendingTasksCount={pendingTasksCount}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-72 transition-all">
        {/* Top Fixed Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          notifications={notifications}
          onMarkNotificationAsRead={handleMarkNotificationAsRead}
          onClearNotifications={handleClearNotifications}
          timeBlocks={timeBlocks}
          tasks={tasks}
          onSelectTimeBlock={(block) => setActiveDetailBlock(block)}
          onSelectTask={(task) => {
            handleToggleTask(task.id);
          }}
        />

        {/* Main Content Viewport */}
        <main className="relative pt-20 px-4 sm:px-6 lg:px-10 py-6 min-h-screen">
          <div className="flex flex-col w-full pb-20 max-w-7xl mx-auto">
            {/* Top Summary Banner always visible on Dashboard */}
            {activeTab === 'dashboard' && (
              <>
                <TopSummaryBanner
                  tasks={tasks}
                  timeBlocks={timeBlocks}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  personalization={personalization}
                  onUpdatePersonalization={handleUpdatePersonalization}
                  onOpenAiDefrag={() => setShowAiDefragModal(true)}
                />

                {/* Two-Column Grid: Timeline (8 cols) & Tasks/Habits (4 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <TimelineView
                    timeBlocks={timeBlocks}
                    onOpenJoinMeet={(block) => setActiveMeetingBlock(block)}
                    onOpenReschedule={(block) => setActiveRescheduleBlock(block)}
                    onOpenFocusMode={(block) => setActiveFocusBlock(block)}
                    onSelectBlock={(block) => setActiveDetailBlock(block)}
                    onToggleCompleteBlock={handleToggleCompleteBlock}
                    onAddNewBlockClick={() => setShowNewTimeBlockModal(true)}
                  />

                  <TasksAndHabitsPanel
                    tasks={tasks}
                    habits={habits}
                    onToggleTask={handleToggleTask}
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}
                    onToggleHabit={handleToggleHabit}
                  />
                </div>
              </>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <CalendarView
                timeBlocks={timeBlocks}
                onSelectBlock={(block) => setActiveDetailBlock(block)}
                onAddNewBlock={() => setShowNewTimeBlockModal(true)}
              />
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <TasksView
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && <AnalyticsView />}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <SettingsView
                onResetDemoData={handleResetDemoData}
                personalization={personalization}
                onUpdatePersonalization={handleUpdatePersonalization}
              />
            )}
          </div>
        </main>
      </div>

      {/* Floating Quick-Add "New Time Block" Action Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <button
          onClick={() => setShowNewTimeBlockModal(true)}
          className="bg-primary text-white hover:bg-primary-container px-5 sm:px-6 py-3.5 sm:py-4 rounded-full shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">add_alarm</span>
          <span className="text-sm font-semibold whitespace-nowrap">New Time Block</span>
        </button>
      </div>

      {/* Modals */}
      {showNewTimeBlockModal && (
        <NewTimeBlockModal
          onClose={() => setShowNewTimeBlockModal(false)}
          onAddBlock={handleAddTimeBlock}
        />
      )}

      {showAiDefragModal && (
        <AiDefragModal
          timeBlocks={timeBlocks}
          onClose={() => setShowAiDefragModal(false)}
          onApplyDefrag={handleApplyAiDefrag}
        />
      )}

      {activeMeetingBlock && (
        <JoinMeetModal
          block={activeMeetingBlock}
          onClose={() => setActiveMeetingBlock(null)}
        />
      )}

      {activeFocusBlock && (
        <FocusModeModal
          block={activeFocusBlock}
          onClose={() => setActiveFocusBlock(null)}
        />
      )}

      {activeRescheduleBlock && (
        <RescheduleModal
          block={activeRescheduleBlock}
          onClose={() => setActiveRescheduleBlock(null)}
          onSave={handleUpdateBlock}
        />
      )}

      {activeDetailBlock && (
        <TimeBlockDetailModal
          block={activeDetailBlock}
          onClose={() => setActiveDetailBlock(null)}
          onToggleComplete={handleToggleCompleteBlock}
          onOpenReschedule={(b) => setActiveRescheduleBlock(b)}
          onOpenJoinMeet={(b) => setActiveMeetingBlock(b)}
          onOpenFocusMode={(b) => setActiveFocusBlock(b)}
          onDeleteBlock={handleDeleteBlock}
        />
      )}
    </div>
  );
}

