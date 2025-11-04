import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskDialog from "./TaskDialog";
import { useState } from "react";
import type { Task } from "../../shared/Types";

type ColumnType = "todo" | "inProgress" | "completed";

interface ColumnProps {
  columnId: ColumnType;
  todos: Task[];
  onSave: (task: Task) => void;
  onDelete: (id: string) => void;
  setTasksChanged: CallableFunction;
}

const columnColors: Record<ColumnType, string> = {
  todo: "border-gray-300 bg-gray-100",
  inProgress: "border-blue-400 bg-blue-100",
  completed: "border-green-400 bg-green-100",
};

const Column = ({
  columnId,
  todos,
  onSave,
  onDelete,
  setTasksChanged,
}: ColumnProps) => {
  const color = columnColors[columnId];
  const [openModal, setOpenModal] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  async function onEdit(data: Task) {
    setOpenModal(true);
    setTask(data);
  }

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col rounded-xl p-4 shadow border-l-4 ${color}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg capitalize">
              {columnId} ({todos.length})
            </h2>
            <button
              onClick={() => setOpenModal(true)}
              className="text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>

          {/* Task List */}
          <div className="flex-1 flex flex-col gap-3 min-h-[100px]">
            {todos.map((task, index) => (
              <TaskCard
                setTasksChanged={setTasksChanged}
                onDelete={onDelete}
                onEdit={onEdit}
                key={task._id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>

          {/* Create Task Modal */}
          <TaskDialog
            setTasksChanged={setTasksChanged}
            task={task}
            onSave={onSave}
            open={openModal}
            onOpenChange={setOpenModal}
            setTask={setTask}
          />
        </div>
      )}
    </Droppable>
  );
};

export default Column;
