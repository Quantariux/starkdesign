import * as React from "react"
import { Button } from "@/registry/components/glass-button"
import { StatusIndicator } from "@/registry/components/status-indicator"
import { Send, User, Cpu, ChevronDown, ChevronUp } from "lucide-react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  thought?: string
  toolCall?: { name: string; args: string; status: "running" | "success" | "error" }
}

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "Please summarize the current shadcn/ui registry status."
  },
  {
    id: "m2",
    role: "assistant",
    content: "Here is the summary of your registry components:",
    thought: "The user is asking about shadcn/ui registry. I need to list our registry items and verify schemas.",
    toolCall: {
      name: "list_registry_items",
      args: "{ filter: 'active' }",
      status: "success"
    }
  }
]

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

    const userMsgId = String(Date.now())
    const userMsg: Message = { id: userMsgId, role: "user", content: inputText }
    setMessages(prev => [...prev, userMsg])
    setInputText("")

    // Simulate AI streaming response
    setTimeout(() => {
      const assistantMsgId = String(Date.now() + 1)
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: `I have analyzed your request. I am adding a new block: \`${inputText}\` to the Starkdesign library directory.`,
        thought: "Processing user command to expand the library components database.",
        toolCall: {
          name: "create_registry_item",
          args: JSON.stringify({ name: inputText.toLowerCase().replace(/\s+/g, "-") }),
          status: "success"
        }
      }
      setMessages(prev => [...prev, assistantMsg])
      setExpandedThoughts(prev => ({ ...prev, [assistantMsgId]: true }))
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[450px] rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-md overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-100/80 dark:bg-zinc-900/60 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-blue-400" />
          <span className="font-semibold text-xs tracking-wider text-zinc-700 dark:text-zinc-200">AGENT WORKSPACE</span>
        </div>
        <StatusIndicator status="active" label="Agent Active" />
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2">
            {/* Avatar Row */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                {msg.role === "user" ? (
                  <User className="h-3.5 w-3.5 text-sky-400" />
                ) : (
                  <Cpu className="h-3.5 w-3.5 text-blue-400" />
                )}
              </div>
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                {msg.role === "user" ? "USER" : "STARKDESIGN AGENT"}
              </span>
            </div>

            {/* Content Bubble */}
            <div className="pl-8">
              <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg p-3 text-zinc-800 dark:text-zinc-100 max-w-xl">
                {msg.content}
              </div>

              {/* Thought Steps */}
              {msg.thought && (
                <div className="mt-2.5 rounded border border-blue-500/20 dark:border-blue-500/10 bg-blue-500/5 dark:bg-blue-950/10 overflow-hidden max-w-xl">
                  <button
                    onClick={() => toggleThought(msg.id)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-950/20 transition-all select-none cursor-pointer"
                  >
                    <span>Thought Process</span>
                    {expandedThoughts[msg.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {expandedThoughts[msg.id] && (
                    <div className="px-3 py-2 text-xs text-blue-700 dark:text-blue-300 border-t border-blue-500/5 bg-blue-500/5 dark:bg-blue-950/5 leading-normal">
                      {msg.thought}
                    </div>
                  )}
                </div>
              )}

              {/* Tool Execution Block */}
              {msg.toolCall && (
                <div className="mt-2 rounded border border-black/5 dark:border-white/5 bg-zinc-100 dark:bg-zinc-900/60 p-2.5 text-xs max-w-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                  <div className="flex flex-wrap items-center gap-1.5 text-zinc-700 dark:text-zinc-300 min-w-0">
                    <span className="text-blue-400">tool:</span>
                    <span className="font-semibold">{msg.toolCall.name}</span>
                    <span className="text-zinc-500 text-[10px] break-all">{msg.toolCall.args}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold shrink-0 self-start sm:self-auto">
                    {msg.toolCall.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-zinc-100/40 dark:bg-zinc-900/40 border-t border-black/5 dark:border-white/5 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask the agent to build something..."
          className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-blue-500"
        />
        <Button variant="glass" size="icon" type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
