import { useContext, useEffect } from "react";
import styled from "styled-components";
import { BlogContext } from "./BlogContext";

const LogOut = () => {

    //  When the user enters the logout page then clear the login.

    const { actions:{clearLogin}} = useContext(BlogContext);

    useEffect(()=>{
        clearLogin();        
    },[]);

    // Log out page reders and log out message.
    return (
        <OuterDiv>
        <InnerDiv>Admin user is successfully loggedout!!!</InnerDiv>
        </OuterDiv>
    )
}
const OuterDiv = styled.div`
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
`

export default LogOut;