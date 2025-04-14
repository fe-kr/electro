import { useReducer } from "react";

export const useReducedState = <T>(initialState: T) =>
  useReducer(
    (prevState: T, newState: Partial<T>) => ({ ...prevState, ...newState }),
    initialState,
  );
