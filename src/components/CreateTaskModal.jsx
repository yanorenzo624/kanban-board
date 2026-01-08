import { useState } from "react";

const CreateTaskModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, priority, status: "todo" });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4 w-80"
      >
        <h3 className="font-semibold">Create Task</h3>

        <input
          required
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
