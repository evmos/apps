import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export declare type Snackbar = {
  type: string;
  text: string;
  subtext: string;
};

export const EmptySnackbarContext: Snackbar = {
  type: "",
  text: "",
  subtext: "",
};

const SnackbarContextObject = createContext<{
  value: Snackbar[];
  setValue: Dispatch<SetStateAction<Snackbar[]>>;
}>({ value: [], setValue: () => {} });

export function SnackbarContext({ children }: { children: JSX.Element }) {
  const [snackbar, setSnackbar] = useState<Snackbar[]>([]);

  return (
    <SnackbarContextObject.Provider
      value={{ value: snackbar, setValue: setSnackbar }}
    >
      {children}
    </SnackbarContextObject.Provider>
  );
}

export const useSnackbarContext = () => useContext(SnackbarContextObject);
