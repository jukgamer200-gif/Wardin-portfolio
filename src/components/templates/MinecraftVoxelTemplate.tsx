import { useState } from 'react';
import { motion } from 'motion/react';
import { AvatarDisplay } from '../AvatarDisplay';
import { WARDIN_INFO } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sword,
  Pickaxe,
  Zap,
  Shield,
  BookOpen,
  Compass,
  Sparkles,
  Server,
  Activity,
  Heart,
  Copy,
  Check,
  Send,
} from 'lucide-react';

interface MinecraftVoxelTemplateProps {
  onOpenContact: (initialMessage?: string) => void;
}

interface HotbarItem {
  id: number;
  name: string;
  category: string;
  icon: typeof Sword;
  enchantments: string[];
  lore: string;
  color: string;
}

export function MinecraftVoxelTemplate({ onOpenContact }: MinecraftVoxelTemplateProps) {
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [copied, setCopied] = useState(false);
  const [serverPingState, setServerPingState] = useState({ online: true, players: '342/500', tps: '20.00', ping: '18ms' });

  const hotbarItems: HotbarItem[] = [
    {
      id: 1,
      name: 'Netherite Blade of Uptime',
      category: 'Server Infrastructure',
      icon: Sword,
      enchantments: ['High-TPS V', 'Zero-Crash III', 'Firewall IV'],
      lore: 'Forged to eliminate server lag and slice through memory leaks.',
      color: 'text-purple-400',
    },
    {
      id: 2,
      name: 'Diamond Pickaxe of Optimization',
      category: 'Performance Tuning',
      icon: Pickaxe,
      enchantments: ['Efficiency V', 'Spark Timings III', 'Fortune III'],
      lore: 'Mines out heavy entities, chunk bottlenecks and runaway tick loops.',
      color: 'text-cyan-400',
    },
    {
      id: 3,
      name: 'Redstone Proxy Repeater',
      category: 'Network Architecture',
      icon: Zap,
      enchantments: ['Velocity Sync II', 'Redis Cross-Talk', 'Anti-Bot I'],
      lore: 'Connects multiple game servers seamlessly under a unified proxy address.',
      color: 'text-rose-400',
    },
    {
      id: 4,
      name: 'Aegis Shield of Anti-DDoS',
      category: 'Cyber Defense',
      icon: Shield,
      enchantments: ['3.2 Tbps Filter', 'SYN Flood Proof', 'BGP Routing'],
      lore: 'Deflects Layer 4 and Layer 7 malicious packet storms automatically.',
      color: 'text-amber-400',
    },
    {
      id: 5,
      name: 'Shield of Minecraft DDoS Protection',
      category: 'Game DDoS Defense',
      icon: Shield,
      enchantments: ['5 Years Battle-Tested', 'Multi-Tbps Ingress', 'BGP Anycast Shield'],
      lore: 'Deflects Layer 4 and Layer 7 packet floods with zero latency added to Minecraft players.',
      color: 'text-emerald-400',
    },
    {
      id: 6,
      name: 'Discord Wayfinder Compass',
      category: 'Contact',
      icon: Compass,
      enchantments: ['Quick DM I', 'Instant Response', '@itzwardin09'],
      lore: 'Directly points towards Wardin (@itzwardin09) on Discord for hosting & DDoS protection.',
      color: 'text-blue-400',
    },
  ];

  const handleCopyTag = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.username);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#38bdf8', '#a855f7', '#3b82f6', '#10b981'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const activeItem = hotbarItems[selectedSlot];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* MINECRAFT HUD HEADER */}
      <section className="flex flex-col items-center justify-center text-center">
        {/* Enchanted Diamond Frame around Central Avatar */}
        <div className="relative mb-6">
          {/* Minecraft Enchantment Glyphs Floating */}
          <div className="absolute -top-6 -left-6 text-cyan-400 text-xs font-pixel animate-bounce">
            ᔑ ʖ ᓵ
          </div>
          <div className="absolute -bottom-4 -right-6 text-purple-400 text-xs font-pixel animate-bounce delay-300">
            ᒷ ⎓ ⊣
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-[#0a1224] rounded-3xl border-4 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.45)]"
          >
            <AvatarDisplay
              size="large"
              showBadges={false}
              onClick={() => {
                soundEngine.playLevelUp();
                onOpenContact('Hey Wardin! Saw your Minecraft dev template and want to hire you.');
              }}
            />
          </motion.div>
        </div>

        {/* Text with user's exact requested phrase */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#09101f] border-2 border-cyan-500/50 rounded-lg text-xs font-pixel text-cyan-300 shadow-md">
            <span>[ 5 YEARS EXPERIENCE IN HOSTING &amp; DDOS DEFENSE ]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide font-pixel drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            iam <span className="text-cyan-400">wardin</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-pixel leading-relaxed">
            iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.
          </p>

          <p className="text-xs font-pixel text-cyan-300">
            USERNAME: @{WARDIN_INFO.username}
          </p>

          {/* Minecraft Status Bars (Hearts, Armor & Level Bar) */}
          <div className="pt-2 flex flex-col items-center gap-2 max-w-sm mx-auto">
            {/* Hearts and Armor row */}
            <div className="flex items-center justify-between w-full px-2">
              {/* Hearts */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Heart key={i} className="w-3.5 h-3.5 text-rose-500 fill-rose-500 drop-shadow-sm" />
                ))}
              </div>
              {/* Armor */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Shield key={i} className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 drop-shadow-sm" />
                ))}
              </div>
            </div>

            {/* EXP Bar with Level Badge */}
            <div className="relative w-full">
              <div className="h-2.5 bg-[#080d19] border border-emerald-600/60 rounded-sm overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-lime-500 via-emerald-400 to-green-300 w-full animate-pulse" />
              </div>
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-pixel font-bold text-lime-400 drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                99
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <button
            onClick={handleCopyTag}
            className="px-4 py-2.5 rounded-xl bg-[#091124] hover:bg-[#0f1d3d] border-2 border-cyan-400 text-white font-pixel text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'TAG COPIED!' : `DISCORD: @${WARDIN_INFO.username}`}</span>
          </button>

          <button
            onClick={() => onOpenContact('Hello Wardin! Need a high-performance Minecraft server / host.')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-pixel text-xs font-bold shadow-lg shadow-cyan-400/30 active:scale-95 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>COMMISSION SERVER</span>
          </button>
        </div>
      </section>

      {/* MINECRAFT INTERACTIVE HOTBAR */}
      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-sm font-pixel text-slate-300 tracking-wider">
            [ SELECT AN INVENTORY ITEM TO INSPECT CAPABILITIES ]
          </h2>
        </div>

        {/* Hotbar Slots */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 p-2 rounded-2xl bg-[#080d19]/90 border-2 border-[#1e293b] shadow-2xl max-w-xl mx-auto overflow-x-auto">
          {hotbarItems.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedSlot === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playMinecraftVoxel();
                  setSelectedSlot(idx);
                }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#152342] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                    : 'bg-[#0b1324] border border-slate-700/60 hover:bg-[#101c36]'
                }`}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color}`} />
                <span className="absolute bottom-1 right-1.5 text-[9px] font-pixel text-slate-400">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Classic Minecraft Enchanted Item Tooltip display */}
        {activeItem && (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto p-4 rounded-xl bg-[#0b0c1e]/95 border-2 border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.3)] space-y-2 font-pixel text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 font-bold text-sm tracking-wide">{activeItem.name}</span>
              <span className="text-[10px] text-purple-400 uppercase">Item #{selectedSlot + 1}</span>
            </div>

            <div className="text-purple-300 text-xs space-y-0.5">
              {activeItem.enchantments.map((ench, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-purple-400">✦</span>
                  <span>{ench}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-300 text-xs italic pt-1 border-t border-purple-500/30">
              {activeItem.lore}
            </p>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-sans">Slot: {activeItem.category}</span>
              <button
                onClick={() => onOpenContact(`Inquiry regarding: ${activeItem.name}`)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-sans"
              >
                Discuss This Setup →
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* LIVE MINECRAFT NODE PING MONITOR */}
      <section className="p-5 sm:p-6 rounded-3xl bg-[#080e1e]/90 border-2 border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-pixel text-white text-sm">MC.WARDIN.NET // DEDICATED CLUSTER</h3>
              <p className="text-xs text-slate-400 font-sans">Simulated live heartbeat from Wardin&apos;s primary game node</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-pixel text-emerald-400">ONLINE (20.00 TPS)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-[#0d172e] border border-blue-500/20">
            <span className="text-[10px] text-slate-400 font-pixel block">SERVER TPS</span>
            <span className="text-base sm:text-lg font-pixel text-emerald-400 font-bold">{serverPingState.tps}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0d172e] border border-blue-500/20">
            <span className="text-[10px] text-slate-400 font-pixel block">PLAYERS ONLINE</span>
            <span className="text-base sm:text-lg font-pixel text-cyan-300 font-bold">{serverPingState.players}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0d172e] border border-blue-500/20">
            <span className="text-[10px] text-slate-400 font-pixel block">PING TO CLIENT</span>
            <span className="text-base sm:text-lg font-pixel text-lime-400 font-bold">{serverPingState.ping}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0d172e] border border-blue-500/20">
            <span className="text-[10px] text-slate-400 font-pixel block">ENGINE SOFTWARE</span>
            <span className="text-xs sm:text-sm font-pixel text-purple-300 font-bold">PURPUR 1.21</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#060a14] border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="truncate">aikars-flags -XX:+UseG1GC -Xms32G -Xmx32G -XX:G1ReservePercent=20</span>
          </div>
          <span className="text-emerald-400 text-[10px] shrink-0 font-pixel">OPTIMIZED</span>
        </div>
      </section>
    </div>
  );
}
