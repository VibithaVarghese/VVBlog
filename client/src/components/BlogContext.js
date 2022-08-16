import { useRef } from "react";
import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
export const BlogContext = createContext(null);

/*
    This is the initial state of the state variables.
    each one is explained below.
    blogData => contains all the statsi text of the blog from Mongo DB 
    blogComments => comments all the user comments so far and its from Mongo DB
    newComment => contains the data about te newly entered comment in the website
    replyComment => contains thte information about newly entered reply in website
    user => contains the information about the user logged in in the login page of the website
    loggedIn => Contains true or false value. If the user successfully logged in then value is true.
    loginFailure => contains the value true or false. If the user failed to loggin then the value is true.
    error => Any error in the page, for example the comment field is empty, then the error conatisn the specific 
    error message.
*/
const initialState = {
    blogData: null,
    blogComments: null,
    newComment: null,
    replyComment: null,
    user: null,
    loggedIn: false,
    loginFailure: "",
    error: "",
}

/*
    This reducer function performs all the logic in the application.
    detailed comments are given for each logic in the reducer.
*/
const reducer = (state, action) => {
    switch(action.type){
        /*
            get the user login infomation from the server.
            Here the name can be "user" or "pwd".
            Value filed conatins the real user name and password entered 
            in the filed of username & password inputs.
        */
        case "get_user_data": {
            let name = action.name;
            let value = action.value;
            return ( {
                ...state,
            user: {...state.user, [name]: value,}
        })
        }  

        /*
             The new comment that need to POST to the server is formed here.
             newComment contains the comment, name, date, replyName, reply filed.
             When a new comment is posted initially the replyName and reply are given as
             empty. action.name can have two values which are "name", "comment".
             date id the current date and time when the user post the comment.
        */
        case "create_comment": {
            return ( {
                ...state,
                newComment: { ...state.newComment, [action.name]: action.value, date: action.date, replyName:"", reply: "" }
            })
        }

        /* 
            when the login is successful change the state variable loggedIn to true.
            change the loginFailure to false when loggin is successful.
            This variable is used to conditionaly render the reply button , delete button for each comment
            once the login is success.
            This message also helps to render the successfully logged in message on the login page. 
        */
        case "login_sucess": {
            return ({
                ...state,
                loggedIn: true,
                loginFailure: false,
            })
        }

        /* 
            when login is not successful make the state loginFailure variable true
            When login is not successful make the state loggedIn variable false.
            LoginFailure state is used in the loggin page to show the 
            error message that user is not using valid credentials.
            LoggedIn variable is used to show the admin login features like replay and delete 
            button, reply text area etc.

        */
        case "login_failed": {
            return ({
                ...state,
                loginFailure: true,
                loggedIn: false,
            })
        }

        /*
            This case executes when user logged out .
            So this case sets back the loggedIn variable to false so that
            the reply text area, reply button and delete button will hide.
            It also set the user variable back to null.
        */
        case "logout": {
            return ({
                ...state,
                loggedIn: false,
                user: null,
            })
        }

        /*
            This case asignes the blog data from the action to the state blogData.
            only blog data need to be the changed, so the spread the state variable
            in order to retain the rest of the state variables.
            This blog data is called in the blog page to render the blog data on the website.
        */
        case "get_blog_data": {
            return ({
                ...state,
                blogData: action.value,
            })

        }

        /*
            
        */
        case "get_blog_comments": {
            return({
                ...state,
                blogComments: action.value,
            })

        }

        case "error_in_post": {
            return ({
                ...state,
                error: "Comment is empty",
            })
        }

        case "error_clear": {
            return ({
                ...state,
                error: "",
            })
        }

        case "post_name_empty": {
            return ({
                ...state,
                error: "Post name empty",
            })
        }

        case "error_in_login": {
            return ({
                ...state,
                error: "User_Pwd_empty"
            })
        }

        case "error_in_user": {
            return ({
                ...state,
                error: "User_empty"
            })
        }

        case "error_in_pwd": {
            return ({
                ...state,
                error: "Pwd_empty"
            })
        }

        /* value:value,
        id:id,
        name: name,
        date: date,
        comment: comment,
        */
        case "reply_comment_text_area_change": {
            console.log(action);
            return({
                ...state,
                replyComment: { ...state.replyComment,id:action.id, reply: action.value, date: action.date, replyName:"admin", comment:action.comment }
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
    const textInput = useRef();
    const postName = useRef();
    const replyText = useRef();
    const loginUser = useRef();
    const loginPwd = useRef();
    const itemsRef = useRef([]);
    
    
    // function that handle the change in the user login inputs
    const handleUserChange = (value, name) => {
        dispatch({
            type: "get_user_data",
            value: value,
            name: name,
        });
    };

    const handlePostSubmit = (ev) => {
         ev.preventDefault();
         // postTextArea, Select the text area and clear it after the submit.

         

         if(state.newComment === null) {
            dispatch({
                type: "error_in_post",
            })
         }else if(state.newComment.name === undefined) {
            dispatch({
                type: "post_name_empty",
            })
         } else {

            dispatch({
                type: "error_clear",
            })

            textInput.current.value = "";        

         postName.current.value = "";

            fetch("/api/add-comment", {
                method: "POST",        
                headers: {            
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state.newComment),
                })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    // once the new comment updated fetch it and update the GUI
                    getBlogComments();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

         }

        
    }

    // handle the username & pwd submit button
    const handleClick = (ev) => {
        ev.preventDefault();
        console.log(state.user);

        

        if(state.user === null) {
            dispatch({
                type: "error_in_login",
            })
        } else if(state.user.user === undefined) {
            dispatch({
                type: "error_in_user",
            })

        } else if(state.user.pwd === undefined) {
            dispatch({
                type: "error_in_pwd",
            })

        } else {
            
            loginUser.current.value = "";
        loginPwd.current.value = "";

            dispatch({
                type: "error_clear",
            })

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
        }
                
        
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

    const handleCommentPost = (value, name) => {
        /*
        form the comment structre as given below:
            {
                "id": "1",
                "name": "SomeOneFunny",
                "date": "February 12, 2020 at 12:31 pm",
                "comment": "you helped me a lot with my issues",
                "replyName": "SomeOne More funny",
                "reply": "You are welcome"
            }
        */
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            
            dispatch({
                type: "create_comment",
                value: value,
                date: dateTime,
                name: name,
            })
    }
    // value, "reply", indBlogComments.id

    const handleReplyTextArea = (value, id, name, date, comment) => {
       dispatch({
            type: "reply_comment_text_area_change",
            value:value,
            id:id,
            name: name,
            date: date,
            comment: comment,
        })
    }

    const handleReplyClick = ( ev, id, index ) => {
        ev.preventDefault();

        // clear the text from the text area.
        itemsRef.current[index].value = "";
       
        console.log(`this is reply text area`,itemsRef.current[index]);

        fetch(`/api/update-comments/${id}`, {
            method: "PATCH",        
            headers: {            
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state.replyComment),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                // once the new comment updated fetch it and update the GUI
                getBlogComments();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleDeleteClick = (ev, id) => {
        ev.preventDefault();
        fetch(`/api/delete-comments/${id}`, {
            method: 'DELETE',
          })
          .then(res => res.json()) 
          .then((json) => {
            console.log(json);
            // once the new comment updated fetch it and update the GUI
            getBlogComments();
            })
          .catch((error) => {
            console.log("I got an error", error);
          })
    }


    return (
        <BlogContext.Provider value={{loginUser, loginPwd, itemsRef, textInput,postName, state, actions: { 
            handleUserChange, 
            handleClick, 
            clearLogin, 
            getBlogData, 
            getBlogComments,
            handleCommentPost,
            handlePostSubmit, 
            handleReplyClick, 
            handleDeleteClick,
            handleReplyTextArea,   
            }}}>
            {children}
        </BlogContext.Provider>
    )
}