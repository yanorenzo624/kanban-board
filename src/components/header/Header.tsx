import { useTheme } from "@/shared/hooks/useTheme"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="
        sticky top-0 z-50
        flex h-14 items-center justify-between
        border-b px-4
        bg-white/80 backdrop-blur
        dark:bg-slate-950/80
        border-slate-200 dark:border-slate-800
      "
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">🗂</span>
        <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Kanban Board
        </h1>
      </div>

      <div className="flex items-center gap-2">
				<button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="
            rounded-md border px-3 py-1.5 text-sm
            text-slate-700 hover:bg-slate-200
            dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800
          "
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  )
}
