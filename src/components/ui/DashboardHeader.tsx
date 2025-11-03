import { LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import image from "../../../public/favicon.png";

import { ProjectSelector } from "./ProjectSelector";

const DashboardHeader = () => {
  const { clearUser } = useContext(UserContext)!;
  return (
    <header className="border-b pb-2 mb-5 bg-card shadow-sm">
      <div className="flex items-center justify-around mb-4 mr-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              {/* <CheckSquare className="w-8 h-8 text-white" /> */}
              <img className="w-8 h-8" src={image} alt="Images" />
            </div>
            <h1 className="text-2xl font-bold">TaskFlow </h1>
          </div>
        </div>
        <div className="mr-5 hover:bg-green-500 rounded-xl">
          <button
            onClick={() => clearUser()}
            className="rounded-lg flex p-3 items-center text-nowrap gap-2 hover:text-white"
          >
            <LogOut className=" h-5 mr-2 hover:text-white" />
            Sign Out
          </button>
        </div>
      </div>
      <ProjectSelector />
    </header>
  );
};

export default DashboardHeader;
