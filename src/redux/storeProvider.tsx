"use client"; // Needed for Client Components

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
