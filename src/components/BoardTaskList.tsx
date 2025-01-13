// daanh sach cac list co trong tung board

import React, { useEffect, useState } from "react";
import { List } from "../types/List";
import { BoardTaskItem } from "./BoardTaskItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  boardId?: string;
  isFetchList: boolean;
  resetStateIsFetch: () => void;
};

export const BoardTaskList = ({
  boardId,
  isFetchList,
  resetStateIsFetch,
}: Props) => {
  const [listData, setListData] = useState<List[]>([]);
  useEffect(() => {
    if (!boardId || !isFetchList) {
      return;
    }

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

    fetchLists(boardId);
  }, [isFetchList]);
  return (
    <ul className="flex gap-2 flex-wrap">
      {listData?.map((item) => (
        <BoardTaskItem
          data={item}
          key={item.listId}
          setListData={setListData}
          resetStateIsFetch={resetStateIsFetch}
          boardId={boardId}
        />
      ))}
    </ul>
  );
};
