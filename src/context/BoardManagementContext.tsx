import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Board } from "../types/Board";

type BoardManagementContextProps = {
  activeForm: string | null;
  boardName: string;
  newBoardName: string;
  listBoard: Board[];
  boardData: Board | null;
  activeEdit: string | null;
  sortBy: string;
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  setNewBoardName: Dispatch<SetStateAction<string>>;
  setBoardName: Dispatch<SetStateAction<string>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  setBoardData: Dispatch<SetStateAction<Board | null>>;
  handleOpenFormToAddBoard: (formName: string) => void;
  handleAddBoard: () => void;
  handleDeleteBoard: (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleOpenEdit: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCloseEdit: () => void;
  handleUpdateBoard: (
    id: string,
    boardName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  fetchBoard: () => void;
  navigateToBoardFunction: (board: Board) => void;
};

export const BoardManagementContext = createContext<
  BoardManagementContextProps | undefined
>(undefined);

type BoardManagementProviderProps = {
  children: ReactNode;
};

export const BoardManagementProvider = ({
  children,
}: BoardManagementProviderProps) => {
  const navigate = useNavigate();

  const [listBoard, setListBoard] = useState<Board[]>([]);
  const [boardData, setBoardData] = useState<Board | null>(null);
  const [boardName, setBoardName] = useState("");
  const [newBoardName, setNewBoardName] = useState("");
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [activeEdit, setactiveEdit] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("az");
  const [searchWord, setSearchWord] = useState("");

  const handleOpenFormToAddBoard = useCallback((formName: string) => {
    setActiveForm((prev) => (prev === formName ? null : formName));
  }, []);

  const handleAddBoard = useCallback(async () => {
    const newBoardData = { boardName };
    try {
      const docRef = await addDoc(collection(db, "boards"), newBoardData);
      const newBoard = {
        boardName,
        id: docRef.id,
      };
      setListBoard((prevList) => [...prevList, newBoard]);
      setBoardName("");
      setActiveForm(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }, [boardName]);

  const fetchBoard = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "boards"));
      const newData: Board[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Board[];
      setListBoard(newData);
      console.log(newData);
    } catch (error) {
      console.error("Error fetching boards: ", error);
    }
  }, []);

  const handleDeleteBoard = useCallback(
    async (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const taskDocRef = doc(db, "boards", id);

      try {
        await deleteDoc(taskDocRef);
        setListBoard((items) => items.filter((item) => item.id !== id));
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  const handleOpenEdit = useCallback(
    (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setactiveEdit(activeEdit === id ? null : id);
      setNewBoardName("");
    },
    [activeEdit]
  );

  const handleCloseEdit = useCallback(() => {
    setactiveEdit(null);
    setNewBoardName("");
  }, []);

  const handleUpdateBoard = useCallback(
    async (
      id: string,
      boardNameUpdate: string,
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      const taskDocRef = doc(db, "boards", id);
      try {
        await updateDoc(taskDocRef, {
          boardName: boardNameUpdate,
        });

        setListBoard((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, boardName: boardNameUpdate } : item
          )
        );
        setNewBoardName("");
        setBoardName("");
        setactiveEdit(null);
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  const navigateToBoardFunction = (board: Board) => {
    if (activeEdit) {
      return;
    }
    navigate(`/b/${board.id}/${board.boardName}`);
  };

  // const handleSearchBoard = useCallback(() => {
  //   const results = listBoard.filter((board) =>
  //     board.boardName.toLowerCase().includes(searchWord.toLowerCase())
  //   );
  //   setFilteredBoards(results);
  // }, [listBoard, searchWord]);

  return (
    <BoardManagementContext.Provider
      value={{
        activeForm,
        handleOpenFormToAddBoard,
        boardName,
        setBoardName,
        listBoard,
        handleAddBoard,
        handleDeleteBoard,
        activeEdit,
        handleOpenEdit,
        handleCloseEdit,
        handleUpdateBoard,
        newBoardName,
        setNewBoardName,
        fetchBoard,
        sortBy,
        setSortBy,
        searchWord,
        setSearchWord,
        boardData,
        setBoardData,
        navigateToBoardFunction,
      }}
    >
      {children}
    </BoardManagementContext.Provider>
  );
};
