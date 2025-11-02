import { useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Column from "./Column";

type ColumnType = "todo" | "inProgress" | "completed";

type TasksType = {
  [key in ColumnType]: string[];
};

const initialData: TasksType = {
  todo: ["Task 1", "Task 2", "Task 3"],
  inProgress: ["Task 4"],
  completed: ["Task 5"],
};

const Board = () => {
  const [tasks, setTasks] = useState<TasksType>(initialData);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId as ColumnType;
    const destColumn = destination.droppableId as ColumnType;

    if (sourceColumn === destColumn) {
      const columnTasks = Array.from(tasks[sourceColumn]);
      const [movedItem] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: columnTasks,
      });
    } else {
      const sourceTasks = Array.from(tasks[sourceColumn]);
      const destTasks = Array.from(tasks[destColumn]);
      const [movedItem] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className="w-full p-4 grid gap-4 
                  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Object.entries(tasks).map(([columnId, items]) => (
          <Column
            key={columnId}
            columnId={columnId as ColumnType}
            items={items}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
