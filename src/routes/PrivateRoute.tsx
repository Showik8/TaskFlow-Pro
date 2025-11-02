import { Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  console.log(allowedRoles);
  return <Outlet />;
};

export default PrivateRoute;
