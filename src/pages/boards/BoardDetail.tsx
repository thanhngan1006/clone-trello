import { IoMdAdd } from "react-icons/io";
import { RiDeleteBack2Line } from "react-icons/ri";

import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { ListManagementContext } from "../../context/ListManagementContext";
import { useParams } from "react-router-dom";
import { BoardTaskList } from "../../components/BoardTaskList";

export const BoardDetail = () => {
  const context = useContext(ListManagementContext);
  const [listName, setListName] = useState("");
  const [isFetchList, setIsFetchList] = useState(true);
  if (!context) {
    throw new Error(
      "BoardDetailll must be used within a ListManagementProvider"
    );
  }

  const { isOpen, handleOpenForm, handleCloseForm, handleAddList } = context;

  const { boardId } = useParams();

  const handleAddListSuccess = () => {
    console.log("success");
    setIsFetchList(true);
    setListName("");
  };

  const handleAddListError = () => {
    console.log("error");
  };

  useEffect(() => {
    setIsFetchList(true);
    setListName("");
  }, [boardId]);

  return (
    <div className="p-4 flex items-center gap-2">
      <BoardTaskList
        boardId={boardId}
        isFetchList={isFetchList}
        resetStateIsFetch={() => {
          setIsFetchList(false);
        }}
      />

      {/* bam vo nut them danh sach => hien ra input => them danh sach */}
      {isOpen ? (
        <div className="flex flex-col gap-2">
          <input
            name="cardTitle"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-md pr-2 py-2 w-full"
            placeholder="Nhập tên danh sách"
          />
          <div className="flex items-center gap-2">
            <Button
              className="w-auto flex items-center"
              onClick={() =>
                handleAddList({
                  boardId,
                  listName,
                  onSuccess: () => handleAddListSuccess(),
                  onError: () => handleAddListError(),
                })
              }
            >
              Thêm danh sách
            </Button>
            <Button
              className="w-auto"
              onClick={() => {
                setListName("");
                handleCloseForm();
              }}
            >
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
