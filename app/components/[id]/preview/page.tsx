"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/registry/components/glass-button"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardContent,
  GlassCardFooter,
} from "@/registry/components/glass-card"
import { StatusIndicator } from "@/registry/components/status-indicator"
import { TerminalConsole } from "@/registry/components/terminal-console"
import { AgentChat } from "@/registry/components/agent-chat"
import { MetricsDashboard } from "@/registry/components/metrics-dashboard"
import { SettingsPanel } from "@/registry/components/settings-panel"
import { ModeToggle } from "@/components/mode-toggle"

export default function ComponentPreviewPage() {
  const params = useParams()
  const componentId = params.id as string
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 sm:p-12 relative overflow-auto">
      {/* Floating Mode Toggle in the top-right corner */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="w-full flex items-center justify-center">
        {componentId === "glass-button" && (
          <Button variant="glass" size="default">
            Click Action
          </Button>
        )}

        {componentId === "status-indicator" && (
          <StatusIndicator status="active" label="AI Agent Online" pulse />
        )}

        {componentId === "glass-card" && (
          <GlassCard glow hoverGlow className="w-full max-w-sm">
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

        {componentId === "agent-chat" && (
          <div className="max-w-xl mx-auto w-full font-sans">
            <AgentChat />
          </div>
        )}

        {componentId === "terminal-console" && (
          <div className="max-w-2xl mx-auto w-full">
            <TerminalConsole />
          </div>
        )}

        {componentId === "metrics-dashboard" && (
          <div className="w-full max-w-5xl font-sans">
            <MetricsDashboard />
          </div>
        )}

        {componentId === "settings-panel" && (
          <div className="w-full max-w-4xl font-sans">
            <SettingsPanel />
          </div>
        )}
      </div>
    </div>
  )
}
