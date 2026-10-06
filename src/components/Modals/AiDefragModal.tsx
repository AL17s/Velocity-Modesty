import React, { useState } from 'react';
import { TimeBlock } from '../../types';

interface AiDefragModalProps {
  timeBlocks: TimeBlock[];
  onClose: () => void;
  onApplyDefrag: () => void;
}

export const AiDefragModal: React.FC<AiDefragModalProps> = ({
  onClose,
  onApplyDefrag
}) => {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    onApplyDefrag();
    setApplied(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 border border-outline-variant/30 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* AI Header badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            AI Schedule Defragmenter & Focus Shield
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">
          Schedule Optimization Proposal
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
          Analyzed your circadian rhythm and calendar fragmentation. Velocity detected 2 micro-gaps that would cause context switching fatigue.
        </p>

        {/* Changes summary box */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-on-surface">Protected 2h Continuous Flow Block</p>
              <p className="text-xs text-outline mt-0.5">
                Shifted admin follow-ups to 04:00 PM to give your Architecture Design session 120 minutes of undisturbed focus.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">
              electric_bolt
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-on-surface">Circadian Rhythm Alignment</p>
              <p className="text-xs text-outline mt-0.5">
                Anchored deep analytical work during your natural cortisol/alertness peak (10:00 AM – 12:30 PM).
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
              timelapse
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-on-surface">Saved 45 min Fragmented Overhead</p>
              <p className="text-xs text-outline mt-0.5">
                Eliminated 15-minute awkward interstitial dead zones before meetings.
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/20">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-outline hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
          >
            Keep As Is
          </button>
          <button
            onClick={handleApply}
            disabled={applied}
            className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-75"
          >
            {applied ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done</span>
                Schedule Optimized!
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Apply Focus Shield
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
