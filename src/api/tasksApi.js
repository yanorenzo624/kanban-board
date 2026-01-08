import { mockTasks } from "../data/mockTasks";

let tasks = [...mockTasks]; // in-memory “DB”

const delay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = async () => {
  await delay();
  return [...tasks];
};

export const createTask = async (task) => {
  await delay();

  const newTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  return newTask;
};

export const updateTask = async (id, updates) => {
  await delay();

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task
  );

  return tasks.find((task) => task.id === id);
};

export const deleteTask = async (taskId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate random failure
      Math.random() > 0.1
        ? resolve()
        : reject(new Error("Delete failed"));
    }, 500);
  });
};
