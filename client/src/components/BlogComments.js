import { useContext } from "react";
import styled from "styled-components";
import { BlogContext } from "./BlogContext";

const BlogComments = () => {

    /*
        from the context import all the required data and actions here
    */
    const { itemsRef, postName, textInput, state: { loggedIn, blogComments, error }, actions:
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
                {/* Map through the blog comments and render the comments on website
                render the comment name, date and comment */}
                { blogComments.map((indBlogComments, index) => {
                    return (
                        <InnerInnerDiv>                            
                            <CommentsName>{indBlogComments.name}</CommentsName>
                            <p>{indBlogComments.date}</p>
                            <p>{indBlogComments.comment}</p>
                            <ReplyDiv>
                                {/* Render the replay name and the reply only if it is not empty */}
                            {indBlogComments.replyName !== "" && <p className="replyName">{indBlogComments.replyName}</p>}
                            {indBlogComments.reply !== "" && <p>{indBlogComments.reply}</p>}
                            </ReplyDiv>
                            {/* Conditional render the text area to reply the comment. Also conditionaly render
                            the reply button and delete button.
                            the reply text area, reply button and delete button should render only if the 
                            consition exists. */}
                            {loggedIn && <input type="textarea" 
                            name="textAreaForReply"
                            className="textarea"
                            ref={el => itemsRef.current[index] = el}
                            onChange={(ev) => handleReplyTextArea(
                                ev.target.value,                                  
                                indBlogComments.id, 
                                indBlogComments.name, 
                                indBlogComments.date,
                                indBlogComments.comment,                                
                                )}
                            />}
                            {/* Conditionaly render the reply and delete button for each blog .
                            the rendering of delete and reply button only happens when the 
                            user logged in as admin user */}
                            <ReplyDeleteDiv>
                            {loggedIn && <input type="button" value="reply" onClick={(ev) => handleReplyClick(ev,indBlogComments.id, index)}></input>}
                            {loggedIn && <input type="button" value="delete" onClick={(ev) => handleDeleteClick(ev, indBlogComments.id)}></input>}
                            </ReplyDeleteDiv>
                        </InnerInnerDiv>
                    )
                })} 
            </InnerDiv>
            {/* text area and name input for posting a comment. A ref is added to the text area and the 
            name tag so that they can be emptied after submitting the comment. */}
            <TextAreaDiv>
                <div><PageHeading>Post Comment</PageHeading></div>
                <div>
                <label>Enter new Comment : </label>
                <input type="textarea" 
                name="textValue"
                id="postTextArea"
                className="textarea"
                ref={textInput}
                onChange={(ev) => handleCommentPost(ev.target.value, "comment")}
                />
                </div>
                <label>name: </label>
                {/* The name of the commenter render goes here */}
                <NameDiv>
                    <input type="text" name="name" ref={postName} id="postName" className="nameInput" onChange={(ev) => handleCommentPost(ev.target.value, "name")}></input>
                </NameDiv>
                <div>
                    <input type="submit" value="Submit" onClick={handlePostSubmit}></input>
                </div>
                {/* When the user does not enter the comment or the name of the commenter, then the following
                error messages trigger. Front end takes care of the error handling in this application.
                Error message is styled red in color. */}
                <div>
                    {error === "Comment is empty" && <ErrorMessage>Please enter a comment in the comment field</ErrorMessage>}
                    {error === "Post name empty" && <ErrorMessage>Please enter a name in the name input field</ErrorMessage>}
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
// > * selector will select all the child elements of that div
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
// > * selector selects all the child elements of the div.
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
// > * selects all the child elements of the div
// & . selects a specific class name which is child of the div.
const ReplyDiv = styled.div`
margin-left: 35px;
    > * {
        padding-bottom: 15px;
    }

    & .replyName {
        font-weight: bold;
    }
`

const ErrorMessage = styled.p`
    color: red;
`


export default BlogComments;