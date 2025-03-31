import { createContext } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    let backendUrl = import.meta.env.VITE_BACKEND_URL
    
    
  const value ={
    backendUrl
  }
  return(
    <ShopContext.Provider value= {value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;

