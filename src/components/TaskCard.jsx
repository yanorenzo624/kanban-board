import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, onMove, onDelete }) => {
	const { attributes, listeners, setNodeRef, transform } =
		useDraggable({
			id: task.id,
		});

	const style = transform
		? {
			transform: `translate(${transform.x}px, ${transform.y}px)`,
		}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="rounded-lg border p-3 bg-white dark:bg-gray-800"
		>
			<h4 className="font-medium text-gray-900 dark:text-gray-100">
				{task.title}
			</h4>

			{task.description && (
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{task.description}
				</p>
			)}

			<span className="text-xs text-gray-400">
				Priority: {task.priority}
			</span>

			<div className="mt-2 flex gap-3">
				{task.status !== "done" && (
					<button
						onClick={() => onMove(task)}
						className="text-sm text-blue-600 hover:underline"
					>
						Move →
					</button>
				)}

				<button
					onClick={() => onDelete(task)}
					className="text-sm text-red-600 hover:underline"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TaskCard;
