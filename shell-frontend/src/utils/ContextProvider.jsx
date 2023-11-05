import { createContext, useContext, useState } from "react";

//creating Context
const StateContext = createContext();

//Context Provider
export const ContextProvider = ({children}) => {
    /* Authenticated User Details */
    const [authUser, setAuthUser] = useState({
        userId: "",
        name: "Pasindu Deshan",
        email: "pasindu@mail.com",
        role: "Admin"
    });

  return (
    <StateContext.Provider value={{
        authUser,
        setAuthUser
    }}>
        {children}
    </StateContext.Provider>
  )
}

//Context Consumer
export const userStateContext = () => useContext(StateContext);
