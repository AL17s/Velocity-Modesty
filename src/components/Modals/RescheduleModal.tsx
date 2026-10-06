import React, { useState } from 'react';
import { TimeBlock } from '../../types';

interface RescheduleModalProps {
  block: TimeBlock;
  onClose: () => void;
  onSave: (updatedBlock: TimeBlock) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({ block, onClose, onSave }) => {
  const [startTime, setStartTime] = useState(block.startTime);
  const [endTime, setEndTime] = useState(block.endTime);

  const handleQuickShift = (minutes: number) => {
    // Quick helper to shift times
    const shiftTimeString = (timeStr: string, deltaMinutes: number) => {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return timeStr;
      let h = parseInt(match[1], 10);
      let m = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();

      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;

      let totalMinutes = h * 60 + m + deltaMinutes;
      if (totalMinutes < 0) totalMinutes += 24 * 60;
      totalMinutes %= 24 * 60;

      let newH = Math.floor(totalMinutes / 60);
      const newM = totalMinutes % 60;
      const newAmpm = newH >= 12 ? 'PM' : 'AM';
      if (newH > 12) newH -= 12;
      if (newH === 0) newH = 12;

      return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')} ${newAmpm}`;
    };

    setStartTime((prev) => shiftTimeString(prev, minutes));
    setEndTime((prev) => shiftTimeString(prev, minutes));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...block,
      startTime,
      endTime
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl p-6 border border-outline-variant/30">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">update</span>
            <h2 className="text-base font-bold text-on-surface">Reschedule Event</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-outline mb-4">
          Rescheduling: <strong className="text-on-surface">{block.title}</strong>
        </p>

        {/* Quick Shift Presets */}
        <div className="mb-5">
          <span className="text-xs font-semibold text-outline block mb-2">Quick Shift</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickShift(15)}
              className="py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface transition-colors"
            >
              +15 Minutes
            </button>
            <button
              type="button"
              onClick={() => handleQuickShift(30)}
              className="py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface transition-colors"
            >
              +30 Minutes
            </button>
            <button
              type="button"
              onClick={() => handleQuickShift(60)}
              className="py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface transition-colors"
            >
              +1 Hour
            </button>
          </div>
        </div>

        {/* Start / End Time Inputs */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-outline mb-1">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-primary-container shadow-xs transition-colors"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
