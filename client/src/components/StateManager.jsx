import React, { createContext, useEffect, useState } from "react";

export const StateManagerContext = createContext();

export function StateManagerProvider(props) {
  // have all the states that we want globally here
  const [searchedSpell, setSeachedSpell] = useState([]);

  // used to print the value of the states when they changes
  useEffect(() => {
    console.log("searchedSpell: ");
    console.log(searchedSpell);
  }, [searchedSpell]); // change this array to include all states we want to track

  return (
    <StateManagerContext.Provider
      value={{
        globallySearchedSpell: [searchedSpell, setSeachedSpell],
      }}
    >
      {props.children}
    </StateManagerContext.Provider>
  );
}
