export const BASE_URL = "http://localhost:8000";
// export const BASE_URL = "task-flow-backend-three.vercel.app/";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  TASKS: {
    CREATE_TASK: "/api/task",
    GET_TASKS: `/api/task/`,
    DELTE_TASK: "/api/task/",
    UPDATE_TASK: "/api/task/",
    UPDATE_TASK_STATUS: "/api/task/status/",
    GET_TASK_BY_TITLE: "/api/task?",
  },

  PROJECT: {
    GET_PROJECTS: "/api/project",
    CREATE_PROJECT: "/api/project",
    USERS_PROJECTS: "/api/project/users-projects",
    DElETE_PROJCETS: "/api/project/",
  },
};
