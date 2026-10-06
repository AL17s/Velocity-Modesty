import React, { useState } from 'react';
import { Task, TimeBlock, UserPersonalization } from '../types';

interface TopSummaryBannerProps {
  tasks: Task[];
  timeBlocks: TimeBlock[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  personalization: UserPersonalization;
  onUpdatePersonalization: (updated: Partial<UserPersonalization>) => void;
  onOpenAiDefrag: () => void;
}

export const TopSummaryBanner: React.FC<TopSummaryBannerProps> = ({
  tasks,
  timeBlocks,
  selectedDate,
  setSelectedDate,
  personalization,
  onUpdatePersonalization,
  onOpenAiDefrag
}) => {
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [isEditingIntention, setIsEditingIntention] = useState(false);
  const [intentionText, setIntentionText] = useState(personalization.dailyIntention);
  const [showAiBrief, setShowAiBrief] = useState(true);

  // Weather state
  const tempF = 72;
  const tempC = 22;
  const currentTemp = tempUnit === 'F' ? `${tempF}°F` : `${tempC}°C`;

  // Calculated metrics
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Circumference for r=20 is 2 * PI * 20 ≈ 125.66
  const strokeCircumference = 125.66;
  const strokeOffset = strokeCircumference - (strokeCircumference * progressPercent) / 100;

  // High priority meetings count
  const highPriorityMeetings = timeBlocks.filter(
    (b) => (b.type === 'meeting' || b.type === 'client') && b.priority === 'high'
  ).length;

  // First focus block
  const focusBlock = timeBlocks.find((b) => b.type === 'deep_work');
  const focusTimeText = focusBlock ? focusBlock.startTime : '10:30 AM';

  // Dynamic empathetic greeting based on actual time
  const hour = new Date().getHours();
  const userName = personalization.name || 'Alex';

  let greetingTitle = '';
  let greetingSubtext = '';

  if (hour < 12) {
    greetingTitle = `Good morning, ${userName}.`;
    greetingSubtext = `Your mind is primed for deep flow. We shielded 2 continuous hours for your architecture block at ${focusTimeText}.`;
  } else if (hour < 17) {
    greetingTitle = `Good afternoon, ${userName}.`;
    greetingSubtext = `Great momentum so far today. You have ${pendingTasks} pending tasks and your client milestone consultation at 02:00 PM.`;
  } else {
    greetingTitle = `Good evening, ${userName}.`;
    greetingSubtext = `Wrapping up strong. Take time to celebrate today's progress and decompress before tomorrow.`;
  }

  // Format date
  const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const monthDayYear = selectedDate
    .toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    .toUpperCase();

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date()); // Current actual date
  };

  const handleSaveIntention = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePersonalization({ dailyIntention: intentionText.trim() });
    setIsEditingIntention(false);
  };

  return (
    <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs mb-8 relative overflow-hidden flex flex-col gap-6 border border-outline-variant/20">
      {/* Ambient background bloom */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full pointer-events-none blur-3xl" />

      {/* Main Top Header Block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10">
        {/* Left Column: Greeting, Date, Intention */}
        <div className="flex flex-col gap-1.5 max-w-2xl">
          {/* Date & Sprint Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-outline text-xs sm:text-sm font-semibold tracking-wider">
            <span>{dayName}</span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span>{monthDayYear}</span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span className="text-secondary font-semibold">SPRINT WEEK 4</span>

            {/* Quick day switcher controls */}
            <div className="inline-flex items-center ml-2 border border-outline-variant/40 rounded-lg bg-surface-container-lowest/70 p-0.5 shadow-2xs">
              <button
                onClick={handlePrevDay}
                title="Previous Day"
                className="p-1 hover:bg-surface-container text-outline hover:text-on-surface rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_left</span>
              </button>
              <button
                onClick={handleToday}
                title="Jump to Today"
                className="px-2 py-0.5 text-[11px] font-semibold text-outline hover:text-primary transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNextDay}
                title="Next Day"
                className="p-1 hover:bg-surface-container text-outline hover:text-on-surface rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Warm, Personal Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mt-1">
            {greetingTitle}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {greetingSubtext}
          </p>

          {/* Daily Intention / North Star (Personalized Goal) */}
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
              flag
            </span>
            {isEditingIntention ? (
              <form onSubmit={handleSaveIntention} className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={intentionText}
                  onChange={(e) => setIntentionText(e.target.value)}
                  placeholder="Set your core intention for today..."
                  className="px-3 py-1 bg-surface-container-lowest text-xs sm:text-sm text-on-surface rounded-lg border border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary flex-1"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-container"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingIntention(false)}
                  className="px-2 py-1 text-xs text-outline hover:text-on-surface"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div
                onClick={() => setIsEditingIntention(true)}
                className="group flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-medium text-on-surface hover:text-primary transition-colors"
                title="Click to edit your Daily North Star"
              >
                <span className="text-outline font-semibold">Today's North Star:</span>
                <span className="font-semibold underline decoration-outline-variant group-hover:decoration-primary">
                  {personalization.dailyIntention}
                </span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 text-outline transition-opacity">
                  edit
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 z-10 w-full md:w-auto justify-between md:justify-end">
          {/* Biometric / Readiness Score Widget (2025/2026 Trend) */}
          <div
            className="flex items-center gap-3.5 bg-surface-container-lowest px-4 py-3 rounded-2xl shadow-xs border border-outline-variant/20 hover:border-secondary/40 transition-all select-none"
            title="Circadian Readiness: High cognitive energy window"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-on-surface tabular-nums">
                  {personalization.energyReadiness}%
                </span>
                <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider bg-secondary/15 px-1.5 py-0.2 rounded">
                  Peak Flow
                </span>
              </div>
              <span className="text-[11px] text-outline">Cognitive Readiness</span>
            </div>
          </div>

          {/* Weather Widget */}
          <div
            onClick={() => setTempUnit(tempUnit === 'F' ? 'C' : 'F')}
            title="Click to toggle °F / °C"
            className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-2xl shadow-xs border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer select-none"
          >
            <span
              className="material-symbols-outlined text-[28px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              wb_sunny
            </span>
            <div className="flex flex-col">
              <span className="text-base font-bold text-on-surface tabular-nums">{currentTemp}</span>
              <span className="text-[11px] text-on-surface-variant">Sunny & Clear</span>
            </div>
          </div>

          {/* Daily Progress Ring */}
          <div className="flex items-center gap-3.5 bg-surface-container-lowest px-4 py-3 rounded-2xl shadow-xs border border-outline-variant/20 transition-all">
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-11 h-11 transform -rotate-90">
                <circle
                  className="text-surface-container"
                  cx="22"
                  cy="22"
                  fill="transparent"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <circle
                  className="text-primary transition-all duration-500 ease-out"
                  cx="22"
                  cy="22"
                  fill="transparent"
                  r="18"
                  stroke="currentColor"
                  strokeDasharray="113.1"
                  strokeDashoffset={113.1 - (113.1 * progressPercent) / 100}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-on-surface tabular-nums">
                {progressPercent}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface tabular-nums">
                {completedTasks}/{totalTasks} Tasks
              </span>
              <span className="text-[11px] text-on-surface-variant">Completed today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Trending Feature: AI Schedule Defrag & Morning Smart Briefing Bar */}
      {showAiBrief && (
        <div className="pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-surface-container-lowest/60 rounded-2xl p-3.5 border border-outline-variant/20 z-10 backdrop-blur-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            </div>
            <div className="text-on-surface">
              <span className="font-semibold text-primary mr-1.5">AI Copilot Briefing:</span>
              <span>
                PR #412 passed automated integration checks. Zero blocker tickets reported in standup queue.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={onOpenAiDefrag}
              className="px-3 py-1.5 rounded-lg bg-primary text-white font-semibold text-xs hover:bg-primary-container transition-all flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
              Smart Schedule Defrag
            </button>
            <button
              onClick={() => setShowAiBrief(false)}
              className="p-1 text-outline hover:text-on-surface rounded-md transition-colors"
              title="Dismiss briefing"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
