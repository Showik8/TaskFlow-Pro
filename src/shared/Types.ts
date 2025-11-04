export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
  projectId: string;
  assignedTo: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  _id: string;
  title: string;
  description?: string;
  members?: string[];
  createdAt?: Date;
  tasks?: Task[];
  updatedAt?: Date;
};

export type User = {
  createdAt: string;
  email: string;
  name: string;
  profileImageUrl: string;
  role: "admin" | "member";
  updatedAt: string;
  __v: number;
  _id: string;
  token: string;
};
