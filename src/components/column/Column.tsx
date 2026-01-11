import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBoardStore } from "@/features/board/board.store";
import { Card } from "@/components/card/Card";
import { AddCard } from "./AddCard";

export function Column({ columnId }: { columnId: string }) {
  const column = useBoardStore((s) => s.columns[columnId]);
  const cardsMap = useBoardStore((s) => s.cards);

  if (!column) return null;

  const cards = column.cardIds
    .map((id) => cardsMap[id])
    .filter(Boolean);

  return (
    <div className="flex h-[calc(100vh-3rem)] w-72 shrink-0 flex-col rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 font-semibold text-gray-800">
        {column.title}
      </h2>

      <SortableContext
        items={column.cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>

      <AddCard columnId={columnId} />
    </div>
  );
}
