import type { Card as CardType } from "@/features/board/board.types";

interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm">
      {card.title}
    </div>
  );
}
