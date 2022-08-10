import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const Login = () => {

    const { actions:{handleUserChange}} = useContext(BlogContext);
    return (
        <div>
            <input type="text" name="name" onChange={(ev) => handleUserChange(ev.target.value, "user")}></input>
            <input type="password" name="password" onChange={(ev) => handleUserChange(ev.target.value, "pwd")}></input>
            <input type="submit" value="Submit"></input>
        </div>
    )
}

export default Login;