"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      checkout: checkoutReducer,
    },
  });
