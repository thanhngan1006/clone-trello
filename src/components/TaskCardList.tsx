// danh sach card
import React from "react";
import { Card } from "../types/Card";
import { TaskCard } from "./TaskCard";

type Props = {
  listCard: Card[];
  setListCard: React.Dispatch<React.SetStateAction<Card[]>>;
};

export const TaskCardList = ({ listCard, setListCard }: Props) => {
  return (
    <ul className="flex flex-col gap-3">
      {listCard?.map((card) => (
        <TaskCard card={card} setListCard={setListCard} />
      ))}
    </ul>
  );
};
