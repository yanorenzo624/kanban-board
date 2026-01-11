import { BoardContext } from "@/app/providers/BoardProvider"
import type { Card as CardType } from "@/features/board/board.types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from "clsx"
import { useContext } from "react"

type Props = {
  card: CardType
  columnId?: string
}

export default function Card({ card, columnId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { columnId },
  })

  const { dispatch } = useContext(BoardContext)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group transition-opacity rounded-lg bg-white p-3 shadow-sm hover:shadow",
        isDragging && "opacity-30",
      )}
    >
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="flex justify-between items-start gap-2 cursor-grab active:cursor-grabbing"
      >
        <h3 className="text-sm font-medium text-slate-800">
          {card.title}
        </h3>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            dispatch({
              type: "DELETE_CARD",
              cardId: card.id,
              columnId: columnId!,
            })
          }}
          className="
            rounded-md p-1 text-slate-400
            opacity-0 transition
            group-hover:opacity-100
            hover:bg-red-50 hover:text-red-600
            group-hover:opacity-100
            focus:opacity-100 focus:outline-none
          "
          aria-label="Delete card"
          title="Delete card"
        >
          ✕
        </button>
      </div>
      {card.description && (
        <p className="mt-1 text-xs text-slate-500">
          {card.description}
        </p>
      )}
    </div>
  )
}
