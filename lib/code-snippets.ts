export const codeSnippets = {
  glassButton: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "bg-black/5 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 text-foreground hover:bg-black/10 dark:hover:bg-black/35 hover:border-black/15 dark:hover:border-white/20",
        glow:
          "relative overflow-hidden bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border border-zinc-700/50 dark:border-zinc-300/50 transition-all duration-300 hover:border-zinc-500 dark:hover:border-zinc-400",
        gradient:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:via-indigo-500 hover:to-sky-500 text-white border-0",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,

  glassCard: `import * as React from "react"
import { cn } from "@/lib/utils"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glow?: boolean
    hoverGlow?: boolean
  }
>(({ className, glow = false, hoverGlow = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md text-card-foreground transition-all duration-300",
      glow && "border-black/20 dark:border-white/20",
      hoverGlow && "hover:bg-white/80 dark:hover:bg-zinc-900/50 hover:border-black/15 dark:hover:border-white/25",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
GlassCardHeader.displayName = "GlassCardHeader"

const GlassCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
))
GlassCardTitle.displayName = "GlassCardTitle"

const GlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
GlassCardDescription.displayName = "GlassCardDescription"

const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
GlassCardContent.displayName = "GlassCardContent"

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
GlassCardFooter.displayName = "GlassCardFooter"

export {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
}`,

  statusIndicator: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 backdrop-blur-md",
  {
    variants: {
      status: {
        idle: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        streaming: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        loading: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        error: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  }
)

const dotVariants = cva(
  "relative flex h-2 w-2 rounded-full",
  {
    variants: {
      status: {
        idle: "bg-zinc-500",
        active: "bg-emerald-500",
        streaming: "bg-sky-500",
        loading: "bg-amber-500",
        error: "bg-rose-500",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  label?: string
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, label, pulse = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statusIndicatorVariants({ status, className }))}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          {pulse && status !== "idle" && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                status === "active" && "bg-emerald-400",
                status === "streaming" && "bg-sky-400",
                status === "loading" && "bg-amber-400",
                status === "error" && "bg-rose-400"
              )}
            />
          )}
          <span className={dotVariants({ status })} />
        </span>
        {label && <span className="tracking-wide select-none">{label}</span>}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }`,

  terminalConsole: `import * as React from "react"
