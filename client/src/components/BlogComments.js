import { useContext } from "react";
import styled from "styled-components";
import { BlogContext } from "./BlogContext";

const BlogComments = () => {

    const { state: { loggedIn, blogComments }, actions:
    {
        handleCommentPost, 
        handlePostSubmit, 
        handleReplyClick, 
        handleDeleteClick,
        handleReplyTextArea,
    }} = useContext(BlogContext);


    return (
        <OuterDiv>
            <div><PageHeading>Comments</PageHeading></div>
            <InnerDiv>
                { blogComments.map((indBlogComments) => {
                    return (
                        <InnerInnerDiv>                            
                            <CommentsName>{indBlogComments.name}</CommentsName>
                            <p>{indBlogComments.date}</p>
                            <p>{indBlogComments.comment}</p>
                            {indBlogComments.replyName !== "" && <p>{indBlogComments.replyName}</p>}
                            {indBlogComments.reply !== "" && <p>{indBlogComments.reply}</p>}
                            {loggedIn && <input type="textarea" 
                            name="textAreaForReply"
                            onChange={(ev) => handleReplyTextArea(
                                ev.target.value,                                  
                                indBlogComments.id, 
                                indBlogComments.name, 
                                indBlogComments.date,
                                indBlogComments.comment
                                )}
                            />}
                            {loggedIn && <input type="button" value="reply" onClick={(ev) => handleReplyClick(ev,indBlogComments.id)}></input>}
                            {loggedIn && <input type="button" value="delete" onClick={(ev) => handleDeleteClick(ev, indBlogComments.id)}></input>}
                        </InnerInnerDiv>
                    )
                })} 
            </InnerDiv>
            <div>
                <label>Enter value : </label>
                <input type="textarea" 
                name="textValue"
                onChange={(ev) => handleCommentPost(ev.target.value, "comment")}
                />
                <label>name: </label>
                <input type="text" name="name" onChange={(ev) => handleCommentPost(ev.target.value, "name")}></input>
                <input type="submit" value="Submit" onClick={handlePostSubmit}></input>
            </div>
        </OuterDiv>
    )
}

const OuterDiv = styled.div`
    width: 50vw;
    height: auto;
    padding: 25px;

    border-radius: 25px;
    margin: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`
const PageHeading = styled.p`
    font-size: 25px;
    padding-bottom: var(--pading-between-text);
`

const InnerDiv = styled.div`
`

const InnerInnerDiv = styled.div`
    > * {
        padding-bottom: 15px;
    }
`

const CommentsName = styled.p`
font-weight: bold;
    padding-top: 15px;
`


export default BlogComments;