import React, { useState } from "react";
import { createContext, useContext } from "react";

export const myContext = createContext();
const LoginContext = ({ children }) => {
  const data = localStorage.getItem("user");

  return <myContext.Provider value={data}>{children}</myContext.Provider>;
};

export default LoginContext;
