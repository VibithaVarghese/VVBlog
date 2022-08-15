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
                            className="textarea"
                            onChange={(ev) => handleReplyTextArea(
                                ev.target.value,                                  
                                indBlogComments.id, 
                                indBlogComments.name, 
                                indBlogComments.date,
                                indBlogComments.comment
                                )}
                            />}
                            <ReplyDeleteDiv>
                            {loggedIn && <input type="button" value="reply" onClick={(ev) => handleReplyClick(ev,indBlogComments.id)}></input>}
                            {loggedIn && <input type="button" value="delete" onClick={(ev) => handleDeleteClick(ev, indBlogComments.id)}></input>}
                            </ReplyDeleteDiv>
                        </InnerInnerDiv>
                    )
                })} 
            </InnerDiv>
            <TextAreaDiv>
                <div>
                <label>Enter new Comment : </label>
                <input type="textarea" 
                name="textValue"
                className="textarea"
                onChange={(ev) => handleCommentPost(ev.target.value, "comment")}
                />
                </div>
                <label>name: </label>
                <NameDiv>
                    <input type="text" name="name" className="nameInput" onChange={(ev) => handleCommentPost(ev.target.value, "name")}></input>
                </NameDiv>
                <div>
                    <input type="submit" value="Submit" onClick={handlePostSubmit}></input>
                </div>
            </TextAreaDiv>
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

    & .textarea {
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid var(--color-lightblue);
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
`

const CommentsName = styled.p`
    font-weight: bold;
    padding-top: 35px;
`

const ReplyDeleteDiv = styled.div`
    padding-top: 15px;
`
const TextAreaDiv = styled.div`
    > * {
        padding-bottom: 15px;
    }
padding-top: 35px;
    & .textarea {
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid var(--color-lightblue);
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
`

const NameDiv = styled.div`
    & .nameInput {
        width: 100%;
        height: 45px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid var(--color-lightblue);
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
    }
`


export default BlogComments;