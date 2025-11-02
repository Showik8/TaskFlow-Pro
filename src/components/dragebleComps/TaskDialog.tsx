import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Task {
  id?: string;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  position?: number;
  project_id?: string;
}

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (task: Partial<Task>) => void;
  onDelete?: () => void;
  defaultStatus?: string;
}
const TaskDialog = ({
  open,
  onOpenChange,
  task,
  onSave,
  defaultStatus = "todo",
}: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [dueDate, setDueDate] = useState<Date | undefined>();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setDueDate(task.due_date ? new Date(task.due_date) : undefined);
    } else {
      setTitle("");
      setDescription("");
      setStatus(defaultStatus);
      setDueDate(undefined);
    }
  }, [task, defaultStatus, open]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      due_date: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
    });

    console.log({
      id: task?.id,
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      due_date: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
    });

    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="title" className="block font-medium">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              maxLength={200}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              rows={3}
              maxLength={1000}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label htmlFor="status" className="block font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <label className="block font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                setDueDate(
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center mt-6">
          {/* Cancel / Save buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
            >
              {task ? "Update" : "Create"}
            </button>
          </div>
        </div>

        {/* Close overlay */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TaskDialog;
