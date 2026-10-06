import React, { useState, useEffect, useRef } from 'react';
import { TimeBlock } from '../../types';

interface FocusModeModalProps {
  block: TimeBlock;
  onClose: () => void;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({ block, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes default focus
  const [isRunning, setIsRunning] = useState(true);
  const [soundMode, setSoundMode] = useState<'off' | 'rain' | 'whitenoise'>('rain');
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Outline token cache invalidation flow', done: true },
    { id: '2', text: 'Draft authentication service migration spec', done: false },
    { id: '3', text: 'Verify read-replica load distribution diagram', done: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  // Ambient sound synthesis using Web Audio API
  useEffect(() => {
    if (soundMode === 'off') {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      if (soundMode === 'whitenoise') {
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      } else if (soundMode === 'rain') {
        // Pink / filtered noise resembling gentle rain
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.997 * b0 + white * 0.05;
          b1 = 0.985 * b1 + white * 0.11;
          b2 = 0.950 * b2 + white * 0.25;
          data[i] = (b0 + b1 + b2) * 0.12;
        }
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = 0.08; // subtle volume

      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start(0);
      noiseNodeRef.current = noise;
    } catch {
      // Audio autoplay restrictions or unsupported
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [soundMode]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskInput.trim(), done: false }]);
    setNewTaskInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center relative border border-outline-variant/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container text-tertiary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>Deep Work Focus Block</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-on-surface text-center mb-1">
          {block.title}
        </h2>
        <p className="text-xs sm:text-sm text-outline text-center mb-6 max-w-md">
          Notifications muted · Distractions shielded
        </p>

        {/* Big Countdown Timer */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-surface-container-low flex flex-col items-center justify-center border-4 border-tertiary/20 shadow-inner mb-6">
          <span className="text-5xl sm:text-6xl font-extrabold text-on-surface tracking-tight font-mono tabular-nums">
            {timeFormatted}
          </span>
          <span className="text-xs font-semibold text-tertiary mt-2">
            {isRunning ? 'FOCUSING' : 'PAUSED'}
          </span>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                : 'bg-primary text-white hover:bg-primary-container shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            {isRunning ? 'Pause' : 'Resume'}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(25 * 60);
            }}
            className="p-2.5 rounded-xl bg-surface-container text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Reset Timer (25 min)"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>

          <button
            onClick={() => setSecondsLeft(50 * 60)}
            className="px-3 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
            title="Set to 50 min"
          >
            50m Block
          </button>
        </div>

        {/* Ambient Sound Mode Selector */}
        <div className="w-full bg-surface-container-low p-3 rounded-2xl mb-6 border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary">headphones</span>
            <span className="text-xs font-semibold text-on-surface">Ambient Generator</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSoundMode('off')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                soundMode === 'off'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Mute
            </button>
            <button
              onClick={() => setSoundMode('rain')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                soundMode === 'rain'
                  ? 'bg-surface-container-lowest text-tertiary shadow-xs font-bold'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Rain Sound
            </button>
            <button
              onClick={() => setSoundMode('whitenoise')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                soundMode === 'whitenoise'
                  ? 'bg-surface-container-lowest text-tertiary shadow-xs font-bold'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              White Noise
            </button>
          </div>
        </div>

        {/* Sub-tasks checklist */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-outline">
              Focus Checkpoints
            </span>
            <span className="text-xs text-secondary font-semibold">
              {tasks.filter((t) => t.done).length}/{tasks.length} Done
            </span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer transition-colors ${
                  task.done
                    ? 'bg-surface-container-low/50 text-outline line-through'
                    : 'bg-surface-container-low text-on-surface font-medium hover:bg-surface-container'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  readOnly
                  className="rounded text-primary accent-primary"
                />
                <span>{task.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddTask} className="mt-2 flex gap-2">
            <input
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="Add next micro-milestone..."
              className="flex-1 px-3 py-1.5 text-xs bg-surface-container-low rounded-lg border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
