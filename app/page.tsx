"use client"

import * as React from "react"
import { Button } from "@/registry/components/glass-button"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/registry/components/glass-card"
import { StatusIndicator } from "@/registry/components/status-indicator"
import { TerminalConsole } from "@/registry/components/terminal-console"
import { AgentChat } from "@/registry/components/agent-chat"
import { MetricsDashboard } from "@/registry/components/metrics-dashboard"
import { SettingsPanel } from "@/registry/components/settings-panel"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Cpu,
  Sparkles,
  BookOpen,
  Layers,
  Code,
  Laptop,
} from "lucide-react"

export default function StarkdesignHome() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  
  // Interactive Button State
  const [btnVariant, setBtnVariant] = React.useState<"glass" | "glow" | "gradient" | "outline" | "ghost" | "default">("glass")
  const [btnSize, setBtnSize] = React.useState<"sm" | "default" | "lg">("default")
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [btnText, setBtnText] = React.useState("Click Action")

  // Interactive Card State
  const [cardGlow, setCardGlow] = React.useState(true)
  const [cardHoverGlow, setCardHoverGlow] = React.useState(true)

  // Interactive Status State
  const [statusVal, setStatusVal] = React.useState<"idle" | "active" | "streaming" | "loading" | "error">("active")
  const [statusPulse, setStatusPulse] = React.useState(true)
  const [statusLabel, setStatusLabel] = React.useState("AI Agent Online")

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const registryBaseUrl = "https://starkdesign.site/r"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/60 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }} href="/">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "2rem", height: "2rem", color: "var(--foreground)" }}>
              <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor"></rect>
              <rect x="4" y="10" width="10" height="4" rx="1" fill="currentColor"></rect>
              <rect x="10" y="16" width="10" height="4" rx="1" fill="currentColor"></rect>
            </svg>
            <span className="mobile-hidden" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>Starkdesign</span>
          </a>

          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-400">
            <a href="#components" className="hover:text-white transition-colors">Components</a>
            <a href="#schema" className="hover:text-white transition-colors flex items-center gap-1">
              Explorer
              <ExternalLink className="h-3 w-3" />
            </a>
            <ModeToggle />
            <Button
              variant="glass"
              size="sm"
              onClick={() => copyToClipboard("npx shadcn@latest add https://starkdesign.site/r/registry.json", "cli-top")}
            >
              {copiedId === "cli-top" ? (
                <>
                  <Check className="mr-2 h-3 w-3 text-emerald-400" />
                  Copied URL
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-3 w-3" />
                  Copy Registry
                </>
              )}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>High-Fidelity Shadcn Registry System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gradient max-w-3xl mx-auto leading-tight mb-6">
            State-of-the-Art UI Elements for Modern Applications
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
            Beautifully designed, fully accessible components focusing on glassmorphism, animated neon glows, and real-time state monitors. Integrate directly via your favorite CLI.
          </p>

          <div className="max-w-xl mx-auto mb-16">
            <div className="relative rounded-lg bg-zinc-900/90 border border-white/10 p-4 font-mono text-xs flex items-center justify-between shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2 overflow-x-auto text-zinc-300 pr-4 select-all whitespace-nowrap scrollbar-none">
                <span className="text-violet-400 select-none">$</span>
                <span>npx shadcn@latest add {registryBaseUrl}/glass-button.json</span>
              </div>
              <button
                onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/glass-button.json`, "cli-main")}
                className="flex-shrink-0 p-2 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white"
                title="Copy install command"
              >
                {copiedId === "cli-main" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <main id="components" className="py-12 border-t border-white/10 bg-zinc-950/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-violet-400" />
              Interactive Component Sandbox
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Select variants and inspect components in real time. Direct source files are compiled in the static registry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Component 1: Glass Button */}
            <GlassCard className="flex flex-col h-full">
              <GlassCardHeader>
                <div className="flex items-center justify-between">
                  <GlassCardTitle>Glass Button</GlassCardTitle>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    registry:ui
                  </span>
                </div>
                <GlassCardDescription>
                  Polymorphic button featuring backdrop-blur filter variants, animated neon glows, and gradient fades.
                </GlassCardDescription>
              </GlassCardHeader>

              <GlassCardContent className="flex-1 flex flex-col gap-6 justify-between">
                {/* Preview Frame */}
                <div className="h-48 w-full rounded-lg border border-white/5 bg-zinc-950/60 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial opacity-30 pointer-events-none" />
                  <Button variant={btnVariant} size={btnSize} disabled={btnDisabled}>
                    {btnText}
                  </Button>
                </div>

                {/* Interactive Controls */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-400 font-semibold">Variant</label>
                    <select
                      value={btnVariant}
                      onChange={(e) => setBtnVariant(e.target.value as any)}
                      className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-zinc-300 outline-none focus:border-violet-500"
                    >
                      <option value="glass">Glass</option>
                      <option value="glow">Glow</option>
                      <option value="gradient">Gradient</option>
                      <option value="default">Default</option>
                      <option value="outline">Outline</option>
                      <option value="ghost">Ghost</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-400 font-semibold">Size</label>
                    <select
                      value={btnSize}
                      onChange={(e) => setBtnSize(e.target.value as any)}
                      className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-zinc-300 outline-none focus:border-violet-500"
                    >
                      <option value="default">Default</option>
                      <option value="sm">Small</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-400 font-semibold">Label Text</label>
                    <input
                      type="text"
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-zinc-300 outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="btn-disabled"
                      checked={btnDisabled}
                      onChange={(e) => setBtnDisabled(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-800 text-violet-500 focus:ring-violet-500 h-4 w-4"
                    />
                    <label htmlFor="btn-disabled" className="text-zinc-400 font-semibold cursor-pointer select-none">
                      Disabled
                    </label>
                  </div>
                </div>
              </GlassCardContent>

              <GlassCardFooter className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">npx shadcn add {registryBaseUrl}/glass-button.json</span>
                <button
                  onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/glass-button.json`, "cli-btn")}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                >
                  {copiedId === "cli-btn" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </GlassCardFooter>
            </GlassCard>

            {/* Component 2: Status Indicator */}
            <GlassCard className="flex flex-col h-full">
              <GlassCardHeader>
                <div className="flex items-center justify-between">
                  <GlassCardTitle>Status Indicator</GlassCardTitle>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    registry:ui
                  </span>
                </div>
                <GlassCardDescription>
                  Pulsing state monitor badge. Dynamic styling classes representing idle, active, streaming, or error states.
                </GlassCardDescription>
              </GlassCardHeader>

              <GlassCardContent className="flex-1 flex flex-col gap-6 justify-between">
                {/* Preview Frame */}
                <div className="h-48 w-full rounded-lg border border-white/5 bg-zinc-950/60 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial opacity-30 pointer-events-none" />
                  <StatusIndicator status={statusVal} label={statusLabel} pulse={statusPulse} />
                </div>

                {/* Interactive Controls */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-400 font-semibold">Status State</label>
                    <select
                      value={statusVal}
                      onChange={(e) => setStatusVal(e.target.value as any)}
                      className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-zinc-300 outline-none focus:border-violet-500"
                    >
                      <option value="idle">Idle</option>
                      <option value="active">Active</option>
                      <option value="streaming">Streaming</option>
                      <option value="loading">Loading</option>
                      <option value="error">Error</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-400 font-semibold">Custom Label</label>
                    <input
                      type="text"
                      value={statusLabel}
                      onChange={(e) => setStatusLabel(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded p-1.5 text-zinc-300 outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5 col-span-2">
                    <input
                      type="checkbox"
                      id="status-pulse"
                      checked={statusPulse}
                      onChange={(e) => setStatusPulse(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-800 text-violet-500 focus:ring-violet-500 h-4 w-4"
                    />
                    <label htmlFor="status-pulse" className="text-zinc-400 font-semibold cursor-pointer select-none">
                      Pulse Dot Ping Animation
                    </label>
                  </div>
                </div>
              </GlassCardContent>

              <GlassCardFooter className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">npx shadcn add {registryBaseUrl}/status-indicator.json</span>
                <button
                  onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/status-indicator.json`, "cli-status")}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                >
                  {copiedId === "cli-status" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </GlassCardFooter>
            </GlassCard>

            {/* Component 3: Glass Card Showcase */}
            <div className="col-span-1 lg:col-span-2">
              <GlassCard className="flex flex-col">
                <GlassCardHeader>
                  <div className="flex items-center justify-between">
                    <GlassCardTitle>Glass Card Container</GlassCardTitle>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      registry:ui
                    </span>
                  </div>
                  <GlassCardDescription>
                    Translucent container layout with custom glow overlays. Useful for agent workspaces or control panels.
                  </GlassCardDescription>
                </GlassCardHeader>

                <GlassCardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column Controls */}
                  <div className="flex flex-col gap-4 text-xs md:col-span-1 border-r border-white/5 pr-6">
                    <h4 className="text-zinc-300 font-bold mb-2">Card Configuration</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="card-glow"
                        checked={cardGlow}
                        onChange={(e) => setCardGlow(e.target.checked)}
                        className="rounded bg-zinc-900 border-zinc-800 text-violet-500 focus:ring-violet-500 h-4 w-4"
                      />
                      <label htmlFor="card-glow" className="text-zinc-400 font-semibold cursor-pointer select-none">
                        Show Base Neon Border Glow
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="card-hover-glow"
                        checked={cardHoverGlow}
                        onChange={(e) => setCardHoverGlow(e.target.checked)}
                        className="rounded bg-zinc-900 border-zinc-800 text-violet-500 focus:ring-violet-500 h-4 w-4"
                      />
                      <label htmlFor="card-hover-glow" className="text-zinc-400 font-semibold cursor-pointer select-none">
                        Interactive Hover Spotlight Glow
                      </label>
                    </div>
                  </div>

                  {/* Right Preview Frame */}
                  <div className="md:col-span-2 flex items-center justify-center p-8 bg-zinc-950/60 rounded-lg border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial opacity-30 pointer-events-none" />
                    <GlassCard glow={cardGlow} hoverGlow={cardHoverGlow} className="w-full max-w-md">
                      <GlassCardHeader>
                        <div className="flex items-center justify-between">
                          <GlassCardTitle className="text-base">Agent Assistant</GlassCardTitle>
                          <StatusIndicator status="active" label="Online" />
                        </div>
                      </GlassCardHeader>
                      <GlassCardContent className="space-y-4">
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          This is a demo card showcasing compound components layered inside glassmorphism wrappers. Try hovering over the card.
                        </p>
                        <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/5 rounded p-2.5 text-xs text-zinc-300 font-mono">
                          <Terminal className="h-3.5 w-3.5 text-violet-400" />
                          <span>Status: Monitoring streams...</span>
                        </div>
                      </GlassCardContent>
                      <GlassCardFooter className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Dismiss</Button>
                        <Button variant="glass" size="sm">Initialize Workspace</Button>
                      </GlassCardFooter>
                    </GlassCard>
                  </div>
                </GlassCardContent>

                <GlassCardFooter className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">npx shadcn add {registryBaseUrl}/glass-card.json</span>
                  <button
                    onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/glass-card.json`, "cli-card")}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                  >
                    {copiedId === "cli-card" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </GlassCardFooter>
              </GlassCard>
            </div>
          </div>

          {/* Section 2: Application Blocks */}
          <div className="mb-12 mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-violet-400" />
              Interactive UI Blocks Showcase
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Complex layout blocks designed for analytics, conversation, log inspection, and configuration settings.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            {/* Block 1: Agent Chat Workspace */}
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Agent Chat Workspace</h3>
                    <span className="text-[10px] font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded">
                      registry:block
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Complete chat interface block featuring collapsible thought traces and simulated tool status nodes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500">npx shadcn add {registryBaseUrl}/agent-chat.json</span>
                  <button
                    onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/agent-chat.json`, "cli-blk-chat")}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                  >
                    {copiedId === "cli-blk-chat" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="max-w-3xl mx-auto w-full">
                <AgentChat />
              </div>
            </GlassCard>

            {/* Block 2: Terminal Console & Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Terminal Console Block */}
              <div className="lg:col-span-2">
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">Terminal Console</h3>
                          <span className="text-[10px] font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded">
                            registry:block
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Simulated system execution logger and state visualizer.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/terminal-console.json`, "cli-blk-term")}
                          className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                        >
                          {copiedId === "cli-blk-term" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                    <TerminalConsole />
                  </div>
                </GlassCard>
              </div>

              {/* Metrics Grid Dashboard */}
              <div className="lg:col-span-1">
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">Metrics Dashboard</h3>
                          <span className="text-[10px] font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded">
                            registry:block
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Key performance indicator cards with custom mini-sparkline charts.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/metrics-dashboard.json`, "cli-blk-metrics")}
                          className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                        >
                          {copiedId === "cli-blk-metrics" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <MetricsDashboard />
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Block 3: Security & Keys Panel */}
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Security Settings Console</h3>
                    <span className="text-[10px] font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded">
                      registry:block
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Sidebar dashboard layout hosting secure authorization preferences, toggle controls, and mask key selectors.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500">npx shadcn add {registryBaseUrl}/settings-panel.json</span>
                  <button
                    onClick={() => copyToClipboard(`npx shadcn@latest add ${registryBaseUrl}/settings-panel.json`, "cli-blk-settings")}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1"
                  >
                    {copiedId === "cli-blk-settings" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="max-w-4xl mx-auto w-full">
                <SettingsPanel />
              </div>
            </GlassCard>
          </div>

          {/* Registry JSON Explorer */}
          <section id="schema" className="pt-12 pb-16 border-t border-white/10">
            <h3 className="text-xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
              <Code className="h-5 w-5 text-violet-400" />
              Registry Host Explorer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "glass-button.json", type: "registry:ui", path: "/r/glass-button.json", desc: "Glassmorphic buttons with glowing hover effects." },
                { name: "glass-card.json", type: "registry:ui", path: "/r/glass-card.json", desc: "Premium compound card component panels." },
                { name: "status-indicator.json", type: "registry:ui", path: "/r/status-indicator.json", desc: "Dynamic system state badges." },
                { name: "terminal-console.json", type: "registry:block", path: "/r/terminal-console.json", desc: "Developer command simulation trace logger block." },
                { name: "agent-chat.json", type: "registry:block", path: "/r/agent-chat.json", desc: "Agent chat dialog panel utilizing buttons and indicators." },
                { name: "metrics-dashboard.json", type: "registry:block", path: "/r/metrics-dashboard.json", desc: "Telemetry charts grids nested inside custom cards." },
                { name: "settings-panel.json", type: "registry:block", path: "/r/settings-panel.json", desc: "Secure preferences layouts with key masking triggers." },
                { name: "use-media-query.json", type: "registry:hook", path: "/r/use-media-query.json", desc: "React hooks triggers." },
                { name: "utils.json", type: "registry:lib", path: "/r/utils.json", desc: "Tailwind merge helper routines." },
                { name: "registry.json", type: "manifest", path: "/r/registry.json", desc: "Central registry index manifest descriptor." },
              ].map((item) => (
                <div key={item.name} className="p-5 rounded-lg border border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:border-violet-500/30 transition-all flex flex-col justify-between h-40">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-zinc-100">{item.name}</span>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] text-zinc-500 font-mono">{item.path}</span>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                      View JSON
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-zinc-950 py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4 text-violet-500" />
            <span>Starkdesign App Registry hosting on starkdesign.site</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Starkdesign. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
