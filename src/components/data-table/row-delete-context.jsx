"use client";

import { createContext, useContext } from "react";

export const RowDeleteContext = createContext(null);

export function useRowDelete() {
  return useContext(RowDeleteContext);
}
