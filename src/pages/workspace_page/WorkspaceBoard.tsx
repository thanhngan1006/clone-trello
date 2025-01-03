import { FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { CreateBoardForm } from "../../components/CreateBoardForm";
import {
  Board,
  BoardManagementContext,
} from "../../context/BoardManagementContext";
import { Link } from "react-router-dom";

export const WorkspaceBoard = () => {
  const context = useContext(BoardManagementContext);
  if (!context) {
    throw new Error(
      "WorkspaceBoard must be used within a BoardManagementProvider"
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
    setSortBy,
    sortBy,
    searchWord,
    setSearchWord,
    navigateToBoardFunction,
  } = context;

  const [filteredAndSortedBoards, setFilteredAndSortedBoards] = useState<
    Board[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal((s) => !s);
  };

  const filterAndSortItems = useCallback(() => {
    let items = [...listBoard];

    if (searchWord) {
      items = items.filter((item) =>
        item.boardName.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    if (sortBy === "za") {
      items.sort((a, b) => b.boardName.localeCompare(a.boardName));
    } else if (sortBy === "az") {
      items.sort((a, b) => a.boardName.localeCompare(b.boardName));
    } else if (sortBy === "most_recent_activity") {
      // chua xu ly
    } else if (sortBy === "least_recent_activity") {
      // chua xu ly
    }

    setFilteredAndSortedBoards(items);
  }, [listBoard, searchWord, sortBy]);

  useEffect(() => {
    filterAndSortItems();
  }, [filterAndSortItems]);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">Bảng</span>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="arrange" className="text-sm font-semibold">
              Sắp xếp theo
            </label>
            <select
              name="arrange"
              id="arrange"
              className="text-sm border border-gray-300 rounded-sm px-3 py-2 w-full text-gray-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="most_recent_activity">
                Hoạt động gần đây nhất
              </option>
              <option value="least_recent_activity">
                Ít hoạt động gần đây
              </option>
              <option value="az">Theo bảng chữ cái A-Z</option>
              <option value="za">Theo bảng chữ cái Z-A</option>
            </select>
          </div>
          {/* nếu tài khoản là premium thì mới được lọc */}
          {/* <div className="flex flex-col gap-1.5">
            <label htmlFor="filter" className="text-sm font-semibold">
              Lọc theo
            </label>
            <select
              name="filter"
              id="filter"
              className="text-sm border border-gray-300 rounded-sm px-3 py-2 w-full"
            >
              <option value="volvo">Chọn bộ sưu tập</option>
              <option value="saab">aa</option>
              <option value="mercedes">bb</option>
              <option value="audi">cc</option>
            </select>
          </div> */}

          {/* trường hợp không premium */}
          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor="filter" className="text-sm font-semibold">
              Lọc theo
            </label>
            <Button
              className="w-auto text-sm border border-gray-300 rounded-sm pr-4 py-4 font-thin flex gap-10 hover:bg-white"
              background="white"
              textColor="gray-500"
              onClick={handleClick}
            >
              <span>Chọn bộ sưu tập</span>
              <FaAngleDown className="w-3.5 h-3.5 font-thin " />
            </Button>

            {showModal && (
              <div className="w-80 absolute top-full p-3 rounded-md shadow-2xl border border-black-100 mt-2 bg-white ">
                <div className="flex flex-col gap-3 items-center  ">
                  <h2 className="text-sm font-bold">Bộ sưu tập</h2>
                  <p className="text-md font-bold text-center">
                    Sắp xếp các bảng của bạn với các bộ sưu tập
                  </p>
                  <p className="text-center text-gray-900 text-sm">
                    Nâng cấp lên Premium để nhóm các bảng của bạn theo phòng
                    ban, chủ đề, nhóm và hơn thế nữa
                  </p>

                  <Button
                    className="w-auto text-sm border border-gray-300 rounded-md px-2 py-2 hover:bg-pink-400 bg-pink-300"
                    onClick={handleClick}
                    textColor="black"
                  >
                    Dùng thẻ miễn phí trong 14 ngày
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="searchBoard" className="text-sm font-semibold">
            Tìm kiếm
          </label>

          <div className="relative">
            <div className="absolute left-0 bottom-0 top-0 flex items-center cursor-pointer px-2">
              <CiSearch />
            </div>
            <input
              name="searchBoard"
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="text-sm border border-gray-300 rounded-sm pl-8 pr-2 py-2 w-full"
              placeholder="Tìm kiếm các bảng"
              autoComplete=""
            />
            {searchWord && (
              <button
                onClick={() => setSearchWord("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <Button
          className="  bg-gray-200 w-72 h-32 font-thin hover:bg-gray-300"
          textColor="gray-700"
          onClick={() => handleOpenFormToAddBoard("workspaceBoard")}
        >
          Tạo bảng mới
        </Button>

        {activeForm === "workspaceBoard" && (
          <CreateBoardForm className="absolute top-full mt-10" />
        )}
      </div>
      <ul className="flex gap-2 flex-wrap">
        {filteredAndSortedBoards.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => navigateToBoardFunction(item)}
              className="flex justify-between px-3 p-2 border border-gray-300 rounded-md w-56 h-28"
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
                <span className="font-bold">{item.boardName}</span>
              )}

              <div className="flex items-center gap-2">
                {activeEdit === item.id ? (
                  <>
                    <Button
                      className="w-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateBoard(item.id, newBoardName, e);
                      }}
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenEdit(item.id, e);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="w-auto"
                      onClick={(e) => handleDeleteBoard(item.id, e)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
