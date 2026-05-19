"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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
import { codeSnippets } from "@/lib/code-snippets"
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
  Monitor,
  Tablet,
  Smartphone,
  Search,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
} from "lucide-react"

// Simple regex-based syntax highlighter for typescript
function highlightCode(code: string) {
  let esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  const keywords = /\b(import|from|const|export|default|function|return|interface|extends|type|as|false|true|typeof|let|var|if|else|new|null|undefined|string|number|boolean|Record|React|forwardRef|displayName|Comp|asChild|className|cn|variants|defaultVariants|buttonVariants|statusIndicatorVariants|dotVariants|useMediaQuery|utils)\b/g
  esc = esc.replace(keywords, '<span class="text-blue-600 dark:text-blue-400 font-semibold">$1</span>')

  const strings = /(['"`])(.*?)\1/g
  esc = esc.replace(strings, '<span class="text-emerald-600 dark:text-emerald-400">$&</span>')

  const comments = /(\/\/.*)/g
  esc = esc.replace(comments, '<span class="text-zinc-500 dark:text-zinc-400 italic">$1</span>')

  const functions = /\b(useState|useEffect|useRef|onClick|disabled|variant|size|glow|hoverGlow|status|label|pulse|className|Slot|Button|GlassCard|StatusIndicator|TerminalConsole|AgentChat|MetricsDashboard|SettingsPanel)\b/g
  esc = esc.replace(functions, '<span class="text-sky-600 dark:text-sky-400">$1</span>')

  return <code dangerouslySetInnerHTML={{ __html: esc }} />
}

const activeComponents = [
  { id: "glass-button", name: "Glass Button", desc: "Polymorphic button featuring backdrop-blur filter variants, animated neon border glows, and custom hover states.", type: "registry:ui", codeKey: "glassButton" },
  { id: "status-indicator", name: "Status Indicator", desc: "A real-time state badge featuring dynamic pulse layers representing active streaming, execution, error, or idle signals.", type: "registry:ui", codeKey: "statusIndicator" },
  { id: "glass-card", name: "Glass Card", desc: "A translucent panel overlay containing gradient borders, low-intensity spot shadows, and frosted backdrop layout headers.", type: "registry:ui", codeKey: "glassCard" },
  { id: "agent-chat", name: "Agent Chat Workspace", desc: "A full-featured chat dashboard layout displaying message bubbles, dynamic step toggles, and tool status markers.", type: "registry:block", codeKey: "agentChat" },
  { id: "terminal-console", name: "Terminal Console", desc: "A developer simulator logger tracing tool calls, script output status, and system execution parameters in real time.", type: "registry:block", codeKey: "terminalConsole" },
  { id: "metrics-dashboard", name: "Metrics Dashboard", desc: "Telemetry cards compiling key performance indices like cache database hits, throughput rates, and cooling sparklines.", type: "registry:block", codeKey: "metricsDashboard" },
  { id: "settings-panel", name: "Security Settings Console", desc: "Secure keys authorization view containing API tokens fields, toggle masks, and secondary control tabs.", type: "registry:block", codeKey: "settingsPanel" },
]

const mockUiComponents = [
  { id: "message-list", name: "Message List", type: "registry:ui" },
  { id: "input-bar", name: "Input Bar", type: "registry:ui" },
  { id: "suggestions", name: "Suggestions", type: "registry:ui" },
  { id: "model-picker", name: "Model Picker", type: "registry:ui" },
  { id: "mode-selector", name: "Mode Selector", type: "registry:ui" },
  { id: "user-message", name: "User Message", type: "registry:ui" },
  { id: "send-button", name: "Send Button", type: "registry:ui" },
  { id: "attachment-button", name: "Attachment Button", type: "registry:ui" },
  { id: "file-attachment", name: "File Attachment", type: "registry:ui" },
  { id: "text-shimmer", name: "Text Shimmer", type: "registry:ui" },
  { id: "spiral-loader", name: "Spiral Loader", type: "registry:ui" },
]

const mockBlockComponents = [
  { id: "bash-tool", name: "Bash Tool", type: "registry:block" },
  { id: "edit-tool", name: "Edit Tool", type: "registry:block" },
  { id: "search-tool", name: "Search Tool", type: "registry:block" },
  { id: "todo-tool", name: "Todo Tool", type: "registry:block" },
  { id: "plan-tool", name: "Plan Tool", type: "registry:block" },
  { id: "tool-group", name: "Tool Group", type: "registry:block" },
  { id: "subagent-tool", name: "Subagent Tool", type: "registry:block" },
  { id: "question-tool", name: "Question Tool", type: "registry:block" },
  { id: "mcp-tool", name: "MCP Tool", type: "registry:block" },
  { id: "thinking-tool", name: "Thinking Tool", type: "registry:block" },
  { id: "generic-tool", name: "Generic Tool", type: "registry:block" },
]

// Persistent flag to track if components page has been loaded once in this session
let hasLoadedOnce = false

export default function ComponentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const componentId = params.id as string

  // Selected Component config
  const componentIndex = activeComponents.findIndex((c) => c.id === componentId)
  const component = componentIndex !== -1 ? activeComponents[componentIndex] : activeComponents[0]

  const [mounted, setMounted] = React.useState(hasLoadedOnce)

  React.useEffect(() => {
    if (!hasLoadedOnce) {
      const timer = setTimeout(() => {
        setMounted(true)
        hasLoadedOnce = true
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Navigation handlers
  const handlePrev = () => {
    const prevIndex = (componentIndex - 1 + activeComponents.length) % activeComponents.length
    router.push(`/components/${activeComponents[prevIndex].id}`)
  }

  const handleNext = () => {
    const nextIndex = (componentIndex + 1) % activeComponents.length
    router.push(`/components/${activeComponents[nextIndex].id}`)
  }

  // Common interactive UI state
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")
  const [pkgManager, setPkgManager] = React.useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop")
  const [copiedCode, setCopiedCode] = React.useState(false)
  const [copiedCli, setCopiedCli] = React.useState(false)
  const [copiedPage, setCopiedPage] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showSearch, setShowSearch] = React.useState(false)

  // Interactive controls states for Glass Button
  const [btnVariant, setBtnVariant] = React.useState<"glass" | "glow" | "gradient" | "outline" | "ghost" | "default">("glass")
  const [btnSize, setBtnSize] = React.useState<"sm" | "default" | "lg">("default")
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [btnText, setBtnText] = React.useState("Click Action")

  // Interactive controls states for Glass Card
  const [cardGlow, setCardGlow] = React.useState(true)
  const [cardHoverGlow, setCardHoverGlow] = React.useState(true)

  // Interactive controls states for Status Indicator
  const [statusVal, setStatusVal] = React.useState<"idle" | "active" | "streaming" | "loading" | "error">("active")
  const [statusPulse, setStatusPulse] = React.useState(true)
  const [statusLabel, setStatusLabel] = React.useState("AI Agent Online")

  // Copy Code Snippet
  const code = (codeSnippets as any)[component.codeKey] || ""
  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Copy CLI command
  const cliCommand = {
    pnpm: `pnpm dlx shadcn@latest add https://starkdesign.site/r/${component.id}.json`,
    npm: `npx shadcn@latest add https://starkdesign.site/r/${component.id}.json`,
    yarn: `npx shadcn@latest add https://starkdesign.site/r/${component.id}.json`,
    bun: `bunx shadcn@latest add https://starkdesign.site/r/${component.id}.json`,
  }[pkgManager]

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  // Copy current URL
  const copyPageUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedPage(true)
      setTimeout(() => setCopiedPage(false), 2000)
    }
  }

  // Command K search handler
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

  const allFilteredComponents = activeComponents.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchSelect = (id: string) => {
    router.push(`/components/${id}`)
    setShowSearch(false)
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Loading Overlay */}
      {!mounted && (
        <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-12 h-12 text-zinc-900 dark:text-white animate-pulse"
          >
            <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" />
            <rect x="4" y="10" width="10" height="4" rx="1" fill="currentColor" />
            <rect x="10" y="16" width="10" height="4" rx="1" fill="currentColor" />
          </svg>
        </div>
      )}
      {/* Header Toolbar — Full width, sticky */}
      <header className="sticky top-0 z-40 h-12 w-full bg-background/80 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center gap-1.5 text-zinc-900 dark:text-white font-semibold cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
            <span className="text-xs">Menu</span>
          </button>
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" />
              <rect x="4" y="10" width="10" height="4" rx="1" fill="currentColor" />
              <rect x="10" y="16" width="10" height="4" rx="1" fill="currentColor" />
            </svg>
            <span className="text-sm font-bold tracking-tight hidden sm:inline">Starkdesign</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
            <span>/</span>
            <span className="text-foreground font-semibold">{component.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/explorer"
            className="text-xs font-semibold hover:text-foreground text-zinc-550 dark:text-zinc-400 flex items-center gap-1 transition-colors"
          >
            Explorer
          </Link>
        </div>
      </header>

      {/* Main layout container with sidebar and content */}
      <div className="flex-1 flex relative">
        {/* Backdrop overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden cursor-pointer animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 1. Left Sidebar — shadcn docs style */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col text-foreground border-r border-black/10 dark:border-white/10 transition-transform duration-300 md:sticky md:top-12 md:z-30 md:h-[calc(100vh-3rem)] md:w-56 md:border-r-0 md:translate-x-0 ${
            sidebarOpen ? "translate-x-0 bg-background" : "-translate-x-full"
          }`}
        >
          {/* Mobile close button */}
          <div className="flex items-center justify-between px-4 py-3 md:hidden border-b border-black/5 dark:border-white/5">
            <button
              className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-semibold cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="text-xs">Menu</span>
            </button>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-550 dark:text-zinc-400">
              STARKDESIGN
            </div>
          </div>

          {/* Top fade gradient */}
          <div className="absolute top-0 z-10 h-8 w-full shrink-0 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none hidden md:block" />

          {/* Right vertical border line */}
          <div className="absolute top-8 right-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block" />

          {/* Scrollable sidebar content */}
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto overflow-x-hidden px-3 no-scrollbar">
            {/* Section: Active Components */}
            <div className="relative flex w-full min-w-0 flex-col p-2 pt-6">
              <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground">
                Components
              </div>
              <div className="w-full text-sm">
                <ul className="flex w-full min-w-0 flex-col gap-0.5">
                  {activeComponents.map((item) => (
                    <li key={item.id} className="group/menu-item relative">
                      <Link
                        href={`/components/${item.id}`}
                        className={`flex items-center gap-2 rounded-md p-2 text-left text-[0.8rem] font-medium border transition-[width,height,padding] h-[30px] w-fit overflow-visible ${
                          component.id === item.id
                            ? "border-accent bg-accent text-accent-foreground font-semibold"
                            : "border-transparent hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section: Coming Soon — UI */}
            <div className="relative flex w-full min-w-0 flex-col p-2">
              <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground">
                Coming Soon
              </div>
              <div className="w-full text-sm">
                <ul className="flex w-full min-w-0 flex-col gap-0.5">
                  {mockUiComponents.map((item) => (
                    <li key={item.id} className="group/menu-item relative">
                      <div
                        className="flex items-center gap-2 rounded-md p-2 text-left text-[0.8rem] font-medium border border-transparent text-muted-foreground/50 cursor-not-allowed select-none h-[30px] w-fit overflow-visible"
                        title="Coming soon"
                      >
                        {item.name}
                        <span className="text-[8px] opacity-60 bg-accent/50 border border-border px-1 rounded">UI</span>
                      </div>
                    </li>
                  ))}
                  {mockBlockComponents.map((item) => (
                    <li key={item.id} className="group/menu-item relative">
                      <div
                        className="flex items-center gap-2 rounded-md p-2 text-left text-[0.8rem] font-medium border border-transparent text-muted-foreground/50 cursor-not-allowed select-none h-[30px] w-fit overflow-visible"
                        title="Coming soon"
                      >
                        {item.name}
                        <span className="text-[8px] opacity-60 bg-accent/50 border border-border px-1 rounded">BLOCK</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom fade gradient */}
          <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </aside>

        {/* Main Container Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen relative">
          {/* Dynamic Detail Body Layout Grid */}
          <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
            {/* Main content pane */}
            <main className="space-y-12 min-w-0">
            {/* Header Title Section */}
            <div className="border-b border-black/5 dark:border-white/5 pb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 id="overview" className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    {component.name}
                  </h1>
                </div>

                {/* Copy Page & Navigation controls matching docs page */}
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <div className="bg-secondary group/buttons relative flex rounded-lg">
                    <button
                      onClick={copyPageUrl}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md gap-1.5 px-3 h-8 shadow-none md:h-7 md:text-[0.8rem]"
                    >
                      {copiedPage ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-450" />
                          <span>Copied URL</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
                            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
                          </svg>
                          <span>Copy Page</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 ml-auto size-8 shadow-none md:size-7"
                    title="Previous Component"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 size-8 shadow-none md:size-7"
                    title="Next Component"
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-zinc-550 dark:text-zinc-450 mt-4 max-w-3xl leading-relaxed">
                {component.desc}
              </p>
            </div>

            {/* Sandbox Container (Preview & Code switcher) */}
            <section id="preview" className="space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <div className="flex bg-zinc-100 dark:bg-zinc-950 rounded-lg p-0.5 border border-black/5 dark:border-white/5">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      activeTab === "preview"
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                        : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-300"
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      activeTab === "code"
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                        : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-300"
                    }`}
                  >
                    Code
                  </button>
                </div>

                {activeTab === "preview" && (
                  <div className="flex items-center gap-1.5">
                    <div className="hidden sm:flex bg-zinc-100 dark:bg-zinc-950 rounded-lg p-0.5 border border-black/5 dark:border-white/5 gap-0.5">
                      {[
                        { id: "desktop", icon: Monitor, label: "Desktop" },
                        { id: "tablet", icon: Tablet, label: "Tablet" },
                        { id: "mobile", icon: Smartphone, label: "Mobile" },
                      ].map((vp) => (
                        <button
                          key={vp.id}
                          onClick={() => setViewport(vp.id as any)}
                          className={`p-1.5 rounded-md transition-all ${
                            viewport === vp.id
                              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                              : "text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-355"
                          }`}
                          title={vp.label}
                        >
                          <vp.icon className="h-3.5 w-3.5" />
                        </button>
                      ))}
                    </div>
                    <a
                      href={`/components/${component.id}/preview`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5 transition-all flex items-center justify-center cursor-pointer"
                      title="Open preview in new tab"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Display Area */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300">
                {activeTab === "preview" ? (
                  <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Left: Viewport Emulator (Interactive Preview) */}
                    <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/40 p-6 flex items-center justify-center transition-all duration-300 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5">
                      <div
                        className={`transition-all duration-300 flex items-center justify-center w-full h-full ${
                          viewport === "desktop"
                            ? "max-w-full"
                            : viewport === "tablet"
                            ? "max-w-[768px] border-x border-dashed border-zinc-200 dark:border-zinc-800 px-4"
                            : "max-w-[375px] border-x border-dashed border-zinc-200 dark:border-zinc-800 px-4"
                        }`}
                      >
                        <div className="w-full flex items-center justify-center py-4">
                          {component.id === "glass-button" && (
                            <Button variant={btnVariant} size={btnSize} disabled={btnDisabled}>
                              {btnText}
                            </Button>
                          )}

                          {component.id === "status-indicator" && (
                            <StatusIndicator status={statusVal} label={statusLabel} pulse={statusPulse} />
                          )}

                          {component.id === "glass-card" && (
                            <GlassCard glow={cardGlow} hoverGlow={cardHoverGlow} className="w-full max-w-sm">
                              <GlassCardHeader>
                                <div className="flex items-center justify-between">
                                  <GlassCardTitle className="text-sm">Compound Card</GlassCardTitle>
                                  <StatusIndicator status="active" label="Demo" pulse />
                                </div>
                              </GlassCardHeader>
                              <GlassCardContent>
                                <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-normal">
                                  This is an isolated preview of our glass card container. Custom responsive variables allow nesting dashboard stats or workspace tabs seamlessly.
                                </p>
                              </GlassCardContent>
                              <GlassCardFooter className="flex justify-end gap-2 border-t border-black/5 dark:border-white/5 pt-3">
                                <Button variant="ghost" size="sm">Cancel</Button>
                                <Button variant="glass" size="sm">Save Keys</Button>
                              </GlassCardFooter>
                            </GlassCard>
                          )}

                          {component.id === "agent-chat" && (
                            <div className="max-w-xl mx-auto w-full font-sans">
                              <AgentChat />
                            </div>
                          )}

                          {component.id === "terminal-console" && (
                            <div className="max-w-2xl mx-auto w-full">
                              <TerminalConsole />
                            </div>
                          )}

                          {component.id === "metrics-dashboard" && (
                            <div className="w-full font-sans">
                              <MetricsDashboard />
                            </div>
                          )}

                          {component.id === "settings-panel" && (
                            <div className="w-full font-sans">
                              <SettingsPanel />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Configuration Settings Sidebar (Always outside emulator) */}
                    {["glass-button", "status-indicator", "glass-card"].includes(component.id) && (
                      <div className="w-full lg:w-72 p-6 flex flex-col gap-4 text-xs bg-zinc-50/15 dark:bg-zinc-950/20 shrink-0">
                        <h4 className="text-zinc-700 dark:text-zinc-300 font-bold mb-1 tracking-wider uppercase text-[10px] text-zinc-500">Configuration Settings</h4>
                        
                        {component.id === "glass-button" && (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-zinc-550 dark:text-zinc-400 font-semibold select-none">Variant</label>
                              <select
                                value={btnVariant}
                                onChange={(e) => setBtnVariant(e.target.value as any)}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-1.5 text-zinc-800 dark:text-zinc-300 outline-none focus:border-blue-500 cursor-pointer text-xs"
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
                              <label className="text-zinc-550 dark:text-zinc-400 font-semibold select-none">Size</label>
                              <select
                                value={btnSize}
                                onChange={(e) => setBtnSize(e.target.value as any)}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-1.5 text-zinc-800 dark:text-zinc-300 outline-none focus:border-blue-500 cursor-pointer text-xs"
                              >
                                <option value="default">Default</option>
                                <option value="sm">Small</option>
                                <option value="lg">Large</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="checkbox"
                                id="btn-disabled"
                                checked={btnDisabled}
                                onChange={(e) => setBtnDisabled(e.target.checked)}
                                className="rounded bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                              />
                              <label htmlFor="btn-disabled" className="text-zinc-550 dark:text-zinc-400 font-semibold cursor-pointer select-none">
                                Disable Interactivity
                              </label>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-zinc-550 dark:text-zinc-400 font-semibold select-none">Label Content</label>
                              <input
                                type="text"
                                value={btnText}
                                onChange={(e) => setBtnText(e.target.value)}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 text-zinc-800 dark:text-zinc-300 outline-none focus:border-blue-500 text-xs"
                              />
                            </div>
                          </>
                        )}

                        {component.id === "status-indicator" && (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-zinc-550 dark:text-zinc-400 font-semibold select-none">Status State</label>
                              <select
                                value={statusVal}
                                onChange={(e) => setStatusVal(e.target.value as any)}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-1.5 text-zinc-800 dark:text-zinc-300 outline-none focus:border-blue-500 cursor-pointer text-xs"
                              >
                                <option value="active">Active</option>
                                <option value="streaming">Streaming</option>
                                <option value="loading">Loading</option>
                                <option value="idle">Idle</option>
                                <option value="error">Error</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="checkbox"
                                id="status-pulse"
                                checked={statusPulse}
                                onChange={(e) => setStatusPulse(e.target.checked)}
                                className="rounded bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                              />
                              <label htmlFor="status-pulse" className="text-zinc-550 dark:text-zinc-400 font-semibold cursor-pointer select-none">
                                Pulse Dot Ring Animation
                              </label>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-zinc-550 dark:text-zinc-400 font-semibold select-none">Status Text</label>
                              <input
                                type="text"
                                value={statusLabel}
                                onChange={(e) => setStatusLabel(e.target.value)}
                                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 text-zinc-800 dark:text-zinc-300 outline-none focus:border-blue-500 text-xs"
                              />
                            </div>
                          </>
                        )}

                        {component.id === "glass-card" && (
                          <>
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="checkbox"
                                id="card-glow"
                                checked={cardGlow}
                                onChange={(e) => setCardGlow(e.target.checked)}
                                className="rounded bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                              />
                              <label htmlFor="card-glow" className="text-zinc-550 dark:text-zinc-400 font-semibold cursor-pointer select-none">
                                Base Neon Border Glow
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="card-hover-glow"
                                checked={cardHoverGlow}
                                onChange={(e) => setCardHoverGlow(e.target.checked)}
                                className="rounded bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                              />
                              <label htmlFor="card-hover-glow" className="text-zinc-550 dark:text-zinc-400 font-semibold cursor-pointer select-none">
                                Interactive Hover Glow
                              </label>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#f8f8f8] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 p-6 font-mono text-xs h-[600px] overflow-auto select-text relative scrollbar-thin">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={copyCode}
                        className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 font-sans"
                      >
                        {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                      </button>
                    </div>
                    <pre className="pr-16 leading-relaxed select-text font-mono">
                      {highlightCode(code)}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="space-y-4 pt-4">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Getting Started
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-400">
                Install this component with the shadcn command line utility:
              </p>

              <div className="relative w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-zinc-950 overflow-hidden shadow-none flex flex-col">
                <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-100/85 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="flex size-4 items-center justify-center rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      <Terminal className="h-3 w-3" />
                    </div>
                    <div className="flex items-center bg-transparent border-0 gap-1">
                      {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                        <button
                          key={pm}
                          onClick={() => setPkgManager(pm)}
                          className={`relative inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            pkgManager === pm
                              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700/50"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/30"
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={copyCli}
                    className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCli ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <pre className="no-scrollbar min-w-0 overflow-x-auto px-4 py-3 bg-[#f8f8f8] dark:bg-zinc-950/90 text-zinc-800 dark:text-zinc-300 font-mono text-xs select-text">
                  <code className="relative font-mono text-xs leading-none select-all">{cliCommand}</code>
                </pre>
              </div>
            </section>

            {/* Examples Section */}
            <section id="examples" className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Examples
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-450">
                Here is a simple example showing how to integrate and import this component inside your React and Next.js projects:
              </p>

              <div className="bg-[#f8f8f8] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 p-4 rounded-xl border border-black/10 dark:border-white/10 font-mono text-xs overflow-x-auto scrollbar-thin select-text">
                <pre className="leading-relaxed select-text">
                  {highlightCode(
                    component.id === "glass-button"
                      ? `import { Button } from "@/components/ui/glass-button"\n\nexport default function Example() {\n  return (\n    <Button variant="glass" size="default">\n      Click Action\n    </Button>\n  )\n}`
                      : component.id === "status-indicator"
                      ? `import { StatusIndicator } from "@/components/ui/status-indicator"\n\nexport default function Example() {\n  return (\n    <StatusIndicator status="active" label="Agent Online" pulse />\n  )\n}`
                      : component.id === "glass-card"
                      ? `import {\n  GlassCard,\n  GlassCardHeader,\n  GlassCardTitle,\n  GlassCardContent\n} from "@/components/ui/glass-card"\n\nexport default function Example() {\n  return (\n    <GlassCard glow hoverGlow>\n      <GlassCardHeader>\n        <GlassCardTitle>Glow Panel</GlassCardTitle>\n      </GlassCardHeader>\n      <GlassCardContent>Details go here</GlassCardContent>\n    </GlassCard>\n  )\n}`
                      : `import { ${component.name.replace(/\s+/g, "")} } from "@/components/blocks/${component.id}"\n\nexport default function Example() {\n  return (\n    <div className="w-full max-w-xl">\n      <${component.name.replace(/\s+/g, "")} />\n    </div>\n  )\n}`
                  )}
                </pre>
              </div>
            </section>
          </main>

          {/* 3. Right Sidebar TOC */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-24">
              <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                On this page
              </div>
              <ul className="space-y-3 text-xs text-zinc-400 font-medium">
                <li>
                  <a href="#overview" className="hover:text-foreground text-zinc-500 transition-colors">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#preview" className="hover:text-foreground text-zinc-500 transition-colors">
                    Preview & Sandbox
                  </a>
                </li>
                <li>
                  <a href="#getting-started" className="hover:text-foreground text-zinc-500 transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#examples" className="hover:text-foreground text-zinc-500 transition-colors">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Global Footer (Classic Starkdesign Style) */}
        <footer className="mt-auto border-t border-black/10 dark:border-white/10 py-6 bg-zinc-50/50 dark:bg-zinc-950/20">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm animate-fade-in">
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
      </div>
    </div>

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
              {allFilteredComponents.length === 0 ? (
                <div className="text-xs text-zinc-500 text-center py-6">No matching components found.</div>
              ) : (
                allFilteredComponents.map((item) => (
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
                    <span className="text-[9px] font-bold text-zinc-400 bg-zinc-150/50 dark:bg-zinc-900 dark:text-zinc-500 group-hover:bg-violet-500/10 group-hover:text-violet-400 border border-zinc-250 dark:border-zinc-850 px-2 py-0.5 rounded transition-all">
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
