import { SiTrello } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { NavProvider } from "../../context/NavContext";
import { Sidebar } from "../../components/Sidebar";
import { Footer } from "../../components/Footer";

const dataSampleSidebar = [
  {
    title: "Business",
    iconLeft: null,
    iconRight: null,
    to: "/samples/business",
  },
  {
    title: "Thiết kế",
    iconLeft: null,
    iconRight: null,
    to: "samples/design",
  },
  {
    title: "Giáo dục",
    iconLeft: null,
    iconRight: null,
    to: "samples/education",
  },
  {
    title: "Kỹ thuật",
    iconLeft: null,
    iconRight: null,
    to: "samples/technology",
  },
  {
    title: "Marketing",
    iconLeft: null,
    iconRight: null,
    to: "samples/marketing",
  },
  {
    title: "Nhân sự & Điều hành",
    iconLeft: null,
    iconRight: null,
    to: "samples/human_resource",
  },
  {
    title: "Cá nhân",
    iconLeft: null,
    iconRight: null,
    to: "samples/personal",
  },
  {
    title: "Hiệu suất",
    iconLeft: null,
    iconRight: null,
    to: "samples/performance",
  },
  {
    title: "Quản lý sản phẩm",
    iconLeft: null,
    iconRight: null,
    to: "samples/product_management",
  },
  {
    title: "Quản lý dự án",
    iconLeft: null,
    iconRight: null,
    to: "samples/project_management",
  },
  {
    title: "Làm việc từ xa",
    iconLeft: null,
    iconRight: null,
    to: "samples/remote_work",
  },
  {
    title: "Kinh doanh",
    iconLeft: null,
    iconRight: null,
    to: "samples/business_department",
  },
  {
    title: "Hỗ trợ",
    iconLeft: null,
    iconRight: null,
    to: "samples/support",
  },
  {
    title: "Quản lý nhóm",
    iconLeft: null,
    iconRight: null,
    to: "samples/group_management",
  },
];
const dataWorkspaceSidebar = [
  {
    title: "Bảng",
    iconLeft: <SiTrello />,
    iconRight: null,
    to: "",
  },
  {
    title: "Điểm nổi bật",
    iconLeft: <FaRegHeart />,
    iconRight: null,
    to: "",
  },
  {
    title: "Hình",
    iconLeft: <CiGrid41 />,
    iconRight: null,
    to: "",
  },
  {
    title: "Thành viên",
    iconLeft: <MdOutlineGroup />,
    iconRight: null,
    to: "",
  },
  {
    title: "Cài đặt",
    iconLeft: <IoIosSettings />,
    iconRight: null,
    to: "",
  },
];

export const Layout = () => {
  return (
    <div className="w-full h-screen">
      <NavProvider>
        <Navbar />
      </NavProvider>
      <main className="w-full ">
        <div className="w-1280 mx-auto">
          <div className="flex gap-3">
            {/* NOTE: cho thanh trai sticky top-[66px] overflow-y-auto max-h-[70vh], voi 66px la chieu cao cua header */}

            <div className="sticky top-[66px] overflow-y-auto max-h-[70vh] hidden ">
              <Sidebar
                dataSampleSidebar={dataSampleSidebar}
                dataWorkspaceSidebar={dataWorkspaceSidebar}
              />
            </div>

            <div className="p-4 h-[9999px] flex-1 mt-[65px]">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
