import React, { createContext, PropsWithChildren } from "react";

export interface IAppContextProps {}
export interface IAppProps {
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AppContext = createContext<IAppContextProps>(undefined!);
const AppProviderWrapper: React.FC<PropsWithChildren<IAppProps>> = ({
  children,
}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProviderWrapper;
