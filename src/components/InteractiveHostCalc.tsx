import { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Cpu, HardDrive, Zap, Server } from 'lucide-react';

export function InteractiveHostCalc({ onSelectConfig }: { onSelectConfig?: (config: string) => void }) {
  const [ram, setRam] = useState(16);
  const [players, setPlayers] = useState(80);
  const [serverType, setServerType] = useState<'paper' | 'velocity' | 'modded'>('paper');

  const cpuRecommendation = ram >= 32 ? 'AMD Ryzen 9 7950X3D (Dedicated 4 Cores)' : ram >= 16 ? 'AMD Ryzen 9 7950X (2 Dedicated Cores)' : 'AMD Ryzen 7 7700X (Shared High-Clock)';
  const tpsGuarantee = '20.0 TPS Guaranteed';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#090e1b]/90 border border-blue-500/25 shadow-xl">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white text-sm sm:text-base">Interactive Node Architect</h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Wardin Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">Server Software:</span>
              <span className="text-cyan-400 font-mono capitalize">{serverType}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['paper', 'velocity', 'modded'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    soundEngine.playClick();
                    setServerType(t);
                  }}
                  className={`py-1.5 text-xs rounded-lg font-medium transition-all ${
                    serverType === t
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-cyan-400/40'
                      : 'bg-[#0e1628] text-slate-400 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  {t === 'paper' ? 'Paper/Purpur' : t === 'velocity' ? 'Velocity Proxy' : 'Modded/Forge'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" /> Allocated RAM:
              </span>
              <span className="text-cyan-300 font-mono font-bold text-sm">{ram} GB DDR5</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={ram}
              onChange={(e) => {
                setRam(Number(e.target.value));
                soundEngine.playMinecraftVoxel();
              }}
              className="w-full h-2 bg-[#0d1527] rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>4 GB</span>
              <span>16 GB</span>
              <span>32 GB</span>
              <span>64 GB</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">Target Concurrent Players:</span>
              <span className="text-cyan-300 font-mono font-bold text-sm">{players} Players</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="20"
              value={players}
              onChange={(e) => {
                setPlayers(Number(e.target.value));
              }}
              className="w-full h-2 bg-[#0d1527] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Calculated architecture output */}
        <div className="p-3.5 rounded-xl bg-[#060a14] border border-cyan-500/20 flex flex-col justify-between">
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono text-cyan-400 tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3" /> WARDIN OPTIMIZATION SPECS
            </span>

            <div className="text-xs space-y-1.5">
              <div className="flex items-start gap-2 text-slate-300">
                <Cpu className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Processor Allocation:</strong>
                  <span className="text-slate-400 text-[11px]">{cpuRecommendation}</span>
                </span>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <HardDrive className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Storage & Flags:</strong>
                  <span className="text-slate-400 text-[11px]">PCIe 4.0 NVMe SSD (4,800MB/s) + Aikar&apos;s Tuned GC</span>
                </span>
              </div>

              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center justify-between">
                <span>Performance Rating:</span>
                <span className="font-bold">{tpsGuarantee}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playLevelUp();
              onSelectConfig?.(
                `Hi Wardin, I need a hosting setup with ${ram}GB DDR5 for ${players} players running ${serverType}.`
              );
            }}
            className="mt-3 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5"
          >
            <span>Request This Setup on Discord</span>
          </button>
        </div>
      </div>
    </div>
  );
}
