import React, { useState, useEffect } from 'react';
import { TimeBlock } from '../types';

interface TimelineViewProps {
  timeBlocks: TimeBlock[];
  onOpenJoinMeet: (block: TimeBlock) => void;
  onOpenReschedule: (block: TimeBlock) => void;
  onOpenFocusMode: (block: TimeBlock) => void;
  onSelectBlock: (block: TimeBlock) => void;
  onToggleCompleteBlock: (id: string) => void;
  onAddNewBlockClick: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  timeBlocks,
  onOpenJoinMeet,
  onOpenReschedule,
  onOpenFocusMode,
  onSelectBlock,
  onToggleCompleteBlock,
  onAddNewBlockClick
}) => {
  const [compactMode, setCompactMode] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const [currentTimeText, setCurrentTimeText] = useState('9:41 AM (Now)');

  // Update current time if live
  useEffect(() => {
    if (!liveMode) {
      setCurrentTimeText('9:41 AM (Now)');
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTimeText(`${timeStr} (Now)`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000);
    return () => clearInterval(interval);
  }, [liveMode]);

  // Sort blocks by start time
  const sortedBlocks = [...timeBlocks];

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      {/* Timeline Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
            Daily Timeline
          </h2>
          <button
            onClick={() => setLiveMode(!liveMode)}
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              liveMode
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-surface-container text-outline'
            }`}
            title="Toggle Live Clock tracking"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                liveMode ? 'bg-primary animate-pulse' : 'bg-outline'
              }`}
            />
            Live View
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              // Smooth scroll to top of timeline
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-all border border-outline-variant/20 shadow-xs"
          >
            Today
          </button>
          <button
            onClick={() => setCompactMode(!compactMode)}
            className={`p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all border border-outline-variant/20 shadow-xs ${
              compactMode ? 'text-primary bg-primary-fixed/30' : 'text-on-surface'
            }`}
            title={compactMode ? 'Expanded View' : 'Compact View'}
          >
            <span className="material-symbols-outlined text-[18px]">calendar_view_day</span>
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="bg-surface-container-low rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-xs relative border border-outline-variant/20">
        {/* Current Time Indicator Line (matches mockup positioning between 9:00 AM and 10:30 AM) */}
        <div className="absolute left-16 sm:left-20 right-4 sm:right-6 top-48 z-20 flex items-center pointer-events-none">
          <span className="w-3 h-3 rounded-full bg-error animate-ping absolute" />
          <span className="w-3 h-3 rounded-full bg-error z-10" />
          <div className="flex-1 h-[2px] bg-error shadow-xs" />
          <span className="ml-2 px-2 py-0.5 bg-error text-white text-[11px] font-semibold rounded shadow-xs tabular-nums">
            {currentTimeText}
          </span>
        </div>

        {/* Time Blocks Loop */}
        {sortedBlocks.map((block) => {
          // Render specific styled card according to block ID or type
          if (block.id === 'tb-1') {
            // Time Slot: 08:00 AM (Morning Routine)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className={`flex-1 min-h-[4rem] p-4 rounded-xl bg-surface-container-lowest transition-all hover:shadow-md flex flex-col justify-center border border-outline-variant/20 cursor-pointer ${
                    compactMode ? 'py-2.5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompleteBlock(block.id);
                        }}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          block.completed
                            ? 'bg-secondary border-secondary text-white'
                            : 'border-outline hover:border-primary'
                        }`}
                      >
                        {block.completed && (
                          <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                        )}
                      </button>
                      <span
                        className={`text-sm ${
                          block.completed
                            ? 'line-through text-outline'
                            : 'text-on-surface-variant font-medium'
                        }`}
                      >
                        {block.title}
                      </span>
                    </div>
                    <span className="text-outline text-xs tabular-nums">{block.durationText}</span>
                  </div>
                </div>
              </div>
            );
          }

          if (block.id === 'tb-2' || block.type === 'meeting') {
            // Time Slot: 09:00 AM (Active Event - Team Sync & Standup)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-on-surface pt-2 text-right font-bold tabular-nums shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className="flex-1 p-5 sm:p-6 rounded-xl bg-primary-container text-on-primary-container shadow-md flex flex-col gap-2 relative overflow-hidden cursor-pointer group-hover:shadow-lg transition-all"
                >
                  {/* Left or Right accent bar */}
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary" />

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-white">groups</span>
                      <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {block.title}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-surface/20 text-white rounded-full text-xs font-semibold backdrop-blur-md tabular-nums">
                      {block.startTime} - {block.endTime}
                    </span>
                  </div>

                  <p className="text-sm text-on-primary-container/90 leading-relaxed font-normal">
                    {block.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenJoinMeet(block);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-surface text-primary text-xs font-bold hover:bg-surface-bright transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">video_call</span>
                      Join Meet
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenReschedule(block);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-primary/20 text-white text-xs font-medium hover:bg-primary/30 transition-all"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (block.id === 'tb-3' || block.type === 'deep_work') {
            // Time Slot: 10:30 AM (Deep Work Block)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className="flex-1 p-5 sm:p-6 rounded-xl bg-surface-container-highest text-on-surface shadow-xs flex flex-col gap-2 border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-tertiary">bolt</span>
                      <span className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                        {block.title}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-tertiary/10 text-tertiary">
                        ⚡ Peak Cognitive Window
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFocusMode(block);
                        }}
                        className="px-2.5 py-1 bg-tertiary text-white rounded-md text-xs font-semibold hover:bg-tertiary-container transition-colors flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        Focus Mode
                      </button>
                      <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant tabular-nums">
                        {block.startTime} - {block.endTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {block.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-outline text-xs pt-1">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>Notifications paused</span>
                  </div>
                </div>
              </div>
            );
          }

          if (block.id === 'tb-4' || block.type === 'break') {
            // Time Slot: 01:00 PM (Lunch Break & Walk)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className="flex-1 min-h-[3rem] p-4 rounded-xl bg-surface-container-lowest border border-dashed border-outline-variant flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <span className="text-sm text-outline italic">{block.title}</span>
                  <span className="text-outline text-xs tabular-nums">{block.durationText}</span>
                </div>
              </div>
            );
          }

          if (block.id === 'tb-5' || block.type === 'client') {
            // Time Slot: 02:00 PM (Client Consultation: Acme Corp)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className="flex-1 p-5 sm:p-6 rounded-xl bg-secondary-container text-on-secondary-container shadow-xs flex flex-col gap-2 border border-secondary/20 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[20px] text-on-secondary-container"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        handshake
                      </span>
                      <span className="text-base sm:text-lg font-bold text-on-secondary-container tracking-tight">
                        {block.title}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-surface/30 rounded-full text-xs font-semibold tabular-nums text-on-secondary-container">
                      {block.startTime} - {block.endTime}
                    </span>
                  </div>

                  <p className="text-sm text-on-secondary-container/90 leading-relaxed">
                    {block.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenJoinMeet(block);
                      }}
                      className="px-3 py-1 rounded-lg bg-surface/50 text-on-secondary-container text-xs font-semibold hover:bg-surface/80 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">video_call</span>
                      Join Client Call
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (block.id === 'tb-6') {
            // Time Slot: 04:00 PM (Inbox Zero)
            return (
              <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
                <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                  {block.startTime}
                </span>
                <div
                  onClick={() => onSelectBlock(block)}
                  className="flex-1 p-4 rounded-xl bg-surface-container-lowest transition-all hover:shadow-md flex items-center justify-between border border-outline-variant/20 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-outline">mail</span>
                    <span className="text-sm font-medium text-on-surface">{block.title}</span>
                  </div>
                  <span className="text-outline text-xs tabular-nums">{block.durationText}</span>
                </div>
              </div>
            );
          }

          // Default / tb-7 (05:00 PM Wrap up or custom added blocks)
          return (
            <div key={block.id} className="flex gap-3 sm:gap-4 items-start group">
              <span className="w-14 sm:w-16 text-xs text-outline pt-2 text-right tabular-nums font-medium shrink-0">
                {block.startTime}
              </span>
              <div
                onClick={() => onSelectBlock(block)}
                className="flex-1 p-4 rounded-xl bg-surface-container-lowest transition-all hover:shadow-md flex items-center justify-between border border-outline-variant/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-primary">flag</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface">{block.title}</span>
                    {block.description && (
                      <span className="text-xs text-outline line-clamp-1">{block.description}</span>
                    )}
                  </div>
                </div>
                <span className="text-outline text-xs tabular-nums">
                  {block.durationText || `${block.startTime} - ${block.endTime}`}
                </span>
              </div>
            </div>
          );
        })}

        {/* Add block inline trigger button */}
        <div className="flex gap-3 sm:gap-4 items-center pt-2">
          <span className="w-14 sm:w-16 text-xs text-outline text-right shrink-0" />
          <button
            onClick={onAddNewBlockClick}
            className="flex-1 py-3 border-2 border-dashed border-outline-variant/40 rounded-xl hover:border-primary/40 hover:bg-surface-container-low/60 text-xs font-semibold text-outline hover:text-primary transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Schedule Time Block
          </button>
        </div>
      </div>
    </div>
  );
};
