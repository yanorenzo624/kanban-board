import type { Card as CardType } from "@/features/board/board.types"

type Props = {
  card: CardType
}

export default function Card({ card }: Props) {
  return (
    <div className="cursor-pointer rounded-lg bg-white p-3 shadow-sm hover:shadow">
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
