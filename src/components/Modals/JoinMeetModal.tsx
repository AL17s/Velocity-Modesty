import React, { useState, useEffect, useRef } from 'react';
import { TimeBlock } from '../../types';

interface JoinMeetModalProps {
  block: TimeBlock;
  onClose: () => void;
}

export const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ block, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'people' | 'agenda'>('agenda');
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'David Chen', text: 'Hey Alex! Ready when you are.', time: '09:01 AM' },
    { sender: 'Sarah Connor', text: 'Added the sprint blockers to slide 3.', time: '09:02 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Request actual camera stream if user approves, otherwise show high-fidelity avatar placeholder
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (videoOn) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setWebcamActive(true);
          }
        })
        .catch(() => {
          setWebcamActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoOn]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Alex Vance (You)',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  const attendees = block.attendees || [
    'Alex Vance (You)',
    'David Chen (Lead Architect)',
    'Sarah Connor (Frontend)',
    'Elena Rostova (DevOps)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-4xl h-[90vh] max-h-[720px] shadow-2xl flex flex-col overflow-hidden border border-outline-variant/30">
        {/* Top Header */}
        <div className="px-6 py-3.5 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px] text-primary">video_call</span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface">{block.title}</h2>
              <p className="text-xs text-outline">{block.startTime} - {block.endTime} · Google Meet</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-error/15 text-error">
              <span className="w-2 h-2 rounded-full bg-error animate-ping" />
              Recording Active
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-950">
          {/* Video Grid (8 cols) */}
          <div className="md:col-span-8 p-4 flex flex-col justify-between relative bg-slate-900/60">
            {/* Attendees Video Tiles */}
            <div className="grid grid-cols-2 gap-3 flex-1 mb-4">
              {/* Tile 1: Alex (You) */}
              <div className="relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700/50">
                {videoOn && webcamActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-primary ring-2 ring-primary">
                      <img
                        src="/src/assets/images/avatar_alex_user_1791245005341.jpg"
                        alt="Alex"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">Alex Vance (Camera Off)</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[11px] text-white flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-[14px] ${micOn ? 'text-secondary' : 'text-error'}`}>
                    {micOn ? 'mic' : 'mic_off'}
                  </span>
                  <span>You</span>
                </div>
              </div>

              {/* Tile 2: David Chen */}
              <div className="relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700/50">
                <div className="flex flex-col items-center gap-2 text-center p-3">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-emerald-500/70">
                    DC
                  </div>
                  <span className="text-xs text-slate-300 font-medium">David Chen</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[11px] text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-400">mic</span>
                  <span>David</span>
                </div>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  Speaking
                </div>
              </div>

              {/* Tile 3: Sarah Connor */}
              <div className="relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700/50">
                <div className="flex flex-col items-center gap-2 text-center p-3">
                  <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    SC
                  </div>
                  <span className="text-xs text-slate-300 font-medium">Sarah Connor</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[11px] text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">mic_off</span>
                  <span>Sarah</span>
                </div>
              </div>

              {/* Tile 4: Elena Rostova */}
              <div className="relative rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700/50">
                <div className="flex flex-col items-center gap-2 text-center p-3">
                  <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-lg">
                    ER
                  </div>
                  <span className="text-xs text-slate-300 font-medium">Elena Rostova</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[11px] text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">mic_off</span>
                  <span>Elena</span>
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center justify-center gap-3 py-2 bg-slate-950/80 rounded-xl px-4 backdrop-blur-md">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-full transition-all ${
                  micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                <span className="material-symbols-outlined text-[20px]">{micOn ? 'mic' : 'mic_off'}</span>
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-full transition-all ${
                  videoOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                title={videoOn ? 'Turn off camera' : 'Turn on camera'}
              >
                <span className="material-symbols-outlined text-[20px]">{videoOn ? 'videocam' : 'videocam_off'}</span>
              </button>

              <button
                className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-all"
                title="Present Screen"
                onClick={() => alert('Screen share simulated: presentation active.')}
              >
                <span className="material-symbols-outlined text-[20px]">present_to_all</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">call_end</span>
                Leave Meeting
              </button>
            </div>
          </div>

          {/* Right Sidebar: Tabs for Agenda, Chat, People (4 cols) */}
          <div className="md:col-span-4 bg-surface-container-lowest flex flex-col border-l border-outline-variant/30 h-full">
            <div className="flex border-b border-outline-variant/20 bg-surface-container-low">
              <button
                onClick={() => setActiveTab('agenda')}
                className={`flex-1 py-3 text-xs font-semibold text-center transition-all ${
                  activeTab === 'agenda' ? 'text-primary border-b-2 border-primary bg-surface-container-lowest' : 'text-outline hover:text-on-surface'
                }`}
              >
                Agenda
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold text-center transition-all relative ${
                  activeTab === 'chat' ? 'text-primary border-b-2 border-primary bg-surface-container-lowest' : 'text-outline hover:text-on-surface'
                }`}
              >
                Chat
                <span className="ml-1 px-1.5 py-0.2 bg-primary text-white rounded-full text-[10px]">
                  {chatMessages.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('people')}
                className={`flex-1 py-3 text-xs font-semibold text-center transition-all ${
                  activeTab === 'people' ? 'text-primary border-b-2 border-primary bg-surface-container-lowest' : 'text-outline hover:text-on-surface'
                }`}
              >
                People ({attendees.length})
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'agenda' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-outline mb-1">Topic & Goals</h3>
                    <p className="text-sm text-on-surface font-medium">{block.description}</p>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                    <h4 className="text-xs font-bold text-on-surface mb-2">Sprint Agenda Checklist</h4>
                    <ul className="text-xs space-y-2 text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="text-secondary font-bold">✓</span> Standup updates & blockers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-secondary font-bold">✓</span> Auth service migration timeline review
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary font-bold">→</span> Q4 Roadmap extension milestones
                      </li>
                      <li className="flex items-center gap-2 text-outline">
                        <span>○</span> Action items & wrap-up
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className="bg-surface-container-low p-2.5 rounded-xl text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-primary">{msg.sender}</span>
                          <span className="text-[10px] text-outline">{msg.time}</span>
                        </div>
                        <p className="text-on-surface">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Send a message..."
                      className="flex-1 px-3 py-2 text-xs bg-surface-container-low rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'people' && (
                <div className="space-y-2">
                  {attendees.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                          {person[0]}
                        </div>
                        <span className="text-xs font-medium text-on-surface">{person}</span>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        {index === 1 ? 'mic' : 'mic_off'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
