import { createContext, useEffect, useState, type ReactNode } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

interface User {
  createdAt: string;
  email: string;
  name: string;
  profileImageUrl: string;
  role: "admin" | "member";
  updatedAt: string;
  __v: number;
  _id: string;
  token: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.log("User is not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
