import { Board } from "@/components/board/Board";

export function BoardPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full overflow-x-auto  overflow-y-hidden p-6">
        <Board />
      </div>
    </div>
  );
}
