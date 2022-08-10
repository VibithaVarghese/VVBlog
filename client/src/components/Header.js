const { Link } = require("react-router-dom")

const Header = () => {
    return (
        <nav>
            <Link to="/Login">Login</Link>
            <Link to="/">Home</Link>
        </nav>
    )
}

export default Header;