// danh sach card
import React from "react";
import { Card } from "../types/Card";
import { TaskCard } from "./TaskCard";

type Props = {
  listCard: Card[];
};

export const TaskCardList = ({ listCard }: Props) => {
  return (
    <ul className="flex flex-col gap-3">
      {listCard?.map((card) => (
        <TaskCard card={card} />
      ))}
    </ul>
  );
};