import { Terminal, Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LogLine {
  id: string
  type: "info" | "success" | "warning" | "error" | "input"
  timestamp: string
  content: string
}

export function TerminalConsole() {
  const [logs, setLogs] = React.useState<LogLine[]>(initialLogs)
  const [isSimulating, setIsSimulating] = React.useState(false)
  const terminalEndRef = React.useRef<HTMLDivElement>(null)

  const clearLogs = () => setLogs([])

  const runSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setLogs([
      { id: "1", type: "info", timestamp: new Date().toLocaleTimeString(), content: "Initializing trace simulation..." }
    ])

    const steps = [
      { type: "info", content: "Analyzing workspace repository schemas..." },
      { type: "info", content: "Building registry/components/glass-button.tsx" },
      { type: "success", content: "Build succeeded for: glass-button." },
      { type: "info", content: "Writing registry.json manifest..." },
      { type: "success", content: "Registry hosted successfully on starkdesign.site" },
    ]

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          {
            id: String(prev.length + 1),
            type: step.type as any,
            timestamp: new Date().toLocaleTimeString(),
            content: step.content
          }
        ])
        if (index === steps.length - 1) {
          setIsSimulating(false)
        }
      }, (index + 1) * 1200)
    })
  }

  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  return (
    <div className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-zinc-950 text-zinc-100 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-blue-400" />
          <span className="text-zinc-200 font-semibold tracking-wider">starkdesign@agent-terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold transition-all cursor-pointer select-none"
          >
            <Play className="h-3 w-3" />
            Simulate
          </button>
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="p-4 h-64 overflow-y-auto space-y-2 select-text scrollbar-thin">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
            <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
            <span className={cn(
              log.type === "success" && "text-emerald-400",
              log.type === "warning" && "text-amber-400",
              log.type === "error" && "text-rose-400",
              log.type === "input" && "text-sky-400",
              log.type === "info" && "text-zinc-300"
            )}>
              {log.type === "input" ? "> " : ""}
              {log.content}
            </span>
          </div>
        ))}
        {isSimulating && (
          <div className="flex items-center gap-1 text-zinc-500 animate-pulse">
            <span>$ running task steps...</span>
            <span className="w-1.5 h-3.5 bg-zinc-500" />
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}`,

  agentChat: `import * as React from "react"
import { Button } from "@/registry/components/glass-button"
import { StatusIndicator } from "@/registry/components/status-indicator"
import { Send, User, Cpu, ChevronDown, ChevronUp } from "lucide-react"

export function AgentChat() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [inputText, setInputText] = React.useState("")
  const [expandedThoughts, setExpandedThoughts] = React.useState<Record<string, boolean>>({ m2: true })

  const toggleThought = (id: string) => {
    setExpandedThoughts(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMsg: Message = { id: String(Date.now()), role: "user", content: inputText }
    setMessages(prev => [...prev, userMsg])
    setInputText("")

    setTimeout(() => {
      const assistantMsgId = String(Date.now() + 1)
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: \`I have analyzed your request. I am adding a new block: \\\`\${inputText}\\\` to the Starkdesign library directory.\`,
        thought: "Processing user command to expand the library components database.",
        toolCall: {
          name: "create_registry_item",
          args: JSON.stringify({ name: inputText.toLowerCase().replace(/\\s+/g, "-") }),
          status: "success"
        }
      }
      setMessages(prev => [...prev, assistantMsg])
      setExpandedThoughts(prev => ({ ...prev, [assistantMsgId]: true }))
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[450px] rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-100/80 dark:bg-zinc-900/60 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-blue-400" />
          <span className="font-semibold text-xs tracking-wider text-zinc-700 dark:text-zinc-200">AGENT WORKSPACE</span>
        </div>
        <StatusIndicator status="active" label="Agent Active" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                {msg.role === "user" ? <User className="h-3.5 w-3.5 text-sky-400" /> : <Cpu className="h-3.5 w-3.5 text-blue-400" />}
              </div>
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                {msg.role === "user" ? "USER" : "STARKDESIGN AGENT"}
              </span>
            </div>
            <div className="pl-8">
              <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg p-3 text-zinc-800 dark:text-zinc-100 max-w-xl">
                {msg.content}
              </div>
              {msg.thought && (
                <div className="mt-2.5 rounded border border-blue-500/20 dark:border-blue-500/10 bg-blue-50/5 dark:bg-blue-950/10 overflow-hidden max-w-xl">
                  <button onClick={() => toggleThought(msg.id)} className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold text-blue-650 dark:text-blue-400">
                    <span>Thought Process</span>
                    {expandedThoughts[msg.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {expandedThoughts[msg.id] && (
                    <div className="px-3 py-2 text-xs text-blue-700 dark:text-blue-300 border-t border-blue-500/5 bg-blue-500/5 dark:bg-blue-950/5">
                      {msg.thought}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 bg-zinc-100/40 dark:bg-zinc-900/40 border-t border-black/5 dark:border-white/5 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask the agent to build something..."
          className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:border-blue-500"
        />
        <Button variant="glass" size="icon" type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}`,

  metricsDashboard: `import * as React from "react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/registry/components/glass-card"
import { Cpu, Flame, Database, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <GlassCard glow hoverGlow>
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-zinc-550 dark:text-zinc-300">Token Throughput</GlassCardTitle>
          <Cpu className="h-4 w-4 text-blue-400" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">45,182</div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 mt-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+12.2% from last hour</span>
          </div>
        </GlassCardContent>
      </GlassCard>
      {/* ... Add other metrics cards ... */}
    </div>
  )
}`,

  settingsPanel: `import * as React from "react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassCardFooter } from "@/registry/components/glass-card"
import { Button } from "@/registry/components/glass-button"
import { Key, Eye, EyeOff, Copy, Check, User, Sliders, Lock } from "lucide-react"

export function SettingsPanel() {
  const [showKey, setShowKey] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const apiKey = "sk-starkdesign-prod-8f2e9a11bc32e"

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md overflow-hidden">
      <div className="w-full md:w-56 border-r border-black/5 dark:border-white/5 p-4 space-y-1">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2">Dashboard Settings</div>
        {/* Navigation list */}
      </div>
      <div className="flex-1 p-6 space-y-6">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">Security & API Keys</h3>
        {/* Secret Key card container */}
      </div>
    </div>
  )
}`
};
