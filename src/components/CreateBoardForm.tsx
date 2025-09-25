import { useContext } from "react";
import { Button } from "./Button";
import { BoardManagementContext } from "../context/BoardManagementContext";

type CreateBoardFormProps = {
  className?: string;
};

export const CreateBoardForm = ({ className }: CreateBoardFormProps) => {
  const context = useContext(BoardManagementContext);

  if (!context) {
    throw new Error(
      "WorkspaceBoard must be used within a BoardManagementProvider"
    );
  }

  const { boardName, setBoardName, handleAddBoard } = context;

  console.log("boarname", boardName);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddBoard();
  };

  return (
    <div
      className={`${className} w-80 rounded-md shadow-2xl border border-black-100 bg-white z-50`}
    >
      <div className="flex flex-col gap-3 items-center  ">
        <h2 className="text-sm font-bold">Tạo bảng</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="boardTitle" className="text-sm font-semibold">
            Tiêu đề bảng
          </label>

          <input
            name="boardTitle"
            type="text"
            className="text-sm border border-gray-300 rounded-sm pl-8 pr-2 py-2 w-full"
            placeholder="Vui lòng điền tên bảng"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />
        </div>

        <Button
          className="w-auto text-sm border border-gray-300 rounded-md px-2 py-2 hover:bg-pink-400 bg-pink-300"
          textColor="black"
          onClick={handleButtonClick}
        >
          Tạo mới
        </Button>
      </div>
    </div>
  );
};
