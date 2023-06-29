
import { createContext, useContext, useReducer } from "react";
import commonReducer, { initialState as userState} from "../reducer/common.reducer";


export const AppContax=createContext();

export const AppProvider=({children})=>{
    return (
        <AppContax.Provider value={useReducer(commonReducer,userState)}>
            {children}
        </AppContax.Provider>
    )
}


export const useStateValue=()=>useContext(AppContax);