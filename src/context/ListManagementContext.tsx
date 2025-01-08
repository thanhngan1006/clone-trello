import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useParams } from "react-router-dom";

export type List = {
  listName: string;
  listId: string;
  boardId: string | undefined;
};

type ListManagementContextProps = {
  lists: List[];
  isOpen: boolean;
  listName: string;
  activeOpenTag: string | null;
  tagName: string;
  activeOptionButton: string | null;
  activeEditList: string | null;
  newListName: string;
  setListName: Dispatch<SetStateAction<string>>;
  setTagName: Dispatch<SetStateAction<string>>;
  setNewListName: Dispatch<SetStateAction<string>>;
  handleOpenTag: (listId: string) => void;
  handleOpenForm: () => void;
  handleCloseForm: () => void;
  handleAddList: (boardId: string | undefined) => void;
  fetchLists: (boardId: string | undefined) => void;
  handleOpenOptionMenu: (listId: string) => void;
  handleDeleleList: (listId: string) => void;
  handleCloseOptionMenu: () => void;
  handleOpenEditList: (listId: string) => void;
  handleCloseEditList: () => void;
  handleUpdateList: (listId: string, listNameUpdate: string) => void;
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
  const [lists, setLists] = useState<List[]>([]);
  const [listName, setListName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeOpenTag, setActiveOpenTag] = useState<string | null>(null);
  const [tagName, setTagName] = useState("");
  const [activeOptionButton, setActiveOptionButton] = useState<string | null>(
    null
  );
  const [activeEditList, setActiveEditList] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");

  const handleOpenEditList = useCallback(
    (listId: string) => {
      setActiveEditList(activeEditList === listId ? null : listId);
    },
    [activeEditList]
  );

  const handleCloseEditList = useCallback(() => {
    setActiveEditList(null);
  }, []);

  const handleOpenForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setListName("");
    setIsOpen(false);
  }, []);

  const handleOpenTag = useCallback(
    (listId: string) => {
      setActiveOpenTag(activeOpenTag === listId ? null : listId);
    },
    [activeOpenTag]
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

  const handleAddList = useCallback(
    async (boardId: string | undefined) => {
      if (!boardId) {
        console.error("Board ID is required");
        return;
      }

      const newListData = { listName, boardId };
      try {
        const docRef = await addDoc(collection(db, "lists"), newListData);
        const newList = {
          listName,
          listId: docRef.id,
          boardId,
        };
        setLists((prevList) => [...prevList, newList]);
        setListName("");
        setIsOpen(false);
        console.log(boardId, "===", listName);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    [listName]
  );

  const fetchLists = useCallback(async (boardId: string | undefined) => {
    try {
      const querySnapshot = await getDocs(collection(db, "lists"));
      const newData: List[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        listId: doc.id,
      })) as List[];

      const filteredLists = newData.filter((list) => list.boardId === boardId);
      setLists(filteredLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }, []);

  const handleDeleleList = useCallback(async (listId: string) => {
    console.log("sdfasdf");
    const taskDocRef = doc(db, "lists", listId);

    try {
      await deleteDoc(taskDocRef);
      setLists((items) => items.filter((item) => item.listId !== listId));
    } catch (err) {
      alert(err);
    }
  }, []);

  const handleUpdateList = useCallback(
    async (listId: string, listNameUpdate: string) => {
      const taskDocRef = doc(db, "lists", listId);
      try {
        await updateDoc(taskDocRef, {
          listName: listNameUpdate,
        });

        setLists((prevList) =>
          prevList.map((item) =>
            item.listId === listId
              ? { ...item, listName: listNameUpdate }
              : item
          )
        );
        setNewListName("");
        setListName("");
        setActiveEditList(null);
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  return (
    <ListManagementContext.Provider
      value={{
        lists,
        setListName,
        listName,
        isOpen,
        handleOpenForm,
        handleCloseForm,
        handleAddList,
        activeOpenTag,
        handleOpenTag,
        tagName,
        setTagName,
        fetchLists,
        activeOptionButton,
        handleOpenOptionMenu,
        handleDeleleList,
        handleCloseOptionMenu,
        activeEditList,
        handleOpenEditList,
        handleCloseEditList,
        setNewListName,
        newListName,
        handleUpdateList,
      }}
    >
      {children}
    </ListManagementContext.Provider>
  );
};
