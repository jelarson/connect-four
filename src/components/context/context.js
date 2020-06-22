import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [player, setState] = useState({
    turn: "Player One",
    count: 0,
  });

  const actions = {
    setPlayer: (amt) => {
      setState((preState) => {
        return { ...preState, turn: amt };
      });
    },
    setCount: (amt) =>
      setState((preState) => {
        return { ...preState, count: amt };
      }),
  };
  // const setPlayer = (value) => {
  //   setState({
  //     turn: value,
  //     count: value,
  //   });
  // };

  return (
    <UserContext.Provider value={{ player, actions }}>
      {children}
    </UserContext.Provider>
  );
};
