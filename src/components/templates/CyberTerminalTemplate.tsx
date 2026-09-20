import React, { useState, useRef, useEffect } from 'react';
import { AvatarDisplay } from '../AvatarDisplay';
import { WARDIN_INFO, HOSTING_SERVICES, SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Terminal as TerminalIcon, Copy, Check, Send, Cpu, HardDrive, Wifi, Shield } from 'lucide-react';

interface CyberTerminalTemplateProps {
  onOpenContact: (initialMessage?: string) => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string | React.ReactNode;
}

export function CyberTerminalTemplate({ onOpenContact }: CyberTerminalTemplateProps) {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: '1',
      type: 'output',
      text: 'Wardin CyberOS v4.19.2 (x86_64-wardin-linux-gnu)',
    },
    {
      id: '2',
      type: 'output',
      text: 'Type "help" or click command chips below to inspect Wardin\'s skills, hosting nodes, and contact info.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    soundEngine.playClick();

    const newLogs: CommandLog[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `wardin@sysnode:~$ ${cmd}` },
    ];

    switch (cleanCmd) {
      case 'help':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: (
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</p>
              <p>• <span className="text-white font-bold">whoami</span> - Display developer identity and background</p>
              <p>• <span className="text-white font-bold">skills</span> - List all verified technical competencies</p>
              <p>• <span className="text-white font-bold">hostings</span> - Output active server &amp; cloud hosting offerings</p>
              <p>• <span className="text-white font-bold">neofetch</span> - Render system summary and hardware specs</p>
              <p>• <span className="text-white font-bold">contact</span> - Open Discord commission interface</p>
              <p>• <span className="text-white font-bold">clear</span> - Wipe console terminal output</p>
            </div>
          ),
        });
        break;

      case 'whoami':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: (
            <div className="space-y-1 text-cyan-200">
              <p className="text-white font-bold text-sm">USER: Wardin (itzwardin09)</p>
              <p>&ldquo;iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.&rdquo;</p>
              <p className="text-slate-400 text-xs">Roles: Hosting Architect, DDoS Protection Specialist, Minecraft Server Defense, Linux SysAdmin</p>
              <p className="text-emerald-400 text-xs">Discord: @itzwardin09 (Online &amp; Taking Commissions)</p>
            </div>
          ),
        });
        break;

      case 'skills':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: (
            <div className="space-y-2 text-xs">
              {SKILL_CATEGORIES.map((c) => (
                <div key={c.title} className="border-l-2 border-cyan-500 pl-2">
                  <span className="text-cyan-300 font-bold">{c.title}</span>
                  <div className="text-slate-400 flex flex-wrap gap-2 mt-0.5">
                    {c.skills.map((s) => (
                      <span key={s.name} className="text-slate-200 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-500/20">
                        {s.name} ({s.level}%)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'hostings':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: (
            <div className="space-y-2 text-xs">
              {HOSTING_SERVICES.map((h) => (
                <div key={h.id} className="p-2 rounded bg-blue-950/40 border border-blue-500/25">
                  <div className="text-cyan-300 font-bold">{h.title}</div>
                  <div className="text-slate-400">{h.tagline}</div>
                  <div className="text-slate-300 mt-1">Specs: {h.specs.join(' • ')}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'neofetch':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-cyan-400 space-y-0.5">
                <p>    ___   __  ______  ___  _____  _  __</p>
                <p>   / _ | / / / / __/ / _ \/ __/ |/ / / /</p>
                <p>  / __ |/ /_/ /\ \  / // / _//    / /_/ </p>
                <p> /_/ |_/____/___/  /____/___/_/|_/ (_)  </p>
              </div>
              <div className="space-y-1 text-slate-300">
                <p><span className="text-cyan-400 font-bold">OS:</span> Wardin Linux x86_64</p>
                <p><span className="text-cyan-400 font-bold">Host:</span> Supermicro H13DSH-NT Dual EPYC</p>
                <p><span className="text-cyan-400 font-bold">Kernel:</span> 6.8.0-45-pve</p>
                <p><span className="text-cyan-400 font-bold">Uptime:</span> 524 days, 18 hours, 22 mins</p>
                <p><span className="text-cyan-400 font-bold">Shell:</span> zsh 5.9 (x86_64-debian-linux-gnu)</p>
                <p><span className="text-cyan-400 font-bold">CPU:</span> AMD Ryzen 9 7950X / EPYC 9654</p>
                <p><span className="text-cyan-400 font-bold">Memory:</span> 48291MiB / 262144MiB (DDR5 ECC)</p>
              </div>
            </div>
          ),
        });
        break;

      case 'contact':
        onOpenContact('Hello Wardin! Contacting you from the terminal console.');
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: 'Opening Discord commission drawer for @wardin...',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" to see valid commands.`,
        });
        break;
    }

    setHistory(newLogs);
    setInputVal('');
  };

  const handleCopyTag = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.username);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.3 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 font-mono">
      {/* CENTER AVATAR WITH CYBERNETIC RINGS */}
      <section className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 relative">
          <AvatarDisplay
            size="large"
            showBadges={true}
            onClick={() => onOpenContact('Hello Wardin! Ready to talk business.')}
          />
        </div>

        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080e1c] border border-cyan-500/40 text-xs text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>5 YEARS EXPERIENCE &bull; HOSTING &amp; DDOS DEFENSE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            iam <span className="text-cyan-400 underline decoration-blue-500">wardin</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.
          </p>

          <p className="text-xs text-cyan-300">
            username: @{WARDIN_INFO.username}
          </p>
        </div>

        {/* Discord Fast Connect */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={handleCopyTag}
            className="px-4 py-2 rounded-xl bg-[#0a1224] hover:bg-[#0f1b36] border border-cyan-400/40 text-cyan-300 text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Tag Copied!' : `discord: @${WARDIN_INFO.username}`}</span>
          </button>

          <button
            onClick={() => onOpenContact()}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Open Ticket</span>
          </button>
        </div>
      </section>

      {/* HARDWARE METERS TELEMETRY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#080d19]/90 border border-blue-500/25 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>CPU NODE 1</span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-base font-bold text-white">12.4%</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 w-[12%]" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#080d19]/90 border border-blue-500/25 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>RAM ECC</span>
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-base font-bold text-white">32.8 GB</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[25%]" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#080d19]/90 border border-blue-500/25 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>NETWORK</span>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-white">18ms / 10G</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[100%]" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#080d19]/90 border border-blue-500/25 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>DDOS FILTER</span>
            <Shield className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white">ARMED</div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[100%]" />
          </div>
        </div>
      </div>

      {/* INTERACTIVE TERMINAL CONSOLE */}
      <div className="rounded-2xl bg-[#060914]/95 border-2 border-blue-500/30 shadow-2xl overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-[#090e1f] border-b border-blue-500/25 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 text-[11px] ml-2 font-mono flex items-center gap-1">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>wardin@sysnode:~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="hidden sm:inline">Ctrl+L to clear</span>
            <button
              onClick={() => setHistory([])}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="px-4 py-2 bg-[#080d1a] border-b border-blue-500/15 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Quick Exec:</span>
          {['help', 'whoami', 'skills', 'hostings', 'neofetch', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleRunCommand(cmd)}
              className="px-2 py-0.5 rounded bg-blue-950/70 hover:bg-blue-900 border border-blue-500/30 text-cyan-300 text-[11px] transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-2 text-xs font-mono">
          {history.map((log) => (
            <div key={log.id} className="leading-relaxed">
              {log.type === 'input' && (
                <div className="text-cyan-300 font-bold">{log.text}</div>
              )}
              {log.type === 'output' && (
                <div className="text-slate-300">{log.text}</div>
              )}
              {log.type === 'success' && (
                <div className="text-emerald-300 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                  {log.text}
                </div>
              )}
              {log.type === 'error' && (
                <div className="text-rose-400 font-medium">{log.text}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputVal.trim()) {
              handleRunCommand(inputVal);
            }
          }}
          className="px-4 py-3 bg-[#080d1c] border-t border-blue-500/25 flex items-center gap-2"
        >
          <span className="text-cyan-400 font-bold text-xs sm:text-sm">wardin@sysnode:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-white text-xs sm:text-sm font-mono focus:outline-none placeholder-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
