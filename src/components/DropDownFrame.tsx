import { ReactNode, useCallback, useContext, useMemo } from "react";
import { DropDownToggle } from "./DropDownToggle";
import { NavContext } from "../context/NavContext";
import { ButtonIds } from "./Navbar";

type dropMenuType = {
  title: string;
  children: ReactNode;
  buttonId: ButtonIds;
};

// khung trắng khi toggle, children là nội dung bên trong
export const DropDownFrame = ({
  title = "",
  children,
  buttonId,
}: dropMenuType) => {
  const context = useContext(NavContext);

  if (!context) {
    throw new Error("DropdownMenu must be used within a DropDownMenuProvider");
  }

  const { activeButton, handletoggleActiveButton } = context;

  const onClickToggleDropdown = useCallback(() => {
    handletoggleActiveButton(buttonId);
  }, []);

  return (
    <div className="relative flex flex-col gap-3 justify-center self-stretch">
      <DropDownToggle
        title={title}
        isActive={activeButton === buttonId}
        onClickToggle={onClickToggleDropdown}
      />

      {activeButton === buttonId && (
        <div className="absolute top-[calc(100%_+_12px)] w-312 left-0 shadow-lg flex flex-col gap-6 rounded-md bg-white z-50">
          {children}
        </div>
      )}
    </div>
  );
};
