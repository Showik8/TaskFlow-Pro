import { useContext, useEffect, useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ProjectModal from "./ProjectModal";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";

export interface Task extends Document {
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  dueDate?: Date;
  status: "todo" | "inProgress" | "completed";
}

interface Project {
  id: string;
  title: string;
  description?: string;
  members?: string[];
  createdAt?: Date;
  tasks?: Task[];
  updatedAt?: Date;
}

export const ProjectSelector = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const { user } = useContext(UserContext)!;

  const handleCreateProject = async (project: {
    title: string;
    description?: string;
    members?: string[];
  }) => {
    const newProject = { ...project, id: uuidv4() };

    // Update local state immediately so the new project shows in the select
    setProjects((prev) => [...prev, newProject]);

    try {
      // Send to backend
      const response = await axiosInstance.post(
        API_PATHS.PROJECT.CREATE_PROJECT,
        {
          title: newProject.title,
          description: newProject.description,
          members: newProject.members,
          createdBy: user._id,
        }
      );
      console.log("Project created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  useEffect(() => {
    async function getProjects() {
      if (!user) return;

      try {
        const userId = user._id;
        const response = await axiosInstance.get(
          `${API_PATHS.PROJECT.USERS_PROJECTS}/${userId}`
        );
        setProjects(response.data.projects);
        console.log(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    getProjects();
  }, [user]);

  return (
    <>
      {/* Project selector */}
      <div className="w-full flex items-center gap-3 px-5">
        <FolderOpen className="h-5 w-5 text-blue-600" />
        <select className="border rounded px-3 py-2 w-[250px] focus:ring focus:outline-none">
          <option value="">Select a project</option>
          {projects.map((project, ind) => (
            <option key={project.id + ind.toString()} value={project.title}>
              {project.title}
            </option>
          ))}
        </select>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="border rounded p-2 hover:bg-gray-100"
          aria-label="Create new project"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Project creation modal */}
      <ProjectModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
};
