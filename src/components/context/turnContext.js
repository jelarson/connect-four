import React, { useState, createContext } from "react";

export const UserContextTurn = createContext();

export const UserProvider = ({ children }) => {
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
