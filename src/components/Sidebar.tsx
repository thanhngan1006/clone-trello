import { FaTrello } from "react-icons/fa";
import { CgSmartHomeHeat } from "react-icons/cg";
import { CgTrello } from "react-icons/cg";
import { FaChevronUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

import { ReactNode } from "react";
import { AccountLinkList } from "./AccountLinkList";
import { Line } from "./Line";
import { AccountLinkItem } from "./AccountLinkItem";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { Link as ScrollLink, Element } from "react-scroll";

type SidebarListData = {
  title: string;
  iconLeft: ReactNode;
  iconRight: ReactNode;
  to: string;
};

type SidebarListProps = {
  dataSampleSidebar: SidebarListData[];
  dataWorkspaceSidebar: SidebarListData[];
};

export enum LinkIds {
  SAMPLE = "sample",
  WORKSPACE = "workspace",
}

export const Sidebar = ({
  dataSampleSidebar,
  dataWorkspaceSidebar,
}: SidebarListProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActive = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <nav className="p-4 z-10 relative">
      <div className="">
        <ul className="flex flex-col gap-3">
          <AccountLinkItem
            title="Bảng"
            iconLeft={<FaTrello />}
            iconRight={null}
            to="/boards"
            pVertical="2"
          />

          <li className="flex flex-col gap-3 relative w-40">
            <Link
              onClick={() => handleActive(LinkIds.SAMPLE)}
              to="/samples"
              className="w-64 flex items-center justify-between py-2 px-3 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                {<CgTrello />}
                <span className="text-gray-700 text-sm">Mẫu</span>
              </div>
              {null}
            </Link>

            {activeId === "sample" ? (
              <AccountLinkList
                data={dataSampleSidebar}
                classNameItem="w-64"
                pVertical="2"
                classNameItemSpan="pl-8"
              />
            ) : null}
          </li>

          <AccountLinkItem
            title="Trang chủ"
            iconLeft={<CgSmartHomeHeat />}
            iconRight={null}
            to="/"
            pVertical="2"
          />
        </ul>

        <Line />

        {/* cac khong gian lam viec */}
        <div>
          <ul>
            <div className="p-3">
              <span className="text-sm text-gray-700">
                Các không gian làm việc
              </span>
            </div>
            <AccountLinkItem
              title="Mon's Workspace"
              className="w-64 mb-3"
              pVertical="1"
              onClick={() => handleActive(LinkIds.WORKSPACE)}
              iconLeft={
                <img
                  src="https://anhcute.net/wp-content/uploads/2024/09/Anh-cho-con-chibi-uong-tra-sua-cute.webp"
                  alt="anh"
                  className="w-8 h-8 rounded-md"
                />
              }
              iconRight={
                activeId === "workspace" ? (
                  <FaChevronUp className="w-3 h-3 text-gray-700" />
                ) : (
                  <FaAngleDown className="w-3 h-3 text-gray-700" />
                )
              }
              to=""
            />
            {activeId === "workspace" ? (
              <div className="flex flex-col gap-3">
                <AccountLinkList
                  data={dataWorkspaceSidebar}
                  pVertical="2"
                  classNameDivIncludeIcons="pl-8"
                />

                <div className="bg-white shadow-sm flex flex-col gap-3 p-3 w-64 border border-b-2 rounded-md ">
                  <span className="text-sm text-black font-bold">
                    Dùng thử Trello Premium
                  </span>
                  <p className="text-sm text-gray-700">
                    Nhận các bảng không giới hạn, tất cả các chế độ xem, tự động
                    hóa không giới hạn và hơn thế nữa.
                  </p>
                  <div>
                    <button className="text-sm text-gray-700 underline underline-offset-1 ">
                      Bắt đầu dùng thử miễn phí
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <img
                      src="https://qpet.vn/wp-content/uploads/2023/07/avatar-cho-corgi-3-1.jpg.webp"
                      alt="anh"
                      className="w-8 h-8 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};
