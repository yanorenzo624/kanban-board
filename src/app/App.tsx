// import { BoardProvider } from "./providers/BoardProvider"
// import Board from "@/features/board/Board"

// export default function App() {
//   return (
//     <BoardProvider>
//       <div className="min-h-screen bg-slate-100 p-6">
//         <Board />
//       </div>
//     </BoardProvider>
//   )
// }

import { BoardProvider } from "./providers/BoardProvider"
import { useTheme } from "@/shared/hooks/useTheme"
import Board from "@/features/board/Board"

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
      <header className="flex items-center justify-end gap-2 p-4">
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
      </header>

      <BoardProvider>
        <main className="p-6">
          <Board />
        </main>
      </BoardProvider>
    </div>
  )
}
