import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";

export type List = {
  listName: string;
  listId: string;
  boardId: string | undefined;
};

type ListManagementContextProps = {
  lists: List[];
  isOpen: boolean;
  listName: string;
  setListName: Dispatch<SetStateAction<string>>;
  handleOpenForm: () => void;
  handleCloseForm: () => void;
  handleAddList: (boardId: string | undefined) => void;
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

  const handleOpenForm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setListName("");
    setIsOpen(false);
  }, []);

  const handleAddList = useCallback(
    async (boardId: string | undefined) => {
      const newListData = { listName, boardId };
      try {
        const docRef = await addDoc(collection(db, "lists"), newListData); // Đảm bảo bạn đang thêm vào collection "lists"
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
      }}
    >
      {children}
    </ListManagementContext.Provider>
  );
};
