import { useBoardStore } from "@/features/board/board.store";
import { Column } from "@/components/column/Column";

export function Board() {
  const columnOrder = useBoardStore((s) => s.columnOrder);
  const addColumn = useBoardStore((s) => s.addColumn);

  return (
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
  );
}
