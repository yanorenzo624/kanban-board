import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";

const TaskColumn = ({ title, tasks, loading }) => {
  return (
    <div className="flex-1 space-y-3">
      <h3 className="font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>

      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))
        : tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
    </div>
  );
};

export default TaskColumn;
