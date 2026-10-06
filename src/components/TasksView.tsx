import React, { useState } from 'react';
import { Task, Priority } from '../types';

interface TasksViewProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('high');
  const [newTag, setNewTag] = useState('#work');
  const [newDue, setNewDue] = useState('Due 5:00 PM');

  const categories = ['all', '#work', '#finance', '#management', '#tech', '#design', '#admin'];

  const filtered = tasks.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.categoryTag === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.categoryTag?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const todoTasks = filtered.filter((t) => !t.completed);
  const completedTasks = filtered.filter((t) => t.completed);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      id: 'task-' + Date.now(),
      title: newTitle.trim(),
      completed: false,
      priority: newPriority,
      dueText: newDue,
      categoryTag: newTag
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-outline-variant/20 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-outline uppercase tracking-wider">
            <span>Sprint Backlog</span>
            <span>·</span>
            <span className="text-secondary">{todoTasks.length} Pending</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">Task Management</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter tasks..."
              className="pl-9 pr-3 py-2 bg-surface-container-lowest text-xs rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Task
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize shrink-0 ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-xs font-semibold'
                : 'bg-surface-container-low text-outline hover:text-on-surface'
            }`}
          >
            {cat === 'all' ? 'All Tasks' : cat}
          </button>
        ))}
      </div>

      {/* Two Column Board: Pending vs Completed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Pending Tasks Column */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <h3 className="font-bold text-sm text-on-surface">To Do & In Progress</h3>
            </div>
            <span className="text-xs font-bold text-outline tabular-nums">
              {todoTasks.length} items
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {todoTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-outline">
                No active tasks matching filter.
              </div>
            ) : (
              todoTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/20 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => onToggleTask(t.id)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-on-surface truncate">{t.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-error font-medium">{t.dueText}</span>
                        {t.categoryTag && (
                          <span className="text-[10px] text-outline font-mono">{t.categoryTag}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        t.priority === 'high'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {t.priority}
                    </span>
                    <button
                      onClick={() => onDeleteTask(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-outline hover:text-error transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Completed Tasks Column */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <h3 className="font-bold text-sm text-on-surface">Completed Today</h3>
            </div>
            <span className="text-xs font-bold text-secondary tabular-nums">
              {completedTasks.length} items
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {completedTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-outline">
                No completed tasks yet today.
              </div>
            ) : (
              completedTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-surface-container-lowest/70 p-3.5 rounded-xl border border-outline-variant/20 opacity-75 hover:opacity-100 transition-opacity flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => onToggleTask(t.id)}
                      className="w-4 h-4 rounded text-secondary accent-secondary cursor-pointer"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm line-through text-outline truncate">{t.title}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-secondary font-medium">Done</span>
                        {t.categoryTag && (
                          <span className="text-[10px] text-outline font-mono">{t.categoryTag}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteTask(t.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-outline hover:text-error transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl p-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
              <h3 className="font-bold text-base text-on-surface">Create New Task</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What needs to get done?"
                  required
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-sm border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-outline mb-1">Due</label>
                  <input
                    type="text"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    placeholder="Due 5:00 PM"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-outline mb-1">Tag</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="#work"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-outline hover:text-on-surface rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-primary-container shadow-xs"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
