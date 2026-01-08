import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";

import TasksPage from "../TasksPage";
import * as tasksApi from "../../api/tasksApi";

vi.mock("../../api/tasksApi", () => ({
	__esModule: true,
	fetchTasks: vi.fn(),
	createTask: vi.fn(),
	updateTask: vi.fn(),
	deleteTask: vi.fn(),
}));

describe("TasksPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Initial load", () => {
		it("renders tasks from API", async () => {
			tasksApi.fetchTasks.mockResolvedValue([
				{ id: "1", title: "Task A", status: "todo", priority: "low" },
			]);

			render(<TasksPage />);

			expect(await screen.findByText("Task A")).toBeInTheDocument();
		});
	});

	describe("Create Task", () => {
		it("creates and displays a new task", async () => {
			tasksApi.fetchTasks.mockResolvedValue([]);
			tasksApi.createTask.mockResolvedValue({
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
			expect(tasksApi.createTask).toHaveBeenCalled();
		});
	});

	describe("Move Task", () => {
		it("moves task to the next column and calls API", async () => {
			tasksApi.fetchTasks.mockResolvedValue([
				{
					id: "1",
					title: "Task A",
					status: "todo",
					priority: "low",
				},
			]);

			tasksApi.updateTask.mockResolvedValue({
				id: "1",
				title: "Task A",
				status: "in-progress",
				priority: "low",
			});

			const user = userEvent.setup();
			render(<TasksPage />);

			// Wait for task to appear
			const task = await screen.findByText("Task A");
			expect(task).toBeInTheDocument();

			// Click Move →
			const moveBtn = screen.getByRole("button", { name: /move/i });
			await user.click(moveBtn);

			// Task should still exist (now in next column)
			expect(await screen.findByText("Task A")).toBeInTheDocument();

			// API should be called
			expect(tasksApi.updateTask).toHaveBeenCalledWith(
				expect.objectContaining({
					id: "1",
					status: "in-progress",
				})
			);
		});
	});

	describe("Delete Task", () => {
		it("deletes a task when confirmed", async () => {
			tasksApi.fetchTasks.mockResolvedValue([
				{ id: 1, title: "Task A", status: "todo" },
				{ id: 2, title: "Task B", status: "todo" },
			]);
	
			tasksApi.deleteTask.mockResolvedValue();
	
			// mock confirm dialog
			vi.spyOn(window, "confirm").mockReturnValue(true);
	
			render(<TasksPage />);
	
			// wait for tasks to appear
			expect(await screen.findByText("Task A")).toBeInTheDocument();
	
			// click delete
			const deleteButtons = screen.getAllByText("Delete");
			await userEvent.click(deleteButtons[0]);
	
			// task should disappear
			await waitFor(() => {
				expect(screen.queryByText("Task A")).not.toBeInTheDocument();
			});
	
			// API called
			expect(tasksApi.deleteTask).toHaveBeenCalledWith(1);
		});
	});
});
