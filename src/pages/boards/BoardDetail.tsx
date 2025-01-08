import { IoMdAdd } from "react-icons/io";
import { RiDeleteBack2Line } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosClose } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";

import { Button } from "../../components/Button";
import { useContext, useEffect } from "react";
import { ListManagementContext } from "../../context/ListManagementContext";
import { useParams } from "react-router-dom";

export const BoardDetail = () => {
  const context = useContext(ListManagementContext);

  if (!context) {
    throw new Error("BoardDetail must be used within a ListManagementProvider");
  }

  const {
    isOpen,
    listName,
    setListName,
    handleOpenForm,
    handleCloseForm,
    handleAddList,
    lists,
    activeOpenTag,
    handleOpenTag,
    tagName,
    setTagName,
    fetchLists,
    activeOptionButton,
    handleOpenOptionMenu,
    handleDeleleList,
    handleCloseOptionMenu,
    activeEditList,
    handleOpenEditList,
    handleCloseEditList,
    setNewListName,
    newListName,
    handleUpdateList,
  } = context;

  const { boardId, boardName } = useParams();
  console.log(boardId);

  useEffect(() => {
    fetchLists(boardId);
  }, [fetchLists, boardId]);

  return (
    <div className="p-4 flex items-center gap-2">
      <ul className="flex gap-2 flex-wrap">
        {lists?.map((item) => (
          <li
            key={item.listId}
            className="relative flex flex-col gap-2 w-64 bg-gray-100 p-3 rounded-md border border-gray-300"
          >
            <div className="flex gap-2 items-center justify-between">
              {activeEditList === item.listId ? (
                <input
                  name="boardTitle"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  type="text"
                  className="text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
                  placeholder="Vui lòng điền tên list"
                  required
                />
              ) : (
                <span>{item.listName}</span>
              )}

              {activeEditList === item.listId ? (
                <div className="flex gap-1">
                  <Button
                    className="w-auto"
                    onClick={() => handleUpdateList(item.listId, newListName)}
                  >
                    <TiTickOutline />
                  </Button>
                  <Button className="w-auto" onClick={handleCloseEditList}>
                    <FaDeleteLeft />
                  </Button>
                </div>
              ) : (
                <button
                  className=""
                  onClick={() => handleOpenOptionMenu(item.listId)}
                >
                  <SlOptionsVertical />
                </button>
              )}
            </div>

            <ul className="flex flex-col gap-3">
              <li>Thẻ</li>
            </ul>

            {activeOpenTag === item.listId ? (
              <div className="flex flex-col gap-2">
                <input
                  name="tagTitle"
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="p-2 text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
                  placeholder="Nhập tên thẻ"
                />
                <div className="flex items-center gap-2">
                  <Button className="w-auto flex items-center">Thêm thẻ</Button>
                  <Button className="w-auto" onClick={() => handleOpenTag("")}>
                    <RiDeleteBack2Line />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className="flex items-center gap-2 font-thin"
                width="auto"
                onClick={() => handleOpenTag(item.listId)}
              >
                <IoMdAdd />
                <span>Thêm thẻ</span>
              </Button>
            )}

            {activeOptionButton === item.listId ? (
              <ul className="absolute border border-gray-300 mt-2 right-0 top-full flex flex-col rounded-md gap-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="bg-transparent"></span>
                  <span className="font-bold text-center">Thao tác</span>
                  <button
                    className="cursor-pointer"
                    onClick={handleCloseOptionMenu}
                  >
                    <IoIosClose />
                  </button>
                </div>
                <li className="cursor-pointer bg-gray-100 rounded-md p-2 hover:bg-gray-200">
                  <button onClick={() => handleDeleleList(item.listId)}>
                    Xoá danh sách
                  </button>
                </li>
                <li className="cursor-pointer bg-gray-100 rounded-md p-2 hover:bg-gray-200">
                  <button onClick={() => handleOpenEditList(item.listId)}>
                    Sửa tiêu đề danh sách
                  </button>
                </li>
              </ul>
            ) : null}
          </li>
        ))}
      </ul>

      {isOpen ? (
        <div className="flex flex-col gap-2">
          <input
            name="tagTitle"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-md pr-2 py-2 w-full"
            placeholder="Nhập tên danh sách"
          />
          <div className="flex items-center gap-2">
            <Button
              className="w-auto flex items-center"
              onClick={() => handleAddList(boardId)}
            >
              Thêm danh sách
            </Button>
            <Button className="w-auto" onClick={handleCloseForm}>
              <RiDeleteBack2Line />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2  font-thin"
          width="auto"
          onClick={handleOpenForm}
        >
          <IoMdAdd />
          <span>Thêm danh sách khác</span>
        </Button>
      )}
    </div>
  );
};
