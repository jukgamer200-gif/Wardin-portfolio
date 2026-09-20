import { useState } from 'react';
import { WARDIN_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, Copy, Check, MessageSquare, ShieldCheck, Sparkles, Send, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export function ContactModal({ isOpen, onClose, initialMessage }: ContactModalProps) {
  const [copiedTag, setCopiedTag] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [commissionType, setCommissionType] = useState('Minecraft Network Setup');
  const [userBudget, setUserBudget] = useState('$50 - $150');
  const [customNotes, setCustomNotes] = useState(initialMessage || '');

  if (!isOpen) return null;

  const generatedDmText = `Hey Wardin! I saw your portfolio and would like to hire you for: ${commissionType}. Budget: ${userBudget}. Details: ${customNotes || 'Looking for high performance hosting & setup.'}`;

  const handleCopyTag = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.username);
    setCopiedTag(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.4 } });
    setTimeout(() => setCopiedTag(false), 2000);
  };

  const handleCopyId = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.discordId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyMsg = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(generatedDmText);
    setCopiedMsg(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    setTimeout(() => setCopiedMsg(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0a0f1e] border border-blue-500/30 p-5 sm:p-6 shadow-2xl shadow-blue-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/40">
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
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 font-mono">
                <span>CONNECT WITH WARDIN</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h2>
              <p className="text-xs text-blue-300/80">Direct Discord Contact & Commissions</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Discord Tag & ID badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
          <div className="p-3 rounded-xl bg-[#0d152a] border border-blue-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Discord Username</span>
              <span className="text-sm font-bold text-white font-mono">@{WARDIN_INFO.username}</span>
            </div>
            <button
              onClick={handleCopyTag}
              className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-cyan-300 transition-colors"
              title="Copy username"
            >
              {copiedTag ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#0d152a] border border-blue-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Discord User ID</span>
              <span className="text-xs font-mono text-slate-300 truncate max-w-[120px] block">
                {WARDIN_INFO.discordId}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-cyan-300 transition-colors"
              title="Copy numeric ID"
            >
              {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Commission / Message Generator */}
        <div className="space-y-3 p-3.5 rounded-2xl bg-[#070b16] border border-blue-500/20">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> 1-Click Discord DM Generator
            </span>
            <span className="text-[10px] text-slate-400">Ready to send</span>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Service Requested:</label>
            <select
              value={commissionType}
              onChange={(e) => setCommissionType(e.target.value)}
              className="w-full text-xs p-2 rounded-lg bg-[#0e172e] border border-blue-500/30 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Hosting & Minecraft Server DDoS Protection">Hosting &amp; Minecraft Server DDoS Protection (5 Yrs Exp)</option>
              <option value="Minecraft Network Infrastructure">Minecraft Network Infrastructure (Paper/Purpur/Velocity)</option>
              <option value="Pterodactyl Panel & Wings Setup">Pterodactyl Panel &amp; Wings Deployment</option>
              <option value="High-Throughput Discord Bot Architecture">High-Throughput Discord Bot Architecture</option>
              <option value="Linux System Hardening & Monitoring">Linux System Hardening &amp; Monitoring</option>
              <option value="General Consultation">General Consultation / Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Estimated Budget:</label>
              <select
                value={userBudget}
                onChange={(e) => setUserBudget(e.target.value)}
                className="w-full text-xs p-2 rounded-lg bg-[#0e172e] border border-blue-500/30 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="$25 - $75">$25 - $75 (Small setup)</option>
                <option value="$75 - $200">$75 - $200 (Medium network / Bot)</option>
                <option value="$200 - $500">$200 - $500 (Enterprise cluster)</option>
                <option value="Custom / Quote">Custom / Let&apos;s Discuss</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Notes / Specifications:</label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. 100 players, 16GB RAM..."
                className="w-full text-xs p-2 rounded-lg bg-[#0e172e] border border-blue-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0a0f20] border border-cyan-500/20 text-[11px] font-mono text-cyan-200 break-words">
            {generatedDmText}
          </div>

          <button
            onClick={handleCopyMsg}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25"
          >
            {copiedMsg ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Copied to Clipboard! Paste directly into Discord</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Copy Formatted DM Message</span>
              </>
            )}
          </button>
        </div>

        {/* Discord Fast-Link Footer */}
        <div className="mt-4 pt-3 border-t border-blue-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fast response time (usually &lt; 1 hour)</span>
          </div>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Open Discord</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
