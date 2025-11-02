import DashboardHeader from "../components/ui/DashboardHeader";
import Drag from "../components/dragebleComps/Drag";
const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className="w-full flex justify-center items-center">
        <Drag />
      </div>
    </>
  );
};

export default DashboardLayout;
