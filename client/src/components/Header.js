import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const { Link } = require("react-router-dom")

const Header = () => {
    const { state: {loggedIn}, actions:{}} = useContext(BlogContext);
    
    return (
        <nav>
            <Link to="/">Home</Link>
            {!loggedIn? <Link to="/Login">Login</Link>: <Link to="/LogOut">LogOut</Link>}            
        </nav>
    )
}

export default Header;