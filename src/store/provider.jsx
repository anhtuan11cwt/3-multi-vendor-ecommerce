"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { hydrateCart } from "@/store/cartSlice";
import { makeStore } from "@/store/store";

const store = makeStore();

function ReduxProviders({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ReduxProviders>{children}</ReduxProviders>
    </Provider>
  );
}
