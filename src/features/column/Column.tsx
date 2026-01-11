import { useContext, useState } from "react"
import type { Column as ColumnType } from "@/features/board/board.types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import clsx from "clsx"
import Card from "@/features/card/Card"
import { BoardContext } from "@/app/providers/BoardProvider"

type Props = {
  column: ColumnType
}

export default function Column({ column }: Props) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState("")
  const { state, dispatch } = useContext(BoardContext)
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  })

  function cancelAdd() {
    setTitle("")
    setIsAdding(false)
  }


  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "w-72 shrink-0 rounded-xl p-4 transition-colors",
        isOver ? "bg-blue-200" : "bg-slate-200"
      )}
    >
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

      {isAdding ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!title.trim()) return

            dispatch({
              type: "ADD_CARD",
              columnId: column.id,
              title,
            })

            cancelAdd()
          }}
          className="mt-4 space-y-2"
        >
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault()
                cancelAdd()
              }
            }}
            className="w-full rounded-md border p-2 text-sm"
            placeholder="Card title"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-blue-600 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              Add
            </button>

            <button
              type="button"
              onClick={cancelAdd}
              className="flex-1 rounded-md border py-1.5 text-sm text-slate-600 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 w-full rounded-lg border border-dashed border-slate-400 py-2 text-sm text-slate-600 hover:bg-slate-300">
          + Add card
        </button>
      )}
    </div>
  )
}
