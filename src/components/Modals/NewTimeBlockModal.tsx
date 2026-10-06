import React, { useState } from 'react';
import { TimeBlock, TimeBlockType, Priority } from '../../types';

interface NewTimeBlockModalProps {
  onClose: () => void;
  onAddBlock: (block: TimeBlock) => void;
}

export const NewTimeBlockModal: React.FC<NewTimeBlockModalProps> = ({ onClose, onAddBlock }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('11:00 AM');
  const [endTime, setEndTime] = useState('12:00 PM');
  const [type, setType] = useState<TimeBlockType>('deep_work');
  const [priority, setPriority] = useState<Priority>('high');
  const [description, setDescription] = useState('');
  const [hasMeetingLink, setHasMeetingLink] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/vel-');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newBlock: TimeBlock = {
      id: 'tb-' + Date.now(),
      title: title.trim(),
      startTime,
      endTime,
      type,
      priority,
      description: description.trim() || undefined,
      hasMeetingLink: hasMeetingLink || type === 'meeting' || type === 'client',
      meetingUrl: hasMeetingLink || type === 'meeting' || type === 'client' ? meetingUrl : undefined,
      completed: false
    };

    onAddBlock(newBlock);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 border border-outline-variant/30">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_alarm</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Schedule New Time Block</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-outline mb-1.5">Block Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sprint Backlog Refinement, Product Strategy..."
              required
              className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder:text-outline/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="11:00 AM"
                required
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="12:00 PM"
                required
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TimeBlockType)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="deep_work">Deep Work / Focus</option>
                <option value="meeting">Team Meeting</option>
                <option value="client">Client Consultation</option>
                <option value="routine">Routine / Admin</option>
                <option value="break">Break / Lunch</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="high">High Priority</option>
                <option value="med">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline mb-1.5">Description / Objectives</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What must be accomplished during this block?"
              className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/60 resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasMeeting"
              checked={hasMeetingLink}
              onChange={(e) => setHasMeetingLink(e.target.checked)}
              className="w-4 h-4 rounded text-primary accent-primary"
            />
            <label htmlFor="hasMeeting" className="text-xs text-on-surface cursor-pointer select-none">
              Include Google Meet video call link
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-outline hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold bg-primary hover:bg-primary-container text-white rounded-xl shadow-xs transition-all"
            >
              Add to Timeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
