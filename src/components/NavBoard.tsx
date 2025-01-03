import { FaRegStar } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  Board,
  BoardManagementContext,
} from "../context/BoardManagementContext";

export const NavBoard = () => {
  const { boardId } = useParams();
  const context = useContext(BoardManagementContext);

  if (!context) {
    throw new Error("NavBoard must be used within a BoardManagementProvider");
  }

  const { boardData, setBoardData } = context;

  if (!boardId) {
    console.error("Board ID is undefined");
    return <div>Error: Board ID is required.</div>;
  }

  useEffect(() => {
    const boardRef = doc(db, "boards", boardId);

    const unsubscribe = onSnapshot(boardRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Board;
        setBoardData({ ...data });
      } else {
        setBoardData(null);
      }
    });

    return () => unsubscribe();
  }, [boardId, setBoardData]);

  return (
    <div className="w-full p-4 flex items-center justify-between border-b border-gray-400">
      <div className="flex items-center gap-2">
        <span className="font-bold">
          {boardData ? boardData.boardName : "Loading..."}{" "}
        </span>
        <button>
          <FaRegStar />
        </button>
        <button>
          <BiSolidGroup />
        </button>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  );
};
