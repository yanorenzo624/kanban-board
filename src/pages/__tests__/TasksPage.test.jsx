import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import TasksPage from "../TasksPage";
import { fetchTasks, createTask, updateTask } from "../../api/tasksApi";

vi.mock("../../api/tasksApi", () => ({
  __esModule: true,
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
}));

describe("TasksPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial load", () => {
    it("renders tasks from API", async () => {
      fetchTasks.mockResolvedValue([
        { id: "1", title: "Task A", status: "todo", priority: "low" },
      ]);

      render(<TasksPage />);

      expect(await screen.findByText("Task A")).toBeInTheDocument();
    });
  });

  describe("Create Task", () => {
    it("creates and displays a new task", async () => {
      fetchTasks.mockResolvedValue([]);
      createTask.mockResolvedValue({
        id: "2",
        title: "New Task",
        status: "todo",
        priority: "medium",
      });

      const user = userEvent.setup();
      render(<TasksPage />);

      await user.click(
        screen.getByRole("button", { name: /\+ add task/i })
      );

      await user.type(
        screen.getByPlaceholderText(/task title/i),
        "New Task"
      );

      await user.click(
        screen.getByRole("button", { name: /create/i })
      );

      expect(await screen.findByText("New Task")).toBeInTheDocument();
      expect(createTask).toHaveBeenCalled();
    });
  });
});
