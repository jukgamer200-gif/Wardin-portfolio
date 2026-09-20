import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../utils/audio';
import { Sparkles, Shield, Server, Terminal } from 'lucide-react';

interface AvatarDisplayProps {
  size?: 'normal' | 'large' | 'compact';
  showBadges?: boolean;
  className?: string;
  onClick?: () => void;
}

export function AvatarDisplay({
  size = 'normal',
  showBadges = true,
  className = '',
  onClick,
}: AvatarDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 18, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playClick();
  };

  const sizeClasses = {
    compact: 'w-24 h-24 sm:w-28 sm:h-28',
    normal: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52',
    large: 'w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64',
  }[size];

  return (
    <div
      id="wardin-avatar-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundEngine.playLevelUp();
        onClick?.();
      }}
      className={`relative flex items-center justify-center cursor-pointer select-none group perspective-1000 ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Outer ambient radiant aura */}
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-blue-600/30 via-cyan-400/25 to-indigo-600/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />

      {/* Rotating outer holographic ring 1 */}
      <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-cyan-500/40 animate-spin-slow pointer-events-none" />

      {/* Rotating outer holographic ring 2 (reverse) */}
      <div className="absolute -inset-6 sm:-inset-7 rounded-full border border-dotted border-blue-400/30 animate-reverse-spin pointer-events-none" />

      {/* 3D Tilting Card Wrapper */}
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`relative ${sizeClasses} rounded-3xl p-1 bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 shadow-2xl shadow-blue-500/30 transition-shadow duration-500 group-hover:shadow-cyan-400/50`}
      >
        {/* Inner container with avatar image */}
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0a0f1d] border-2 border-[#1e293b]/80">
          <img
            id="wardin-avatar-image"
            src="/assets/wardin_avatar.jpg"
            alt="Wardin Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback if path changes
              (e.target as HTMLImageElement).src = '/assets/wardin_avatar_1789875446913.jpg';
            }}
          />

          {/* Glossy reflection highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity" />

          {/* Floating sparkle overlays */}
          <div className="absolute top-2 right-2 text-cyan-300 animate-pulse">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
        </div>

        {/* Discord Live Status Indicator (Online) */}
        <div
          id="discord-online-badge"
          className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 flex items-center gap-1.5 px-2.5 py-1 bg-[#090e18] border border-emerald-500/50 rounded-full shadow-lg shadow-black/60"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold text-emerald-300 tracking-wide">ONLINE</span>
        </div>

        {/* Discord Tag badge pill */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#090d1a]/95 border border-blue-500/40 rounded-full shadow-md text-[10px] font-mono font-medium text-cyan-300 tracking-wider whitespace-nowrap">
          @wardin • DEV
        </div>
      </motion.div>

      {/* Floating Mini Role Badges around avatar */}
      {showBadges && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:flex absolute -left-12 top-1/4 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b1222]/90 border border-blue-500/30 text-[11px] text-blue-200 shadow-xl backdrop-blur-md"
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hostings Pro</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden sm:flex absolute -right-12 bottom-1/3 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b1222]/90 border border-cyan-500/30 text-[11px] text-cyan-200 shadow-xl backdrop-blur-md"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Anti-DDoS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex absolute -bottom-5 left-4 items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#0a0f1d]/90 border border-indigo-500/30 text-[10px] font-mono text-indigo-200 shadow-lg backdrop-blur-md"
          >
            <Terminal className="w-3 h-3 text-indigo-400" />
            <span>sysadmin</span>
          </motion.div>
        </>
      )}
    </div>
  );
}
