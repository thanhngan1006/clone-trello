import { ReactNode } from "react";
import { AccountLinkItem } from "./AccountLinkItem";

type AccountLinkListData = {
  title: string;
  iconLeft: ReactNode;
  iconRight: ReactNode;
  to: string;
};

type AccountLinkListProps = {
  data: AccountLinkListData[];
  pHorizontal?: "0" | "0.5" | "2" | "3" | "4" | "5";
  pVertical?: "0" | "0.5" | "2" | "3" | "4" | "5";
  className?: string;
  classNameItem?: string;
  classNameItemSpan?: string;
  classNameDivIncludeIcons?: string;
};

export const AccountLinkList = ({
  data,
  pHorizontal = "3",
  pVertical = "0.5",
  className = "",
  classNameItem = "",
  classNameItemSpan = "",
  classNameDivIncludeIcons = "",
}: AccountLinkListProps) => {
  return (
    <nav>
      <ul className={`flex flex-col gap-3  ${className} `}>
        {data.map((item) => {
          return (
            <AccountLinkItem
              key={item.title}
              title={item.title}
              iconLeft={item.iconLeft}
              iconRight={item.iconRight}
              to={item.to}
              pHorizontal={pHorizontal}
              pVertical={pVertical}
              className={classNameItem}
              classNameSpan={classNameItemSpan}
              classNameDivIncludeIcons={classNameDivIncludeIcons}
            />
          );
        })}
      </ul>
    </nav>
  );
};
