import { useContext } from "react";
import { BlogContext } from "./BlogContext";

const Blog = () => {

    const { state: {blogData}} = useContext(BlogContext);
    
    return (
        <div>Blog</div>
    )
}

export default Blog;