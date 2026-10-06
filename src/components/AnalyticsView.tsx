import React from 'react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Analytics Top Banner */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-outline uppercase tracking-wider">
            <span>Productivity Velocity</span>
            <span>·</span>
            <span className="text-secondary font-bold">Sprint 4 Performance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">Analytics & Deep Work Insights</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
            You achieved 4.5 hours of unfragmented deep focus today. Meeting overload decreased by 18% compared to last week.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/20 shadow-xs text-center">
            <span className="text-xl font-bold text-secondary tabular-nums">94%</span>
            <span className="block text-[11px] text-outline">Velocity Score</span>
          </div>
          <div className="bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/20 shadow-xs text-center">
            <span className="text-xl font-bold text-primary tabular-nums">4.5h</span>
            <span className="block text-[11px] text-outline">Deep Work Blocked</span>
          </div>
        </div>
      </div>

      {/* Grid of Analytical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Time Breakdown */}
        <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-on-surface">Time Allocation</h3>
              <span className="text-xs text-outline font-mono">8.0h total</span>
            </div>

            {/* Visual segmented bar */}
            <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex mb-4">
              <div style={{ width: '55%' }} className="bg-tertiary" title="Deep Work: 4.5h (55%)" />
              <div style={{ width: '25%' }} className="bg-primary" title="Meetings: 2.0h (25%)" />
              <div style={{ width: '20%' }} className="bg-secondary" title="Routine / Breaks: 1.5h (20%)" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <span className="text-on-surface font-medium">Deep Work</span>
                </div>
                <span className="font-bold text-on-surface tabular-nums">4h 30m (56%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-on-surface font-medium">Team Syncs & Meetings</span>
                </div>
                <span className="font-bold text-on-surface tabular-nums">2h 00m (25%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-on-surface font-medium">Email, Admin & Breaks</span>
                </div>
                <span className="font-bold text-on-surface tabular-nums">1h 30m (19%)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] text-secondary flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            Optimal deep work threshold achieved (&gt; 4h)
          </div>
        </div>

        {/* Metric 2: Weekly Velocity Chart */}
        <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-on-surface">Weekly Completion Velocity</h3>
              <span className="text-xs text-secondary font-semibold">+12% vs Sprint 3</span>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: 'Mon', val: 75, count: '8' },
                { day: 'Tue', val: 90, count: '10' },
                { day: 'Wed', val: 70, count: '7' },
                { day: 'Thu', val: 85, count: '8', today: true },
                { day: 'Fri', val: 40, count: '4' }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-outline font-mono">{item.count}</span>
                  <div
                    style={{ height: `${item.val}%` }}
                    className={`w-full rounded-t-md transition-all ${
                      item.today ? 'bg-primary' : 'bg-surface-container-highest hover:bg-primary-fixed'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 font-semibold ${
                      item.today ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
            Average 8.2 tasks closed per business day
          </div>
        </div>

        {/* Metric 3: Habit Streaks */}
        <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-on-surface">Habit Consistency</h3>
              <span className="text-xs text-secondary font-bold">14-Day Record</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-on-surface">Hydration (Water)</span>
                  <span className="font-bold text-secondary tabular-nums">92%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-on-surface">Mindfulness / Meditation</span>
                  <span className="font-bold text-secondary tabular-nums">85%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-on-surface">Technical Reading</span>
                  <span className="font-bold text-secondary tabular-nums">78%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-on-surface">Workout / Fitness</span>
                  <span className="font-bold text-outline tabular-nums">64%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-outline h-full rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
            Habit completion correlates with +24% higher task closure rate
          </div>
        </div>
      </div>
    </div>
  );
};
