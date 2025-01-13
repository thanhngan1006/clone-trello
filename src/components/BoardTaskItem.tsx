// tung dach sach (list)

import React, { useContext, useEffect, useState } from "react";
import { List } from "../types/List";
import { ListManagementContext } from "../context/ListManagementContext";
import { Button } from "./Button";
import { TiTickOutline } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBack2Line } from "react-icons/ri";
import { IoIosClose, IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { Card } from "../types/Card";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { TaskCardList } from "./TaskCardList";

type Props = {
  data: List;
  setListData: React.Dispatch<React.SetStateAction<List[]>>;
  resetStateIsFetch: () => void;
  boardId: string | undefined;
};

export const BoardTaskItem = ({
  data,
  setListData,
  resetStateIsFetch,
  boardId,
}: Props) => {
  const context = useContext(ListManagementContext);
  const [newListName, setNewListName] = useState(data.listName);
  const [cardName, setCardName] = useState("");
  const [listCard, setListCard] = useState<Card[]>([]);
  const [isFetchList, setIsFetchList] = useState(true);

  if (!context) {
    throw new Error(
      "BoardTaskItem must be used within a ListManagementProvider"
    );
  }
  const {
    activeEditList,
    activeOpenCard,
    handleCloseEditList,
    handleUpdateList,
    handleOpenOptionMenu,
    handleOpenCard,
    handleAddCard,
    handleDeleleList,
    handleOpenEditList,
    handleCloseOptionMenu,
    activeOptionButton,
    setActiveEditList,
  } = context;

  const handleAddCardSuccess = () => {
    console.log("success");
    setIsFetchList(true);
    setCardName("");
  };

  const handleAddCardError = () => {
    console.log("Error");
  };

  const handleDeleteListSuccess = () => {
    setIsFetchList(true);
    handleCloseOptionMenu();
  };

  const handleDeleteListError = () => {
    console.log("error delete list");
  };

  const handleUpdateListSuccess = () => {
    setIsFetchList(true);
    setNewListName("");
    setActiveEditList(null);
  };

  const handleUpdateListError = () => {
    console.log("error update list");
  };

  useEffect(() => {
    if (!data.listId) {
      return;
    }
    if (!isFetchList) {
      return;
    }

    // fetchCard trongg list
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
        setIsFetchList(false);
      }
    };

    // khi xóa list thì fetch lại để mất list đó
    const fetchLists = async (boardId: string | undefined) => {
      try {
        const querySnapshot = await getDocs(collection(db, "lists"));
        const newData: List[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          listId: doc.id,
        })) as List[];

        const filteredLists = newData.filter(
          (list) => list.boardId === boardId
        );
        setListData(filteredLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        resetStateIsFetch();
      }
    };

    fetchCards(data.listId);
    fetchLists(boardId);
  }, [isFetchList, data.listId]);

  return (
    <li
      key={data.listId}
      className="relative flex flex-col gap-2 w-64 bg-gray-100 p-3 rounded-md border border-gray-300"
    >
      <div className="flex gap-2 items-center justify-between">
        {activeEditList === data.listId ? (
          <input
            name="boardTitle"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            type="text"
            className="text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
            placeholder="Vui lòng điền tên list"
            required
          />
        ) : (
          <span className="font-bold">{data.listName}</span>
        )}

        {activeEditList === data.listId ? (
          <div className="flex gap-1">
            <Button
              className="w-auto"
              onClick={() => {
                handleUpdateList({
                  listNameUpdate: newListName,
                  listId: data.listId,
                  onSuccess: () => handleUpdateListSuccess(),
                  onError: () => handleUpdateListError(),
                });
              }}
            >
              <TiTickOutline />
            </Button>
            <Button className="w-auto" onClick={handleCloseEditList}>
              <FaDeleteLeft />
            </Button>
          </div>
        ) : (
          <button
            className=""
            onClick={() => handleOpenOptionMenu(data.listId)}
          >
            <SlOptionsVertical />
          </button>
        )}
      </div>

      <TaskCardList listCard={listCard} />

      {/* nhan nut add card */}
      {activeOpenCard === data.listId ? (
        <div className="flex flex-col gap-2">
          <input
            name="cardTitle"
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-sm pr-2 py-2 w-full"
            placeholder="Nhập tên thẻ"
          />
          <div className="flex items-center gap-2">
            <Button
              className="w-auto flex items-center"
              onClick={() => {
                handleAddCard({
                  cardName,
                  listId: data.listId,
                  onSuccess: () => handleAddCardSuccess(),
                  onError: () => handleAddCardError(),
                });
              }}
            >
              Thêm thẻ
            </Button>
            <Button
              className="w-auto"
              onClick={() => {
                setCardName("");
                handleOpenCard("");
              }}
            >
              <RiDeleteBack2Line />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="flex items-center gap-2 font-thin"
          width="auto"
          onClick={() => handleOpenCard(data.listId)}
        >
          <IoMdAdd />
          <span>Thêm thẻ</span>
        </Button>
      )}

      {/* trong option */}
      {activeOptionButton === data.listId ? (
        <ul className="absolute border border-gray-300 mt-2 right-0 top-full flex flex-col rounded-md gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="bg-transparent"></span>
            <span className="font-bold text-center">Thao tác</span>
            <button className="cursor-pointer" onClick={handleCloseOptionMenu}>
              <IoIosClose />
            </button>
          </div>
          <li className="cursor-pointer bg-gray-100 rounded-md p-2 hover:bg-gray-200">
            <button
              onClick={() =>
                handleDeleleList({
                  listId: data.listId,
                  onSuccess: () => handleDeleteListSuccess(),
                  onError: () => handleDeleteListError(),
                })
              }
            >
              Xoá danh sách
            </button>
          </li>
          <li className="cursor-pointer bg-gray-100 rounded-md p-2 hover:bg-gray-200">
            <button onClick={() => handleOpenEditList(data.listId)}>
              Sửa tiêu đề danh sách
            </button>
          </li>
        </ul>
      ) : null}
    </li>
  );
};
