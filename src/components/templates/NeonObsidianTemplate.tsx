import { useState } from 'react';
import { motion } from 'motion/react';
import { AvatarDisplay } from '../AvatarDisplay';
import { InteractiveHostCalc } from '../InteractiveHostCalc';
import { WARDIN_INFO, HOSTING_SERVICES, PROJECTS_SHOWCASE, SKILL_CATEGORIES, CLIENT_REVIEWS } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Server,
  ShieldCheck,
  Bot,
  Zap,
  Star,
  Layers,
  ArrowUpRight,
  Sparkles,
  Activity,
  ChevronRight,
} from 'lucide-react';

interface NeonObsidianTemplateProps {
  onOpenContact: (initialMessage?: string) => void;
}

export function NeonObsidianTemplate({ onOpenContact }: NeonObsidianTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'hosting' | 'bots' | 'web'>('all');

  const handleCopyTag = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.discordTag);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#38bdf8', '#3b82f6', '#06b6d4', '#60a5fa'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* HERO SECTION: Avatar in Center with Requested Text */}
      <section className="flex flex-col items-center justify-center text-center pt-2 sm:pt-6">
        {/* CENTER AVATAR */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <AvatarDisplay
            size="large"
            showBadges={true}
            onClick={() => {
              onOpenContact('Hello Wardin! Looking to discuss a project with you.');
            }}
          />
        </motion.div>

        {/* User Exact Requested Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070e20]/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>5 YEARS EXPERIENCE • HOSTING &amp; DDOS MITIGATION</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-intro-title"
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans drop-shadow-md"
          >
            iam <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">wardin</span>
          </h1>

          {/* Subtitle with exact requested intent */}
          <div className="space-y-3">
            <p
              id="hero-intro-bio"
              className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-cyan-300/90">
              <span className="text-slate-400">username:</span>
              <span className="px-2 py-0.5 rounded-lg bg-blue-950/70 border border-blue-500/30 text-cyan-300 font-bold">
                @{WARDIN_INFO.username}
              </span>
            </div>
          </div>

          {/* Discord CTA Card */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleCopyTag}
              id="hero-copy-discord-btn"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#081024] hover:bg-[#0c1836] border border-cyan-500/40 hover:border-cyan-400 text-white font-mono text-sm transition-all shadow-xl shadow-blue-950/40 active:scale-95 group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Username Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
                  <span>Discord: <strong className="text-cyan-300 font-bold">@{WARDIN_INFO.username}</strong></span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundEngine.playLevelUp();
                onOpenContact();
              }}
              id="hero-dm-wardin-btn"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/30 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Contact Wardin</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Core Pillars: Hosting, DDoS Protection, Minecraft Server DDoS Protection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-12 text-left">
          {WARDIN_INFO.corePillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="p-5 rounded-3xl bg-[#060b18]/85 border border-blue-500/25 hover:border-cyan-400/40 transition-all shadow-xl backdrop-blur-md relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-400 font-bold">{pillar.years}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{pillar.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIVE NODE TELEMETRY & SPECS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Live Infrastructure Telemetry</span>
            </h2>
            <p className="text-xs text-slate-400">Real-time status of nodes managed and maintained by Wardin</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL (99.99%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#080d1a]/85 border border-blue-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-300 font-semibold">Node 01: EU-Frankfurt</span>
              <span className="text-emerald-400 font-mono">19ms</span>
            </div>
            <div className="text-white font-mono text-sm font-bold">AMD Ryzen 9 7950X (16c/32t)</div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>CPU Load</span>
                <span className="text-cyan-400">14.2%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full w-[14%]" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Memory Allocation</span>
                <span className="text-blue-400">38.4 / 128 GB DDR5</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[30%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d1a]/85 border border-blue-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-300 font-semibold">Node 02: US-East (Virginia)</span>
              <span className="text-emerald-400 font-mono">24ms</span>
            </div>
            <div className="text-white font-mono text-sm font-bold">AMD EPYC 9654 Milan-X</div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>CPU Load</span>
                <span className="text-cyan-400">22.8%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full w-[23%]" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Memory Allocation</span>
                <span className="text-blue-400">72.1 / 256 GB DDR5</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[28%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d1a]/85 border border-blue-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-300 font-semibold">Anti-DDoS Scrubbing Layer</span>
              <span className="text-emerald-400 font-mono">Path.net &amp; Corero</span>
            </div>
            <div className="text-white font-mono text-sm font-bold">3.2 Tbps Ingress Protection</div>
            <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200">
              ✓ Layer 4/7 UDP Amplification Filtering
              <br />✓ Custom Bungee/Velocity Handshake Shield
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SERVER CALCULATOR */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Interactive Server Architecture Estimator</span>
          </h2>
          <p className="text-xs text-slate-400">Configure your target network and get Wardin&apos;s engineered specifications.</p>
        </div>
        <InteractiveHostCalc onSelectConfig={(cfg) => onOpenContact(cfg)} />
      </section>

      {/* HOSTING SERVICES OFFERED */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            <span>What Wardin Builds &amp; Manages</span>
          </h2>
          <p className="text-xs text-slate-400">Premium hosting solutions, server setups, and automated bots</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOSTING_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-5 rounded-2xl bg-[#090e1c]/90 border border-blue-500/25 hover:border-cyan-400/50 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              {srv.popular && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  MOST POPULAR
                </div>
              )}
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{srv.tagline}</p>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {srv.specs.map((spec, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  soundEngine.playLevelUp();
                  onOpenContact(`Hi Wardin, I would like to get a quote for: ${srv.title}`);
                }}
                className="mt-4 pt-3 border-t border-blue-500/15 flex items-center justify-between text-xs text-cyan-400 font-medium group-hover:text-cyan-300"
              >
                <span>Request this service on Discord</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS ACCORDION / BENTO GRID */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Technical Mastery &amp; Stack</span>
          </h2>
          <p className="text-xs text-slate-400">Years of hands-on deployment across hosting, networks, and automation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="p-5 rounded-2xl bg-[#080d19]/90 border border-blue-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="text-cyan-400">◆</span>
                  <span>{cat.title}</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">{cat.description}</p>
              <div className="space-y-2.5">
                {cat.skills.map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        {s.name}
                        {s.tag && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                            {s.tag}
                          </span>
                        )}
                      </span>
                      <span className="text-cyan-400 font-mono text-[11px]">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>Proven Deliverables &amp; Deployments</span>
            </h2>
            <p className="text-xs text-slate-400">Networks, panels, and bot systems designed by Wardin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS_SHOWCASE.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-[#090f20]/80 border border-blue-500/25 hover:border-cyan-400/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">{proj.metrics}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{proj.title}</h3>
                  <p className="text-xs text-slate-400 font-mono text-blue-300/80 mt-0.5">{proj.role}</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-[#0c1426] text-slate-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playLevelUp();
                  onOpenContact(`Hi Wardin, I'm interested in building something similar to ${proj.title}`);
                }}
                className="mt-4 pt-3 border-t border-blue-500/15 flex items-center justify-between text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>Inquire about this architecture</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOSTING & DDOS DEFENSE GUARANTEE (Replacing review section as requested) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#060a17]/90 border border-blue-500/25 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>5 YEARS PROVEN INFRASTRUCTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Dedicated To Zero-Downtime Game Server Performance
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            With 5 years of hands-on experience defending and hosting high-traffic Minecraft networks and VPS instances, every server is hardened against sophisticated Layer 4 and Layer 7 attacks, bot exploits, and crash vulnerabilities.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-cyan-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              L4 / L7 Flood Shield
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Velocity / Bungee Bot Filters
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              24/7 Monitored Infrastructure
            </span>
          </div>
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/70 via-[#091126] to-cyan-950/70 border border-cyan-500/30 text-center space-y-4 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to scale your server infrastructure?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Add <strong className="text-cyan-300 font-mono">@{WARDIN_INFO.username}</strong> on Discord today for high performance hosting &amp; Minecraft DDoS protection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopyTag}
            className="px-5 py-2.5 rounded-xl bg-[#090f20] hover:bg-[#0e1732] border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>Copy @{WARDIN_INFO.username}</span>
          </button>
          <button
            onClick={() => onOpenContact()}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30"
          >
            Open Commission Form
          </button>
        </div>
      </section>
    </div>
  );
}
