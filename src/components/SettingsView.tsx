import React, { useState } from 'react';
import { UserPersonalization } from '../types';

interface SettingsViewProps {
  onResetDemoData: () => void;
  personalization?: UserPersonalization;
  onUpdatePersonalization?: (updated: Partial<UserPersonalization>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onResetDemoData,
  personalization,
  onUpdatePersonalization
}) => {
  const [userName, setUserName] = useState(personalization?.name || 'Alex');
  const [userIntention, setUserIntention] = useState(
    personalization?.dailyIntention || 'Ship Auth Service architecture specs & unblock Sprint 4 roadmap'
  );
  const [chronotype, setChronotype] = useState<UserPersonalization['chronotype']>(
    personalization?.chronotype || 'morning_lark'
  );
  const [aiBriefingEnabled, setAiBriefingEnabled] = useState(
    personalization?.aiBriefingEnabled ?? true
  );

  const [workStart, setWorkStart] = useState('08:00 AM');
  const [workEnd, setWorkEnd] = useState('05:30 PM');
  const [focusLength, setFocusLength] = useState('50');
  const [autoMute, setAutoMute] = useState(true);
  const [calSync, setCalSync] = useState(true);
  const [timeFormat24, setTimeFormat24] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdatePersonalization) {
      onUpdatePersonalization({
        name: userName.trim(),
        dailyIntention: userIntention.trim(),
        chronotype,
        aiBriefingEnabled
      });
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Banner */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-outline uppercase tracking-wider">
            <span>Velocity Preferences</span>
            <span>·</span>
            <span className="text-primary font-bold">Workspace Configuration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1">Settings & Personalization</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Configure personal greetings, circadian chronotype, calendar sync, and AI focus parameters.
          </p>
        </div>

        {savedNotice && (
          <div className="px-3.5 py-1.5 bg-secondary-container text-on-secondary-container rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Preferences Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: User Profile & Personalization */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface">Personalized Profile & Intention</h3>
          
          <div className="flex items-center gap-4 pb-2">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary shrink-0 ring-4 ring-primary/20">
              <img
                src="/src/assets/images/avatar_alex_user_1791245005341.jpg"
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-outline mb-1">Your Preferred Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Alex"
                    required
                    className="w-full px-3 py-2 bg-surface-container-lowest rounded-xl text-xs sm:text-sm border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-outline mb-1">Email / Workspace</label>
                  <input
                    type="text"
                    disabled
                    value="arnoldlassy@gmail.com"
                    className="w-full px-3 py-2 bg-surface-container rounded-xl text-xs sm:text-sm border border-outline-variant/20 text-outline cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline mb-1">
              Today's North Star (Daily Core Intention)
            </label>
            <input
              type="text"
              value={userIntention}
              onChange={(e) => setUserIntention(e.target.value)}
              placeholder="e.g. Ship Auth Service architecture specs & unblock roadmap"
              className="w-full px-3.5 py-2.5 bg-surface-container-lowest rounded-xl text-xs sm:text-sm border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <p className="text-[11px] text-outline mt-1">
              Appears on your top banner greeting to anchor focus throughout the day.
            </p>
          </div>

          {/* Chronotype (2025/2026 Productivity Trend) */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-outline mb-1.5">
              Circadian Chronotype (Peak Cognitive Window)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setChronotype('morning_lark')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  chronotype === 'morning_lark'
                    ? 'bg-surface-container-lowest border-primary shadow-xs ring-1 ring-primary'
                    : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">wb_sunny</span>
                  <span className="text-xs font-bold text-on-surface">Morning Lark</span>
                </div>
                <p className="text-[11px] text-outline">Peak Focus: 09:30 AM – 12:30 PM</p>
              </div>

              <div
                onClick={() => setChronotype('steady_flow')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  chronotype === 'steady_flow'
                    ? 'bg-surface-container-lowest border-primary shadow-xs ring-1 ring-primary'
                    : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-secondary text-[18px]">timelapse</span>
                  <span className="text-xs font-bold text-on-surface">Steady Flow</span>
                </div>
                <p className="text-[11px] text-outline">Peak Focus: 11:00 AM – 03:00 PM</p>
              </div>

              <div
                onClick={() => setChronotype('night_owl')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  chronotype === 'night_owl'
                    ? 'bg-surface-container-lowest border-primary shadow-xs ring-1 ring-primary'
                    : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">bedtime</span>
                  <span className="text-xs font-bold text-on-surface">Night Owl</span>
                </div>
                <p className="text-[11px] text-outline">Peak Focus: 03:00 PM – 07:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Daily Working Hours & AI Autopilot */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-on-surface">Daily Schedule & Focus Hours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Day Start Time</label>
              <input
                type="text"
                value={workStart}
                onChange={(e) => setWorkStart(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-lowest rounded-xl text-xs sm:text-sm border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Day Wrap-up Time</label>
              <input
                type="text"
                value={workEnd}
                onChange={(e) => setWorkEnd(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-lowest rounded-xl text-xs sm:text-sm border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Default Focus Duration</label>
              <select
                value={focusLength}
                onChange={(e) => setFocusLength(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-lowest rounded-xl text-xs sm:text-sm border border-outline-variant/30 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="25">25 Minutes (Standard Pomodoro)</option>
                <option value="50">50 Minutes (Deep Work)</option>
                <option value="90">90 Minutes (Ultradian Cycle)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={aiBriefingEnabled}
                onChange={(e) => setAiBriefingEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-primary"
              />
              <span className="text-xs sm:text-sm text-on-surface">
                Show AI Copilot Smart Morning Briefing on dashboard
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoMute}
                onChange={(e) => setAutoMute(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-primary"
              />
              <span className="text-xs sm:text-sm text-on-surface">
                Automatically mute notifications during active Deep Work blocks
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={timeFormat24}
                onChange={(e) => setTimeFormat24(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-primary"
              />
              <span className="text-xs sm:text-sm text-on-surface">
                Use 24-hour time notation (09:00 instead of 09:00 AM)
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Integrations */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-xs">
          <h3 className="text-base font-bold text-on-surface mb-3">Calendar Integrations</h3>
          <div className="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-on-surface">Google Calendar</p>
                <p className="text-[11px] text-outline">Synchronizes meetings and sprint standups</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCalSync(!calSync)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                calSync
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container text-outline hover:text-on-surface'
              }`}
            >
              {calSync ? 'Connected' : 'Disconnected'}
            </button>
          </div>
        </div>

        {/* Section 4: Data Management & Reset Demo */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-on-surface">Demo Data Reset</h3>
            <p className="text-xs text-outline mt-0.5">
              Reset all timeline events, tasks, and habits to the pristine mockup state.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetDemoData}
            className="px-4 py-2 border border-outline-variant hover:border-error hover:text-error text-outline text-xs font-semibold rounded-xl transition-colors"
          >
            Reset to Mockup Data
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Save All Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

