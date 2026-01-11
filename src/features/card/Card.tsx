import type { Card as CardType } from "@/features/board/board.types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type Props = {
  card: CardType
  columnId?: string
}

export default function Card({ card, columnId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: card.id,
    data: { columnId },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-white p-3 shadow-sm hover:shadow active:cursor-grabbing"
    >
      <h3 className="text-sm font-medium text-slate-800">
        {card.title}
      </h3>
      {card.description && (
        <p className="mt-1 text-xs text-slate-500">
          {card.description}
        </p>
      )}
    </div>
  )
}
