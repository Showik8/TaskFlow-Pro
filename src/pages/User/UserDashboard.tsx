import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../layouts/DashboardLayout";

const Dashboard = () => {
  useUserAuth();
  return <DashboardLayout></DashboardLayout>;
};

export default Dashboard;
