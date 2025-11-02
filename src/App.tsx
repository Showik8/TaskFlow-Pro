import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import { ManageUsers } from "./pages/Admin/ManageUsers";
import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./context/UserContext";
import { useContext } from "react";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/my-tasks" element={<MyTasks />} />
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails />}
            />
          </Route>
          <Route path="/" element={<Root />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext)!;
  if (loading) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
