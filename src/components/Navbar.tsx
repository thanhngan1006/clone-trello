import { BsGrid3X3GapFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";

import { useContext } from "react";

import { NavContext } from "../context/NavContext";

import { DropDownFrame } from "./DropDownFrame";
import { WorkspaceList } from "./WorkspaceList";
import { RecentList } from "./RecentList";
import { Samples } from "./Samples";
import { Button } from "./Button";
import { Switch } from "./Switch";
import { DropDownForRightNavItem } from "./DropDownForRightNavItem";
import { AccountLinkList } from "./AccountLinkList";
import { Line } from "./Line";

export enum ButtonIds {
  NOTIFICATIONS = "notifications",
  INFORMATION = "information",
  ACCOUNT = "account",
  WORKSPACE = "workspace",
  RECENT_BOARD = "recent_board",
  STAR = "star",
  SAMPLE = "sample",
}

const userId = 4;

const wordkSpaceData = [
  {
    name: "X",
    userId: 1,
    guestIds: [2, 3],
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 1,
    boards: [
      { boardId: 1, name: "Board 1", tasks: [] },
      { boardId: 2, name: "Board 2", tasks: [] },
    ],
  },
  {
    name: "Y",
    userId: 2,
    guestIds: [1],
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 2,
    boards: [
      { boardId: 3, name: "Android Midterm", tasks: [] },
      { boardId: 4, name: "Backend API", tasks: [] },
    ],
  },
  {
    name: "A",
    userId: 3,
    guestIds: [2, 4],
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 4,
    boards: [
      { boardId: 4, name: "Typescript Prọect", tasks: [] },
      { boardId: 6, name: "React Project", tasks: [] },
    ],
  },
  {
    name: "Mon",
    userId: 4,
    guestIds: [2, 3],
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 3,
    boards: [
      { boardId: 3, name: "QTHTTT", tasks: [] },
      { boardId: 4, name: "PTTKGT", tasks: [] },
    ],
  },
];

const recentData = [
  {
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 1,
    boardName: "Android Final",
    boardId: 1,
    workSpaceName: "Ngan WK",
  },
  {
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 2,
    boardName: "Android Midterm",
    boardId: 2,
    workSpaceName: "Hehe WK",
  },
  {
    imgSource:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    workSpaceId: 3,
    boardName: "BMTT",
    boardId: 3,
    workSpaceName: "MON WK",
  },
];

const sampleData = [
  {
    imgSrc:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    sampleName: "Design Hundle",
  },
  {
    imgSrc:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    sampleName: "Remote Team Meeting",
  },
  {
    imgSrc:
      "https://thumbs.dreamstime.com/b/letter-c-rainbow-color-multicolor-background-345041201.jpg",
    sampleName: " Project Management",
  },
];

const userAccountData = [
  {
    title: "Chuyển đổi tài khoản",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Quản lý tài khoản ",
    iconLeft: null,
    iconRight: <MdOutlineZoomOutMap />,
    to: "",
  },
];

const trelloAccountData = [
  {
    title: "Hồ sơ và Hiển thị",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Hoạt động",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Thẻ",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Cài đặt",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Chủ đề",
    iconLeft: null,
    iconRight: <FaChevronRight />,
    to: "",
  },
];

const workspaceAccountData = [
  {
    title: "Tạo không gian làm việc",
    iconLeft: <MdGroups3 />,
    iconRight: null,
    to: "",
  },
];

const helpAccountData = [
  {
    title: "Trợ giúp",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
  {
    title: "Phím tắt",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
];

const logoutAccountData = [
  {
    title: "Đăng xuất",
    iconLeft: null,
    iconRight: null,
    to: "",
  },
];

function Navbar() {
  const newData = wordkSpaceData.map((item) => ({
    ...item,
    isMyWorkSpace: item.userId === userId,
    to: `/w/workspace${item.workSpaceId}`,
  }));

  const myWorkspaceArray = newData.filter((item) => item.isMyWorkSpace);
  const guestWorkspaceArray = newData.filter((item) => !item.isMyWorkSpace);

  const context = useContext(NavContext);

  if (!context) {
    throw new Error("DropdownMenu must be used within a DropDownMenuProvider");
  }

  const {
    activeButton,
    handletoggleActiveButton,
    isShowNotiNotRead,
    handleToggleNotiMode,
  } = context;

  return (
    // NOTE: cho nav fixed, w-full top-0 bg-white
    <div className="flex items-center justify-between p-3 border border-b-gray-400 fixed w-full top-0 bg-white">
      <div className="relative flex gap-3 items-center">
        <BsGrid3X3GapFill />
        <span className="font-bold text-xl">TrelloMon</span>

        <DropDownFrame
          buttonId={ButtonIds.WORKSPACE}
          title="Các không gian làm việc"
        >
          <WorkspaceList
            data={myWorkspaceArray}
            title="Các không gian làm việc của bạn"
          />

          <WorkspaceList
            data={guestWorkspaceArray}
            title="Các không gian làm việc của khách"
          />
        </DropDownFrame>

        <DropDownFrame buttonId={ButtonIds.RECENT_BOARD} title="Gần đây">
          <RecentList data={recentData} />
        </DropDownFrame>

        <DropDownFrame buttonId={ButtonIds.STAR} title="Đã đánh dấu sao">
          <RecentList data={recentData} />
        </DropDownFrame>

        <DropDownFrame buttonId={ButtonIds.SAMPLE} title="Mẫu">
          <Samples data={sampleData} />
        </DropDownFrame>

        <Button>Tạo mới</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative">
          <div className="absolute left-0 bottom-0 top-0 flex items-center cursor-pointer px-2">
            <CiSearch />
          </div>

          <input
            name="search"
            type="text"
            className="text-sm border border-gray-300 rounded-md pl-8 pr-2 py-2 w-full"
            placeholder="Search..."
            autoComplete=""
          />
        </div>

        {/* thong bao */}
        <DropDownForRightNavItem
          icon={<IoIosNotifications className="w-6 h-6" />}
          isActive={activeButton === ButtonIds.NOTIFICATIONS}
          onClick={() => handletoggleActiveButton(ButtonIds.NOTIFICATIONS)}
          width="w-432"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-2 pb-3 border-gray-200">
              <span className="font-bold">Thông báo</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  Chỉ hiển thị chưa đọc
                </span>
                <Switch
                  isActive={isShowNotiNotRead}
                  onChange={handleToggleNotiMode}
                />
                <SlOptionsVertical />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-6 items-center">
                <img
                  src="https://canhotayhoriverview.com/wp-content/uploads/2022/10/hinh-anh-cute-34.jpg"
                  alt="dog"
                  className="w-24 h-24 rounded-full"
                />
                <span className="font-bold text-xl">
                  {isShowNotiNotRead ? "a" : "b"}
                </span>
              </div>
            </div>
          </div>
        </DropDownForRightNavItem>

        {/* Thông tin */}
        <DropDownForRightNavItem
          icon={<IoInformationCircle className="w-6 h-6" />}
          isActive={activeButton === ButtonIds.INFORMATION}
          onClick={() => handletoggleActiveButton(ButtonIds.INFORMATION)}
        >
          <div>Information content here.</div>
        </DropDownForRightNavItem>

        {/* Tài khoản */}
        <DropDownForRightNavItem
          icon={
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="User Avatar"
              className="w-6 h-6 rounded-full border"
            />
          }
          isActive={activeButton === ButtonIds.ACCOUNT}
          onClick={() => handletoggleActiveButton(ButtonIds.ACCOUNT)}
          width="w-300"
        >
          <div className="flex flex-col">
            {/* ====== */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-sm text-gray-500 px-3">
                TÀI KHOẢN
              </span>

              <div className="flex gap-3 px-3">
                <img
                  src="https://anhcute.net/wp-content/uploads/2024/09/Cho-con-chibi-don-gian-de-thuong.webp"
                  alt="avatar image"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span>Võ Thị Thanh Ngân</span>
                  <span className="text-xs text-gray-400">
                    thanhngan10604@gmail.com
                  </span>
                </div>
              </div>

              <AccountLinkList data={userAccountData} />
              <Line mtTop="0" />
            </div>
            {/* ===== */}
            <div className="flex flex-col">
              <div className="flex flex-col  gap-3 ">
                <span className="font-semibold text-sm text-gray-500 px-3">
                  TRELLO
                </span>

                <AccountLinkList data={trelloAccountData} />
              </div>
              <Line />
            </div>

            {/* ===== */}

            <div className="flex flex-col ">
              <AccountLinkList data={workspaceAccountData} />
              <Line />
            </div>

            {/* ===== */}

            <div className="flex flex-col">
              <AccountLinkList data={helpAccountData} />
              <Line />
            </div>

            {/* ===== */}

            <AccountLinkList data={logoutAccountData} />
          </div>
        </DropDownForRightNavItem>
      </div>
    </div>
  );
}

export default Navbar;
