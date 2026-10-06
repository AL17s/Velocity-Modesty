import React from 'react';
import { TimeBlock } from '../../types';

interface TimeBlockDetailModalProps {
  block: TimeBlock;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
  onOpenReschedule: (block: TimeBlock) => void;
  onOpenJoinMeet?: (block: TimeBlock) => void;
  onOpenFocusMode?: (block: TimeBlock) => void;
  onDeleteBlock: (id: string) => void;
}

export const TimeBlockDetailModal: React.FC<TimeBlockDetailModalProps> = ({
  block,
  onClose,
  onToggleComplete,
  onOpenReschedule,
  onOpenJoinMeet,
  onOpenFocusMode,
  onDeleteBlock
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl p-6 border border-outline-variant/30">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">
              {block.type === 'meeting'
                ? 'groups'
                : block.type === 'deep_work'
                ? 'bolt'
                : block.type === 'client'
                ? 'handshake'
                : 'schedule'}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-outline">
              {block.type.replace('_', ' ')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <h2 className="text-xl font-bold text-on-surface mb-2">{block.title}</h2>

        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="px-2.5 py-1 bg-surface-container rounded-full text-on-surface-variant font-medium">
            {block.startTime} - {block.endTime}
          </span>
          {block.durationText && (
            <span className="px-2 py-1 bg-surface-container-low text-outline rounded-md font-mono">
              {block.durationText}
            </span>
          )}
          {block.priority && (
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                block.priority === 'high'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {block.priority.toUpperCase()} PRIORITY
            </span>
          )}
          {block.completed && (
            <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary font-semibold text-[11px]">
              COMPLETED
            </span>
          )}
        </div>

        {block.description && (
          <div className="bg-surface-container-low rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {block.description}
          </div>
        )}

        {block.attendees && block.attendees.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-outline block mb-2">Attendees</span>
            <div className="flex flex-wrap gap-1.5">
              {block.attendees.map((person, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low text-xs text-on-surface flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {person}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(block.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-outline-variant/50 hover:bg-surface-container text-on-surface transition-colors"
            >
              {block.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              onClick={() => {
                onDeleteBlock(block.id);
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-error hover:bg-error-container/20 transition-colors"
            >
              Delete
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenReschedule(block);
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors"
            >
              Reschedule
            </button>

            {block.type === 'deep_work' && onOpenFocusMode && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFocusMode(block);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-tertiary text-white text-xs font-semibold hover:bg-tertiary-container shadow-xs transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Focus Session
              </button>
            )}

            {(block.type === 'meeting' || block.type === 'client') && onOpenJoinMeet && (
              <button
                onClick={() => {
                  onClose();
                  onOpenJoinMeet(block);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-xs transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">video_call</span>
                Join Meet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
