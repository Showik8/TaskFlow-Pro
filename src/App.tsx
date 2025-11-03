import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserProvider, { UserContext } from "./context/UserContext";
import ProjectProvider from "./context/ProjectContext";
import UserDashboard from "./pages/User/UserDashboard";
import { useContext } from "react";

const App = () => {
  return (
    <UserProvider>
      <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />

            <Route path="/" element={<Root />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
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
  if (user) return <Navigate to="/user/dashboard" />;
};
