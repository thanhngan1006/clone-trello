import { Board } from "../../types/Board";
import { TaskBoardItem } from "./TaskBoardItem";

type TaskBoardListProps = {
  filteredAndSortedBoards: Board[];
};

export const TaskBoardList = ({
  filteredAndSortedBoards,
}: TaskBoardListProps) => {
  return (
    <ul className="flex gap-2 flex-wrap">
      {filteredAndSortedBoards.map((item) => (
        <TaskBoardItem item={item} />
      ))}
    </ul>
  );
};
