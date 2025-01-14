// tung card
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../types/Card";
import { Button } from "./Button";
import {
  FaEdit,
  FaRegTimesCircle,
  FaRegTrashAlt,
  FaSave,
} from "react-icons/fa";
import { ListManagementContext } from "../context/ListManagementContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FaDeleteLeft } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";

type Props = {
  card: Card;
  setListCard: React.Dispatch<React.SetStateAction<Card[]>>;
};

export const TaskCard = ({ card, setListCard }: Props) => {
  const context = useContext(ListManagementContext);
  if (!context) {
    throw new Error("TaskCard must be used within a ListManagementProvider");
  }

  const { handleDeleteCard, setActiveOpenCard, handleUpdateCard } = context;

  const [isFetchCard, setIsFetchCard] = useState(true);
  const [isUpdateCard, setIsUpdateCard] = useState(false);
  const [newCardName, setNewCardName] = useState("");

  const handleDeleteCardSuccess = () => {
    setIsFetchCard(true);
    setListCard((prevCards) => prevCards.filter((c) => c.id !== card.id));
    setActiveOpenCard(null);
  };

  const handleDeleteCardError = () => {
    console.log("error delete list");
  };

  const handleUpdateCardSuccess = () => {
    setIsFetchCard(true);
    setIsUpdateCard(false);
  };

  const handleUpdateCardError = () => {
    console.log("error update card");
  };

  const handleIsUpdateCard = () => {
    setIsUpdateCard((isUpdateCard) => !isUpdateCard);
    setNewCardName("");
  };

  useEffect(() => {
    if (!card.id) {
      return;
    }

    const fetchCards = async (lisdId: string | undefined) => {
      try {
        const querySnapshot = await getDocs(collection(db, "cards"));
        const newData: Card[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Card[];

        const filteredCards = newData.filter((card) => card.listId === lisdId);
        setListCard(filteredCards);
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setIsFetchCard(false);
      }
    };

    fetchCards(card.listId);
  }, [isFetchCard, card.listId]);

  return (
    <li
      className="bg-white cursor-pointer shadow-md  rounded-md hover:border-blue-400 border-transparent  flex items-center justify-between px-3 p-1.5 border border-gray-300 w-full"
      key={card.id}
    >
      {isUpdateCard ? (
        <input
          type="text"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
          className="text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
          placeholder="Enter new card name"
        />
      ) : (
        <span>{card.cardName}</span>
      )}

      <div className="flex items-center gap-2">
        {isUpdateCard ? (
          <>
            <Button
              className="w-auto"
              onClick={() =>
                handleUpdateCard({
                  cardId: card.id,
                  cardNameUpdate: newCardName,
                  onSuccess: () => handleUpdateCardSuccess(),
                  onError: () => handleUpdateCardError(),
                })
              }
            >
              <TiTickOutline />
            </Button>
            <Button className="w-auto" onClick={() => setIsUpdateCard(false)}>
              <FaDeleteLeft />
            </Button>
          </>
        ) : (
          <>
            <Button className="w-auto" onClick={handleIsUpdateCard}>
              <FaEdit />
            </Button>

            <Button
              className="w-auto"
              onClick={() =>
                handleDeleteCard({
                  cardId: card.id,
                  onSuccess: () => handleDeleteCardSuccess(),
                  onError: () => handleDeleteCardError(),
                })
              }
            >
              <FaRegTrashAlt />
            </Button>
          </>
        )}
      </div>
    </li>
  );
};
