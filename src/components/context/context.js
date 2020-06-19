import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [player, setState] = useState({
    turn: "Player One",
    // count: 0,
  });

  // const actions = {
  //   setTurn: (amt) => setState({ ...state, turn: amt }),
  //   setCount: (amt) => setState({ ...state, count: amt }),
  // };
  const setPlayer = (value) => {
    setState({
      turn: value,
      count: value,
    });
  };

  return (
    // <UserContext.Provider value={{ player, actions }}>
    <UserContext.Provider value={{ player, setPlayer }}>
      {children}
    </UserContext.Provider>
  );
};
