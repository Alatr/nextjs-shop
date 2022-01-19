import { createContext, PropsWithChildren, useState } from "react";

export interface IAppContext {
  menu: string[];
  firstCategory: number;
  setMenu?: (newMenu: string[]) => void;
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: 0,
});

export const AppContextProvider = ({
  menu,
  firstCategory,
  children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const [menuState, setMenuState] = useState<string[]>(menu);
  const setMenu = (newMenu: string[]) => {
    setMenuState(newMenu);
  };

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};
