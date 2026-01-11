import { useContext } from "react"
import { BoardContext } from "@/app/providers/BoardProvider"
import Column from "@/features/column/Column"

export default function Board() {
  const { state } = useContext(BoardContext)

  return (
    <div className="flex gap-6 overflow-x-auto">
      {state.columnOrder.map((columnId: string) => {
        const column = state.columns[columnId]
        return <Column key={column.id} column={column} />
      })}
    </div>
  )
}
