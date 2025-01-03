import { createContext, ReactNode, useCallback, useState } from "react";

type NavContextType = {
  activeButton: string | null;
  handletoggleActiveButton: (buttonId: string) => void;
  isShowNotiNotRead: boolean;
  handleToggleNotiMode: () => void;
};

export const NavContext = createContext<NavContextType | undefined>(undefined);

type NavProviderProps = {
  children: ReactNode;
};

export const NavProvider = ({ children }: NavProviderProps) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [isShowNotiNotRead, setIsNotiNotRead] = useState(false);

  const handletoggleActiveButton = useCallback((buttonId: string) => {
    setActiveButton((prev) => (prev === buttonId ? null : buttonId));
  }, []);

  const handleToggleNotiMode = useCallback(() => {
    setIsNotiNotRead((prev) => !prev);
  }, []);

  return (
    <NavContext.Provider
      value={{
        activeButton,
        handletoggleActiveButton,
        isShowNotiNotRead,
        handleToggleNotiMode,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
