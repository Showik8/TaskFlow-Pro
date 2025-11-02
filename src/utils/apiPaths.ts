export const BASE_URL = "http://localhost:8000";

type userId = {
  userId: string;
};
type taskId = {
  taskId: string;
};

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  USERS: {
    GET_ALL_USERS: "",
    GET_USER_BY_ID: (userId: userId) => `/api/users/${userId}`,
    CREATE_USER: "",
    UPDATE_USER: (userId: userId) => `/api/users/${userId}`,
    DELETE_USER: (userId: userId) => `/api/users/${userId}`,
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",
    GET_ALL_TASKS: "/api/tasks",
    GET_TASK_BY_ID: (taskId: taskId) => `/api/tasks/${taskId}`,
    CREATE_TASK: "/api/taskts",
    UPDATE_TASK: (taskId: taskId) => `/api/tasks/${taskId}`,
    DELETE_TASK: (taskId: taskId) => `/api/tasks/${taskId}`,

    UPDATE_TASK_STATUS: (taskId: taskId) => `/api/tasks/${taskId}/status`,
    UPDATE_TASK_CHECKLIST: (taskId: taskId) => `/api/tasks/${taskId}/todo`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },

  PROJECT: {
    GET_PROJECTS: "/api/project",
    CREATE_PROJECT: "/api/project",
    USERS_PROJECTS: "/api/project/users-projects",
  },
};
