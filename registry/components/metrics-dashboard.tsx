import * as React from "react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/registry/components/glass-card"
import { Cpu, Flame, Database, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Metric 1 */}
      <GlassCard glow hoverGlow>
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-zinc-300">Token Throughput</GlassCardTitle>
          <Cpu className="h-4 w-4 text-violet-400" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="text-2xl font-bold text-white">45,182</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+12.2% from last hour</span>
          </div>
          {/* Sparkline chart SVG */}
          <div className="h-10 w-full mt-4">
            <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-tokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 35 Q15 20, 30 28 T60 12 T90 5 L100 2 L100 40 L0 40 Z"
                fill="url(#gradient-tokens)"
              />
              <path
                d="M0 35 Q15 20, 30 28 T60 12 T90 5 L100 2"
                fill="none"
                stroke="rgb(139, 92, 246)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Metric 2 */}
      <GlassCard glow hoverGlow>
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-zinc-300">GPU Temp</GlassCardTitle>
          <Flame className="h-4 w-4 text-rose-400" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="text-2xl font-bold text-white">68°C</div>
          <div className="flex items-center gap-1 text-xs text-rose-400 mt-1">
            <ArrowDownRight className="h-3.5 w-3.5" />
            <span>-2.4% cooldown active</span>
          </div>
          {/* Sparkline chart SVG */}
          <div className="h-10 w-full mt-4">
            <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(244, 63, 94)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(244, 63, 94)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 5 Q15 15, 30 10 T60 25 T90 32 L100 35 L100 40 L0 40 Z"
                fill="url(#gradient-temp)"
              />
              <path
                d="M0 5 Q15 15, 30 10 T60 25 T90 32 L100 35"
                fill="none"
                stroke="rgb(244, 63, 94)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Metric 3 */}
      <GlassCard glow hoverGlow>
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-zinc-300">Database Hits</GlassCardTitle>
          <Database className="h-4 w-4 text-sky-400" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="text-2xl font-bold text-white">99.98%</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+0.05% Cache optimization</span>
          </div>
          {/* Sparkline chart SVG */}
          <div className="h-10 w-full mt-4">
            <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-cache" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(14, 165, 233)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 25 Q15 10, 30 15 T60 5 T90 2 L100 1 L100 40 L0 40 Z"
                fill="url(#gradient-cache)"
              />
              <path
                d="M0 25 Q15 10, 30 15 T60 5 T90 2 L100 1"
                fill="none"
                stroke="rgb(14, 165, 233)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
