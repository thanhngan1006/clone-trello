type BoardItemProps = {
  title: string;
};

export const BoardItem = ({ title }: BoardItemProps) => {
  return (
    <div className="w-24 h-14 rounded-md bg-red-400">
      <span>{title}</span>
    </div>
  );
};
