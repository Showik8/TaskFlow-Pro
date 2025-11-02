import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: string;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={task} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 bg-white rounded-lg shadow-md border hover:shadow-lg transition duration-200 md:w-full sm:w-full ${
            snapshot.isDragging ? "bg-gray-50" : ""
          }`}
        >
          <h3 className="font-medium">{task}</h3>
          <p className="text-sm text-gray-400">For This</p>
          <span className="inline-block mt-2 text-xs text-white bg-red-500 px-2 py-1 rounded-full">
            Nov 2
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
