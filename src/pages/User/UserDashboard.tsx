import { useContext } from "react";
// import Drag from "../../components/dragebleComps/Drag";
import { useUserAuth } from "../../hooks/useUserAuth";
import { ProjectContext } from "../../context/ProjectContext";
import React, { Suspense } from "react";

const Dashboard = () => {
  useUserAuth();
  const { currentProjectId } = useContext(ProjectContext)!;
  const Drag = React.lazy(() => import("../../components/dragebleComps/Drag"));

  if (currentProjectId)
    return (
      <>
        <div className="w-full flex justify-center items-center">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            }
          >
            <Drag />
          </Suspense>
        </div>
      </>
    );
};

export default Dashboard;
