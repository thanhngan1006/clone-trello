import { ReactNode, useContext, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { AccountLinkList } from "./AccountLinkList";
import { Button } from "./Button";
import { BoardManagementContext } from "../context/BoardManagementContext";
import { CreateBoardForm } from "./CreateBoardForm";
import { Link } from "react-router-dom";

type SidebarWorspaceData = {
  title: string;
  iconLeft: ReactNode;
  iconRight: ReactNode;
  to: string;
};

type SidebarWorkspaceProps = {
  SidebarWorspaceData1: SidebarWorspaceData[];
  SidebarWorspaceData2: SidebarWorspaceData[];
};

export const SidebarWorkspace = ({
  SidebarWorspaceData1,
  SidebarWorspaceData2,
}: SidebarWorkspaceProps) => {
  const context = useContext(BoardManagementContext);

  if (!context) {
    throw new Error(
      "SidebarWorkspace must be used within a BoardManagementProvider"
    );
  }

  const {
    activeForm,
    handleOpenFormToAddBoard,
    listBoard,
    handleDeleteBoard,
    activeEdit,
    handleOpenEdit,
    handleCloseEdit,
    newBoardName,
    setNewBoardName,
    handleUpdateBoard,
    fetchBoard,
  } = context;

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return (
    <>
      <div className="flex flex-col border-r border-gray-400 h-screen justify-between relative">
        <div className="flex flex-col">
          <div className="border-b border-gray-400 p-2 ">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src="https://i.pinimg.com/736x/47/94/c6/4794c6203b9650f968248b529614dfb3.jpg"
                  alt="cho"
                  className="w-9 h-9 rounded-md border"
                />
                <div className="flex flex-col ">
                  <span className="text-sm font-bold text-gray-600">
                    Mon's Workspace
                  </span>
                  <span className="text-sm text-gray-500">Miễn phí</span>
                </div>
              </div>
              <button>
                <FaAngleLeft />
              </button>
            </div>
          </div>

          <div className="flex flex-col p-2 gap-1.5">
            <div className="flex flex-col">
              <AccountLinkList
                data={SidebarWorspaceData1}
                classNameItem="p-1.5"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="p-2">
                <span className="text-sm font-bold">
                  Dạng xem không gian làm việc
                </span>
              </div>
              <AccountLinkList
                data={SidebarWorspaceData2}
                classNameItem="p-1.5"
              />
            </div>
          </div>

          <div className="flex flex-col p-2 gap-1.5">
            <div className="flex items-center justify-between">
              <div className="p-2">
                <span className="text-sm font-bold">
                  Dạng xem không gian làm việc
                </span>
              </div>
              <button
                onClick={() => handleOpenFormToAddBoard("sidebarWorkspace")}
              >
                <IoMdAdd />
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {listBoard?.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/b/${item.id}/${item.boardName}`}
                    className="flex items-center justify-between px-3 p-1.5 border border-gray-300"
                  >
                    {activeEdit === item.id ? (
                      <input
                        name="boardTitle"
                        type="text"
                        className="text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
                        placeholder="Vui lòng điền tên bảng"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        required
                      />
                    ) : (
                      <span>{item.boardName}</span>
                    )}

                    <div className="flex items-center gap-2">
                      {activeEdit === item.id ? (
                        <>
                          <Button
                            className="w-auto"
                            onClick={() =>
                              handleUpdateBoard(item.id, newBoardName)
                            }
                          >
                            <TiTickOutline />
                          </Button>
                          <Button
                            className="w-auto"
                            onClick={() => handleCloseEdit()}
                          >
                            <FaDeleteLeft />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="w-auto"
                            onClick={() => handleOpenEdit(item.id)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            className="w-auto"
                            onClick={() => handleDeleteBoard(item.id)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                        </>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <Button
        background="red-200"
        width="auto"
        className="flex gap-2 rounded-sm px-4 mx-auto "
      >
        <IoMdGift />
        Dùng thử Premium miễn phí
      </Button> */}

        {activeForm === "sidebarWorkspace" && (
          <CreateBoardForm className="absolute left-full top-1/2" />
        )}
      </div>
    </>
  );
};
