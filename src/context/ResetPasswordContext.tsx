import { createContext, ReactNode, useCallback, useState } from "react";

type ResetPasswordContextType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  handleOldPassword: (oldPassword: string) => void;
  handleNewPassword: (newPassword: string) => void;
  handleConfirmedPassword: (confirmPassword: string) => void;
};

export const ResetPasswordContext = createContext<
  ResetPasswordContextType | undefined
>(undefined);

type ResetPassWordProps = {
  children: ReactNode;
};

export const ResetPasswordProvider = ({ children }: ResetPassWordProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPassword = useCallback((oldPassword: string) => {
    setOldPassword(oldPassword);
  }, []);

  const handleNewPassword = useCallback((newPassword: string) => {
    setNewPassword(newPassword);
  }, []);

  const handleConfirmedPassword = useCallback((confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  }, []);

  return (
    <ResetPasswordContext.Provider
      value={{
        oldPassword,
        newPassword,
        confirmPassword,
        handleOldPassword,
        handleNewPassword,
        handleConfirmedPassword,
      }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};
