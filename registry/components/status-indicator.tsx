import * as React from "react"
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

export { StatusIndicator, statusIndicatorVariants }
