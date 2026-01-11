import { useContext, useState } from "react"
import type { Column as ColumnType } from "@/features/board/board.types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import clsx from "clsx"
import Card from "@/features/card/Card"
import { BoardContext } from "@/app/providers/BoardProvider"
import { ColumnHeader } from "./ColumnHeader"

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
        "w-72 shrink-0 rounded-xl p-4 transition-colors border border-slate-300 dark:border-slate-700",
        isOver
          ? "bg-blue-200 dark:bg-slate-900"
          : "bg-slate-200 dark:bg-slate-800"
      )}
    >
      <ColumnHeader columnId={column.id} />

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
            className="
              w-full rounded-md border px-2 py-1 text-sm
              bg-white text-slate-900
              focus:ring-2 focus:ring-blue-500
              dark:bg-slate-800 dark:text-slate-100
              dark:border-slate-700
            "
            placeholder="Card title"
          />
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="
            mt-4 w-full rounded-lg 
            border border-dashed border-slate-400 
            py-2 text-sm 
            text-slate-600 hover:bg-slate-300

            dark:border-slate-700 dark:bg-slate-800
            dark:text-slate-300 dark:hover:bg-slate-900
          ">
          + Add card
        </button>
      )}
    </div>
  )
}
