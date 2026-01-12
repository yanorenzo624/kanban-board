import { BoardProvider } from "./providers/BoardProvider"
import Board from "@/features/board/Board"
import { Header } from "@/components/header/Header"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
      <Header />
      <BoardProvider>
        <main className="p-6">
          <Board />
        </main>
      </BoardProvider>
    </div>
  )
}
