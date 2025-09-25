import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  PiChartPieSliceFill,
  PiForkKnifeBold,
  PiShoppingBagOpenBold,
} from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuCircleUserRound, LuDumbbell, LuSettings } from "react-icons/lu";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import logo from "../../assets/images/logo.png";
import { TbDiamond } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
export default function Sidebar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className=" bg-primary text-white h-screen sticky left-0 z-20 flex flex-col justify-between w-48 md:w-64 xl:w-72">
      <div className="p-10 mx-auto">
        <img src={logo} alt="" />
      </div>

      <nav className="flex-1 font-nunito mt-10">
        <ul className="space-y-2">
          <li>
            <NavLink
              to={"/"}
              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white  "
            >
              <RxDashboard className="mr-3 text-2xl" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/clients"}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith("/clients")
                  ? "flex items-center px-8 py-4 bg-gradient-to-r from-[#0E4269] via-[#00B5CA] to-[#FECB2C] text-white"
                  : "flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white"
              }
            >
              <LuCircleUserRound className="mr-3 text-2xl" />
              User
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/subscription"}
              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white  "
            >
              <TbDiamond className="mr-3 text-2xl" />
              Monetization
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to={"/workout"}
              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white  "
            >
              <LuDumbbell className="text-xl mr-3 -rotate-45" />
              Workout Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/subscription"}
              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white  "
            >
              <PiShoppingBagOpenBold className="mr-3 text-xl" />
              Subscription
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to={"/settings"}
              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#0E4269] hover:via-[#00B5CA] hover:to-[#FECB2C] hover:text-white  "
            >
              <LuSettings className="mr-3 text-2xl" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={"/login"}>
        <button
          onClick={handleLogout}
          className="flex items-center px-8 py-8 text-xl w-full mx-auto text-white"
        >
          <LogOut className="mr-3" />
          Logout
        </button>
      </Link>
    </div>
  );
}
