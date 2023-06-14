import { Outlet } from "react-router-dom";
import SideMenu from "../../Dashboard/SideMenu";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideMenu />
      </div>
      <div className=" w-[80%] h-[95vh]  mt-4 p-6 rounded-xl bg-white mx-auto overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
