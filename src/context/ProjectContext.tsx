import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "./UserContext";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";
import type { Project } from "../shared/Types";
import DashboardHeader from "../components/ui/DashboardHeader";

interface ProjectContext {
  projects: Project[];
  setProjects: CallableFunction;
  setSelectedProject: CallableFunction;
  removeProject: CallableFunction;
  setCreatedNewProject: CallableFunction;
  currentProjectId: string;
  SelectedProject: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext<ProjectContext | undefined>(
  undefined
);

interface ProjectProviderProps {
  children: ReactNode;
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [removed, setRemoved] = useState(false);
  const [createdNewProject, setCreatedNewProject] = useState(false);
  const [SelectedProject, setSelectedProject] = useState<string>("");

  const { user } = useContext(UserContext)!;

  const currentProjectId = getProjectID();

  function getProjectID() {
    const cur = projects.filter(
      (project) => project.title == SelectedProject
    )[0];
    return cur?._id;
  }

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0].title);
    }
  }, [projects]);

  useEffect(() => {
    if (!user) return;

    const controller = new AbortController();

    const getProjects = async () => {
      try {
        const userId = user._id;
        const response = await axiosInstance.get(
          `${API_PATHS.PROJECT.USERS_PROJECTS}/${userId}`,
          {
            signal: controller.signal,
          }
        );

        setProjects(response.data.projects);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("❌ Request cancelled");
        } else {
          console.error("Error fetching projects:", error);
        }
      }
    };

    getProjects();

    return () => {
      controller.abort();
    };
  }, [user, removed, createdNewProject]);

  async function removeProject() {
    const project = projects.filter((pr) => pr.title == SelectedProject)[0];
    try {
      const res = await axiosInstance.delete(
        API_PATHS.PROJECT.DElETE_PROJCETS + project._id
      );

      setProjects((pre) => pre.filter((pr) => pr._id != project._id));

      setRemoved(true);
      toast.success(res.data.message);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        setSelectedProject,
        removeProject,
        setCreatedNewProject,
        currentProjectId,
        SelectedProject,
      }}
    >
      {user && <DashboardHeader />}
      {children}

      <Toaster position="top-center" />
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
