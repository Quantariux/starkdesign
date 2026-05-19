import * as React from "react"
import { Button } from "@/registry/components/glass-button"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from "@/registry/components/glass-card"
import { Key, Eye, EyeOff, User, Lock, Sliders, Check, Copy } from "lucide-react"

export function SettingsPanel() {
  const [showKey, setShowKey] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const apiKey = "sk-starkdesign-a8f3b292c0199e71f5c"

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 p-4 space-y-1">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2">
          Dashboard Settings
        </div>
        {[
          { icon: User, label: "Profile Settings", active: true },
          { icon: Sliders, label: "Execution Preferences", active: false },
          { icon: Lock, label: "Security & Keys", active: false },
        ].map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              item.active
                ? "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/10 dark:border-white/10"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Security & API Keys</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Configure system authentication tokens used by agent processes.
          </p>
        </div>

        {/* API key section utilizing primitives */}
        <GlassCard glow hoverGlow={false} className="border-blue-500/20">
          <GlassCardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-blue-400" />
              <GlassCardTitle className="text-sm">Active Secret Key</GlassCardTitle>
            </div>
            <GlassCardDescription className="text-[10px]">
              Do not share this key. Avoid checking it into version control repositories.
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassCardContent className="space-y-4">
            <div className="flex items-center gap-2 bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-md p-2.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
              <span className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none select-all font-semibold dark:font-normal">
                {showKey ? apiKey : "••••••••••••••••••••••••••••••••••••"}
              </span>
              <button
                onClick={() => setShowKey(!showKey)}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy API key"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </GlassCardContent>

          <GlassCardFooter className="flex justify-end gap-2 border-t border-black/5 dark:border-white/5 pt-4">
            <Button variant="ghost" size="sm">Regenerate Key</Button>
            <Button variant="glass" size="sm">Save Changes</Button>
          </GlassCardFooter>
        </GlassCard>
      </div>
    </div>
  )
}
