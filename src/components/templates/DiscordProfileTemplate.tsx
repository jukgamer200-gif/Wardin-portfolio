import { useState } from 'react';
import { WARDIN_INFO, SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Sparkles,
  Shield,
  Bot,
  Play,
  Pause,
  Send,
  UserPlus,
  Flame,
} from 'lucide-react';

interface DiscordProfileTemplateProps {
  onOpenContact: (initialMessage?: string) => void;
}

export function DiscordProfileTemplate({ onOpenContact }: DiscordProfileTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [friendRequested, setFriendRequested] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'vouches'>('about');

  const handleCopyTag = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.discordTag);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.3 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendFriendRequest = () => {
    soundEngine.playLevelUp();
    setFriendRequested(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.4 } });
  };

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* AUTHENTIC DISCORD USER MODAL REPLICA */}
      <div className="relative rounded-3xl bg-[#111214] border border-[#232428] shadow-2xl overflow-hidden">
        {/* BANNER: Animated Minecraft Night Sky */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#070b16]">
          <img
            src="/assets/mc_night.jpg"
            alt="Minecraft Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-black/30" />

          {/* Badges in Top Right of Banner */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0b0c0e]/80 backdrop-blur-md border border-white/10">
            {/* Active Dev Badge */}
            <div title="Active Developer" className="p-1 rounded bg-blue-500/20 text-cyan-300">
              <Bot className="w-4 h-4" />
            </div>
            {/* HypeSquad Bravery Badge */}
            <div title="HypeSquad Bravery" className="p-1 rounded bg-purple-500/20 text-purple-300">
              <Shield className="w-4 h-4" />
            </div>
            {/* Nitro Booster */}
            <div title="Server Booster" className="p-1 rounded bg-pink-500/20 text-pink-300">
              <Flame className="w-4 h-4" />
            </div>
            {/* Verified Pro */}
            <div title="Verified Infrastructure Architect" className="p-1 rounded bg-emerald-500/20 text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* PROFILE HEADER CONTENT */}
        <div className="px-5 sm:px-8 pb-6 relative">
          {/* AVATAR PLACED PROMINENTLY */}
          <div className="relative -mt-20 sm:-mt-24 mb-4 flex items-end justify-between flex-wrap gap-4">
            <div className="relative group">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-[#111214] ring-4 ring-[#1e1f22]">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-xl">
                  <img
                    src={WARDIN_INFO.avatarUrl}
                    alt="Wardin"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = WARDIN_INFO.avatarFallback;
                    }}
                  />
                </div>
                {/* Discord Status Indicator */}
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#111214] flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-[#111214]" />
                </div>
              </div>
            </div>

            {/* Quick Actions (Add Friend & Send DM) */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleSendFriendRequest}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  friendRequested
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-[#2b2d31] hover:bg-[#35373c] text-white border border-white/5'
                }`}
              >
                {friendRequested ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Request Sent</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Add Friend</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenContact()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* NAME & USERNAME */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{WARDIN_INFO.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-mono">
                BOT ARCHITECT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTag}
                className="text-xs text-slate-400 font-mono hover:text-white flex items-center gap-1.5 transition-colors"
                title="Click to copy username"
              >
                <span>@{WARDIN_INFO.discordTag}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">he/him</span>
            </div>

            {/* Custom Status */}
            <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">Status:</span>
              <span>{WARDIN_INFO.customStatus}</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-[#232428] my-4" />

          {/* TAB BAR */}
          <div className="flex items-center gap-4 text-xs font-semibold border-b border-[#232428] mb-4">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('about');
              }}
              className={`pb-2 transition-colors ${
                activeTab === 'about'
                  ? 'text-white border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              About Me &amp; Description
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('activity');
              }}
              className={`pb-2 transition-colors ${
                activeTab === 'activity'
                  ? 'text-white border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Infrastructure Activity
            </button>
          </div>

          {/* TAB 1: ABOUT ME & DESCRIPTION */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">DESCRIPTION</h3>
                <div className="p-4 rounded-2xl bg-[#1e1f22] text-sm text-slate-200 leading-relaxed font-sans border border-[#2b2d31] space-y-2">
                  <p className="font-bold text-white text-base">
                    &ldquo;iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.&rdquo;
                  </p>
                  <p className="text-xs text-cyan-300 font-mono">
                    Discord Username: <strong className="text-white">@{WARDIN_INFO.username}</strong>
                  </p>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">CORE SPECIALIZATIONS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {WARDIN_INFO.corePillars.map((p) => (
                    <div key={p.title} className="p-3 rounded-xl bg-[#18191c] border border-[#2e3035] space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                        <span>{p.years}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-cyan-300 rounded border border-blue-500/30">{p.tag}</span>
                      </div>
                      <div className="font-bold text-xs text-white">{p.title}</div>
                      <p className="text-[11px] text-slate-300 leading-tight">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles Section */}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">VERIFIED ROLES</h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '5 Yrs Experience', color: 'bg-blue-500/20 text-cyan-300 border-blue-500/40' },
                    { label: 'Hosting Architect', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
                    { label: 'Minecraft DDoS Defense', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
                    { label: 'Layer 4/7 Mitigation', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
                    { label: 'Discord Systems Specialist', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
                  ].map((role) => (
                    <span
                      key={role.label}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${role.color}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current opacity-80" />
                      <span>{role.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RICH PRESENCE */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">PLAYING A GAME</h3>
              <div className="p-4 rounded-2xl bg-[#1e1f22] border border-[#2b2d31] flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-cyan-400/40">
                  <img
                    src="/assets/mc_night.jpg"
                    alt="Game Icon"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 p-0.5 rounded bg-emerald-500 text-black">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 text-xs">
                  <div className="font-bold text-white text-sm">Minecraft 1.21 Server Engine</div>
                  <div className="text-slate-300">Cluster Node: EU-Frankfurt (64GB DDR5)</div>
                  <div className="text-slate-400 font-mono text-[11px]">Elapsed: 04:32:18 • 20.0 TPS Constant</div>

                  {/* Progress / Wave Bar */}
                  <div className="pt-2">
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 w-3/4 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Spotify Listening Activity */}
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider pt-2">LISTENING TO SPOTIFY</h3>
              <div className="p-4 rounded-2xl bg-[#1e1f22] border border-[#2b2d31] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Midnight Coding Beats (Lofi Mix)</div>
                    <div className="text-xs text-slate-400">Wardin • High Focus Session</div>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                >
                  {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
