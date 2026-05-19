"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/registry/components/glass-button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="glass" size="icon" className="w-9 h-9 opacity-50">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light")
    else if (theme === "light") setTheme("system")
    else setTheme("dark")
  }

  return (
    <Button
      variant="glass"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      title={`Current theme: ${theme}. Click to switch.`}
    >
      {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
      {theme === "dark" && <Moon className="h-4 w-4 text-violet-400" />}
      {theme === "system" && <Laptop className="h-4 w-4 text-zinc-400" />}
    </Button>
  )
}
