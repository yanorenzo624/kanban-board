const TaskSkeleton = () => {
  return (
    <div className="rounded-lg border p-3 animate-pulse bg-gray-100 dark:bg-gray-700">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
    </div>
  );
};

export default TaskSkeleton;
