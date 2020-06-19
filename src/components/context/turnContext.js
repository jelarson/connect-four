import React, { useState, createContext } from "react";

export const UserContextTurn = createContext();

export const UserProviderTurn = ({ children }) => {
  const [turnCount, setState] = useState({
    count: 0
  });

  const setTurnCount = (value) => {
    setState({
      count: value,
    });
  };

  return (
    <UserContextTurn.Provider value={{ turnCount, setTurnCount }}>
      {children}
    </UserContextTurn.Provider>
  );
};
