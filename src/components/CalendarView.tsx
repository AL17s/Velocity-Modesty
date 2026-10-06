import React, { useState } from 'react';
import { TimeBlock } from '../types';

interface CalendarViewProps {
  timeBlocks: TimeBlock[];
  onSelectBlock: (block: TimeBlock) => void;
  onAddNewBlock: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  timeBlocks,
  onSelectBlock,
  onAddNewBlock
}) => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('week');
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Generate 7 days for current sprint week
  const weekDays = ['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25', 'Sat 26', 'Sun 27'];
  const hours = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM'
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-outline-variant/20 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-outline uppercase tracking-wider">
            <span>Sprint 4</span>
            <span>·</span>
            <span className="text-secondary">Week of October 21 - 27, 2024</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">Calendar & Schedule</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Day / Week / Month Switcher */}
          <div className="flex items-center bg-surface-container p-1 rounded-xl border border-outline-variant/30 text-xs">
            <button
              onClick={() => setViewType('day')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewType === 'day' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold' : 'text-outline hover:text-on-surface'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewType('week')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewType === 'week' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold' : 'text-outline hover:text-on-surface'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewType('month')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewType === 'month' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold' : 'text-outline hover:text-on-surface'
              }`}
            >
              Month
            </button>
          </div>

          <button
            onClick={onAddNewBlock}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Event
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Days Header Row */}
          <div className="grid grid-cols-8 border-b border-outline-variant/20 bg-surface-container-low/50 text-xs font-semibold text-outline">
            <div className="p-3.5 text-right pr-4 border-r border-outline-variant/20">GMT-7</div>
            {weekDays.map((day, idx) => {
              const isToday = day.includes('Thu 24');
              return (
                <div
                  key={idx}
                  className={`p-3.5 text-center border-r last:border-r-0 border-outline-variant/20 ${
                    isToday ? 'bg-primary-fixed/30 text-primary font-bold' : ''
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Hourly Grid Rows */}
          <div className="divide-y divide-outline-variant/15 text-xs">
            {hours.map((hour, hIdx) => {
              return (
                <div key={hIdx} className="grid grid-cols-8 min-h-[64px] group">
                  <div className="p-2 text-right pr-4 text-outline font-mono text-[11px] border-r border-outline-variant/20 bg-surface-container-low/20">
                    {hour}
                  </div>

                  {weekDays.map((day, dIdx) => {
                    const isThursday = day.includes('Thu 24');

                    // Find if any time block starts in this hour for Thursday (today)
                    const matching = isThursday
                      ? timeBlocks.filter((b) => b.startTime.startsWith(hour.slice(0, 3)))
                      : [];

                    return (
                      <div
                        key={dIdx}
                        onClick={() => {
                          if (matching.length === 0) onAddNewBlock();
                        }}
                        className={`p-1.5 border-r last:border-r-0 border-outline-variant/15 relative transition-colors ${
                          isThursday ? 'bg-primary-fixed/5' : 'hover:bg-surface-container-low/40'
                        } cursor-pointer`}
                      >
                        {matching.map((block) => (
                          <div
                            key={block.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBlock(block);
                            }}
                            className={`p-2 rounded-lg text-xs shadow-xs border transition-all hover:scale-[1.02] cursor-pointer ${
                              block.type === 'meeting'
                                ? 'bg-primary text-white border-primary/20'
                                : block.type === 'deep_work'
                                ? 'bg-surface-container-highest text-on-surface border-tertiary/30'
                                : block.type === 'client'
                                ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
                                : 'bg-surface-container-low text-on-surface border-outline-variant/40'
                            }`}
                          >
                            <p className="font-bold line-clamp-1">{block.title}</p>
                            <p className="text-[10px] opacity-80 tabular-nums">
                              {block.startTime} - {block.endTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
