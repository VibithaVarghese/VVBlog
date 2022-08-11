import { useContext, useEffect } from "react";
import Blog from "./components/Blog";
import BlogComments from "./components/BlogComments";
import { BlogContext } from "./components/BlogContext";


const App = () => {
  const { state: {blogData, blogComments}, actions:{getBlogData, getBlogComments}} = useContext(BlogContext);

  useEffect(()=>{
    getBlogData();
    getBlogComments();        
},[]);
  
  return (
    <div>
      {blogData === null && <div>Loading...</div>}
      {blogData !== null && <Blog></Blog>}
      {blogComments === null && <div>Loading...</div>}
      {blogComments !== null && <BlogComments></BlogComments>}
    </div>
  );
}

export default App;
