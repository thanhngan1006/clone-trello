import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

type RecentItemProps = {
  imgSrc: string;
  boardName: string;
  workspaceName: string;
};

export const RecentItem = ({
  imgSrc,
  boardName,
  workspaceName,
}: RecentItemProps): JSX.Element => {
  return (
    <li className="px-3">
      <Link
        className="flex gap-3 py-2 px-2 items-center hover:bg-gray-200 rounded-md group relative"
        to=""
      >
        <img className="w-12 h-11 rounded-sm" src={imgSrc} alt={boardName} />
        <div className="flex flex-col">
          <span className="text-black font-semibold">{boardName}</span>
          <span className="text-gray-500 text-xs">{workspaceName}</span>
        </div>

        {/* Star Icon */}
        <button>
          <FaRegStar className="absolute top-1/2 right-2 transform -translate-y-1/2 hidden group-hover:block" />
        </button>
      </Link>
    </li>
  );
};
