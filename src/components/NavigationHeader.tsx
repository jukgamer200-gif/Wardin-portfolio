import { useState } from 'react';
import { PortfolioTemplate, BackgroundStyle } from '../types';
import { WARDIN_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Palette,
  Boxes,
  Terminal,
  MessageSquare,
  Flame,
} from 'lucide-react';

interface NavigationHeaderProps {
  currentTemplate: PortfolioTemplate;
  onSelectTemplate: (template: PortfolioTemplate) => void;
  backgroundStyle: BackgroundStyle;
  onSelectBackground: (style: BackgroundStyle) => void;
  onOpenContact: () => void;
}

export function NavigationHeader({
  currentTemplate,
  onSelectTemplate,
  backgroundStyle,
  onSelectBackground,
  onOpenContact,
}: NavigationHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [showBgMenu, setShowBgMenu] = useState(false);

  const handleCopyDiscord = () => {
    soundEngine.playCopied();
    navigator.clipboard.writeText(WARDIN_INFO.discordTag);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#38bdf8', '#3b82f6', '#06b6d4', '#818cf8', '#ffffff'],
    });

    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    soundEngine.enabled = next;
    setSoundActive(next);
    if (next) soundEngine.playClick();
  };

  const templates: { id: PortfolioTemplate; label: string; icon: typeof Sparkles }[] = [
    { id: 'neon-obsidian', label: 'Neon Obsidian', icon: Sparkles },
    { id: 'minecraft-voxel', label: 'Minecraft Voxel', icon: Boxes },
    { id: 'cyber-terminal', label: 'Cyber Terminal', icon: Terminal },
    { id: 'discord-profile', label: 'Discord Native', icon: MessageSquare },
  ];

  const backgrounds: { id: BackgroundStyle; label: string; desc: string }[] = [
    { id: 'minecraft-gif', label: 'Minecraft Campfire GIF', desc: 'Looping shader night campfire animation' },
    { id: 'minecraft-rain-gif', label: 'Minecraft Rain Night GIF', desc: 'Atmospheric nocturnal rain animation' },
    { id: 'shader-night', label: 'Night Shader Glow', desc: 'BSL night sky with blue mixture' },
    { id: 'sculk-sanctum', label: 'Sculk Sanctuary', desc: 'Bioluminescent deep sculk ruins' },
    { id: 'floating-blocks', label: 'Voxel Particles', desc: 'Floating dynamic cubes & XP orbs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#090d19]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-black/70">
        {/* Left: Brand / Avatar status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 shadow-sm shadow-cyan-500/20">
              <img
                src="/assets/wardin_avatar.jpg"
                alt="Wardin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/wardin_avatar_1789875446913.jpg';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0a0f1d]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white font-mono">WARDIN</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/20 text-cyan-300 font-mono border border-blue-500/30">
                  DEV
                </span>
              </div>
              <p className="text-[11px] text-blue-300/70 font-mono">Hostings & Systems</p>
            </div>
          </div>

          {/* Quick Actions Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleCopyDiscord}
              id="mobile-copy-discord-btn"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs text-blue-200 font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : `@${WARDIN_INFO.discordTag}`}</span>
            </button>
          </div>
        </div>

        {/* Center: Template Switcher (Highlighted request: "show me some template so I can decide which is better") */}
        <div className="w-full md:w-auto flex items-center justify-center p-1 rounded-xl bg-[#060a14]/90 border border-blue-500/20 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const isActive = currentTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  id={`template-btn-${tpl.id}`}
                  onClick={() => {
                    soundEngine.playMinecraftVoxel();
                    onSelectTemplate(tpl.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-blue-950/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{tpl.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Background picker, Audio toggle, Discord copy button & Contact */}
        <div className="hidden md:flex items-center gap-2">
          {/* Background Selector */}
          <div className="relative">
            <button
              id="bg-selector-btn"
              onClick={() => {
                soundEngine.playClick();
                setShowBgMenu(!showBgMenu);
              }}
              title="Change Minecraft Background"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0a1020] border border-blue-500/25 hover:border-cyan-400/50 text-xs text-blue-200 hover:text-white transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">MC Theme</span>
            </button>

            {showBgMenu && (
              <div
                id="bg-selector-menu"
                className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-[#090e1c] border border-blue-500/30 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="text-[11px] font-mono text-slate-400 px-2.5 py-1 border-b border-blue-500/20 mb-1 flex items-center justify-between">
                  <span>MINECRAFT ATMOSPHERE</span>
                  <Flame className="w-3 h-3 text-cyan-400" />
                </div>
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      soundEngine.playMinecraftVoxel();
                      onSelectBackground(bg.id);
                      setShowBgMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                      backgroundStyle === bg.id
                        ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="font-semibold">{bg.label}</span>
                    <span className="text-[10px] text-slate-400">{bg.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={handleToggleSound}
            title={soundActive ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            className="p-2 rounded-xl bg-[#0a1020] border border-blue-500/25 hover:border-cyan-400/50 text-blue-300 hover:text-white transition-colors"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Copy Discord Button */}
          <button
            id="desktop-copy-discord-btn"
            onClick={handleCopyDiscord}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-700/50 to-indigo-700/50 hover:from-blue-600 hover:to-cyan-600 border border-blue-400/30 text-xs font-mono font-medium text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-cyan-300" />}
            <span>{copied ? 'Tag Copied!' : `@${WARDIN_INFO.discordTag}`}</span>
          </button>

          {/* Contact / Hire button */}
          <button
            id="header-hire-btn"
            onClick={() => {
              soundEngine.playLevelUp();
              onOpenContact();
            }}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-cyan-500/25"
          >
            DM Wardin
          </button>
        </div>
      </div>
    </header>
  );
}
