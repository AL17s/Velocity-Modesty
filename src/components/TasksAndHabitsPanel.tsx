import React, { useState } from 'react';
import { Task, Habit, Priority } from '../types';

interface TasksAndHabitsPanelProps {
  tasks: Task[];
  habits: Habit[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleHabit: (id: string) => void;
}

export const TasksAndHabitsPanel: React.FC<TasksAndHabitsPanelProps> = ({
  tasks,
  habits,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onToggleHabit
}) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'med'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dueChoice, setDueChoice] = useState('Due 5:00 PM');
  const [priorityChoice, setPriorityChoice] = useState<Priority>('high');
  const [tagChoice, setTagChoice] = useState('#work');

  // Cycle options for quick tags
  const dueOptions = ['Due 5:00 PM', 'Due in 2 hours', 'Due 4:00 PM', 'Due Tomorrow'];
  const priorityOptions: Priority[] = ['high', 'med', 'low'];
  const tagOptions = ['#work', '#finance', '#personal', '#health', '#design'];

  const cycleDue = () => {
    const nextIdx = (dueOptions.indexOf(dueChoice) + 1) % dueOptions.length;
    setDueChoice(dueOptions[nextIdx]);
  };

  const cyclePriority = () => {
    const nextIdx = (priorityOptions.indexOf(priorityChoice) + 1) % priorityOptions.length;
    setPriorityChoice(priorityOptions[nextIdx]);
  };

  const cycleTag = () => {
    const nextIdx = (tagOptions.indexOf(tagChoice) + 1) % tagOptions.length;
    setTagChoice(tagOptions[nextIdx]);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: 'task-' + Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      priority: priorityChoice,
      dueText: dueChoice,
      categoryTag: tagChoice
    };

    onAddTask(newTask);
    setNewTaskTitle('');
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    return t.priority === filter;
  });

  // Calculate habit streak
  const completedHabits = habits.filter((h) => h.completed).length;
  const totalHabits = habits.length;

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      {/* Header and Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
          Tasks & Habits
        </h2>

        {/* Filter Tab Buttons */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              filter === 'high'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setFilter('med')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              filter === 'med'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Med
          </button>
        </div>
      </div>

      {/* Quick Add Task Form */}
      <div className="bg-surface-container-low rounded-2xl p-5 shadow-xs flex flex-col gap-3.5 border border-outline-variant/20">
        <form onSubmit={handleCreateTask} className="flex items-center gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task or habit..."
            className="flex-1 bg-surface-container-lowest text-on-surface px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-transparent placeholder:text-outline/70"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-container text-on-primary p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
            title="Add Task"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </form>

        {/* Quick Tag Options (Click to cycle values) */}
        <div className="flex flex-wrap items-center gap-3 text-outline text-xs select-none">
          <button
            type="button"
            onClick={cycleDue}
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-0.5"
            title="Click to cycle due time"
          >
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>{dueChoice}</span>
          </button>

          <button
            type="button"
            onClick={cyclePriority}
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-0.5 capitalize"
            title="Click to cycle priority"
          >
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span>{priorityChoice} Priority</span>
          </button>

          <button
            type="button"
            onClick={cycleTag}
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-0.5"
            title="Click to cycle category"
          >
            <span className="material-symbols-outlined text-[16px]">tag</span>
            <span>{tagChoice}</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-surface-container-low rounded-xl p-8 text-center text-sm text-outline border border-outline-variant/20">
            No {filter !== 'all' ? `${filter} priority` : ''} tasks for today.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.completed;
            const isHigh = task.priority === 'high' && !isCompleted;
            const isMed = task.priority === 'med' && !isCompleted;

            return (
              <div
                key={task.id}
                className={`bg-surface-container-low rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs transition-all border border-outline-variant/15 group ${
                  isCompleted
                    ? 'opacity-60 hover:opacity-100'
                    : 'hover:shadow-md hover:border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className="material-symbols-outlined text-outline cursor-grab opacity-40 group-hover:opacity-100 transition-opacity text-[18px]"
                    title="Drag task"
                  >
                    drag_indicator
                  </span>

                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleTask(task.id)}
                    className="w-4 h-4 rounded text-primary accent-primary cursor-pointer shrink-0"
                  />

                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      className={`text-sm truncate ${
                        isCompleted
                          ? 'text-on-surface line-through text-outline'
                          : isHigh
                          ? 'text-on-surface font-medium'
                          : 'text-on-surface'
                      }`}
                    >
                      {task.title}
                    </span>

                    {!isCompleted && task.dueText && (
                      <span
                        className={`text-xs ${
                          task.dueText.includes('hours') ? 'text-error font-medium' : 'text-outline'
                        }`}
                      >
                        {task.dueText}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Priority Badge */}
                  {isCompleted ? (
                    <span className="px-2 py-0.5 bg-surface-container text-outline text-xs font-semibold rounded">
                      Done
                    </span>
                  ) : isHigh ? (
                    <span className="px-2 py-0.5 bg-error-container text-on-error-container text-xs font-semibold rounded">
                      High
                    </span>
                  ) : isMed ? (
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs font-semibold rounded">
                      Med
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs font-semibold rounded">
                      Low
                    </span>
                  )}

                  {/* Quick Delete */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-outline hover:text-error transition-all"
                    title="Delete task"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Habit Tracker Widget */}
      <div className="bg-surface-container-low rounded-2xl p-5 shadow-xs flex flex-col gap-3.5 mt-2 border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-on-surface">Daily Habits</span>
          <span className="text-xs font-semibold text-secondary tabular-nums">
            {completedHabits}/{totalHabits} Streak
          </span>
        </div>

        {/* 4 Habit Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          {habits.map((habit) => {
            const isDone = habit.completed;
            return (
              <div
                key={habit.id}
                onClick={() => onToggleHabit(habit.id)}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-all select-none border border-transparent ${
                  isDone
                    ? 'bg-surface-container-lowest hover:bg-secondary-fixed/20 shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high opacity-60'
                }`}
                title={`Click to toggle ${habit.title} (${isDone ? 'Completed' : 'Pending'})`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isDone ? 'text-secondary' : 'text-outline'
                  }`}
                  style={isDone ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {habit.icon}
                </span>
                <span
                  className={`text-xs font-medium ${
                    isDone ? 'text-on-surface' : 'text-outline'
                  }`}
                >
                  {habit.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
