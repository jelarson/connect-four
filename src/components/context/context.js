import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [player, setState] = useState({
    turn: 'Player One'
  });

  // const actions = {
  //   setPlayer: (amt) => setState({... state, turn: amt})
  // }
  const setPlayer = (value) => {
    setState({
      turn: value
    })}

  return (
    <UserContext.Provider value={{ player, setPlayer }}>
      {children}
    </UserContext.Provider>
  );
};