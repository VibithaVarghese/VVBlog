import { useContext, useEffect } from "react";
import styled from "styled-components";
import Blog from "./components/Blog";
import BlogComments from "./components/BlogComments";
import CircularProgress from '@mui/material/CircularProgress';
import { BlogContext } from "./components/BlogContext";


const App = () => {
  // import all the context information
  const { state: {blogData, blogComments}, actions:{getBlogData, getBlogComments}} = useContext(BlogContext);

  // on mount get the blog and comments data from the server
  useEffect(()=>{
    getBlogData();
    getBlogComments();        
},[]);
  
  return (
    <Wrapper>
      {/* if the blog data and comment is still null
      then load the circular progress otherwise render the data */}
      {blogData === null && <div><CircularProgress></CircularProgress></div>}
      {blogData !== null && <Blog></Blog>}
      {blogComments === null && <div><CircularProgress></CircularProgress></div>}
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

