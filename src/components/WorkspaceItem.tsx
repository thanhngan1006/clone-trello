import { Link } from "react-router-dom";

type WorkspaceItemProps = {
  name: string;
  imgSource: string;
  to: string;
};

export const WorkspaceItem = ({
  name,
  imgSource,
  to,
}: WorkspaceItemProps): JSX.Element => {
  return (
    <li className=" px-3">
      <Link
        className="flex gap-3 py-2 px-2 items-center hover:bg-gray-200 rounded-md"
        to={to}
      >
        <img className="w-12 h-11 rounded-sm" src={imgSource} alt={name} />
        <span className="text-black font-semibold">{name}</span>
      </Link>

      {/* <div className="group relative inline-block">
        <div className="bg-blue-500 text-white p-4 rounded cursor-pointer">
          Hover here.
        </div>
        <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-red-500 text-white p-4 rounded">
          This appears on hover!
        </div>
      </div> */}
    </li>
  );
};
