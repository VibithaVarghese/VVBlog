import { useContext, useEffect } from "react";
import { BlogContext } from "./BlogContext";

const LogOut = () => {

    const { actions:{clearLogin}} = useContext(BlogContext);

    useEffect(()=>{
        clearLogin();        
    },[]);

    return (
        <div>LogOut</div>
    )
}

export default LogOut;