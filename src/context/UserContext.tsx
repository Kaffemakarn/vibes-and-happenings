import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from 'react';

interface IUserContext {
  signedIn: boolean;
  setSignedIn: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext>({
  signedIn: false,
  setSignedIn: () => {
    //init
  },
});

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const value = useMemo((): IUserContext => {
    return {
      signedIn,
      setSignedIn,
    };
  }, [signedIn]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
