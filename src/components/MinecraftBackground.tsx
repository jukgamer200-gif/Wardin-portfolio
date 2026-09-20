import { useEffect, useRef } from 'react';
import { BackgroundStyle } from '../types';

interface MinecraftBackgroundProps {
  style: BackgroundStyle;
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'cube' | 'orb' | 'ember';
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function MinecraftBackground({ style }: MinecraftBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize floating Minecraft particles
    const particleCount = 45;
    const particles: Particle[] = [];

    const colors = {
      'minecraft-gif': ['#38bdf8', '#60a5fa', '#3b82f6', '#0ea5e9', '#22d3ee', '#1e40af'],
      'minecraft-rain-gif': ['#60a5fa', '#93c5fd', '#38bdf8', '#0284c7'],
      'shader-night': ['#38bdf8', '#60a5fa', '#3b82f6', '#818cf8', '#22d3ee'],
      'sculk-sanctum': ['#06b6d4', '#0284c7', '#0891b2', '#0e7490', '#67e8f9'],
      'floating-blocks': ['#60a5fa', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8'],
    }[style] || ['#38bdf8', '#3b82f6', '#60a5fa'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 3,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        type: Math.random() > 0.4 ? 'cube' : Math.random() > 0.5 ? 'orb' : 'ember',
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    const render = () => {
      // Smooth mouse parallax lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset if floated above screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const drawX = p.x + mouseRef.current.x * 0.4;
        const drawY = p.y + mouseRef.current.y * 0.4;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'cube') {
          // Minecraft voxel block outline & fill
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

          // Top bevel highlight (Minecraft block 3D look)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.25);
          // Right shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.fillRect(p.size / 2 - p.size * 0.25, -p.size / 2, p.size * 0.25, p.size);
        } else if (p.type === 'orb') {
          // XP orb glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soul fire ember
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size * 0.7, p.size * 1.3);
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [style]);

  // Resolve background asset (GIF animation prioritized for default)
  const getBgAsset = () => {
    switch (style) {
      case 'minecraft-gif':
        return '/assets/mc_campfire_night.gif';
      case 'minecraft-rain-gif':
        return '/assets/mc_rain_night.gif';
      case 'sculk-sanctum':
        return '/assets/mc_sculk.jpg';
      case 'shader-night':
      default:
        return '/assets/mc_campfire_night.gif';
    }
  };

  const bgAsset = getBgAsset();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Minecraft GIF Animation Background with subtle zoom and smooth loop */}
      <div
        className="absolute -inset-8 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url(${bgAsset})`,
          filter: 'brightness(0.32) contrast(1.22) saturate(1.25)',
        }}
      />

      {/* Premium Black-Blue Mixture Shade Gradients */}
      {/* Deep Obsidian Black Base */}
      <div className="absolute inset-0 bg-[#030712]/75 mix-blend-multiply" />
      {/* Rich Midnight Navy & Sapphire Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#051129]/80 to-[#02050f]/95" />
      {/* Electric Neon Cyan & Royal Blue Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_-15%,rgba(14,165,233,0.22),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.30),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_15%_50%,rgba(6,182,212,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_50%,rgba(37,99,235,0.14),transparent_70%)]" />

      {/* Floating Minecraft Voxel & EXP particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle scanline / vignette texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(2,6,23,0.35)_51%)] bg-[length:100%_4px] opacity-25" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(2,6,23,0.95)]" />
    </div>
  );
}
