"use client";

import React, { useState } from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurerntStep: React.Dispatch<React.SetStateAction<number>>;
};

const InitialValues: InitialValuesProps = {
  currentStep: 1,
  setCurerntStep: () => undefined,
};

const authContext = React.createContext(InitialValues);
const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurerntStep] = useState<number>(
    InitialValues.currentStep
  );
  const values = { currentStep, setCurerntStep };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
