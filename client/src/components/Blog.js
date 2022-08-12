import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BlogContext } from "./BlogContext";
import Map from "./Map";

const Blog = () => {

    const { state: {blogData}} = useContext(BlogContext);

    return (
        <OuterDiv>
            <InnerDiv>
                <Heading>Things to do in hochelaga- maisonneuve</Heading>                
            </InnerDiv>
            {blogData.map((indBlogData) => {
                let lat_long = indBlogData.lat_long;
                let newArray = lat_long.split(", ");
                let lat = parseFloat(newArray[0]);
                let lng = parseFloat(newArray[1]);
                return (
                    <InnerDiv>
                        <Title>{indBlogData.title}</Title>
                        <Body>{indBlogData.body}</Body>                        
                        <Reference href={indBlogData.reference}>Reference</Reference>                       
                        <Map lat={lat} lng={lng}></Map>
                    </InnerDiv>
                )
            })}
        </OuterDiv>
    )
}

const OuterDiv = styled.div`
    width: 50vw;
    height: auto;
`

const InnerDiv = styled.div`
padding: 25px;

border-radius: 25px;
margin: 10px;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    > * {
        padding-bottom: var(--pading-between-text);
    }
`

const Title = styled.p`
    font-size: 25px;
`

const Heading = styled.p`
    font-size: 35px;
`

const Body = styled.p`
    
`
const Reference = styled.a`
    display:inline-block;
`

export default Blog;