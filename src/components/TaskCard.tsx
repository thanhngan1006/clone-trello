// tung card
import React from "react";
import { Card } from "../types/Card";
import { Button } from "./Button";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

type Props = {
  card: Card;
};

export const TaskCard = ({ card }: Props) => {
  return (
    <li
      className="bg-white cursor-pointer shadow-md p-2 rounded-md hover:border-blue-400 border-transparent border-2 flex items-center justify-between"
      key={card.id}
    >
      <span>{card.cardName}</span>
      <div className="flex items-center gap-2">
        <Button className="w-auto">
          <FaEdit />
        </Button>
        <Button className="w-auto">
          <FaRegTrashAlt />
        </Button>
      </div>
    </li>
  );
};
