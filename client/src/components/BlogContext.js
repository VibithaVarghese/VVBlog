import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
export const BlogContext = createContext(null);

const initialState = {
    blogData: null,
    blogComments: null,
    user: null,
    loggedIn: false,
    loginFailure: "",
}

const reducer = (state, action) => {
    switch(action.type){
        /*
            get the user login infomation from the server.
        */
        case "get_user_data": {
            let name = action.name;
            let value = action.value;
            return ( {
                ...state,
            user: {...state.user, [name]: value,}
        })
        }  

        // when the login is successful change the state variable to true
        case "login_sucess": {
            return ({
                ...state,
                loggedIn: true,
                loginFailure: false,
            })
        }

        // when login is not successful make the state variable true 
        case "login_failed": {
            return ({
                ...state,
                loginFailure: true,
                loggedIn: false,
            })
        }

        case "logout": {
            return ({
                ...state,
                loggedIn: false,
                user: null,
            })
        }

        case "get_blog_data": {
            return ({
                ...state,
                blogData: action.value,
            })

        }

        case "get_blog_comments": {
            return({
                ...state,
                blogComments: action.value,
            })

        }

        default: {
            console.log("Getting an action type which is not defined")
            return ({
                ...state
            })
        }
    }
}

export const BlogProvider = ({children}) => {

    // create a reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // function that handle the change in the user login inputs
    const handleUserChange = (value, name) => {
        dispatch({
            type: "get_user_data",
            value: value,
            name: name,
        });
    };

    // handle the username & pwd submit button
    const handleClick = (ev) => {
        ev.preventDefault();
        console.log(state.user);
                
        fetch("/api/authenticate", {
        method: "POST",        
        headers: {            
            "Content-Type": "application/json",
        },
        body: JSON.stringify(state.user),
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            /*
            Data is coming back in the following format if the login is successful
                data: "loggedIn"
                status: 200
                
            Data is coming in the following format if the login is not successful
                data: "Not loggedIn"
                status: 200
            */
            if(json.data === "loggedIn") {
                dispatch({
                    type: "login_sucess",
                });
                
            } else {
                dispatch({
                    type: "login_failed",
                });
            }

        })
        .catch((error) => {
            console.error('Error:', error);
          });
    };

    // on loading the logout page, clear the login information
    const clearLogin = () => {
        dispatch({
            type: "logout",
        });
    }

    const getBlogData = () => {
        fetch(`/api/get-blogData`)
        .then(res => res.json())
        .then(data=> {  
            console.log(data);    
            dispatch({
                type:"get_blog_data",
                value: data.data
            });
        });        
    }


    const getBlogComments = () => {
        fetch(`/api/get-CommentsData`)
        .then(res => res.json())
        .then(data=> {  
            console.log(data);    
            dispatch({
                type:"get_blog_comments",
                value: data.data
            });
        });   
    }


    return (
        <BlogContext.Provider value={{state, actions: { handleUserChange, handleClick, clearLogin, getBlogData, getBlogComments }}}>
            {children}
        </BlogContext.Provider>
    )
}