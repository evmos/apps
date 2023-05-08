import { OverridedMixpanel } from "mixpanel-browser";
import { createContext, useContext } from "react";

const context = createContext<OverridedMixpanel | null>(null);
export default context;

export const Consumer = context.Consumer;
export const Provider = context.Provider;

export const useMixpanel = () => useContext(context);
