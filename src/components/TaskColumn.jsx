import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";

const TaskColumn = ({ status, title, tasks, loading, onMove, onDelete }) => {
	const { setNodeRef } = useDroppable({
    id: status,
  });

	return (
		<div ref={setNodeRef} className="flex-1 space-y-3">
			<h3 className="font-semibold text-gray-700 dark:text-gray-200">
				{title}
			</h3>

			{loading
				? Array.from({ length: 3 }).map((_, i) => (
					<TaskSkeleton key={i} />
				))
				: <div className="space-y-3">
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onMove={onMove}
							onDelete={onDelete}
						/>
					))}
				</div>}
		</div>
	);
};

export default TaskColumn;
