import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasksApi";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";
import { createTask } from "../api/tasksApi";


const STATUSES = [
	{ key: "todo", label: "Todo" },
	{ key: "in-progress", label: "In Progress" },
	{ key: "done", label: "Done" },
];

const TasksPage = () => {
	const [status, setStatus] = useState("loading"); // loading | success | error
	const [tasks, setTasks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchTasks()
			.then((data) => {
				setTasks(data);
				setStatus("success");
			})
			.catch(() => {
				setStatus("error");
			});
	}, []);

	const handleCreateTask = async (task) => {
		try {
			const newTask = await createTask(task);
			setTasks((prev) => [...prev, newTask]);
			setIsModalOpen(false);
		} catch {
			alert("Failed to create task");
		}
	};

	if (status === "error") {
		return (
			<p className="text-red-500">
				Failed to load tasks.
			</p>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-bold">Kanban Board</h2>

			<button
				onClick={() => setIsModalOpen(true)}
				className="px-4 py-2 rounded bg-blue-600 text-white"
			>
				+ Add Task
			</button>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{STATUSES.map(({ key, label }) => (
					<TaskColumn
						key={key}
						title={label}
						loading={status === "loading"}
						tasks={tasks.filter((task) => task.status === key)}
					/>
				))}
			</div>
			{isModalOpen && (
				<CreateTaskModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCreateTask}
				/>
			)}
		</div>
	);
};

export default TasksPage;
