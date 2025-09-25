import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

type dropMenuType = {
  title: string;
  isActive: boolean;
  onClickToggle: () => void;
};

// chỗ toggle Các không gian làm việc - Gần đây - Đã dánh dấu sao - Mẫu
export const DropDownToggle = ({
  title,
  onClickToggle,
  isActive,
}: dropMenuType) => {
  return (
    <button
      className="flex h-full gap-2 px-3 items-center rounded-md hover:bg-loginBackgroundColor focus:text-navbarItemHoverColor focus:bg-navbarItemHoverBgColor cursor-pointer"
      onClick={onClickToggle}
    >
      <span>{title}</span>
      {isActive ? <FaChevronDown /> : <FaChevronUp />}
    </button>
  );
};
