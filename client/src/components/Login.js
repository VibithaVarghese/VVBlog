import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { BlogContext } from "./BlogContext";

const Login = () => {

    const { loginUser, loginPwd, state: {loggedIn, loginFailure, error }, actions:{handleUserChange, handleClick}} = useContext(BlogContext);


    useEffect(()=>{
        loginUser.current.focus();       
    },[]);

    return (
        <OutterWrapper>
            <InnerDiv>
                <input type="text" ref={loginUser} className="input" name="name" onChange={(ev) => handleUserChange(ev.target.value, "user")}></input>
                <input type="password" ref={loginPwd} className="input" name="password" onChange={(ev) => handleUserChange(ev.target.value, "pwd")}></input>
                <input type="submit" value="Submit" onClick={handleClick}></input>
                {loginFailure && <ErrorMessage>Wrong admin credentials. Please try again</ErrorMessage>}
                {loggedIn && <SuccessMessage>Successfully LoggedIn!!!</SuccessMessage>}
                {error === "User_Pwd_empty" && <ErrorMessage>Enter correct admin user name and password</ErrorMessage>}
                {error === "User_empty" && <ErrorMessage>Enter correct username</ErrorMessage>}
                {error === "Pwd_empty" && <ErrorMessage>Enter correct password</ErrorMessage>}
            </InnerDiv>
        </OutterWrapper>
    )
}

const OutterWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
    
`
const InnerDiv = styled.div`
    width: 50vw;
    height: auto;
    padding: 25px;

    border-radius: 25px;
    margin: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    > * {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    & .input {
        margin-top: 15px;
        margin-bottom: 15px;
        width: 100%;
        height: 45px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid var(--color-lightblue);
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;

    }
`

const SuccessMessage = styled.p`
    color: var(--color-blue);
`

const ErrorMessage = styled.p`
    color: red;
`

export default Login;