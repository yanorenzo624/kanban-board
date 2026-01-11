import type { Column as ColumnType } from "@/features/board/board.types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import Card from "@/features/card/Card"
import { useContext } from "react"
import { BoardContext } from "@/app/providers/BoardProvider"

type Props = {
  column: ColumnType
}

export default function Column({ column }: Props) {
  const { state } = useContext(BoardContext)
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  })

  return (
    <div ref={setNodeRef} className="w-72 shrink-0 rounded-xl bg-slate-200 p-4">
      <h2 className="mb-4 text-lg font-semibold text-slate-700">
        {column.title}
      </h2>

      <SortableContext
        items={column.cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {column.cardIds.map((cardId) => {
            const card = state.cards[cardId]
            return (
              <Card
                key={card.id}
                card={card}
                columnId={column.id}
              />
            )
          })}
        </div>
      </SortableContext>

      <button className="mt-4 w-full rounded-lg border border-dashed border-slate-400 py-2 text-sm text-slate-600 hover:bg-slate-300">
        + Add card
      </button>
    </div>
  )
}
