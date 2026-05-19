"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/registry/components/glass-button"
import { Code, ExternalLink, ArrowLeft, Check, Check as CheckIcon } from "lucide-react"

export default function ExplorerPage() {
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null)

  const copyToClipboard = (text: string, path: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  const explorerItems = [
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
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Header Toolbar — Full width, sticky */}
      <header className="sticky top-0 z-40 h-12 w-full bg-background/80 backdrop-blur-md flex items-center justify-between px-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4">
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
            <span className="text-foreground font-semibold">Explorer</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/docs/introduction"
            className="text-xs font-semibold hover:text-foreground text-zinc-550 dark:text-zinc-400 flex items-center gap-1 transition-colors"
          >
            Documentation
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Home
            </Link>
          </div>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl flex items-center gap-2">
            <Code className="h-7 w-7 text-blue-500" />
            Registry Explorer
          </h1>
          <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            Inspect and download static JSON metadata schema files hosted directly on starkdesign.site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorerItems.map((item) => {
            const fullUrl = `https://starkdesign.site${item.path}`
            return (
              <div
                key={item.name}
                className="p-5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-355 dark:hover:border-zinc-700 transition-all flex flex-col justify-between h-48"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100 font-semibold">{item.name}</span>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-normal mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-450 dark:text-zinc-500 font-mono">
                    <span className="truncate max-w-[180px]">{item.path}</span>
                    <button
                      onClick={() => copyToClipboard(fullUrl, item.path)}
                      className="text-zinc-450 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      title="Copy URL"
                    >
                      {copiedPath === item.path ? (
                        <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2500/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-end">
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      View JSON
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-6 bg-zinc-50/50 dark:bg-zinc-950/20 mt-auto">
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
    </div>
  )
}
