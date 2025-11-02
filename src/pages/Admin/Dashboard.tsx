import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../layouts/DashboardLayout";

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext)!;
  console.log(user);
  return <DashboardLayout></DashboardLayout>;
};

export default Dashboard;
