import React from "react";
import type { Task } from "../../shared/Types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  if (!data) return null;
  const creat = data.createdAt;
  const updated = data.updatedAt;
  const date = new Date(creat as string);
  const updateDate = new Date(updated as string);

  const Deadline = data.dueDate?.split("T")[0];

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const UpdatedFormat = updateDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Title:</span>{" "}
            {data.title.split("_").join(" ")}
          </p>
          <p>
            <span className="font-medium">Description:</span> {data.description}
          </p>
          <p>
            <span className="font-medium">Status:</span> {data.status}
          </p>
          <p>
            <span className="font-medium">Priority:</span> {data.priority}
          </p>

          <p>
            <span className="font-medium">Deadline :</span>{" "}
            {Deadline ? Deadline : "Dont Choosed"}
          </p>
          <p>
            <span className="font-medium">Created At: </span> {formattedDate}
          </p>
          <p>
            <span className="font-medium">Updated At: </span> {UpdatedFormat}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
