import { useContext, useState } from "react";
import Input from "./Input";
import { SearchCheckIcon } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { type Task } from "../../shared/Types";
import TaskModal from "./TaskModal.";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { ProjectContext } from "../../context/ProjectContext";

const TaskFilters = () => {
  const [taskName, setTaskName] = useState("");
  const [task, SetTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentProjectId } = useContext(ProjectContext)!;

  async function searchTask() {
    const title = taskName.trim().split(" ").join("_");
    const path = `title=${title}&&id=${currentProjectId}`;

    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_TITLE + path
      );
      SetTask(res.data);
      if (res) {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("Task Not Founded");
    }
  }

  return (
    <div className="md:ml-40 ">
      <div className="flex justify-center items-center border-1 border-gray-300 rounded-2xl px-2 font-semibold">
        <Input
          value={taskName}
          outline={false}
          onChange={({ target }: { target: { value: string } }) =>
            setTaskName(target.value)
          }
          type={"text"}
          placeholder={"Search Tasks"}
        />
        <SearchCheckIcon onClick={searchTask} />
      </div>

      {task && (
        <TaskModal
          isOpen={isModalOpen}
          data={task}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default TaskFilters;
