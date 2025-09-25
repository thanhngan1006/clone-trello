import { createContext, useState, ReactNode, useCallback } from "react";

type LoginContextType = {
  email: string;
  password: string;
  isShowPassword: boolean;
  handleChangeEmail: (email: string) => void;
  handleChangePassword: (password: string) => void;
  handleShowPassword: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

type LoginProviderProps = {
  children: ReactNode;
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleChangeEmail = useCallback((email: string) => {
    setEmail(email);
  }, []);

  const handleChangePassword = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((isShowPassword) => !isShowPassword);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        email,
        password,
        handleChangeEmail,
        handleChangePassword,
        errorMessage,
        setErrorMessage,
        isShowPassword,
        handleShowPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
