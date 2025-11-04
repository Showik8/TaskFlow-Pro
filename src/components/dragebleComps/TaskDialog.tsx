import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ProjectContext } from "../../context/ProjectContext";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import type { Task } from "../../shared/Types";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: CallableFunction;
  onDelete?: () => void;
  defaultStatus?: string;
  setTasksChanged: CallableFunction;
  setTask: CallableFunction;
}

const TaskDialog = ({
  open,
  setTasksChanged,
  onOpenChange,
  task,
  setTask,
  onSave,
  defaultStatus = "todo",
}: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState("Medium");
  const { currentProjectId } = useContext(ProjectContext)!;
  const { user } = useContext(UserContext)!;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    } else {
      setTitle("");
      setDescription("");
      setStatus(defaultStatus);
      setDueDate(undefined);
    }
  }, [task, defaultStatus, open]);

  const handleSave = () => {
    if (!title.trim()) return;

    if (!currentProjectId) {
      toast.error("Choose Project");
    }

    const TaskData = {
      projectId: currentProjectId,
      id: uuidv4(),
      title: title.trim().toLowerCase(),
      description: description.trim() || undefined,
      status,
      dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
      assignedTo: [user!._id],
      priority: priority,
    };

    onSave(TaskData);

    onOpenChange(false);
  };
  const handleEdit = async () => {
    if (!task) return; // safety check
    if (!title.trim()) return;
    if (!currentProjectId) {
      toast.error("Choose Project");
      return;
    }

    const updatedTask = {
      title: title.trim().toLowerCase(),
      description: description.trim() || undefined,
      status,
      dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
      assignedTo: task.assignedTo || [user!._id],
      priority,
      projectId: currentProjectId,
    };

    try {
      // Call your backend update endpoint
      const res = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK + task._id,
        updatedTask
      );
      toast.success(res.data.message || "Task updated successfully");
      setTasksChanged((pre: boolean) => !pre);
    } catch (error) {
      console.error(error);
    }
    onOpenChange(false);
    setTask(null); // close modal
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
              <option value="inProgress">In Progress</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="status" className="block font-medium">
              Priority
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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

        <div className="flex justify-end items-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={task ? handleEdit : handleSave}
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
      <Toaster position="top-center" />
    </div>
  );
};

export default TaskDialog;
