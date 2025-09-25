import { ReactNode } from "react";

type DropdownProps = {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  width?: string;
};

export const DropDownForRightNavItem = ({
  icon,
  isActive,
  onClick,
  children,
  width = "w-312",
}: DropdownProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <button className="focus:outline-none" onClick={onClick}>
        {icon}
      </button>

      {isActive && (
        <div
          className={`absolute top-10 right-0 ${width} bg-white p-4 border shadow-lg`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
