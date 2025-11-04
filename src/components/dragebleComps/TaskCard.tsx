import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../../shared/Types";
import { Edit, Trash } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  setTasksChanged: CallableFunction;
}

const TaskCard = ({ task, index, onDelete, onEdit }: TaskCardProps) => {
  const draggableId = task._id || `${task.title}-${index}`;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative p-3 bg-white rounded-lg shadow-md border hover:shadow-lg transition duration-200 md:w-full sm:w-full ${
            snapshot.isDragging ? "bg-gray-50" : ""
          }`}
        >
          <button
            aria-label="Remove Task"
            onClick={() => onDelete(task._id)}
            className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <Trash className="h-4 w-4" />
          </button>
          <button
            aria-label="Edit Task"
            onClick={() => onEdit(task)}
            className="absolute top-2 right-10 w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:text-yellow-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Task Title */}
          <h3 aria-label="task name" className="font-medium">
            {task.title.split("_").join(" ")}
          </h3>

          {/* Task Description */}
          {task.description && (
            <p
              aria-label="task Description"
              className="text-sm text-gray-700 line-clamp-2 mt-1"
            >
              {task.description}
            </p>
          )}

          {/* Footer: Priority & Date */}
          <div className="flex justify-between items-center mt-2">
            {task.priority && (
              <span
                aria-label="task priority"
                className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-500 text-white"
                    : task.priority === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority}
              </span>
            )}
            {task.dueDate && (
              <span
                aria-label="task Deadline"
                className="text-xs text-gray-500"
              >
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
