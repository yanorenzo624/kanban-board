import { useState } from "react";
import { useBoardStore } from "@/features/board/board.store";

interface AddCardProps {
  columnId: string;
}

export function AddCard({ columnId }: AddCardProps) {
  const [value, setValue] = useState("");
  const addCard = useBoardStore((s) => s.addCard);

  function handleSubmit() {
    addCard(columnId, value);
    setValue("");
  }

  return (
    <div className="mt-2 space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a card..."
        className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        >
          Add
        </button>

        <button
          onClick={() => setValue("")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
