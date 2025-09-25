import { FaTrello } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuTableProperties } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import { NavProvider } from "../context/NavContext";
import Navbar from "../components/Navbar";
import { BoardManagementProvider } from "../context/BoardManagementContext";
import { ListManagementProvider } from "../context/ListManagementContext";
import { SidebarWorkspace } from "../components/SidebarWorkspace";

const SidebarWorspaceData1 = [
  {
    title: "Bảng",
    iconLeft: <FaTrello />,
    iconRight: null,
    to: "/w/workspace3/",
  },
  {
    title: "Thành viên",
    iconLeft: <IoPersonOutline />,
    iconRight: <IoAddSharp />,
    to: "/w/workspace3/members",
  },
];

const SidebarWorspaceData2 = [
  {
    title: "Bảng",
    iconLeft: <LuTableProperties />,
    iconRight: null,
    to: "/w/workspace3/view/table",
  },
  {
    title: "Lịch",
    iconLeft: <FaRegCalendarAlt />,
    iconRight: null,
    to: "/w/workspace3/view/calendar",
  },
];

type LayoutWorkspaceProps = {
  HeaderBar: React.FC;
  classNameForMainPart?: string;
};

export const LayoutWorkspace = ({
  HeaderBar,
  classNameForMainPart,
}: LayoutWorkspaceProps) => {
  return (
    <div className="w-full h-screen">
      <NavProvider>
        <Navbar />
      </NavProvider>

      <BoardManagementProvider>
        <ListManagementProvider>
          <main className="w-full grid grid-cols-[2fr_8fr]">
            {/* phan sidebar cua workspace */}
            <div className="mt-[62px]">
              <SidebarWorkspace
                SidebarWorspaceData1={SidebarWorspaceData1}
                SidebarWorspaceData2={SidebarWorspaceData2}
              />
            </div>

            {/* phan main */}
            <div className={`${classNameForMainPart}`}>
              <HeaderBar />
              <Outlet />
            </div>
          </main>
        </ListManagementProvider>
      </BoardManagementProvider>
    </div>
  );
};

// p-4 mt-[62px] flex flex-col
