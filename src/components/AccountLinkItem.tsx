import { ReactNode } from "react";
import { Link } from "react-router-dom";
type AccountLinkItemProps = {
  title: string;
  iconLeft: ReactNode;
  iconRight: ReactNode;
  to: string;
  pHorizontal?: "0" | "0.5" | "1" | "2" | "3" | "4" | "5";
  pVertical?: "0" | "0.5" | "1" | "2" | "3" | "4" | "5";
  className?: string;
  classNameSpan?: string;
  classNameDivIncludeIcons?: string;
  onClick?: () => void;
};

export const AccountLinkItem = ({
  title,
  iconLeft = null,
  iconRight = null,
  to = "",
  pHorizontal = "3",
  pVertical = "0.5",
  className,
  classNameSpan = "",
  classNameDivIncludeIcons = "",
  onClick,
}: AccountLinkItemProps) => {
  return (
    <li onClick={onClick}>
      <Link
        to={to}
        className={`flex items-center justify-between hover:bg-gray-200 rounded-md cursor-pointer ${className} ${`py-${pVertical}`} ${`px-${pHorizontal}`}`}
      >
        <div className={`flex gap-2 items-center ${classNameDivIncludeIcons}`}>
          {iconLeft}
          <span className={`text-gray-700 text-sm ${classNameSpan} `}>
            {title}
          </span>
        </div>
        {iconRight}
      </Link>
    </li>
  );
};
