import { useContext, useEffect } from "react";
import styled from "styled-components";
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
    <Wrapper>
      {blogData === null && <div>Loading...</div>}
      {blogData !== null && <Blog></Blog>}
      {blogComments === null && <div>Loading...</div>}
      {blogComments !== null && <BlogComments></BlogComments>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export default App;

