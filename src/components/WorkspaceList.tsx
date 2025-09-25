import { WorkspaceItem } from "./WorkspaceItem";

type WorkspaceData = {
  name: string;
  userId: number;
  guestIds: number[];
  imgSource: string;
  to: string;
};

type WorkspaceProps = {
  data: WorkspaceData[];
  title: string;
};

export const WorkspaceList = ({ data, title }: WorkspaceProps) => {
  return (
    <ul className="flex flex-col gap-2">
      <span className="text-gray-600 px-3">{title}</span>
      {data.map((item) => (
        <WorkspaceItem
          key={item.userId}
          name={item.name}
          imgSource={item.imgSource}
          to={item.to}
        />
      ))}
    </ul>
  );
};
