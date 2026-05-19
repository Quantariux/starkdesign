"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/registry/components/glass-button"
import {
  Copy,
  Check,
  Terminal,
  Cpu,
  Sparkles,
  BookOpen,
  Layers,
  Code,
  Laptop,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from "lucide-react"

// Types for navigation
interface DocItem {
  id: string
  name: string
  path: string
}

const docNavigation: DocItem[] = [
  { id: "introduction", name: "Introduction", path: "/docs/introduction" },
  { id: "components", name: "Components", path: "/docs/components" },
  { id: "setup", name: "Setup", path: "/docs/setup" },
  { id: "usage", name: "Usage", path: "/docs/usage" },
  { id: "troubleshooting", name: "Troubleshooting", path: "/docs/troubleshooting" },
]

const activeComponents = [
  { id: "glass-button", name: "Glass Button" },
  { id: "status-indicator", name: "Status Indicator" },
  { id: "glass-card", name: "Glass Card" },
  { id: "agent-chat", name: "Agent Chat Workspace" },
  { id: "terminal-console", name: "Terminal Console" },
  { id: "metrics-dashboard", name: "Metrics Dashboard" },
  { id: "settings-panel", name: "Security Settings Console" },
]

export default function DocSlugPage() {
  const params = useParams()
  const router = useRouter()
  const slug = (params.slug as string) || "introduction"

  const [mounted, setMounted] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [copiedPage, setCopiedPage] = React.useState(false)
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  // Setup page states
  const [cliTab, setCliTab] = React.useState<"agents" | "shadcn">("agents")
  const [pkgTab, setPkgTab] = React.useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar on route change
  React.useEffect(() => {
    setSidebarOpen(false)
  }, [slug])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
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
    )
  }

  // Copy page URL handler
  const copyPageUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedPage(true)
      setTimeout(() => setCopiedPage(false), 2000)
    }
  }

  // Copy code utility
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // CLI command generator
  const getCliCommand = () => {
    if (cliTab === "agents") {
      return {
        pnpm: "pnpm dlx starkdesign@latest add glass-button",
        npm: "npx starkdesign@latest add glass-button",
        yarn: "npx starkdesign@latest add glass-button",
        bun: "bunx starkdesign@latest add glass-button",
      }[pkgTab]
    } else {
      return {
        pnpm: "pnpm dlx shadcn@latest add https://starkdesign.site/r/glass-button.json",
        npm: "npx shadcn@latest add https://starkdesign.site/r/glass-button.json",
        yarn: "npx shadcn@latest add https://starkdesign.site/r/glass-button.json",
        bun: "bunx shadcn@latest add https://starkdesign.site/r/glass-button.json",
      }[pkgTab]
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
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
            <span className="text-foreground font-semibold">Docs</span>
            <span>/</span>
            <span className="text-foreground font-semibold uppercase text-[10px] tracking-wider">{slug}</span>
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

        {/* Left Sidebar — Same style as component */}
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

          <div className="absolute top-0 z-10 h-8 w-full shrink-0 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none hidden md:block" />
          <div className="absolute top-8 right-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block" />

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-none">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2.5 text-xs font-bold tracking-wider text-zinc-450 dark:text-zinc-500 uppercase select-none">
                  Getting Started
                </h3>
                <ul className="space-y-1.5">
                  {docNavigation.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={`flex h-8 items-center rounded-md px-2.5 text-xs font-semibold transition-all border ${
                          slug === item.id
                            ? "bg-zinc-150/80 dark:bg-zinc-900 text-zinc-900 dark:text-white border-black/5 dark:border-white/5 font-bold"
                            : "text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-700 dark:hover:text-zinc-300 border-transparent"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {slug === "components" && (
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Components</h1>
                    
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

                      <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 ml-auto size-8 shadow-none md:size-7"
                        href="/docs/introduction"
                        title="Previous"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </Link>
                      
                      <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 size-8 shadow-none md:size-7"
                        href="/docs/setup"
                        title="Next"
                      >
                        <span className="sr-only">Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">Explore all the components available in the library.</p>
                </div>
              </div>

              <div className="w-full flex-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
                  {activeComponents.map((comp) => (
                    <Link
                      key={comp.id}
                      className="text-lg font-medium underline-offset-4 hover:underline md:text-base text-zinc-900 dark:text-zinc-200"
                      href={`/components/${comp.id}`}
                    >
                      {comp.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slug === "setup" && (
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Setup</h1>
                    
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

                      <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 ml-auto size-8 shadow-none md:size-7"
                        href="/docs/components"
                        title="Previous"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </Link>
                      
                      <Link
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 size-8 shadow-none md:size-7"
                        href="/docs/usage"
                        title="Next"
                      >
                        <span className="sr-only">Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">Getting started with Starkdesign UI</p>
                </div>
              </div>

              <div className="w-full flex-1">
                <p className="leading-relaxed">
                  Installing Starkdesign UI components is straightforward. You can use our dedicated CLI command for the fastest setup, or integrate via the standard shadcn/ui CLI if you have already adopted shadcn's workflow.
                </p>

                {/* Tabs */}
                <div className="flex flex-col gap-2 relative mt-6 w-full">
                  <div role="tablist" className="text-muted-foreground inline-flex h-9 w-fit items-center justify-start gap-4 rounded-none bg-transparent px-0 border-b border-black/10 dark:border-white/10 w-full">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={cliTab === "agents"}
                      onClick={() => setCliTab("agents")}
                      className={`inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 py-1 font-medium whitespace-nowrap transition-all border-b-2 px-0 pb-3 text-sm cursor-pointer ${
                        cliTab === "agents"
                          ? "text-zinc-900 dark:text-white border-zinc-900 dark:border-white"
                          : "text-zinc-400 border-transparent hover:text-zinc-650"
                      }`}
                    >
                      Agents CLI
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={cliTab === "shadcn"}
                      onClick={() => setCliTab("shadcn")}
                      className={`inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 py-1 font-medium whitespace-nowrap transition-all border-b-2 px-0 pb-3 text-sm cursor-pointer ${
                        cliTab === "shadcn"
                          ? "text-zinc-900 dark:text-white border-zinc-900 dark:border-white"
                          : "text-zinc-400 border-transparent hover:text-zinc-650"
                      }`}
                    >
                      shadcn
                    </button>
                  </div>

                  <div className="flex-1 relative mt-2">
                    <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-zinc-950/20">
                      <div className="border-b border-black/5 dark:border-white/5 flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="bg-zinc-900 text-white flex size-4 items-center justify-center rounded-[1px] opacity-75">
                          <Terminal className="h-3 w-3" />
                        </div>
                        <div role="tablist" className="inline-flex gap-2">
                          {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
                            <button
                              key={pkg}
                              type="button"
                              onClick={() => setPkgTab(pkg)}
                              className={`px-2 py-0.5 text-xs font-semibold rounded cursor-pointer transition-all ${
                                pkgTab === pkg
                                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                              }`}
                            >
                              {pkg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative px-4 py-3.5 font-mono text-xs">
                        <pre className="no-scrollbar overflow-x-auto text-zinc-800 dark:text-zinc-300 select-all">
                          <code>{getCliCommand()}</code>
                        </pre>
                        <button
                          onClick={() => handleCopyCode(getCliCommand() || "", "cli")}
                          className="absolute top-3 right-3 p-1.5 bg-zinc-150/80 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-850 rounded border border-black/5 dark:border-white/5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-all"
                        >
                          {copiedCode === "cli" ? <Check className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 id="prerequisites" className="font-heading mt-8 scroll-m-28 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Prerequisites
                </h2>
                <p className="leading-relaxed mt-3">
                  Before installing Starkdesign UI, make sure your environment meets the following requirements:
                </p>
                <ul className="my-4 ml-6 list-disc text-sm space-y-2">
                  <li>
                    <a className="font-medium underline underline-offset-4" href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> version 18 or later
                  </li>
                  <li>
                    A <a className="font-medium underline underline-offset-4" href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a> project
                  </li>
                  <li>
                    <a className="font-medium underline underline-offset-4" href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">shadcn/ui</a> setup in your project. If you don't have it setup, running any install command will configure it for you.
                  </li>
                </ul>

                <h2 id="installing-components" className="font-heading mt-8 scroll-m-28 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Installing components
                </h2>
                <p className="leading-relaxed mt-3">
                  You can install Starkdesign UI components using either our dynamic registry CLI or by referencing individual components with the standard shadcn/ui command. Both methods achieve the same result: adding the selected component's code and its dependencies directly into your workspace.
                </p>
                <p className="leading-relaxed mt-3">
                  The CLI downloads the selected component's code and integrates it directly into your components folder (typically under <code className="bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded font-mono text-xs">components/ui</code>).
                </p>
              </div>
            </div>
          )}

          {slug === "introduction" && (
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Introduction</h1>
                <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">Beautiful agentic elements designed with glassmorphism in mind.</p>
              </div>

              <div className="w-full flex-1">
                <p className="leading-relaxed">
                  Starkdesign is a premium, high-fidelity UI component registry built for developers working with AI agent environments and modern web applications.
                </p>
                <p className="leading-relaxed mt-4">
                  Each element is styled with a sleek, minimalist frosted glass aesthetic and interactive micro-animations to create a state-of-the-art developer interface.
                </p>

                <h2 className="font-heading mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Features</h2>
                <ul className="my-4 ml-6 list-disc text-sm space-y-2">
                  <li><strong>Rich Aesthetics</strong>: Frosted glassmorphism, dynamic glow rings, and responsive telemetry cards.</li>
                  <li><strong>Tailwind CSS Core</strong>: Designed to match standard tailwind properties.</li>
                  <li><strong>Polymorphic</strong>: Clean wrappers using the <code className="bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded font-mono text-xs">asChild</code> prop for ultimate composability.</li>
                  <li><strong>Fully Responsive</strong>: Deeply tested across mobile, tablet, and desktop screens.</li>
                </ul>

                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-6 mt-8">
                  <div />
                  <Link
                    href="/docs/components"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white hover:underline"
                  >
                    <span>Next: Components</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {slug === "usage" && (
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Usage</h1>
                <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">How to import and compile Starkdesign components.</p>
              </div>

              <div className="w-full flex-1">
                <p className="leading-relaxed">
                  Starkdesign components are designed to be copied directly into your project's components folder. This matches the shadcn paradigm, allowing you to edit and customize the source code as needed.
                </p>

                <h2 className="font-heading mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Importing Elements</h2>
                <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f8f8] dark:bg-zinc-950/20 mt-4">
                  <div className="border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900/50">
                    <span className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider">Example Usage</span>
                    <button
                      onClick={() => handleCopyCode(`import { Button } from "@/components/ui/glass-button"\nimport { StatusIndicator } from "@/components/ui/status-indicator"\n\nexport default function Widget() {\n  return (\n    <div className="p-4 border rounded-xl">\n      <StatusIndicator status="active" label="AI Ready" pulse />\n      <Button variant="glass" className="mt-4">Deploy Agent</Button>\n    </div>\n  )\n}`, "usage-code")}
                      className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-450 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-all"
                    >
                      {copiedCode === "usage-code" ? <Check className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-auto text-zinc-800 dark:text-zinc-300">
                    <code>{`import { Button } from "@/components/ui/glass-button"\nimport { StatusIndicator } from "@/components/ui/status-indicator"\n\nexport default function Widget() {\n  return (\n    <div className="p-4 border rounded-xl">\n      <StatusIndicator status="active" label="AI Ready" pulse />\n      <Button variant="glass" className="mt-4">Deploy Agent</Button>\n    </div>\n  )\n}`}</code>
                  </pre>
                </div>

                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-6 mt-8">
                  <Link
                    href="/docs/setup"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-550 hover:text-zinc-900 dark:hover:text-white hover:underline"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Previous: Setup</span>
                  </Link>
                  <Link
                    href="/docs/troubleshooting"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white hover:underline"
                  >
                    <span>Next: Troubleshooting</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {slug === "troubleshooting" && (
            <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">Troubleshooting</h1>
                <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">Common problems and solutions when developing Starkdesign elements.</p>
              </div>

              <div className="w-full flex-1">
                <h2 className="font-heading text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Hydration Error mismatches</h2>
                <p className="leading-relaxed mt-2 text-sm">
                  Hydration issues occur when rendering component parameters that depend on dynamic viewport dimensions or themes during server-side pre-rendering. Ensure you wrap client-only components in a `useEffect` gate to load them after initial mount.
                </p>

                <h2 className="font-heading mt-6 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Responsive Container Overflow</h2>
                <p className="leading-relaxed mt-2 text-sm">
                  Ensure all custom grid layouts use fluid widths (`w-full`) and avoid fixed margins or hardcoded widths. Utilize responsive flex wrapping to ensure clean scaling down to 320px mobile screens.
                </p>

                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-6 mt-8">
                  <Link
                    href="/docs/usage"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-550 hover:text-zinc-900 dark:hover:text-white hover:underline"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Previous: Usage</span>
                  </Link>
                  <div />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
