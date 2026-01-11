import { useBoardStore } from "@/features/board/board.store";
import { Card } from "@/components/card/Card";

interface ColumnProps {
  columnId: string;
}

export function Column({ columnId }: ColumnProps) {
  const column = useBoardStore((s) => s.columns[columnId]);
  const cardsMap = useBoardStore((s) => s.cards);

  if (!column) return null;

  const cards = column.cardIds
    .map((id) => cardsMap[id])
    .filter(Boolean);

  return (
    <div className="w-72 shrink-0 rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 font-semibold text-gray-800">
        {column.title}
      </h2>

      <div className="space-y-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
