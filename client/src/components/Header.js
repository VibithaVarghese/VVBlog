import { useContext } from "react";
import { BlogContext } from "./BlogContext";
import styled from "styled-components"

const { Link } = require("react-router-dom")

const Header = () => {
    // import the context information.
    const { state: {loggedIn}, actions:{}} = useContext(BlogContext);
    
    // the header renders the logo VV, and Home & Login/Logout buttons.
    return (
        <HeaderWrapper>
        <Span>V V</Span>
            <nav>
                <StledLink to="/">Home</StledLink>
                {!loggedIn? <StledLink to="/Login">Login</StledLink>: <StledLink to="/LogOut">Logout</StledLink>}            
            </nav>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding-page) var(--padding-between) var(--padding-page) var(--padding-between);
`

const Span = styled.span`
    font-size: 30px;
    color: var(--color-blue);
`

const StledLink = styled(Link)`
    color: var(--color-blue);
    text-decoration: none;
    padding-right: var(--padding-between);
`

export default Header;