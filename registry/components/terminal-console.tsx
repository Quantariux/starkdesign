import * as React from "react"
import { Terminal, Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LogLine {
  id: string
  type: "info" | "success" | "warning" | "error" | "input"
  timestamp: string
  content: string
}

const initialLogs: LogLine[] = [
  { id: "1", type: "info", timestamp: "09:00:01", content: "Initializing Starkdesign Agent environment..." },
  { id: "2", type: "success", timestamp: "09:00:03", content: "Environment loaded successfully. Server listening on port 3001." },
  { id: "3", type: "info", timestamp: "09:01:10", content: "Incoming connection from client agent: Quantariux." },
  { id: "4", type: "input", timestamp: "09:01:12", content: "User: Build a registry system." },
  { id: "5", type: "info", timestamp: "09:01:13", content: "Executing task planner... calling tool: search_web" },
  { id: "6", type: "success", timestamp: "09:01:15", content: "Tool search_web output retrieved. Conforms to registry-item.json." },
]

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
    <div className="w-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden font-mono text-xs shadow-2xl">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-violet-400" />
          <span className="text-zinc-200 font-semibold tracking-wider">starkdesign@agent-terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold transition-all cursor-pointer select-none"
          >
            <Play className="h-3 w-3" />
            Simulate
          </button>
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Clear terminal"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 h-64 overflow-y-auto space-y-2 select-text scrollbar-thin">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
            <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
            <span
              className={cn(
                log.type === "success" && "text-emerald-400",
                log.type === "warning" && "text-amber-400",
                log.type === "error" && "text-rose-400",
                log.type === "input" && "text-sky-400",
                log.type === "info" && "text-zinc-300"
              )}
            >
              {log.type === "input" ? "> " : ""}
              {log.content}
            </span>
          </div>
        ))}
        {isSimulating && (
          <div className="flex items-center gap-1 text-zinc-500 select-none animate-pulse">
            <span>$ running task steps...</span>
            <span className="w-1.5 h-3.5 bg-zinc-500" />
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}
