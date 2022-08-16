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
            The case assign the blog comments to the state variable blogComments.
            This blogComments variable then used in the blogComments component
            to render the blog comments.
            State variable is spreaded so that rest of the state data is retained.
        */
        case "get_blog_comments": {
            return({
                ...state,
                blogComments: action.value,
            })

        }

        /*
            This case runs when the user tries to press the submit button without entering 
            a comment text in the text area. if the error happened then conditionally the 
            error message is rendered in the home page.
        */
        case "error_in_post": {
            return ({
                ...state,
                error: "Comment is empty",
            })
        }

        /*
            When the user submits the submit button with correct data the error message 
            need to be cleared. This state does that function.
            Since the error message gets value "" the error message showing red color in the page will be
            cleared.
        */
        case "error_clear": {
            return ({
                ...state,
                error: "",
            })
        }

        /*
            When the user enter a comment , but do not enter any text on the name field,
            then this error message gets printed. State is spreaded in order to keep the rest of the 
            variable with the same value.
        */
        case "post_name_empty": {
            return ({
                ...state,
                error: "Post name empty",
            })
        }

        /*
            this error message is assigned to error state variable 
            when the user press the submit button
            without entering any username text or password 
            text. This error state conditionaly render the 
            error message in red color and ask user to enter a 
            username and password.
            State is spreaded in order to retain the rest of the 
            values in the state variable.
        */
        case "error_in_login": {
            return ({
                ...state,
                error: "User_Pwd_empty"
            })
        }

        /*
            This error state is executed when the user try to
            submit the login form without entering the username
            field. When the error message get assigned as 
            "User_empty" then a error message conditionally render
            on the login page. State variable is spreaded here 
            in order to retain the values of rest of the 
            state.
        */
        case "error_in_user": {
            return ({
                ...state,
                error: "User_empty"
            })
        }

        /*
            The error state will get assigned to "Pwd_empty" state
            when the user tries to submit the login form without 
            entering any text on the password field.
            An error message consitionally renders on the login page, 
            asking the 
        */
        case "error_in_pwd": {
            return ({
                ...state,
                error: "Pwd_empty"
            })
        }

        /*
            When the textarea for the reply for each comment changes
            this case gets executed and it stored the reply comment 
            in a varibale. reply comment have the following keys
            
            value:value,
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

        /*
            If a unknown action gets called then execute the default action.
            Ideally this piece of code whould never execute. 
            We should pass only valid actions
            in the displatch function.
        */
        default: {
            console.log("Getting an action type which is not defined")
            return ({
                ...state
            })
        }
    }
}

/*
    This is the provider for the context!
*/
export const BlogProvider = ({children}) => {

    // create a reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    /*
        The following refs are used to clear the elements value
        after the submit is done.
        textInput => the text area which gets the users new comments
        postName  => the name field for the new comment
        loginUser => user name login field
        loginPwd => password field
        itemsRef => its the array of refs which corrsponds to the text area for each comments.

        after submitting these refs helps to clear the value of the text area or input field
    */
    const textInput = useRef();
    const postName = useRef();    
    const loginUser = useRef();
    const loginPwd = useRef();
    const itemsRef = useRef([]);
    
    
    /* 
        function that handle the change in the user login inputs.
        When the user enter username or password on the login page 
        this function is getting called.
    */
    const handleUserChange = (value, name) => {
        dispatch({
            type: "get_user_data",
            value: value,
            name: name,
        });
    };

    /*
        This function is called after the submit is pressed for entering a
        new comment in the home page.
    */
    const handlePostSubmit = (ev) => {

            // prevent the page refresh.
            ev.preventDefault();

            /*
            if the comment post is empty or the comment name is 
            empty then throw error message on the home page.
            */
            if(state.newComment === null) {
                dispatch({
                    type: "error_in_post",
                })
            }else if(state.newComment.name === undefined) {
                dispatch({
                    type: "post_name_empty",
                })
            } else {

                /*
                    When user enter the comment & fill the name and then submit
                    then 
                        1. clear the error messages if any,
                        2. clear the comment and name field
                        3. post the new comment to the backend then to mongo DB
                        4. add the new comment to the website
                */
                //1. clear the error messages if any,
            dispatch({
                type: "error_clear",
            })
             // postTextArea, Select the text area and clear it after the submit.
             //2. clear the comment and name field
            textInput.current.value = "";   
            postName.current.value = "";

            //3. post the new comment to the backend then to mongo DB
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
                    //4. add the new comment to the website
                    getBlogComments();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            }

        
    }

    // handle the username & pwd submit button
    /*
        handle click is called when the submit button is pressed in the user
        login page. It does the following logics:
            1. prevent page from refreshing.
            2. check whether user entered a username and password, if not throw error messages.
            3. if the user enteres correct information then clear the error messages if any.
            4. Send the user login username and password to the backend to check whether username & pwd is valid
            5. If username and password is correct login.
            6. If username and password incorrect throw error. 
    */
    const handleClick = (ev) => {
        // 1. prevent page from refreshing.
        ev.preventDefault();
        console.log(state.user);

        // 2. check whether user entered a username and password, if not throw error messages.
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
            // 3. if the user enteres correct information then clear the error messages if any.
        loginUser.current.value = "";
        loginPwd.current.value = "";

            dispatch({
                type: "error_clear",
            })

            // 4. Send the user login username and password to the backend to check whether username & pwd is valid
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
                    //    5. If username and password is correct login.
                    if(json.data === "loggedIn") {
                        dispatch({
                            type: "login_sucess",
                        });
                        
                    } else {
                        // 6. If username and password incorrect throw error.
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

    /*
        Get the blog data from the server and then give it to the reducer.
    */
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


    /*
        ge all the comments from the backend then 
        store it to a variable by passing it to the reducer
    */
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

    /*
        1. get the comment and name field from the home page.
        2. make todays date.
        3. send the information to the reducer
    */
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

    /*
        When the reply text area changes store that information 
        in the state variable by passing it to the dispatch reducer function.
    */
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

    /*
        When the user click on reply button this function rus and
        1. prevent page from refreshing
        2. clear the reply text area
        3. PATCH the comment to the backend
        4. update the blog to show the new data
    */
    const handleReplyClick = ( ev, id, index ) => {
        // 1. prevent page from refreshing
        ev.preventDefault();

        // clear the text from the text area.
        // 2. clear the reply text area
        itemsRef.current[index].value = "";

        console.log(`this is reply text area`,itemsRef.current[index]);

        //  3. PATCH the comment to the backend
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
                // 4. update the blog to show the new data
                getBlogComments();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    /*
        This function runs when the user click the delete button on GUI
        when the function executes
        1. prevent page from refreshing
        2. Send DELETE request to backend.
        3. get the blog camments again and show the change on web page.
    */
    const handleDeleteClick = (ev, id) => {
        // 1. prevent page from refreshing
            ev.preventDefault();
            // 2. Send DELETE request to backend.
            fetch(`/api/delete-comments/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json()) 
            .then((json) => {
                console.log(json);
                // once the new comment updated fetch it and update the GUI
                //  3. get the blog camments again and show the change on web page.
                getBlogComments();
                })
            .catch((error) => {
                console.log("I got an error", error);
            })
    }


    // return the provider with value that contains the context information
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