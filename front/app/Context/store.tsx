"use client";
import {createContext, useContext, Dispatch, SetStateAction, useState} from "react";


interface ContextProps{
  isAdmin:boolean,
  setIsAdmin: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
  isAdmin:false,
  setIsAdmin:(isAdmin) => {!isAdmin}
})

export const GlobalContextProvider = ({children} : any) => {
  const [isAdmin,setIsAdmin] = useState(false);

  return(
    <GlobalContext.Provider value={{isAdmin, setIsAdmin}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);