import { createContext, useReducer } from "react";
export const BlogContext = createContext(null);

const initialState = {
    blogData: null,
    blogComments: null,
    user: null,
    loggedIn: false,
}

const reducer = (state, action) => {
    switch(action.type){
        case "get_user_data": {
            let name = action.name;
            let value = action.value;
            return ( {
                ...state,
               user: {...state.user, [name]: value,}
               
        })

        }  
    }

}

export const BlogProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleUserChange = (value, name) => {
        dispatch({
            type: "get_user_data",
            value: value,
            name: name,
        })
    }

    return (
        <BlogContext.Provider value={{state, actions: {handleUserChange}}}>
            {children}
        </BlogContext.Provider>
    )
}