import { useContext, useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { BoardContext } from "@/app/providers/BoardProvider"
import Column from "@/features/column/Column"
import Card from "@/features/card/Card"

export default function Board() {
  const { state, dispatch } = useContext(BoardContext)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  function handleDragStart(event: any) {
    setActiveCardId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveCardId(null)

    if (!over) return

    const activeCardId = active.id as string
    const overId = over.id as string

    const fromColumnId = active.data.current?.columnId
    const toColumnId = over.data.current?.columnId

    if (!fromColumnId || !toColumnId) return

    const toColumn = state.columns[toColumnId]
    const overIndex = toColumn.cardIds.indexOf(overId)

    dispatch({
      type: "MOVE_CARD",
      cardId: activeCardId,
      fromColumnId,
      toColumnId,
      toIndex: overIndex === -1 ? toColumn.cardIds.length : overIndex,
    })
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId]
          return <Column key={column.id} column={column} />
        })}
      </div>

      <DragOverlay>
        {activeCardId ? (
          <div className="rotate-1">
            <Card card={state.cards[activeCardId]} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
