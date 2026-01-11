import {
  DndContext,
  type DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";
import { useBoardStore } from "@/features/board/board.store";
import { Column } from "@/components/column/Column";

export function Board() {
  const columnOrder = useBoardStore((s) => s.columnOrder);
  const addColumn = useBoardStore((s) => s.addColumn);
  const moveCard = useBoardStore((s) => s.moveCard);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const activeCardId = active.id as string;
    const overCardId = over.id as string;

    const state = useBoardStore.getState();

    let sourceColumnId: string | null = null;
    let targetColumnId: string | null = null;

    for (const colId of state.columnOrder) {
      if (state.columns[colId].cardIds.includes(activeCardId)) {
        sourceColumnId = colId;
      }
      if (state.columns[colId].cardIds.includes(overCardId)) {
        targetColumnId = colId;
      }
    }

    if (!sourceColumnId || !targetColumnId) return;

    const targetIndex =
      state.columns[targetColumnId].cardIds.indexOf(overCardId);

    moveCard(
      activeCardId,
      sourceColumnId,
      targetColumnId,
      targetIndex,
    );
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      autoScroll={{
        threshold: {
          x: 0.2,
          y: 0.2,
        },
      }}
    >
      <div className="flex gap-4">
        {columnOrder.map((columnId) => (
          <Column key={columnId} columnId={columnId} />
        ))}
        <button
          onClick={() => addColumn("New Column")}
          className="w-72 shrink-0 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400"
        >
          + Add Column
        </button>
      </div>
    </DndContext>
  );
}
