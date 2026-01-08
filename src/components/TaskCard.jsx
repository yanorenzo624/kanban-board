const TaskCard = ({ task }) => {
  return (
    <div className="rounded-lg border p-3 bg-white dark:bg-gray-800">
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
    </div>
  );
};

export default TaskCard;
