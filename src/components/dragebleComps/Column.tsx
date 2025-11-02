import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskDialog from "./TaskDialog";
import { useState } from "react";

interface ColumnProps {
  columnId: string;
  items: string[];
}

type ColumnType = "todo" | "inProgress" | "completed";

const columnColors: Record<ColumnType, string> = {
  todo: "border-gray-300 bg-gray-100",
  inProgress: "border-blue-400 bg-blue-100",
  completed: "border-green-400 bg-green-100",
};

const Column = ({ columnId, items }: ColumnProps) => {
  const color = columnColors[columnId as ColumnType];
  const [opneModal, setOpenModal] = useState(false);

  function onSave() {
    console.log("saved");
  }

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={` flex flex-col rounded-xl p-4 shadow border-l-4 ${color} md:w-full sm:w-full`}
        >
          {/* Column Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-semibold text-lg capitalize">
                {columnId.replace(/([A-Z])/g, " ")}
              </h2>
              <p className="text-sm text-gray-500">{items.length} tasks</p>
            </div>
            <button
              onClick={() => setOpenModal(!opneModal)}
              className="text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              +
            </button>
          </div>

          {/* Task List */}
          <div className="flex-1 flex flex-col gap-3 min-h-[100px]">
            {items.map((task, index) => (
              <TaskCard key={task} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
          <TaskDialog
            onSave={onSave}
            open={opneModal}
            onOpenChange={setOpenModal}
          />
        </div>
      )}
    </Droppable>
  );
};

export default Column;
