import { RecentItem } from "./RecentItem";

type RecentData = {
  boardName: string;
  boardId: number;
  imgSource: string;
  workSpaceName: string;
  workSpaceId: number;
};

type RecentListProps = {
  data: RecentData[];
};

export const RecentList = ({ data }: RecentListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => (
        <RecentItem
          key={item.boardId}
          boardName={item.boardName}
          imgSrc={item.imgSource}
          workspaceName={item.workSpaceName}
        />
      ))}
    </ul>
  );
};
