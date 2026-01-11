import { createContext, useReducer, useEffect, type ReactNode } from "react"
import { boardReducer } from "@/features/board/board.reducer"
import type { BoardState } from "@/features/board/board.types"

const initialState: BoardState = {
  columnOrder: ["todo", "in-progress", "done"],
  cards: {
    "1": { id: "1", title: "Set up project" },
    "2": { id: "2", title: "Design data model" },
    "3": { id: "3", title: "Build static UI" },
  },
  columns: {
    todo: { id: "todo", title: "Todo", cardIds: ["1", "2"] },
    "in-progress": { id: "in-progress", title: "In Progress", cardIds: ["3"] },
    done: { id: "done", title: "Done", cardIds: [] },
  },
}

export const BoardContext = createContext<any>(null)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, initialState, (init) => {
    const saved = localStorage.getItem("kanban-board")
    return saved ? JSON.parse(saved) : init
  })

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(state))
  }, [state])

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}
