import { useContext, useEffect, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { type Task } from "../../shared/Types";
import toast, { Toaster } from "react-hot-toast";
import { ProjectContext } from "../../context/ProjectContext";

type ColumnType = "todo" | "inProgress" | "completed";

interface TasksState {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

const Board = () => {
  const { currentProjectId } = useContext(ProjectContext)!;
  const [tasks, setTasks] = useState<TasksState | null>(null);
  const [tasksChanged, setTasksChanged] = useState(false);

  // ✅ Handle Drag & Drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || !tasks) return;

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;

    const updatedTasks = { ...tasks };
    const sourceItems = Array.from(updatedTasks[sourceCol]);
    const [movedTask] = sourceItems.splice(source.index, 1);
    movedTask.status = destCol;
    handleEdit(movedTask);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedTask);
      updatedTasks[sourceCol] = sourceItems;
    } else {
      const destItems = Array.from(updatedTasks[destCol]);
      destItems.splice(destination.index, 0, movedTask);
      updatedTasks[sourceCol] = sourceItems;
      updatedTasks[destCol] = destItems;
    }

    setTasks(updatedTasks);
  };
  // ✅ Create Task
  async function onSave(data: Task) {
    try {
      const res = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, data);
      toast.success(res.data.message);
      setTasksChanged((pre) => !pre);
    } catch {
      toast.error("Task Not Created");
    }
  }

  async function onDelete(id: string) {
    try {
      const res = await axiosInstance.delete(API_PATHS.TASKS.DELTE_TASK + id);
      toast.success(res.data.message);
      setTasksChanged((pre) => !pre);
    } catch {
      console.log("errmk");
    }
  }

  // ✅ Fetch from API & Group
  useEffect(() => {
    async function fetchTasks() {
      try {
        if (!currentProjectId) return;
        const res = await axiosInstance.get(
          API_PATHS.TASKS.GET_TASKS + currentProjectId
        );

        const grouped: TasksState = {
          todo: res.data.filter((t: Task) => t.status === "todo"),
          inProgress: res.data.filter((t: Task) => t.status === "inProgress"),
          completed: res.data.filter((t: Task) => t.status === "completed"),
        };

        setTasks(grouped);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, [currentProjectId, tasksChanged]);

  const handleEdit = async (task: Task) => {
    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_STATUS + task._id, {
        status: task.status,
      });
    } catch {
      console.log("error");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tasks &&
          (Object.keys(tasks) as ColumnType[]).map((columnKey) => (
            <Column
              setTasksChanged={setTasksChanged}
              key={columnKey}
              columnId={columnKey}
              todos={tasks[columnKey]}
              onSave={onSave}
              onDelete={onDelete}
            />
          ))}
        <Toaster position="top-center" />
      </div>
    </DragDropContext>
  );
};

export default Board;

// const Seed = ({ title }: { title: ColumnType }) => {
//   const color = {
//     todo: "border-gray-300 bg-gray-100",
//     inProgress: "border-blue-400 bg-blue-100",
//     completed: "border-green-400 bg-green-100",
//   };
//   return (
//     <>
//       <div
//         className={`flex flex-col rounded-xl p-4 shadow border-l-4 ${color[title]}`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-semibold text-lg capitalize">{title}</h2>
//           <button className="text-xl font-bold text-gray-600 hover:text-gray-800">
//             +
//           </button>
//         </div>

//         {/* Task List */}
//         <div className="flex-1 flex flex-col gap-3 min-h-[100px]"></div>
//       </div>
//     </>
//   );
// };
