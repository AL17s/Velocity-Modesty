import React, { useState, useRef, useEffect } from 'react';
import { TimeBlock, Task, NotificationItem } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenMobileMenu: () => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearNotifications: () => void;
  timeBlocks: TimeBlock[];
  tasks: Task[];
  onSelectTimeBlock: (block: TimeBlock) => void;
  onSelectTask: (task: Task) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenMobileMenu,
  notifications,
  onMarkNotificationAsRead,
  onClearNotifications,
  timeBlocks,
  tasks,
  onSelectTimeBlock,
  onSelectTask
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter items matching query
  const matchingBlocks = searchQuery.trim()
    ? timeBlocks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingTasks = searchQuery.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.categoryTag?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-outline-variant/20">
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          aria-label="Open Navigation"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* Global Live Search */}
        <div ref={searchRef} className="relative w-64 sm:w-80 md:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search schedules, tasks, or settings..."
            className="w-full bg-surface-container-low text-on-surface pl-10 pr-8 py-2 rounded-lg text-sm border border-transparent focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline/70 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          {/* Live Search Results Dropdown */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in duration-150">
              <div className="p-3 text-xs font-semibold text-outline uppercase tracking-wider bg-surface-container-low/50">
                Search Results
              </div>

              {matchingBlocks.length === 0 && matchingTasks.length === 0 ? (
                <div className="p-6 text-center text-sm text-on-surface-variant">
                  No matching schedules or tasks found for "{searchQuery}".
                </div>
              ) : (
                <div className="divide-y divide-outline-variant/20">
                  {matchingBlocks.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-xs font-medium text-primary">Time Blocks</div>
                      {matchingBlocks.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => {
                            onSelectTimeBlock(b);
                            setSearchFocused(false);
                          }}
                          className="px-3 py-2 rounded-lg hover:bg-surface-container-low cursor-pointer flex items-center justify-between text-sm group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-outline text-[18px]">
                              schedule
                            </span>
                            <span className="font-medium text-on-surface group-hover:text-primary">
                              {b.title}
                            </span>
                          </div>
                          <span className="text-xs text-outline tabular-nums">{b.startTime}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingTasks.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-xs font-medium text-secondary">Tasks</div>
                      {matchingTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            onSelectTask(t);
                            setSearchFocused(false);
                          }}
                          className="px-3 py-2 rounded-lg hover:bg-surface-container-low cursor-pointer flex items-center justify-between text-sm group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-outline text-[18px]">
                              check_box
                            </span>
                            <span className="text-on-surface group-hover:text-secondary">
                              {t.title}
                            </span>
                          </div>
                          <span className="text-xs text-outline">{t.dueText}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors text-on-surface-variant relative"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="px-4 py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-on-surface">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-primary text-white font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={onClearNotifications}
                    className="text-xs text-outline hover:text-primary transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="divide-y divide-outline-variant/15 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-outline">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onMarkNotificationAsRead(item.id)}
                      className={`p-3.5 hover:bg-surface-container-low/60 transition-colors cursor-pointer flex gap-3 ${
                        !item.read ? 'bg-primary-fixed/20' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          {item.type === 'calendar'
                            ? 'event'
                            : item.type === 'streak'
                            ? 'local_fire_department'
                            : 'alarm'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-xs font-semibold text-on-surface truncate">{item.title}</p>
                          <span className="text-[10px] text-outline whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">{item.description}</p>
                      </div>
                      {!item.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-9 h-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer overflow-hidden flex items-center justify-center bg-primary"
          >
            <img
              src="/src/assets/images/avatar_alex_user_1791245005341.jpg"
              alt="Alex Vance"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initial if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="p-4 bg-surface-container-low/60 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary shrink-0">
                    <img
                      src="/src/assets/images/avatar_alex_user_1791245005341.jpg"
                      alt="Alex Vance"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-on-surface truncate">Alex Vance</p>
                    <p className="text-xs text-outline truncate">arnoldlassy@gmail.com</p>
                  </div>
                </div>
                <div className="mt-2.5 px-2 py-1 bg-surface-container-highest/60 rounded-md text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Productivity Score</span>
                  <span className="font-bold text-secondary">94%</span>
                </div>
              </div>

              <div className="p-2 space-y-0.5">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
                  Workspace Preferences
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">sync</span>
                  Google Calendar Sync: Connected
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-error hover:bg-error-container/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
