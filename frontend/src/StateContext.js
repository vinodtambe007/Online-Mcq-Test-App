import React, { createContext, useState, useContext} from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isAuth,setIsAuth] = useState(() => JSON.parse(localStorage.getItem('isAuth')) || false);

  return (
    <StateContext.Provider value={{ isAuth,setIsAuth }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
