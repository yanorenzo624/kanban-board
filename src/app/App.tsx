import { BoardProvider } from "./providers/BoardProvider"
import Board from "@/features/board/Board"

export default function App() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-slate-100 p-6">
        <Board />
      </div>
    </BoardProvider>
  )
}
