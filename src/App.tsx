import { useState } from 'react';
import { PortfolioTemplate, BackgroundStyle } from './types';
import { MinecraftBackground } from './components/MinecraftBackground';
import { NavigationHeader } from './components/NavigationHeader';
import { NeonObsidianTemplate } from './components/templates/NeonObsidianTemplate';
import { MinecraftVoxelTemplate } from './components/templates/MinecraftVoxelTemplate';
import { CyberTerminalTemplate } from './components/templates/CyberTerminalTemplate';
import { DiscordProfileTemplate } from './components/templates/DiscordProfileTemplate';
import { ContactModal } from './components/ContactModal';
import { WARDIN_INFO } from './data/portfolioData';
import { soundEngine } from './utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Boxes, Terminal, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentTemplate, setCurrentTemplate] = useState<PortfolioTemplate>('neon-obsidian');
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>('shader-night');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState('');

  const handleOpenContact = (initialMsg?: string) => {
    setContactInitialMessage(initialMsg || '');
    setIsContactOpen(true);
  };

  const templateOptions: { id: PortfolioTemplate; label: string; desc: string; icon: typeof Sparkles }[] = [
    {
      id: 'neon-obsidian',
      label: 'Neon Obsidian',
      desc: 'Center Stage • Premium Dark & Blue Mixture',
      icon: Sparkles,
    },
    {
      id: 'minecraft-voxel',
      label: 'Minecraft Voxel',
      desc: 'Pixel HUD • Interactive Hotbar & Node Ping',
      icon: Boxes,
    },
    {
      id: 'cyber-terminal',
      label: 'Cyber Terminal',
      desc: 'Sysadmin Console • Interactive Commands',
      icon: Terminal,
    },
    {
      id: 'discord-profile',
      label: 'Discord Native',
      desc: 'Real Discord Client Profile • Rich Presence',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 relative flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* ANIMATED MINECRAFT BACKGROUND */}
      <MinecraftBackground style={backgroundStyle} />

      {/* TOP NAVIGATION / CONTROL BAR */}
      <NavigationHeader
        currentTemplate={currentTemplate}
        onSelectTemplate={(tpl) => setCurrentTemplate(tpl)}
        backgroundStyle={backgroundStyle}
        onSelectBackground={(bg) => setBackgroundStyle(bg)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* FLOATING TEMPLATE DECISION SELECTOR BAR (Addressing user: "show me some template so I can decide which is better") */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-4 pt-3 pb-1">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#080d1a]/85 backdrop-blur-xl border border-blue-500/25 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-cyan-300 font-semibold uppercase tracking-wider text-[11px]">
              TEMPLATES PICKER:
            </span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Switch layouts instantly to compare which fits best
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {templateOptions.map((t) => {
              const Icon = t.icon;
              const isSelected = currentTemplate === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundEngine.playMinecraftVoxel();
                    setCurrentTemplate(t.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-[#0d1527] text-slate-300 hover:text-white hover:bg-[#121e38] border border-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN TEMPLATE VIEWPORT WITH ANIMATION */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentTemplate === 'neon-obsidian' && (
            <motion.div
              key="neon-obsidian"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <NeonObsidianTemplate onOpenContact={handleOpenContact} />
            </motion.div>
          )}

          {currentTemplate === 'minecraft-voxel' && (
            <motion.div
              key="minecraft-voxel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <MinecraftVoxelTemplate onOpenContact={handleOpenContact} />
            </motion.div>
          )}

          {currentTemplate === 'cyber-terminal' && (
            <motion.div
              key="cyber-terminal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CyberTerminalTemplate onOpenContact={handleOpenContact} />
            </motion.div>
          )}

          {currentTemplate === 'discord-profile' && (
            <motion.div
              key="discord-profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <DiscordProfileTemplate onOpenContact={handleOpenContact} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 mt-auto py-8 border-t border-blue-500/15 bg-[#05070d]/90 backdrop-blur-lg text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-white font-bold">WARDIN.DEV</span>
            <span className="text-slate-500">•</span>
            <span>Discord Portfolio &amp; Hosting Architecture</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Discord: <strong className="text-cyan-300">@{WARDIN_INFO.discordTag}</strong></span>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => {
                soundEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* CONTACT & COMMISSION DRAWER MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMessage={contactInitialMessage}
      />
    </div>
  );
}
