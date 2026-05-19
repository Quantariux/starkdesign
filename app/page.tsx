"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  ArrowRight,
  Search,
} from "lucide-react"

export default function StarkdesignHome() {
  const router = useRouter()
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [showSearch, setShowSearch] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Keyboard shortcut Ctrl K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowSearch((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const catalogItems = [
    {
      id: "glass-button",
      name: "Glass Button",
      desc: "Polymorphic button featuring backdrop-blur filter variants, animated neon border glows, and custom hover states.",
      type: "registry:ui",
      preview: (
        <Button variant="glass" size="default">
          Click Action
        </Button>
      )
    },
    {
      id: "status-indicator",
      name: "Status Indicator",
      desc: "A real-time state badge featuring dynamic pulse layers representing active streaming, execution, error, or idle signals.",
      type: "registry:ui",
      preview: (
        <StatusIndicator status="active" label="AI Agent Online" pulse />
      )
    },
    {
      id: "glass-card",
      name: "Glass Card",
      desc: "A translucent panel overlay containing gradient borders, low-intensity spot shadows, and frosted backdrop layout headers.",
      type: "registry:ui",
      preview: (
        <GlassCard glow hoverGlow className="w-full max-w-[280px]">
          <GlassCardHeader className="p-4 pb-2">
            <GlassCardTitle className="text-xs">Glow Panel</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="p-4 pt-0 pb-3">
            <p className="text-[10px] text-zinc-550 dark:text-zinc-400 leading-normal">
              Frosted card component with neon glow overlays.
            </p>
          </GlassCardContent>
        </GlassCard>
      )
    },
    {
      id: "agent-chat",
      name: "Agent Chat Workspace",
      desc: "A full-featured chat dashboard layout displaying message bubbles, dynamic step toggles, and tool status markers.",
      type: "registry:block",
      preview: (
        <div className="w-full scale-90 border border-black/5 dark:border-white/5 rounded-lg overflow-hidden max-h-[220px]">
          <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-2 text-[10px] font-semibold border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <span>Agent Console</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="p-3 space-y-2 text-[10px] bg-white/70 dark:bg-zinc-950/80">
            <div className="bg-black/5 dark:bg-white/5 p-2 rounded">
              Hello! How can I help you compile schemas today?
            </div>
            <div className="bg-blue-500/5 border border-blue-500/10 p-1.5 rounded text-blue-400">
              Thought: Searching active workspace directories.
            </div>
          </div>
        </div>
      )
    },
    {
      id: "terminal-console",
      name: "Terminal Console",
      desc: "A developer simulator logger tracing tool calls, script output status, and system execution parameters in real time.",
      type: "registry:block",
      preview: (
        <div className="w-full max-w-sm rounded border border-black/10 dark:border-white/10 bg-zinc-950 p-3 font-mono text-[9px] text-zinc-350">
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-zinc-800 text-zinc-400">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="ml-2">terminal-logger</span>
          </div>
          <div className="space-y-1">
            <div>[11:04:12] Initializing workspace schemas...</div>
            <div className="text-emerald-400">[11:04:13] Build succeeded for glass-button.</div>
          </div>
        </div>
      )
    },
    {
      id: "metrics-dashboard",
      name: "Metrics Dashboard",
      desc: "Telemetry cards compiling key performance indices like cache database hits, throughput rates, and cooling sparklines.",
      type: "registry:block",
      preview: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
          <GlassCard className="p-3">
            <div className="text-[9px] text-zinc-400 font-semibold">Throughput</div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white mt-1">45,182</div>
          </GlassCard>
          <GlassCard className="p-3">
            <div className="text-[9px] text-zinc-400 font-semibold">Database Hits</div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white mt-1">99.98%</div>
          </GlassCard>
        </div>
      )
    },
    {
      id: "settings-panel",
      name: "Security Settings Console",
      desc: "Secure keys authorization view containing API tokens fields, toggle masks, and secondary control tabs.",
      type: "registry:block",
      preview: (
        <GlassCard className="w-full max-w-[280px] p-3 text-[10px] space-y-2">
          <div className="font-semibold text-zinc-700 dark:text-zinc-200 border-b border-black/5 dark:border-white/5 pb-1">Security Settings</div>
          <div className="bg-zinc-100/50 dark:bg-zinc-900/50 p-1.5 rounded border border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="font-mono">••••••••••••••••</span>
            <span className="text-[8px] bg-zinc-200 dark:bg-zinc-800 px-1 rounded cursor-pointer">Show</span>
          </div>
        </GlassCard>
      )
    }
  ]

  const filteredItems = catalogItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchSelect = (id: string) => {
    router.push(`/components/${id}`)
    setShowSearch(false)
    setSearchQuery("")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
          <span className="text-xs font-mono text-zinc-555 dark:text-zinc-500 tracking-wider">LOADING PLAYGROUND...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/60 backdrop-blur-md transition-colors duration-300">
        <div className="w-full h-16 flex items-center justify-between px-6">
          {/* Left: Brand & Nav Links */}
          <div className="flex items-center gap-8">
            <Link style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }} href="/">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "2rem", height: "2rem", color: "var(--foreground)" }}>
                <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor"></rect>
                <rect x="4" y="10" width="10" height="4" rx="1" fill="currentColor"></rect>
                <rect x="10" y="16" width="10" height="4" rx="1" fill="currentColor"></rect>
              </svg>
              <span className="mobile-hidden" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>Starkdesign</span>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-550 dark:text-zinc-400">
              <Link href="/docs/introduction" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Docs</Link>
              <Link href="/components/glass-button" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Components</Link>
              <Link href="/explorer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Explorer
              </Link>
            </nav>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search trigger */}
            <button
              onClick={() => setShowSearch(true)}
              className="hidden md:inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-secondary/80 px-2.5 py-2 bg-surface text-surface-foreground/60 dark:bg-card border border-black/10 dark:border-white/10 h-8 w-full font-normal shadow-none md:w-40 lg:w-56 xl:w-64"
              type="button"
            >
              <span className="hidden lg:inline-flex text-left">Search components...</span>
              <span className="inline-flex lg:hidden text-left">Search...</span>
              <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700">
                Ctrl K
              </kbd>
            </button>

            <ModeToggle />
            <Button
              variant="glass"
              size="sm"
              onClick={() => copyToClipboard("npx shadcn@latest add https://starkdesign.site/r/registry.json", "cli-top")}
            >
              {copiedId === "cli-top" ? (
                <>
                  <Check className="mr-2 h-3 w-3 text-emerald-450" />
                  Copied Manifest
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-3 w-3" />
                  Copy Registry
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-grid">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-zinc-500/5 via-transparent to-transparent pointer-events-none -z-10" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link
            data-slot="badge"
            className="inline-flex items-center justify-center border border-zinc-200 dark:border-white/10 text-xs w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground group bg-background max-w-full gap-2 rounded-full px-3 py-0.5 font-medium transition-all mb-6"
            href="/components/glass-button"
          >
            <div className="bg-foreground/5 -ml-2.5 shrink-0 truncate rounded-full px-2.5 py-1 text-xs group-[.announcement-themed]:bg-background/60">
              Introducing
            </div>
            <div className="flex items-center gap-1 truncate py-1">
              Scribe v2 Realtime{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-3"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </Link>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight mb-6 select-none animate-fade-in">
            Stark design for the{" "}
            <span className="text-blue-600 dark:text-blue-500">
              Agentic Future.
            </span>
          </h1>

          <p className="text-zinc-550 dark:text-zinc-455 max-w-3xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            A high-fidelity component library and building block system meticulously crafted for AI agents, developers, and world-class documentation.
          </p>

          <div className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none mb-16">
            <Link
              data-slot="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              href="/components/glass-button"
            >
              Get Started
            </Link>
            <Link
              data-slot="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-black/10 dark:border-white/10 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              href="/explorer"
            >
              Explore Registry
            </Link>
          </div>
        </div>
      </section>

      {/* Components Catalog Grid */}
      <main className="py-12 bg-zinc-50/40 dark:bg-zinc-950/40 flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-450 dark:text-blue-400" />
              Explore Components & Blocks
            </h2>
            <p className="text-sm text-zinc-555 dark:text-zinc-400 mt-1">
              Select a component to test variant configurations and view source codes in its dedicated documentation playground.
            </p>
          </div>

          {/* Cards catalog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between overflow-hidden h-[320px]"
              >
                {/* Visual Preview pane */}
                <div className="h-40 bg-zinc-50/50 dark:bg-zinc-950/40 border-b border-black/5 dark:border-white/5 flex items-center justify-center p-6 select-none">
                  {item.preview}
                </div>

                {/* Content description */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">{item.name}</h3>
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-zinc-150/70 dark:bg-zinc-800 rounded border border-zinc-200/50 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Redirection link */}
                  <Link
                    href={`/components/${item.id}`}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors self-start"
                  >
                    Open Component Page
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="py-6 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
          Built by{" "}
          <Link href="/" className="font-medium underline underline-offset-4">
            Starkdesign
          </Link>
          . The source code is available on{" "}
          <a href="#" className="font-medium underline underline-offset-4">
            GitHub
          </a>
          .
        </div>
      </footer>

      {/* Global Command Search Overlay Modal */}
      {showSearch && (
        <div
          onClick={() => setShowSearch(false)}
          className="fixed inset-0 z-50 bg-black/40 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-background border border-black/15 dark:border-white/10 rounded-xl overflow-hidden flex flex-col max-h-[400px] ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                placeholder="Search components..."
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2 py-1 rounded"
              >
                ESC
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
              <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 py-1">
                Components & Blocks
              </div>
              {filteredItems.length === 0 ? (
                <div className="text-xs text-zinc-500 text-center py-6">No matching components found.</div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearchSelect(item.id)}
                    className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 group transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-zinc-400 bg-zinc-150/50 dark:bg-zinc-900 dark:text-zinc-500 group-hover:bg-blue-500/10 group-hover:text-blue-400 border border-zinc-250 dark:border-zinc-850 px-2 py-0.5 rounded transition-all">
                      {item.type.toUpperCase()}
                    </span>
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] text-zinc-400 flex items-center gap-1">
              <span className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">↵</span>
              <span>Go to component</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
