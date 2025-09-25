import { TiTickOutline } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import { Board } from "../../types/Board";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { BoardManagementContext } from "../../context/BoardManagementContext";
import { MouseEvent } from "react";

type TaskBoardItemProps = {
  item: Board;
};

export const TaskBoardItem = ({ item }: TaskBoardItemProps) => {
  const context = useContext(BoardManagementContext);

  if (!context) {
    throw new Error(
      "WorkspaceBoard must be used within a BoardManagementProvider"
    );
  }

  const {
    handleDeleteBoard,
    activeEdit,
    handleOpenEdit,
    handleCloseEdit,
    newBoardName,
    setNewBoardName,
    handleUpdateBoard,
    navigateToBoardFunction,
  } = context;

  return (
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
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleUpdateBoard(item.id, newBoardName, e);
                }}
              >
                <TiTickOutline />
              </Button>

              <Button className="w-auto" onClick={() => handleCloseEdit()}>
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
  );
};
