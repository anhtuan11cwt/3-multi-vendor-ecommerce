"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
