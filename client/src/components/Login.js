import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const Login = () => {

    const { state: {loggedIn, loginFailure}, actions:{handleUserChange, handleClick}} = useContext(BlogContext);
    return (
        <div>
            <input type="text" name="name" onChange={(ev) => handleUserChange(ev.target.value, "user")}></input>
            <input type="password" name="password" onChange={(ev) => handleUserChange(ev.target.value, "pwd")}></input>
            <input type="submit" value="Submit" onClick={handleClick}></input>
            {loginFailure && <p>Wrong admin credentials. Please try again</p>}
            {loggedIn && <p>Successfully LoggedIn</p>}
        </div>
    )
}

export default Login;