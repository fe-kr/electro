import { Context, createContext, useContext, useReducer } from "react";

export type ReturnUseReducedState<T> = ReturnType<typeof useReducedState<T>>;

export const useReducedState = <T>(initialState: T) =>
  useReducer(
    (prevState: T, newState: Partial<T>) => ({ ...prevState, ...newState }),
    initialState,
  );

export const createStrictContext = <T>() => {
  return createContext<T | null>(null);
};

export const useStrictContext = <T>(context: Context<T | null>) => {
  const value = useContext(context);

  if (value === null || value === undefined) {
    throw new Error("Strict context is not provided");
  }

  return value as T;
};
