import { useContext, useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ProjectModal from "./ProjectModal";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { ProjectContext } from "../../context/ProjectContext";
import { Trash } from "lucide-react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import type { Project } from "../../shared/Types";
import TaskFilters from "./TaskFilters";

export const ProjectSelector = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useContext(UserContext)!;
  const {
    projects,
    setProjects,
    setSelectedProject,
    removeProject,
    setCreatedNewProject,
    SelectedProject,
  } = useContext(ProjectContext)!;

  const handleCreateProject = async (project: {
    title: string;
    description?: string;
    members?: string[];
  }) => {
    const newProject = { ...project, id: uuidv4() };

    setProjects((prev: Project[]) => [...prev, newProject]);

    try {
      // Send to backend
      const response = await axiosInstance.post(
        API_PATHS.PROJECT.CREATE_PROJECT,
        {
          title: newProject.title,
          description: newProject.description,
          members: newProject.members,
          createdBy: user?._id,
        }
      );
      setCreatedNewProject(true);
      toast.success(response.data.message);
      console.log(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="w-full flex justify-center lg:justify-between pr-10 ">
      {/* Project selector */}
      <div className=" flex items-center gap-3 px-5 flex-col sm:flex-row w-full ">
        <div className=" flex justify-center items-center gap-2 ">
          <FolderOpen className="h-8 w-8 text-blue-600" />
          <select
            onChange={(e) => setSelectedProject(e.target.value)}
            name="Project Selection"
            className="border rounded px-3 py-2 w-60  focus:ring focus:outline-none"
          >
            {projects.length > 0 ? (
              <option value={SelectedProject}>{SelectedProject}</option>
            ) : (
              <option value="">Select a project</option>
            )}
            {projects.map((project, ind) => (
              <option key={project._id + ind.toString()} value={project.title}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="border rounded p-2 hover:bg-gray-100"
            aria-label="Create new project"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            className="flex gap-5 hover:bg-red-200 rounded-2xl justify-center items-center p-2"
            onClick={() => removeProject()}
          >
            <Trash color="red" />
          </button>
        </div>
        <TaskFilters />
      </div>

      <h1 className="hidden lg:block text-2xl font-semibold text-gray-800 tracking-wide whitespace-nowrap">
        {user?.name}
      </h1>

      {/* Project creation modal */}
      <ProjectModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />

      <Toaster position="top-center" />
    </div>
  );
};
