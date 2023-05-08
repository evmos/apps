import React, { createContext, useContext } from "react";
// TODO: que valor por defecto le pongo?
// TODO: remove this @ts-ignore: Unreachable code error
// @ts-ignore: Unreachable code error
const context = createContext();
export default context;

export const Consumer = context.Consumer;
export const Provider = context.Provider;

export const useMixpanel = () => useContext(context);
