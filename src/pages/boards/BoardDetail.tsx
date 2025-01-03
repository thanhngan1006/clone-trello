import { IoMdAdd } from "react-icons/io";
import { RiDeleteBack2Line } from "react-icons/ri";

import { Button } from "../../components/Button";
import { useContext } from "react";
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
  } = context;

  const { boardId, boardName } = useParams();
  console.log(boardId);

  return (
    <div className="p-4 flex items-center gap-2">
      {isOpen ? (
        <div className="flex flex-col gap-2">
          <input
            name="boardTitle"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
            placeholder="Nhập tên danh sách"
          />
          <div className="flex items-center gap-2">
            <Button className="w-auto" onClick={() => handleAddList(boardId)}>
              Thêm danh sách
            </Button>
            <Button className="w-auto" onClick={handleCloseForm}>
              <RiDeleteBack2Line />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2 bg-gray-400 font-thin"
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
