import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { List } from "../types/List";

type ListManagementContextProps = {
  isOpen: boolean;
  activeOpenCard: string | null;
  activeOptionButton: string | null;
  activeEditList: string | null;
  setActiveEditList: React.Dispatch<React.SetStateAction<string | null>>;
  handleOpenCard: (listId: string) => void;
  handleOpenForm: () => void;
  handleCloseForm: () => void;
  handleAddList: ({
    boardId,
    listName,
    onSuccess,
    onError,
  }: {
    boardId: string | undefined;
    listName: string;
    onSuccess: () => void;
    onError: () => void;
  }) => void;
  handleDeleleList: ({
    listId,
    onSuccess,
    onError,
  }: {
    listId: string;
    onSuccess: () => void;
    onError: () => void;
  }) => void;
  handleOpenOptionMenu: (listId: string) => void;
  handleCloseOptionMenu: () => void;
  handleOpenEditList: (listId: string) => void;
  handleCloseEditList: () => void;
  handleAddCard: ({
    listId,
    cardName,
    onSuccess,
    onError,
  }: {
    listId?: string;
    cardName: string;
    onSuccess: () => void;
    onError: () => void;
  }) => void;
  handleUpdateList: ({
    listId,
    listNameUpdate,
    onSuccess,
    onError,
  }: {
    listId: string;
    listNameUpdate: string;
    onSuccess: () => void;
    onError: () => void;
  }) => void;
};

export const ListManagementContext = createContext<
  ListManagementContextProps | undefined
>(undefined);

type ListManagementProviderProps = {
  children: ReactNode;
};

export const ListManagementProvider = ({
  children,
}: ListManagementProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOptionButton, setActiveOptionButton] = useState<string | null>(
    null
  );
  const [activeEditList, setActiveEditList] = useState<string | null>(null);
  const [activeOpenCard, setActiveOpenCard] = useState<string | null>(null);

  const handleOpenForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleAddList = useCallback(
    async ({
      boardId,
      listName,
      onSuccess,
      onError,
    }: {
      boardId: string | undefined;
      listName: string;
      onSuccess: () => void;
      onError: () => void;
    }) => {
      if (!boardId) {
        console.error("Board ID is required");
        return;
      }

      const newListData = { listName, boardId };

      if (newListData.listName === "") {
        setIsOpen(false);
        return;
      }
      try {
        const docRef = await addDoc(collection(db, "lists"), newListData);
        onSuccess();
        setIsOpen(false);
      } catch (error) {
        console.error("Error adding document: ", error);
        onError();
      }
    },
    []
  );

  const handleOpenEditList = useCallback(
    (listId: string) => {
      setActiveEditList(activeEditList === listId ? null : listId);
    },
    [activeEditList]
  );

  const handleCloseEditList = useCallback(() => {
    setActiveEditList(null);
  }, []);

  const handleOpenCard = useCallback(
    (listId: string) => {
      setActiveOpenCard(activeOpenCard === listId ? null : listId);
    },
    [activeOpenCard]
  );

  const handleOpenOptionMenu = useCallback(
    (listId: string) => {
      setActiveOptionButton(activeOptionButton === listId ? null : listId);
    },
    [activeOptionButton]
  );

  const handleCloseOptionMenu = useCallback(() => {
    setActiveOptionButton(null);
  }, []);

  const handleDeleleList = useCallback(
    async ({
      listId,
      onSuccess,
      onError,
    }: {
      listId: string;
      onSuccess: () => void;
      onError: () => void;
    }) => {
      if (!listId) {
        console.error("List ID is required");
        return;
      }

      // Lấy danh sách các card trong list
      const cardSnapshot = await getDocs(collection(db, "cards"));
      const cardsToDelete = cardSnapshot.docs.filter((doc) => {
        const cardData = doc.data();
        return cardData.listId === listId;
      });

      // Xóa tất cả các card
      const deleteCardPromises = cardsToDelete.map((doc) => {
        return deleteDoc(doc.ref); // Xóa từng card
      });
      await Promise.all(deleteCardPromises);

      // Xóa list
      const taskDocRef = doc(db, "lists", listId);
      try {
        await deleteDoc(taskDocRef);
        onSuccess();
      } catch (err) {
        onError();
        alert(err);
      }
    },
    []
  );

  const handleUpdateList = useCallback(
    async ({
      listId,
      listNameUpdate,
      onSuccess,
      onError,
    }: {
      listId: string;
      listNameUpdate: string;
      onSuccess: () => void;
      onError: () => void;
    }) => {
      const taskDocRef = doc(db, "lists", listId);
      try {
        await updateDoc(taskDocRef, {
          listName: listNameUpdate,
        });
        onSuccess();
      } catch (err) {
        onError();
        alert(err);
      }
    },
    []
  );

  // const handleUpdateList = useCallback(
  //   async (listId: string, listNameUpdate: string) => {
  //     const taskDocRef = doc(db, "lists", listId);
  //     try {
  //       await updateDoc(taskDocRef, {
  //         listName: listNameUpdate,
  //       });

  //       setLists((prevList) =>
  //         prevList.map((item) =>
  //           item.listId === listId
  //             ? { ...item, listName: listNameUpdate }
  //             : item
  //         )
  //       );
  //       setNewListName("");
  //       setListName("");
  //       setActiveEditList(null);
  //     } catch (err) {
  //       alert(err);
  //     }
  //   },
  //   []
  // );

  const handleAddCard = useCallback(
    async ({
      listId,
      cardName,
      onSuccess,
      onError,
    }: {
      listId?: string;
      cardName: string;
      onSuccess: () => void;
      onError: () => void;
    }) => {
      if (!listId) {
        console.error("List ID is required");
        return;
      }

      const newCardData = { cardName, listId };
      try {
        await addDoc(collection(db, "cards"), newCardData);
        onSuccess();
        setActiveOpenCard(null);
      } catch (error) {
        console.error("Error adding document: ", error);
        onError();
      }
    },
    []
  );

  return (
    <ListManagementContext.Provider
      value={{
        isOpen,
        handleOpenForm,
        handleCloseForm,
        handleAddList,
        activeOpenCard,
        handleOpenCard,
        activeOptionButton,
        handleOpenOptionMenu,
        handleDeleleList,
        handleCloseOptionMenu,
        activeEditList,
        handleOpenEditList,
        handleCloseEditList,
        handleUpdateList,
        handleAddCard,
        setActiveEditList,
      }}
    >
      {children}
    </ListManagementContext.Provider>
  );
};

export const useListManagementContext = () => {
  return useContext(ListManagementContext);
};
