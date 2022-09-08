import { createContext, useState, useEffect, useReducer } from "react";
//context same as when using context

export const UserDataContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    }
)
const initialState = {
    currentUser: null
}

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}
const userDataReducer = (state, action) =>{
    const {type,payload} = action;;
    switch(type){
        case 'SET_CURRENT_USER': 
        return {
            ...state, 
            currentUser:payload
        }
        default: throw new Error(`Unhandled action ${type} in userDataReducer`);
    }
}
const createAction = (type,payload) => ({type,payload});
//same UserProvider when using context 
export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);
    //only change this
    const [state,dispatch] = useReducer(userDataReducer,initialState);
    const {currentUser} = state;
    const setCurrentUser = (user)=>{
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER,user))
    }
    const value = { currentUser, setCurrentUser };
    
    //unMounted
    return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

