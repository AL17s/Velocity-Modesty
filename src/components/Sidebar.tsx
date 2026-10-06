import React from 'react';
import { ActiveNavTab } from '../types';

interface SidebarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  pendingTasksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  pendingTasksCount
}) => {
  const navItems: { id: ActiveNavTab; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_today' },
    { id: 'tasks', label: 'Tasks', icon: 'check_box', badge: pendingTasksCount },
    { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col py-10 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="px-6 mb-10 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => {
              setActiveTab('dashboard');
              setMobileOpen(false);
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-on-primary text-[20px]">schedule</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-on-surface">Velocity</span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-xs font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center">
                  <span className={`material-symbols-outlined mr-4 text-[20px] ${isActive ? 'text-white' : 'text-on-surface-variant'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && item.badge > 0 ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums ${
                      isActive ? 'bg-white/25 text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Mini quick sprint info footer */}
        <div className="px-6 pt-4 border-t border-outline-variant/30">
          <div className="bg-surface-container-lowest/80 rounded-xl p-3 flex items-center justify-between text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-medium text-on-surface">Sprint 4 Active</span>
            </div>
            <span className="text-secondary font-semibold">Day 4/10</span>
          </div>
        </div>
      </aside>
    </>
  );
};
